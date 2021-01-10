<template>
  <nav class="row">
    <div class="col">
      <h1 class="logo" @click="goToHome()">Music Forum</h1>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
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
