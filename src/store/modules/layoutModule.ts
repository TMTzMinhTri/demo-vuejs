import { StoreOptions } from "vuex";
import DemoData, { Ilist_todos } from "@/database";
import Nprogress from "nprogress";

export interface ILayOutModule {
  listTodo: Ilist_todos[];
  loading: boolean;
  newTodo: string;
  auth: boolean;
}

export const layOutModule: StoreOptions<ILayOutModule> = {
  state: () => ({
    listTodo: [],
    loading: true,
    newTodo: "",
    auth: false,
  }),
  mutations: {
    getListTodos(state, listdata) {
      state.listTodo = listdata;
      state.loading = false;
    },
    addNewTodo(state, payload: Ilist_todos) {
      state.listTodo.unshift(payload);
    },
    removeTodo(state, payload: Ilist_todos) {
      state.listTodo.splice(state.listTodo.indexOf(payload), 1);
    },
    updateTodo(state, payload: Ilist_todos) {
      state.listTodo.splice(
        state.listTodo.findIndex((item) => item.id === payload.id),
        1,
        payload
      );
    },
    changeNewTodo(state, newTodo: string) {
      state.newTodo = newTodo;
    },
    auth(state, status) {
      state.auth = status;
    },
  },
  actions: {
    getListTodos({ commit }) {
      Nprogress.start();
      setTimeout(() => {
        DemoData.list_todos.reverse().toArray((listdata) => commit("getListTodos", listdata));
        Nprogress.done();
      }, 2000);
    },
    addNewTodo({ commit }, payload: Ilist_todos) {
      return new Promise(async (resolve) => {
        await DemoData.list_todos.add(payload);
        commit("addNewTodo", payload);
        resolve();
      });
    },
    removeTodo({ commit }, payload: Ilist_todos) {
      return new Promise(async (resolve) => {
        await DemoData.list_todos.delete(payload.id ? payload.id : 0);
        commit("removeTodo", payload);
        resolve();
      });
    },
    updateTodo({ commit, state }, todo: Ilist_todos) {
      return new Promise(async (resolve) => {
        await DemoData.list_todos.update(todo.id ? todo.id : 0, {
          id: todo.id,
          content: state.newTodo.trim(),
          isComplete: todo.isComplete,
        });
        commit("updateTodo", {
          ...todo,
          content: state.newTodo.trim(),
          isComplete: todo.isComplete,
        });
        resolve();
      });
    },
    filterTodo({ commit, state }, type: string) {
      switch (type) {
        case (type = "active"):
          const newState = state.listTodo.filter((item) => !item.isComplete);
          commit("getListTodos", newState);
          break;

        default:
          break;
      }
    },
  },
  getters: {
    todos: (state) => state.listTodo,
    newTodo: (state) => state.newTodo,
  },
};
