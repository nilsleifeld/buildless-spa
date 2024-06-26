declare module 'types' {
  type Todo = {
    id: string;
    text: string;
    completed: boolean;
  };

  type TodoItemChangeTextEventDetail = {
    text: string;
  };
}
