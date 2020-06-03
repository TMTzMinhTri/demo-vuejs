<template>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ total }}</strong> todos
    </span>
    <ul class="filters">
      <li>
        <Button
          type="primary"
          :class="{ selected: visibility == 'all' }"
          @click="filterTodo('all')"
        >All</Button>
      </li>
      <li>
        <Button
          type="primary"
          :class="{ selected: visibility == 'active' }"
          @click="filterTodo('active')"
        >Active</Button>
      </li>
      <li>
        <Button
          type="primary"
          :class="{ selected: visibility == 'completed' }"
          @click="filterTodo('completed')"
        >Completed</Button>
      </li>
    </ul>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Button } from "ant-design-vue";
export default Vue.extend({
  components: {
    Button
  },
  data: () => ({
    visibility: "all"
  }),
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
    total() {
      return this.$store.getters.todos.length;
    }
  },
  methods: {
    filterTodo: function(type: string) {
      this.$store.dispatch("filterTodo", type);
    }
  }
});
</script>
<style scoped >
.footer {
  color: #777;
  padding: 10px 15px;
  height: 50px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
  margin: 0 10px;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
</style>