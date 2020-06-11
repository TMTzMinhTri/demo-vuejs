<template>
  <a-form-model
    layout="horizontal"
    :model="formInline"
    @submit="handleSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="Username">
      <v-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </v-input>
    </a-form-model-item>
    <a-form-model-item label="Password">
      <v-input v-model="formInline.password" type="password" placeholder="Password">
        <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
      </v-input>
    </a-form-model-item>
    <a-form-model-item>
      <Button
        type="primary"
        html-type="submit"
        :disabled="formInline.user === '' || formInline.password === ''"
      >Log in</Button>
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import Vue from "vue";
import { FormModel, Button, Input, Icon } from "ant-design-vue";
import { signIn } from "@/Api/index";

export default Vue.extend({
  components: {
    "a-form-model": FormModel,
    "a-form-model-item": FormModel.Item,
    Button,
    "v-input": Input,
    "a-icon": Icon
  },
  data() {
    return {
      formInline: {
        user: "",
        password: ""
      }
    };
  },
  methods: {
    handleSubmit(e: Event) {
      signIn({
        login: this.formInline.user,
        password: this.formInline.password
      }).then((rsp: any) => {
        if (rsp.code === "OK") {
          this.$router.push("/");
        }
      });
    }
  }
});
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>