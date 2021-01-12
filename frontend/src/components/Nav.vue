<template>
  <nav class="row">
    <sidenav-button />
    <div class="col">
      <h1 class="logo" @click="goToHome()">Music Forum</h1>
    </div>
  </nav>
</template>

<script>
import SidenavButton from "./Sidenav-button";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    SidenavButton,
  },
})
export default class Nav extends Vue {
  goToHome() {
    if (this.$route.path === "/") return;
    this.$router.push("/");
  }
}
</script>

<style scoped lang="scss">
.logo:hover {
  cursor: pointer;
}
</style>
