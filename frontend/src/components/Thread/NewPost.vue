<template>
  <div>
    <form class="new-post-wrapper">
      <fieldset>
        <legend class="header">
          <h2 class="text-left">
            Reply
          </h2>
        </legend>
        <div class="form-group">
          <textarea class="form-control content-text" rows="5"></textarea>
        </div>
        <div class="row">
          <div class="form-group col col-4 offset-8">
            <span class="pr-4">
              <input type="checkbox" id="moderatorCheckbox" />
              <label for="moderatorCheckbox" class="form-check-label pl-1"
                >Mark as warning post</label
              >
            </span>
            <button class="btn btn-info " @click="sendDataToParent">
              Send <span class="material-icons align-middle">send</span>
            </button>
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

  sendDataToParent() {
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
}

.content-text {
  resize: vertical;
}
</style>
