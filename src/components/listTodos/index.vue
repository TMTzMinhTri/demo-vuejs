<template>
  <ul class="todo-list">
    <li
      v-for="todo in listTodos"
      class="todo"
      :key="todo.id"
      :class="{ completed: todo.isComplete, editing: todo == editedTodo }"
    >
      <div class="view">
        <input
          class="toggle"
          type="checkbox"
          :value="todo.isComplete"
          @input="updateStatusTodo({...todo, isComplete: !todo.isComplete})"
        />
        <label @dblclick="editTodo(todo)">{{ todo.content }}</label>
        <button class="destroy" @click="removeTodo(todo)"></button>
      </div>
      <input
        class="edit"
        type="text"
        :value="newTodo"
        @input="inputFocus($event)"
        @focus="inputFocus($event,todo.content)"
        v-todo-focus="todo === editedTodo"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)"
        @keyup.esc="cancelEdit(todo)"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { debounce } from "lodash";
import { Ilist_todos } from "@/database";

@Component({
  directives: {
    "todo-focus": function(el, binding, vnode) {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export default class InputVue extends Vue {
  private editedTodo: Ilist_todos | null = null;

  public debouncedInput = debounce(value => {
    this.$store.commit("changeNewTodo", value);
  }, 500);
  doneEdit(todo: Ilist_todos) {
    if (!this.editedTodo) return;
    this.editedTodo = null;
    this.$store.dispatch("updateTodo", todo);
    if (!todo.content) {
      this.removeTodo(todo);
    }
  }
  updateStatusTodo(todo: Ilist_todos) {
    this.$store.dispatch("updateTodo", todo);
  }
  inputFocus(event: Event, todo?: string) {
    if (event.type === "input") {
      const target = event.target as HTMLInputElement;
      this.debouncedInput(target.value);
    } else {
      this.$store.commit("changeNewTodo", todo);
    }
  }
  removeTodo(todo: Ilist_todos) {
    this.$store.dispatch("removeTodo", todo);
  }
  editTodo(todo: Ilist_todos) {
    this.editedTodo = todo;
  }
  cancelEdit() {
    this.editedTodo = null;
  }

  get listTodos() {
    return this.$store.getters.todos;
  }
  get newTodo() {
    return this.$store.getters.newTodo;
  }
}
</script>

<style lang='scss'>
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: "×";
}

.todo-list li:hover .destroy {
  display: flex;
  justify-content: center;
  align-items: center;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}
</style>