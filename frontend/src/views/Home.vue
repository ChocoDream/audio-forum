<template>
  <div class="home container">
    <p> {{userState() ? 'Log out' : 'Log In'}} </p>
    <p>Register</p>
    <ul class="list-group">
      <li
        v-for="(d, i) of data"
        :key="`${d}+${i}`"
        class="list-group-item item"
        @click="onRouteClick(d.route)"
      >
        <h2>
          {{ d.name }}
        </h2>
        <h4>
          Description of some sort
        </h4>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  data = [
    {
      name: "Rock",
      route: "/rock",
    },
    {
      name: "Alternative indle",
      route: "/indle",
    },
    {
      name: "Synthwave",
      route: "/synthwave",
    },
  ];

  userState() {
    return this.$store.state.isLoggedIn;
  }

  onRouteClick(route) {
    this.$router.push(`/forum${route}`);
  }
}
</script>

<style lang="scss" scoped>
.item:hover {
  background-color: lightblue;
}
</style>
