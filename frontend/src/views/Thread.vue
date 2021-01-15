<template>
  <div class="container thread">
    <button class="btn btn-info" @click="toggleModal" :disabled="isUserGuest">
      Create Post
    </button>
    <button class="btn btn-warning">Lock Thread</button>
    <button class="btn btn-danger">Delete Thread</button>
    <ul class="list-group">
      <Post
        v-for="(item, i) of postData"
        :key="`${item.id}+${i}`"
        :post="item"
      />
    </ul>
    <new-post-modal
      v-if="showModal"
      @closeModal="toggleModal"
      @sendDataToParent="makeNewPost"
    />
  </div>
</template>

<script lang="ts">
import Post from "../components/Thread/Post.vue";
import NewPostModal from "../components/Thread/NewPostModal.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    Post,
    NewPostModal,
  },
})
export default class Thread extends Vue {
  $store: any;
  $route: any;
  showModal = true;

  get postData() {
    return this.$store.state.posts || [];
  }

  get user() {
    return this.$store.state.currentUser;
  }

  get isUserGuest() {
    return this.user.roles.includes("guest");
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  async makeNewPost(data: any) {
    if (!this.user.roles.includes("user")) return; //Soft-prevent guests from posting
    const body = {
      content: data.content,
      userId: this.user.id,
      threadId: Number(this.$route.params.thread),
      isModeratorPost: data.warning,
    };
    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) return response.json();
        else if (response.status === 400) {
          console.log("Error when creating a new post");
        }
      })
      .catch((error) => console.error(error));
  }

  created() {
    this.$store.dispatch("fetchPostsWithThreadId", this.$route.params.thread);
  }
}
</script>

<style scoped lang="scss">
.thread {
  padding-top: 6vh;
}
.list-group {
  list-style: none;
}
</style>
