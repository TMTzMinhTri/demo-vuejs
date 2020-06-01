import Vue from "vue";
import Vuex, { ModuleTree } from "vuex";
import { layOutModule, ILayOutModule} from "./modules";

Vue.use(Vuex);

interface modules {
  layOutModule: ILayOutModule;
}

export default new Vuex.Store({
  modules: {
    layOutModule,
  } as ModuleTree<modules>,
  strict: process.env.NODE_ENV !== "production",
});
