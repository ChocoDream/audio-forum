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
            :disabled="isGuest || locked"
            v-model="content"
            required
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
                  :disabled="isGuest || locked"
                />
                <label for="moderatorCheckbox" class="form-check-label pl-1"
                  >Mark as warning post
                </label>
              </div>
              <div class="col col-4 " :class="{ 'offset-8': !isModerator }">
                <button
                  class="btn btn-info float-right"
                  :disabled="isGuest || locked"
                  @click="createPost"
                  type="submit"
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
  @Prop({ type: Number, default: 1 }) isLocked: any;

  get isModerator() {
    return this.$store.getters["isModerator"];
  }

  get isGuest() {
    if (this.user.roles.includes("guest")) {
      this.content = "Log in to join the conversation";
      return true;
    }
    this.content = "";
    return false;
  }

  get locked() {
    return Number(this.isLocked) === 1 ? true : false;
  }

  createPost() {
    this.$emit("sendDataToParent", {
      content: this.content,
      warning: this.warning,
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
