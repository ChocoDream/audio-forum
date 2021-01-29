<template>
  <div>
    <span class="material-icons button" @click="openSidenav">menu</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class SidenavButton extends Vue {
  $store: any;
  openSidenav() {
    this.$store.commit("toggleSidenav");
  }
}
</script>

<style scoped lang="scss">
.button {
  font-size: 3.2em;
  cursor: pointer;
}
</style>
