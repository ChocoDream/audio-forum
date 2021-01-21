<template>
  <span class="material-icons" @click.stop="lockThread">
    {{ state ? "lock" : "lock_open" }}
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop({ type: Boolean }) stateFromParent: any;
  state = false;
  lockThread() {
    this.state = !this.state;
  }

  created() {
    this.state = this.stateFromParent;
  }
}
</script>

<style scoped lang="scss"></style>
