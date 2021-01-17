<template>
  <div>
    <h2>ID: {{ user.id }}</h2>
    <h2>Username: {{ user.username }}</h2>
    <h2>Email: {{ user.email }}</h2>
    <h2>Roles: {{ roles }}</h2>
    <h2 v-if="user.roles.includes('moderator')">
      Moderator over subforums: {{ subforumNames }}
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Profile extends Vue {
  $store: any;
  get user() {
    return this.$store.state.currentUser;
  }

  get roles() {
    return this.user.roles.join(", ");
  }

  get subforumNames() {
    if (
      !(
        this.user.roles.includes("moderator") ||
        this.user.roles.includes("adminstrator")
      )
    )
      return "";
    if (this.user.roles.includes("adminstrator")) {
      return "Every subforum";
    } else {
      return this.user.moderatorSubForumId.join(", ");
    }
  }
}
</script>

<style scoped lang="scss"></style>
