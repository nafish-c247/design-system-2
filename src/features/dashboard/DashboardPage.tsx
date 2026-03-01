"use client";

import { useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  DataTable,
  Modal,
  Pagination,
  Select,
  SwalAlert,
} from "@acme/design-system";
import { orders } from "./data";

type Row = {
  id: string;
  customer: string;
  status: React.ReactNode;
  amount: string;
};

function toBadge(status: string) {
  if (status === "paid") return <Badge tone="success">Paid</Badge>;
  if (status === "pending") return <Badge tone="warning">Pending</Badge>;
  if (status === "overdue") return <Badge tone="danger">Overdue</Badge>;
  return <Badge tone="info">Review</Badge>;
}

export function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("product");
  const [page, setPage] = useState(1);

  const pageSize = 4;
  const rows = useMemo<Row[]>(() => {
    const start = (page - 1) * pageSize;
    return orders.slice(start, start + pageSize).map((item) => ({
      id: item.id,
      customer: item.customer,
      amount: item.amount,
      status: toBadge(item.status),
    }));
  }, [page]);

  return (
    <main className="container ds-p-5">
      <section className="ds-hero">
        <h1 className="ds-title-lg ds-mb-2">Executive Operations Dashboard</h1>
        <p className="ds-text-muted ds-mb-4">Enterprise module with reusable data cards, controls, and table patterns.</p>
        <div className="ds-flex ds-align-center" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <span className="ds-chip">Realtime Metrics</span>
          <span className="ds-chip">Reusable Widgets</span>
          <span className="ds-chip">Cross-Team Ready</span>
        </div>
      </section>

      <SwalAlert tone="success" title="System Ready" message="Design system modules loaded for this dashboard." />

      <div className="row ds-grid-gap ds-mb-5" style={{ marginTop: "1.25rem" }}>
        <div className="col-12 col-md-3 ds-mb-4">
          <Card title="Revenue" subtitle="This month">
            <p className="ds-kpi">$84,210</p>
            <p className="ds-text-muted">+12% vs last month</p>
          </Card>
        </div>
        <div className="col-12 col-md-3 ds-mb-4">
          <Card title="New Users" subtitle="Last 30 days">
            <p className="ds-kpi">1,294</p>
            <p className="ds-text-muted">+4.3% growth</p>
          </Card>
        </div>
        <div className="col-12 col-md-3 ds-mb-4">
          <Card title="Open Tickets" subtitle="Support backlog">
            <p className="ds-kpi">42</p>
            <p className="ds-text-muted">7 high-priority</p>
          </Card>
        </div>
        <div className="col-12 col-md-3 ds-mb-4">
          <Card title="Conversion" subtitle="Weekly average">
            <p className="ds-kpi">6.8%</p>
            <p className="ds-text-muted">+0.9% uplift</p>
          </Card>
        </div>
      </div>

      <div className="row ds-grid-gap">
        <div className="col-12 col-xl-8 ds-mb-4">
          <Card title="Orders Pipeline" subtitle="Table + badge + pagination" footer={<Pagination current={page} total={2} onChange={setPage} />}>
            <DataTable
              columns={[
                { key: "id", label: "Invoice" },
                { key: "customer", label: "Customer" },
                { key: "status", label: "Status" },
                { key: "amount", label: "Amount" },
              ]}
              rows={rows}
            />
          </Card>
        </div>

        <div className="col-12 col-xl-4 ds-mb-4">
          <Card title="Control Center" subtitle="Actions + filters">
            <div className="ds-stack">
              <Select
                label="Team"
                value={selectedTeam}
                onChange={setSelectedTeam}
                options={[
                  { label: "Product", value: "product" },
                  { label: "Design", value: "design" },
                  { label: "Engineering", value: "engineering" },
                ]}
              />
              <div className="ds-flex" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
                <Button onClick={() => setModalOpen(true)}>Create Project</Button>
                <Button variant="outline">Export CSV</Button>
              </div>
            </div>
          </Card>

          <div style={{ marginTop: "1rem" }}>
            <Card title="Release Progress" subtitle="Roadmap status">
              <div className="ds-stack">
                <div className="ds-flex ds-justify-between"><span className="ds-text-muted">Design</span><strong>92%</strong></div>
                <div className="ds-flex ds-justify-between"><span className="ds-text-muted">Frontend</span><strong>81%</strong></div>
                <div className="ds-flex ds-justify-between"><span className="ds-text-muted">QA</span><strong>67%</strong></div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Create New Project">
        <p className="ds-text-muted ds-mb-3">Launch a new project workspace using your design system templates.</p>
        <Select
          label="Project Type"
          value={selectedTeam}
          onChange={setSelectedTeam}
          options={[
            { label: "Product Dashboard", value: "product" },
            { label: "Marketing Site", value: "marketing" },
            { label: "Internal Admin", value: "admin" },
          ]}
        />
      </Modal>
    </main>
  );
}