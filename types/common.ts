export interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

export type StatusState = "operational" | "unavailable" | "checking" | "error" | "timeout";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
