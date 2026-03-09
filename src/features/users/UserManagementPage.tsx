"use client";

import { FormEvent, useState } from "react";
import { Badge, Button, Card, DataTable, Modal, Select } from "@acme/design-system";

type UserStatus = "active" | "invited" | "suspended";
type UserRecord = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
};

type UserForm = {
  name: string;
  email: string;
  role: string;
  status: UserStatus;
};

type FormErrors = Partial<Record<keyof UserForm, string>>;

const INITIAL_USERS: UserRecord[] = [
  { id: "u-1001", name: "Ava Wilson", email: "ava.wilson@company.com", role: "Admin", status: "active" },
  { id: "u-1002", name: "Liam Carter", email: "liam.carter@company.com", role: "Manager", status: "invited" },
  { id: "u-1003", name: "Noah Patel", email: "noah.patel@company.com", role: "Editor", status: "active" },
  { id: "u-1004", name: "Mia Johnson", email: "mia.johnson@company.com", role: "Viewer", status: "suspended" },
];

const EMPTY_FORM: UserForm = {
  name: "",
  email: "",
  role: "Viewer",
  status: "active",
};

function statusBadge(status: UserStatus) {
  if (status === "active") return <Badge tone="success">Active</Badge>;
  if (status === "invited") return <Badge tone="info">Invited</Badge>;
  return <Badge tone="warning">Suspended</Badge>;
}

export function UserManagementPage() {
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [form, setForm] = useState<UserForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const isEditing = editingUserId !== null;

  const rows = users.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    status: statusBadge(user.status),
    action: (
      <button
        type="button"
        className="ds-icon-btn"
        onClick={() => openEditModal(user)}
        aria-label={`Edit ${user.name}`}
        title="Edit user"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      </button>
    ),
  }));

  function openAddModal() {
    setEditingUserId(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setIsModalOpen(true);
  }

  function openEditModal(user: UserRecord) {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setErrors({});
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setErrors({});
  }

  function validate(current: UserForm): FormErrors {
    const nextErrors: FormErrors = {};

    if (!current.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!current.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!current.role.trim()) {
      nextErrors.role = "Role is required.";
    }

    if (!current.status) {
      nextErrors.status = "Status is required.";
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (isEditing && editingUserId) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUserId
            ? { ...user, name: form.name.trim(), email: form.email.trim(), role: form.role, status: form.status }
            : user
        )
      );
    } else {
      const newUser: UserRecord = {
        id: `u-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: form.status,
      };
      setUsers((prev) => [newUser, ...prev]);
    }

    closeModal();
  }

  return (
    <main className="container ds-p-5">
      <section className="ds-hero">
        <h1 className="ds-title-lg ds-mb-2">User Management</h1>
        <p className="ds-text-muted ds-mb-4">Manage users, roles, and account status with centralized design-system components.</p>
        <Button onClick={openAddModal}>Add User</Button>
      </section>

      <Card title="Users" subtitle="Name, email, role, status, and row-level edit actions">
        <DataTable
          columns={[
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
            { key: "status", label: "Status" },
            { key: "action", label: "Action" },
          ]}
          rows={rows}
        />
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={isEditing ? "Edit User" : "Add User"}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" form="user-form">
              {isEditing ? "Update User" : "Create User"}
            </Button>
          </>
        }
      >
        <form id="user-form" className="ds-stack" onSubmit={handleSubmit}>
          <label className="ds-stack">
            <span className="ds-text-muted">Name</span>
            <input
              className="ds-input"
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              aria-invalid={Boolean(errors.name)}
              placeholder="Enter full name"
            />
            {errors.name ? <span className="ds-form-error">{errors.name}</span> : null}
          </label>

          <label className="ds-stack">
            <span className="ds-text-muted">Email</span>
            <input
              className="ds-input"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(errors.email)}
              placeholder="Enter email address"
            />
            {errors.email ? <span className="ds-form-error">{errors.email}</span> : null}
          </label>

          <Select
            label="Role"
            value={form.role}
            onChange={(value) => setForm((prev) => ({ ...prev, role: value }))}
            aria-invalid={Boolean(errors.role)}
            options={[
              { label: "Admin", value: "Admin" },
              { label: "Manager", value: "Manager" },
              { label: "Editor", value: "Editor" },
              { label: "Viewer", value: "Viewer" },
            ]}
          />
          {errors.role ? <span className="ds-form-error">{errors.role}</span> : null}

          <Select
            label="Status"
            value={form.status}
            onChange={(value) => setForm((prev) => ({ ...prev, status: value as UserStatus }))}
            aria-invalid={Boolean(errors.status)}
            options={[
              { label: "Active", value: "active" },
              { label: "Invited", value: "invited" },
              { label: "Suspended", value: "suspended" },
            ]}
          />
          {errors.status ? <span className="ds-form-error">{errors.status}</span> : null}
        </form>
      </Modal>
    </main>
  );
}
