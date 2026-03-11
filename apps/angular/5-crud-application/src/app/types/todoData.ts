export interface TodoData {
  userId: number | null;
  id: number | null;
  title: string | null;
  body?: string;
  completed: boolean;
}
