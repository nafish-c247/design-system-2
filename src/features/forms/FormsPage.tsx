"use client";

import { useState } from "react";
import { Badge, Button, Card, Select, SwalAlert } from "@acme/design-system";

export function FormsPage() {
  const [projectType, setProjectType] = useState("dashboard");
  const [priority, setPriority] = useState("normal");

  return (
    <main className="container ds-p-5">
      <section className="ds-hero">
        <h1 className="ds-title-lg ds-mb-2">Forms & Workflow Studio</h1>
        <p className="ds-text-muted ds-mb-4">Reusable form patterns for enterprise internal tools and customer platforms.</p>
        <div className="ds-flex ds-align-center" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <Badge tone="info">Validation Ready</Badge>
          <Badge tone="success">Consistent UX</Badge>
          <Badge tone="warning">API Friendly</Badge>
        </div>
      </section>

      <div className="row ds-grid-gap">
        <div className="col-12 col-xl-8 ds-mb-4">
          <Card title="Create Work Item" subtitle="All controls come from the same design-system package">
            <div className="ds-stack">
              <Select
                label="Project Type"
                value={projectType}
                onChange={setProjectType}
                options={[
                  { label: "Dashboard", value: "dashboard" },
                  { label: "Marketing", value: "marketing" },
                  { label: "Admin", value: "admin" },
                ]}
              />

              <Select
                label="Priority"
                value={priority}
                onChange={setPriority}
                options={[
                  { label: "Normal", value: "normal" },
                  { label: "High", value: "high" },
                  { label: "Critical", value: "critical" },
                ]}
              />

              <div className="ds-flex" style={{ gap: "0.7rem", flexWrap: "wrap" }}>
                <Button>Submit</Button>
                <Button variant="outline">Save Draft</Button>
                <Button variant="ghost">Preview</Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-xl-4 ds-mb-4">
          <SwalAlert tone="info" title="Form Rules" message="Validate required fields and sanitize values before API submission." />
          <div style={{ marginTop: "1rem" }}>
            <Card title="Submission Checklist">
              <div className="ds-stack">
                <span className="ds-text-muted">1. Required fields completed</span>
                <span className="ds-text-muted">2. Priority and category selected</span>
                <span className="ds-text-muted">3. Reviewer assigned</span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}