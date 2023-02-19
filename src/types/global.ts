export type IFilterStatus = "" | "Completed" | "Uncompleted";

export interface IState {
  message: any;
  auth: any;
}

export interface ITodo {
  id: number;
  title: string;
  status: "Completed" | "Uncompleted";
}
