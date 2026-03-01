export type OrderStatus = "paid" | "pending" | "overdue" | "review";

export type Order = {
  id: string;
  customer: string;
  status: OrderStatus;
  amount: string;
};

export const orders: Order[] = [
  { id: "INV-1041", customer: "Acme Labs", status: "paid", amount: "$1,240" },
  { id: "INV-1042", customer: "Bright Nest", status: "pending", amount: "$920" },
  { id: "INV-1043", customer: "NorthStar", status: "overdue", amount: "$2,310" },
  { id: "INV-1044", customer: "Cedar Foods", status: "paid", amount: "$780" },
  { id: "INV-1045", customer: "Orbit Tech", status: "review", amount: "$1,560" },
  { id: "INV-1046", customer: "Vertex", status: "pending", amount: "$640" },
  { id: "INV-1047", customer: "Mango Retail", status: "paid", amount: "$1,110" },
  { id: "INV-1048", customer: "Pixel Group", status: "overdue", amount: "$2,040" }
];