import { AuthPanel } from "../components/auth-panel";
import { loadDashboardData } from "../lib/dashboard-data";

export default async function HomePage() {
  const { hasClerk, database, metrics } = await loadDashboardData();

  return (
    <main>
      <div className="shell">
        <section className="hero">
          <span className="pill">DEFAULT SAAS STARTER</span>
          <h1>OrbitDesk turns the release plan into a live dashboard shell with real auth and data hooks.</h1>
          <p>
            Clerk powers the session layer, Neon backs live data checks, and the interface stays build-safe
            even before the project has been provisioned.
          </p>
        </section>
        <section className="metrics">
          {metrics.map((metric) => (
            <article className="metric" key={metric.label}>
              <strong>{metric.value}</strong>
              <p>{metric.label}</p>
            </article>
          ))}
        </section>
        <section className="grid">
          <article className="panel">
            <p className="eyebrow">Live integrations</p>
            <h2>Service status</h2>
            <div className="status-list">
              <div>
                <strong>Auth</strong>
                <p>{hasClerk ? "Clerk is connected and ready for sign-in." : "Clerk keys not present yet."}</p>
              </div>
              <div>
                <strong>Database</strong>
                <p>{database.connected ? "Neon query succeeded." : "Neon connection is pending."}</p>
              </div>
              <div>
                <strong>Runtime</strong>
                <p>Approval-first workflow preserved.</p>
              </div>
            </div>
          </article>
          <article className="panel">
            <p className="eyebrow">Database snapshot</p>
            <h2>{database.name}</h2>
            <p>{database.time}</p>
            <p className="database-version">{database.version}</p>
            {database.error ? <p className="error">Database error: {database.error}</p> : null}
          </article>
        </section>
        <AuthPanel enabled={hasClerk} />
      </div>
    </main>
  );
}
