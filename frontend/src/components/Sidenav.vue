<template>
  <div class="sidenav" :style="sidenavWidth">
    <button
      @click="closeNavbar"
      type="button"
      class="nav-close-button"
      aria-label="Close"
    >
      X
    </button>
    <p v-for="(item, i) of sideItems" :key="`${item.name}+${i}`">
      <a @click="goToRoute(item.route)" class="nav-link"> {{ item.name }} </a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({})
export default class Sidenav extends Vue {
  default_sideitems = [
    {
      name: "My Profile",
      premission: "user",
      route: "/user",
    },
    {
      name: "Home",
      premission: "all",
      route: "/",
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
  $route: any;
  $router: any;
  $store: any;

  get sideItems() {
    return this.default_sideitems.filter(
      (item) => item.premission === "guest" || item.premission === "all"
    ); //Works for now, filter sideItems depending on premission
  }

  get sidenavState() {
    return this.$store.state.sidenavState;
  }

  get sidenavWidth() {
    return {
      width: this.sidenavState ? "18vw" : "0",
    };
  }

  goToRoute(route: string): void {
    this.$store.commit("toggleSidenav");
    if (this.$route.path === route) return;
    this.$router.push(route);
  }

  closeNavbar() {
    this.$store.commit("toggleSidenav");
  }
}
</script>

<style scoped lang="scss">
.sidenav {
  height: 100%; /* 100% Full-height */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: #111; /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 5vh;
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */

  .nav-close-button {
    background-color: transparent;
    color: #818181;
    border: none;
    text-decoration: none;
  }

  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }
  a:hover {
    background-color: #f1f1f1;
  }
  .nav-link:hover {
    cursor: pointer;
  }
}
</style>
