import Link from "next/link";
import { Badge, Card } from "@acme/design-system";

export default function Home() {
  return (
    <main className="container ds-p-5">
      <section className="ds-hero">
        <h1 className="ds-title-lg ds-mb-2">Scalable Design System For Large Projects</h1>
        <p className="ds-text-muted ds-mb-4">
          A full multi-file architecture with tokens, foundations, grid, utilities, atoms, molecules, and organisms.
        </p>
        <div className="ds-flex ds-align-center" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <Badge tone="info">Bootstrap-like Grid</Badge>
          <Badge tone="success">Framework-Free Components</Badge>
          <Badge tone="warning">Next.js Compatible</Badge>
        </div>
      </section>

      <div className="row ds-grid-gap">
        <div className="col-12 col-md-4 ds-mb-4">
          <Card title="Dashboard Suite" subtitle="KPIs, table, pagination, modal, alerts">
            <p className="ds-text-muted ds-mb-4">Ready for analytics and operations modules.</p>
            <Link className="ds-btn ds-btn-primary" href="/dashboard">Open Dashboard</Link>
          </Card>
        </div>

        <div className="col-12 col-md-4 ds-mb-4">
          <Card title="Component Library" subtitle="Atomic architecture catalog">
            <p className="ds-text-muted ds-mb-4">Reusable primitives and patterns for all product teams.</p>
            <Link className="ds-btn ds-btn-primary" href="/components">Open Catalog</Link>
          </Card>
        </div>

        <div className="col-12 col-md-4 ds-mb-4">
          <Card title="Forms & Workflow" subtitle="Form controls and submission flows">
            <p className="ds-text-muted ds-mb-4">Build enterprise forms using same consistent design language.</p>
            <Link className="ds-btn ds-btn-primary" href="/forms">Open Forms</Link>
          </Card>
        </div>
      </div>
    </main>
  );
}