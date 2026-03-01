"use client";

import { useState } from "react";
import { Accordion, Badge, Button, Card, Select, Tooltip } from "@acme/design-system";

export function ComponentCatalogPage() {
  const [team, setTeam] = useState("product");

  return (
    <main className="container ds-p-5">
      <section className="ds-hero">
        <h1 className="ds-title-lg ds-mb-2">Component Catalog</h1>
        <p className="ds-text-muted ds-mb-4">Organized primitives and patterns for large product teams.</p>
        <div className="ds-flex ds-align-center" style={{ gap: "0.5rem", flexWrap: "wrap" }}>
          <span className="ds-chip">Atoms</span>
          <span className="ds-chip">Molecules</span>
          <span className="ds-chip">Organisms</span>
        </div>
      </section>

      <div className="row ds-grid-gap">
        <div className="col-12 col-lg-6 ds-mb-4">
          <Card title="Buttons + Badges" subtitle="Core action and status primitives">
            <div className="ds-stack">
              <div className="ds-flex ds-align-center" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
                <Button>Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="ds-flex ds-align-center" style={{ gap: "0.6rem", flexWrap: "wrap" }}>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
                <Badge tone="info">Info</Badge>
              </div>
            </div>
          </Card>
        </div>

        <div className="col-12 col-lg-6 ds-mb-4">
          <Card title="Forms + Help" subtitle="Select and tooltip patterns">
            <div className="ds-stack">
              <Select
                label="Team"
                value={team}
                onChange={setTeam}
                options={[
                  { label: "Product", value: "product" },
                  { label: "Design", value: "design" },
                  { label: "Engineering", value: "engineering" },
                ]}
              />
              <Tooltip label="Use this pattern for compact in-context guidance.">
                <Button variant="outline">Hover me</Button>
              </Tooltip>
            </div>
          </Card>
        </div>

        <div className="col-12 ds-mb-4">
          <Card title="FAQ / Knowledge Block" subtitle="Accordion for help center content">
            <Accordion
              items={[
                { title: "How to add a new component?", content: "Create file in atoms/molecules/organisms and export from src/components/index.ts." },
                { title: "How to keep consistency?", content: "Always consume token variables and utility classes before introducing new styles." },
                { title: "How to scale for many teams?", content: "Version components, document usage rules, and enforce lint/test contracts." },
              ]}
            />
          </Card>
        </div>
      </div>
    </main>
  );
}