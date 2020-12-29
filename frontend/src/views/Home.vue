<template>
  <div class="home">
    <div v-for="(subforumData, i) of rawData" :key="`${subforumData.name}${i}`">
      <button @click="onRouteClick(subforumData.route)">
        {{ subforumData.name }}
      </button>
    </div>
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
  rawData = [
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

  onRouteClick(route) {
    console.log(route);
    this.$router.push(`/forum${route}`);
  }
}
</script>

<style lang="scss" scoped></style>
