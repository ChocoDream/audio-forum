<template>
  <span class="badge" :class="getColor()">
    <span :style="`fontSize: ${size}`">
      {{ capitalized }}
    </span>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Badges extends Vue {
  colors: any = {
    user: "badge-primary",
    moderator: "badge-info",
    adminstrator: "badge-success",
    guest: "badge-warning",
    banned: "badge-danger",
  };
  @Prop({ type: String, default: "user" }) role: any;
  @Prop({ type: String, default: "1.3em" }) size: any;

  get capitalized() {
    return this.role.replace(/^\w/, (c: string) => c.toUpperCase());
  }

  getColor(): string {
    if (this.colors[this.role] !== undefined) {
      return this.colors[this.role];
    } else {
      return "badge-secondary";
    }
  }
}
</script>

<style scoped lang="scss"></style>
