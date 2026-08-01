import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BrandLogo, Icon } from "@/components/AppShell";
import { login } from "@/lib/auth";
import { ROLE_HOME, sessionUserFromDatabase, writeSession } from "@/lib/session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Institutional Login | Centenary Bank AAAS" },
      {
        name: "description",
        content:
          "Secure gateway to the Auctioneer Allocation and Audit System for Centenary Bank recovery personnel.",
      },
      { property: "og:title", content: "Institutional Login | Centenary Bank AAAS" },
      {
        property: "og:description",
        content: "Secure gateway to the Auctioneer Allocation and Audit System.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(employeeId, password);
      const user = sessionUserFromDatabase(response.user);
      writeSession(user);
      navigate({ to: ROLE_HOME[user.role] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-md">
      <main className="relative z-10 grid w-full max-w-[1200px] grid-cols-1 overflow-hidden rounded-[10px] border border-outline-variant bg-surface-container-lowest shadow-xl md:grid-cols-12">
        <section className="relative hidden flex-col justify-center overflow-hidden bg-primary p-xl text-center text-on-primary md:col-span-7 md:flex">
            <div className="relative z-10 flex flex-col items-center justify-center gap-6">
            <div className="flex h-40 w-40 items-center justify-center">
              <BrandLogo className="h-36 w-36" />
            </div>
            <h1 className="text-[40px] font-bold leading-tight tracking-tight text-on-primary">Centenary Bank</h1>
            <p className="text-[15px] text-white font-semibold uppercase leading-5 tracking-[0.25em] text-on-primary-container opacity-90">
              Auto-Allocation of Auctioneers System
            </p>
          </div>

          <footer className="text-center py-3 border-top mt-4">
              <p>
                &copy; 2026 Centenary Bank. All Rights Reserved.
              </p>
          </footer>

        </section>

        <section className="col-span-1 flex flex-col bg-surface-container-lowest p-xl md:col-span-5">
          <div className="mb-xl flex items-center gap-md md:hidden">
            <BrandLogo className="h-12 w-12" />
            <div>
              <h1 className="text-headline-sm text-primary">Centenary Bank</h1>
              <p className="text-label-bold uppercase text-outline">AAAS System</p>
            </div>
          </div>
          
          <form className="space-y-lg" onSubmit={signIn}>
            <div className="space-y-xs">
              <label className="text-label-bold text-on-surface-variant" htmlFor="employee_id">
                EMPLOYEE ID / EMAIL
              </label>
              <div className="relative">
                <Icon
                  name="badge"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-outline"
                />
                <input
                  id="employee_id"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full rounded-[10px] border border-outline-variant bg-surface-container py-md pl-13 pr-md text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="EMP-000000"
                />
              </div>
            </div>

            <div className="space-y-xs">

              <div className="flex items-center justify-between">
                <label className="text-label-bold text-on-surface-variant" htmlFor="password">
                  PASSWORD
                </label>

              </div>
              <div className="relative">
                <Icon
                  name="lock"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-outline"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-[10px] border border-outline-variant bg-surface-container py-md pl-13 pr-md text-body-md text-on-surface outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="••••••••••••"
                />
              </div>

               <a className="text-label-bold text-primary hover:underline" href="#">
                  FORGOT PASSWORD?
                </a>
                
            </div>

            <p className="text-body-sm text-on-surface-variant">Your access role is assigned securely from your account.</p>

            {error && <p className="rounded-md bg-error-container px-3 py-2 text-body-sm text-on-error-container">{error}</p>}

            

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-md rounded-[10px] bg-primary py-lg text-title-lg text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Authenticating..." : "Sign In"}
              <Icon name={loading ? "progress_activity" : "login"} className={loading ? "animate-spin" : ""} />
            </button>
          </form>

          
        </section>
      </main>

      <div className="pointer-events-none fixed bottom-md left-md right-md z-20 flex items-center justify-between opacity-50">
        <div className="flex items-center gap-md">
          <div className="flex items-center gap-xs">
            <span className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-mono-data text-on-surface">AAAS_CORE: ONLINE</span>
          </div>
          <span className="border-l border-outline-variant pl-md text-mono-data text-on-surface">
            LOC: KAMPALA_HQ
          </span>
        </div>
        <div className="text-mono-data text-on-surface">v2.4.0-SECURE</div>
      </div>
    </div>
  );
}
