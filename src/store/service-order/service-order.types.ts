export type ServiceOrder = {
  id?: number;
  name: string;
  category: string;
  description?: string;
  project_id: number;
  is_approved?: boolean;
  project_name?: string;
};
