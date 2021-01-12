<template>
  <div>
    <button @click="openSidenav">
      Open
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class SidenavButton extends Vue {
  $store: any
  openSidenav(){
    this.$store.commit('toggleSidenav')
  }
}
</script>

<style scoped lang="scss"></style>
