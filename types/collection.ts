export interface CollectionItem {
  id: string;
  name: string;
  description?: string;
  apiIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RequestHistoryItem {
  id: string;
  method: string;
  url: string;
  status: number | null;
  responseTime: number | null;
  timestamp: string;
}
