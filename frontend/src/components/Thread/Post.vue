<template>
  <li
    class="post-info list-group-item container-fluid"
    :class="{ 'list-group-item-info': post.isModeratorPost }"
  >
    <div class="row mb-2">
      <div class="col align-self-start col-3">
        <div class="row">
          <div class="col align-self-start col-2">
            <span class="material-icons" v-if="post.isModeratorPost"
              >security</span
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
      <div class="col align-self-start col-3">{{ post.username }}</div>
      <div class="col col-8">
        <p class="text-left">{{ post.content }}</p>
      </div>
      <div class="col col-1 text-right">
        <span
          class="material-icons delete-icon"
          v-if="isModerator"
          @click="deletePost(post.id)"
          >delete</span
        >
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
  @Prop({ type: Number }) index: any;
  @Prop({ type: Boolean, default: false }) isModerator: any;

  deletePost(id: any) {
    this.$emit("deletePost", id);
  }
}
</script>

<style scoped lang="scss">
.post-info {
  list-style: none;
}

.delete-icon:hover {
  cursor: pointer;
  color: red;
  transition: 100ms;
}
</style>
