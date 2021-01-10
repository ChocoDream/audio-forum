<template>
  <div class="home container">
    <p> {{userState() ? 'Log out' : 'Log In'}} </p>
    <p>Register</p>
    <ul class="list-group">
      <li
        v-for="(d, i) of data"
        :key="`${d}+${i}`"
        class="list-group-item item"
        @click="goToRoute(d.route)"
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
      route: "/1",
    },
    {
      name: "Alternative indle",
      route: "/2",
    },
    {
      name: "Synthwave",
      route: "/3",
    },
  ];

  userState() {
    return this.$store.state.isLoggedIn;
  }

  goToRoute(route) {
    this.$router.push(`/forum${route}`);
  }
}
</script>

<style lang="scss" scoped>
.item:hover {
  background-color: lightblue;
}
</style>
