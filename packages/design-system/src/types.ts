import { ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type BadgeTone = "success" | "warning" | "danger" | "info";
export type AlertTone = "info" | "success" | "warning" | "danger";

export type DataTableColumn<T extends Record<string, ReactNode>> = {
  key: keyof T;
  label: string;
};