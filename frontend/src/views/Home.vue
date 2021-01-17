<template>
  <div class="home container">
    <ul class="list-group">
      <li
        v-for="(item, i) of subForumData"
        :key="`${item}+${i}`"
        class="list-group-item item"
        @click="goToRoute(item.id)"
      >
        <h2>
          {{ item.title }}
        </h2>
        <h4>
          {{ item.description }}
        </h4>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src

import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {
  },
})
export default class Home extends Vue {
  $store: any;
  $router: any;
  get subForumData() {
    return this.$store.state.subForums;
  }

  created() {
    this.$store.dispatch("fetchSubForums");
  }

  goToRoute(route: string) {
    this.$router.push(`/forum/${route}`);
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding-top: 6vh;
}
.item:hover {
  background-color: lightblue;
}
</style>
