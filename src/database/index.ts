import Dexie from "dexie";

export interface Ilist_todos {
  id?: number;
  isComplete: boolean;
  content: string;
}

class DemoVue extends Dexie {
  list_todos: Dexie.Table<Ilist_todos, number>;

  constructor() {
    super("DemoVue", { allowEmptyDB: true });

    this.version(1).stores({
      list_todos: "++id,content,isComplete ",
    });

    this.list_todos = this.table("list_todos");
  }
}
export default new DemoVue();
