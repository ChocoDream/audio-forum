<template>
  <div>
    <p v-for="(item, i) of sideitems" :key="`${item.name}+${i}`">
      <a @click="goToRoute(item.route)"> {{item.name}} </a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class Sidenav extends Vue {
  sideitems = [
    {
      name: "My Profile",
      premission: "user",
      route: "/user",
    },
    {
      name: "Log in",
      premission: "guest",
      route: "/log-in",
    },
    {
      name: "Register",
      premission: "guest",
      route: "/register",
    },
    {
      name: "Log out",
      premission: "user",
      route: "/log-out",
    },
  ];
}
</script>

<style></style>
