import { useEffect, useState } from "react";
import { Button, Modal } from "@/components/ui-kit";
import { formatScoringFactors, type AllocationResult, verifyDryRun } from "@/lib/allocation-engine";

interface DryRunPreviewModalProps {
  open: boolean;
  caseId: number | null;
  strategy?: string;
  auctioneerId?: number | null;
  onClose: () => void;
  onAccept: (result: AllocationResult) => void;
}

export function DryRunPreviewModal({
  open,
  caseId,
  strategy = "automatic",
  auctioneerId,
  onClose,
  onAccept,
}: DryRunPreviewModalProps) {
  const [preview, setPreview] = useState<AllocationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !caseId) {
      setPreview(null);
      return;
    }

    let active = true;

    const loadPreview = async () => {
      setLoading(true);
      const response = await verifyDryRun(caseId, strategy);
      if (active) {
        setPreview(response);
        setLoading(false);
      }
    };

    loadPreview();

    return () => {
      active = false;
    };
  }, [open, caseId, strategy]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Automatic allocation preview"
      subtitle="Review the engine recommendation before committing a manual override."
      icon="fact_check"
      size="lg"
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => preview && onAccept(preview)} disabled={loading || !preview?.success}>
            Accept recommendation
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {loading ? (
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
            Loading dry-run preview...
          </div>
        ) : preview ? (
          <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoCard label="Status" value={preview.success ? "Ready" : "Blocked"} tone={preview.success ? "text-green-600" : "text-error"} />
              <InfoCard label="Auctioneer" value={preview.auctioneer_id ? String(preview.auctioneer_id) : "None"} />
              <InfoCard label="Score" value={preview.score != null ? preview.score.toFixed(1) : "N/A"} />
            </div>

            {preview.scoring_factors ? (
              <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
                <p className="mb-3 text-label-bold uppercase text-on-surface-variant">Scoring factors</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {Object.entries(formatScoringFactors(preview.scoring_factors)).map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-md bg-surface-container px-3 py-2 text-sm">
                      <span className="text-on-surface-variant">{label}</span>
                      <span className="font-semibold text-primary">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="rounded-lg border border-outline-variant bg-primary-container p-4 text-sm text-primary-container-foreground">
              <p className="font-semibold">What this means</p>
              <p className="mt-1 text-sm opacity-90">
                {preview.success
                  ? "The automatic engine can allocate this case now. Accepting this preview commits the chosen allocation path."
                  : preview.error_message || "The engine could not prepare a preview for this case."}
              </p>
            </div>
          </>
        ) : (
          <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface-variant">
            No preview is available yet.
          </div>
        )}

        {auctioneerId ? (
          <p className="text-xs text-on-surface-variant">Manual target auctioneer: {auctioneerId}</p>
        ) : null}
      </div>
    </Modal>
  );
}

function InfoCard({ label, value, tone = "text-primary" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-lg border border-outline-variant bg-surface-container-lowest p-4">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">{label}</p>
      <p className={`mt-1 text-title-md font-bold ${tone}`}>{value}</p>
    </div>
  );
}