<template>
  <div>
    <ul class="list-group">
      <Post v-for="(item, i) of postData" :key="`${item.id}+${i}`" :post="item" />
    </ul>
  </div>
</template>

<script lang="ts">
import Post from "../components/Thread/Post.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    Post,
  },
})
export default class Thread extends Vue {
  $store: any
  $route: any

  get postData() {
    return this.$store.state.posts || []
  }

  created() {
    this.$store.dispatch("fetchPostsFromId", this.$route.params.thread);
  }
}
</script>

<style scoped lang="scss">
.list-group-item {
  list-style: none;
}
</style>
