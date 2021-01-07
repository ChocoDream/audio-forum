<template>
  <nav class="row">
    <div class="col">
      <h1 class="logo" @click="goToMain()">Music Forum</h1>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";
export default class Nav extends Vue {
  goToMain() {
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
