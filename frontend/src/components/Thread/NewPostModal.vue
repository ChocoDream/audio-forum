<template>
  <div class="bid-modal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Create Post</h4>
          <span class="material-icons">close</span>
        </div>
        <div class="modal-body">
          <textarea class="form-control" v-model="content"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary">Cancel</button>
          <button class="btn btn-info" @click="sendDataToParent">
            Send <span class="material-icons align-middle">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class NewPost extends Vue {
  $emit: any;
  $store: any;
  content = "";
  warning = false;
  closeModal() {
    this.$emit("closeModal");
  }
/*   get isModerator() {
    let state = false;
    if(this.user.roles.includes('moderator') || this.user)
  } */

  get user() {
    return this.$store.state.currentUser;
  }
  sendDataToParent() {
    this.$emit("sendDataToParent", {
      content: this.content,
      warning: this.warning,
    });
  }
}
</script>

<style scoped lang="scss"></style>
