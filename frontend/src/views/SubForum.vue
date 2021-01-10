<template>
  <div class="container">
    <p>route: {{ $route.params.subforum }}</p>
    <ul class="list-group">
      <li
        v-for="(d, i) of data"
        :key="`${d}+${i}`"
        class="list-group-item item"
        @click="goToRoute()"
      >
        <div class="d-flex justify-content-between">
          <h4>
            {{ d }}
          </h4>
          <span>
            <p>
              Posts: 4
            </p>
            <!--ADD ICON-->
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class SubForum extends Vue {
  data = ["test", "test2", "test3"];

  currentRoute() {
    return this.$route.path;
  }
  goToRoute(){
    this.$router.push(`${this.currentRoute()}/1`)
  }
}
</script>

<style scoped lang="scss">
.item:hover {
  background-color: lightblue;
}
</style>
