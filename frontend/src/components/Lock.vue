<template>
  <span
    class="material-icons"
    v-if="state || isModerator"
    @click.stop="lockThread"
  >
    {{ state ? "lock" : "lock_open" }}
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class extends Vue {
  @Prop({ type: Number }) stateFromParent: any;
  @Prop({ type: Number }) id: any;
  $store: any;
  state = false;
  lockThread() {
    if (!this.isModerator) return;
    this.state = !this.state;
    this.$emit("lockThreadFromChild", { state: this.state, id: this.id });
  }

  get isModerator() {
    return this.$store.getters["isModerator"];
  }

  created() {
    this.state = this.stateFromParent === 1 ? true : false;
  }
}
</script>

<style scoped lang="scss"></style>
