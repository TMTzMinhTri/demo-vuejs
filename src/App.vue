<template>
  <div id="app">
    <div id="nav">
      <a href="/rippleTMT.github.io" v-if="isProduction">Ripple button</a>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCurentUser } from "./Api";
export default Vue.extend({
  mounted() {
    console.log("mount");
    getCurentUser().then((data: any) => {
      if (data.code === "OK") {
        this.$store.commit("auth", true);
      } else {
        this.$store.commit("auth", false);
      }
    });
  },
  data() {
    return {
      isProduction: process.env.NODE_ENV === "production"
    };
  }
});
</script>
<style lang="scss">
body {
  font-family: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
