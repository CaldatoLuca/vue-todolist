"use script";

const { createApp } = Vue;

const vueConfig = {
  data() {
    return {};
  },
};

const myApp = createApp(vueConfig);
myApp.mount("#app");
