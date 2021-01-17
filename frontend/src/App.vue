<template>
  <div id="app">
    <Nav />
    <Sidenav />
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import Nav from "./components/Nav.vue";
import Sidenav from "./components/Sidenav.vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
    Nav,
    Sidenav,
  },
})
export default class App extends Vue {
  created() {
    this.$store.dispatch("whoami");
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
}
</style>
