<template>
  <div>
    <form class="new-post-wrapper">
      <fieldset>
        <legend class="header">
          <h2 class="text-left">
            New Post
          </h2>
        </legend>
        <div class="form-group">
          <textarea
            class="form-control content-text"
            rows="5"
            :disabled="isGuest"
            v-model="content"
          >
          </textarea>
        </div>
        <div class="row">
          <div class="form-group col col-5 offset-7">
            <div class="row">
              <div class="col col-8" v-if="isModerator">
                <input
                  type="checkbox"
                  id="moderatorCheckbox"
                  v-model="warning"
                />
                <label for="moderatorCheckbox" class="form-check-label pl-1"
                  >Mark as warning post
                </label>
              </div>
              <div class="col col-4" :class="{ 'offset-8': !isModerator }">
                <button
                  class="btn btn-info"
                  :disabled="isGuest"
                  @click="createPost"
                >
                  <i class="material-icons align-middle">send</i>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class NewPost extends Vue {
  $emit: any;
  $store: any;
  $route: any;
  content = "";
  warning = false;

  @Prop({ type: Object }) user: any;

  get isModerator() {
    if (
      //Checks if the user is an adminstrator OR if the user is a moderator of the subforum
      this.user.roles.includes("adminstrator") ||
      (this.user.roles.includes("moderator") &&
        this.user.moderatorSubForumId.includes(
          Number(this.$route.params.subforum)
        ))
    ) {
      return true;
    }
    return false;
  }

  get isGuest() {
    if (this.user.roles.includes("guest")) {
      this.content = "Log in to join the conversation";
      return true;
    }
    return false;
  }

  createPost() {
    this.$emit("sendDataToParent", {
      content: this.content,
      warning: this.warning,
      userState: this.isGuest,
    });
  }
}
</script>

<style scoped lang="scss">
.new-post-wrapper {
  padding-top: 3vh;
  padding-bottom: 5vh;
}

.content-text {
  resize: vertical;
}
</style>
