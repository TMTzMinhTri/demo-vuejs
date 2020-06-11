import Vue from "vue";
import Vuex, { ModuleTree } from "vuex";
import { layOutModule, ILayOutModule, authModule, IauthModule } from "./modules";

Vue.use(Vuex);

interface modules {
  layOutModule: ILayOutModule;
  authModule: IauthModule;
}

export default new Vuex.Store({
  modules: {
    layOutModule,
    authModule,
  } as ModuleTree<modules>,
  strict: process.env.NODE_ENV !== "production",
});
