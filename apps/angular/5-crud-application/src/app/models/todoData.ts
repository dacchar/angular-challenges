export interface TodoData {
  userId: number | undefined;
  id: number | undefined;
  title: string | undefined | null;
  body?: string;
  completed: boolean | undefined;
}

export class TodoDataImpl implements TodoData {
  constructor(
    public userId: number = -1,
    public id: number = -1,
    public title = undefined,
    public completed: boolean = false,
    public body?: string,
  ) {}
}
