import { ReactNode } from "react";
import { DataTableColumn } from "../../types";

export function DataTable<T extends Record<string, ReactNode>>({
  columns,
  rows,
}: {
  columns: DataTableColumn<T>[];
  rows: T[];
}) {
  return (
    <div className="ds-table-wrap">
      <table className="ds-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={`${index}-${String(column.key)}`}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}