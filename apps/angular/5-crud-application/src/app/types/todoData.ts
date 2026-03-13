type numberOrNull = number | null;
export type stringOrNull = string | null;

export interface TodoData {
  userId: numberOrNull;
  id: numberOrNull;
  title: stringOrNull;
  body?: stringOrNull;
  completed: boolean;
}
