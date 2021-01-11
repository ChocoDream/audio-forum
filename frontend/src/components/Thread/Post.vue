<template>
  <li class="post-info list-group-item">
    <p>{{post.content}}</p>
  </li>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator'
@Component
export default class Post extends Vue {
  @Prop({type: Object}) post: any
}
</script>

<style scoped lang="scss">
.post-info{
  list-style: none;
}
</style>