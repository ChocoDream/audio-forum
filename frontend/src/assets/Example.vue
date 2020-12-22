<template>
  <div>
    <h1>THIS IS JUST AN EXAMPLE</h1>
    <p>{{ message }}</p>
    <button @click="addCount">Add count {{count}} </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Example extends Vue {
  @Prop({type: String}) message;

  count: number = 0;
  addCount() {
    this.count++;
  }
}
</script>

<style></style>
