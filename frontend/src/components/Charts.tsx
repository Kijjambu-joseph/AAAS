import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}

export function ChartCard({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-lg shadow-sm">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-md">
        <div className="min-w-0">
          <h3 className="truncate text-title-lg text-primary">{title}</h3>
          {subtitle ? <p className="text-body-sm text-on-surface-variant">{subtitle}</p> : null}
        </div>
        {actions}
      </div>
      <div className="mt-md h-64 w-full">{children}</div>
    </section>
  );
}

const AXIS = { fontSize: 11, fill: "var(--on-surface-variant)" } as const;
const TOOLTIP_STYLE = {
  borderRadius: 10,
  border: "1px solid var(--outline-variant)",
  background: "var(--surface-container-lowest)",
  fontSize: 12,
};

export function RecoveryTrendChart({
  data,
}: {
  data: { month: string; recovered: number; target: number }[];
}) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full animate-pulse rounded-lg bg-surface-container" />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="grad-recovered" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
        <XAxis dataKey="month" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Area
          type="monotone"
          dataKey="recovered"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#grad-recovered)"
          name="Recovered (UGX bn)"
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="var(--secondary-container)"
          strokeWidth={2}
          dot={false}
          name="Target"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function RegionBarChart({ data }: { data: { region: string; cases: number }[] }) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full animate-pulse rounded-lg bg-surface-container" />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
        <XAxis dataKey="region" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: "var(--surface-container)" }} />
        <Bar dataKey="cases" fill="var(--primary)" radius={[6, 6, 0, 0]} name="Active cases" />
      </BarChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = [
  "var(--primary)",
  "var(--secondary-container)",
  "var(--on-primary-fixed-variant)",
  "var(--on-tertiary-container)",
  "var(--error)",
];

export function StatusPieChart({ data }: { data: { name: string; value: number }[] }) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full animate-pulse rounded-lg bg-surface-container" />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function ThroughputLineChart({
  data,
}: {
  data: { day: string; allocated: number; exceptions: number }[];
}) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-full w-full animate-pulse rounded-lg bg-surface-container" />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--outline-variant)" vertical={false} />
        <XAxis dataKey="day" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="allocated" stroke="var(--primary)" strokeWidth={2} name="Allocated" />
        <Line type="monotone" dataKey="exceptions" stroke="var(--error)" strokeWidth={2} name="Exceptions" />
      </LineChart>
    </ResponsiveContainer>
  );
}
