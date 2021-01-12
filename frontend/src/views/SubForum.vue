<template>
  <div class="container subforum">
    <ul class="list-group">
      <li
        v-for="(item, i) of threadData"
        :key="`${item}+${i}`"
        class="list-group-item item"
        @click="goToRoute(item)"
      >
        <div class="d-flex justify-content-between">
          <h4 class="item-title">
            {{ item.title }}
          </h4>
          <span>
            <p>
              <!--osts: 4-->
            </p>
            <!--ADD ICON-->
          </span>
        </div>
        <div>
          <p class="item-description">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class SubForum extends Vue {
  $route: any;
  $router: any;
  $store: any;

  currentRoute() {
    return this.$route.path;
  }

  goToRoute(item: any) {
    this.$router.push(`${this.currentRoute()}/${item.id}`);
  }

  created() {
    this.$store.dispatch(
      "fetchThreadsWithSubForumId",
      this.$route.params.subforum
    );
  }

  get threadData() {
    return this.$store.state.threads || [];
  }
}
</script>

<style scoped lang="scss">
.subforum {
  padding-top: 6vh;
}
.item:hover {
  background-color: lightblue;
}
</style>
