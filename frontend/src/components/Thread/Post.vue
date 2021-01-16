<template>
  <li
    class="post-info list-group-item"
    :class="{ 'list-group-item-info': post.isModeratorPost }"
  >
    <div class="row mb-2">
      <div class="col align-self-start col-3">
        <div class="row">
          <div class="col align-self-start col-2">
            <span class="material-icons" v-if="post.isModeratorPost"
              >gavel</span
            >
          </div>
          <div class="col align-self-end col-10">
            <strong>{{ post.timestamp }}</strong>
          </div>
        </div>
      </div>
      <div class="col align-self-end offset-7 col-2">
        <p class="text-right">#{{ index }}</p>
      </div>
    </div>
    <div class="row">
      <div class="col align-self-start col-3">{{ user.username }}</div>
      <div class="col col-9">
        <p class="text-left">{{ post.content }}</p>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Post extends Vue {
  @Prop({ type: Object }) post: any;
  @Prop({ type: Number }) index: number;

  user = { username: "DEFAULT" };
  async mounted() {
    await fetch(`/api/users/${this.post.userId}`)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => (this.user = data));
  }
}
</script>

<style scoped lang="scss">
.post-info {
  list-style: none;
}
</style>
