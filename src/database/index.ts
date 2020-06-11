import Dexie from "dexie";

export interface Ilist_todos {
  id?: number;
  isComplete: boolean;
  content: string;
}
export interface Iauth {
  email: string;
  phone_number: string;
  authentication_token: string;
  name: string;
}
class DemoVue extends Dexie {
  list_todos: Dexie.Table<Ilist_todos, number>;
  auth: Dexie.Table<Iauth, number>;

  constructor() {
    super("DemoVue", { allowEmptyDB: true });

    this.version(1).stores({
      list_todos: "++id,content,isComplete ",
      auth: "email, phone_number, authentication_token, name",
    });

    this.list_todos = this.table("list_todos");
    this.auth = this.table("auth");
  }
}
export default new DemoVue();
