<template>
  <div v-if="!loading">
    <section class="todoapp">
      <Header title="todos"></Header>
      <ListTodos />
      <Control />
    </section>
    <footer />
  </div>
  <div v-else class="spin">
    <spin />
  </div>
</template>

<script lang = 'ts'>
import { Button, Spin } from "ant-design-vue";
import Store from "@/store";
import InputVue from "@/components/InputTodo/index.vue";
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import ListTodos from "@/components/listTodos/index.vue";
import Control from "@/components/listTodos/Control/index.vue";

export default {
  name: "Home",
  components: {
    Button,
    Spin,
    Header,
    Footer,
    ListTodos,
    Control
  },
  data: () => ({}),
  created() {
    Store.dispatch("getListTodos");
  },
  computed: {
    loading() {
      return Store.state.layOutModule.loading;
    }
  },
  methods: {
    clickButton: function() {}
  }
};
</script>
<style scoped lang="scss">
body {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}
.spin {
  background: rgba(0, 0, 0, 0.05);
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
}
.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
  p {
    line-height: 1;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>