<template>
  <div>
    <p>Hello from Thread</p>
    <p> {{$route.params}} </p>
  </div>
</template>

<script>
import Vue from 'vue'
import {Component} from 'vue-property-decorator'
@Component
export default class Thread extends Vue{
  
}
</script>

<style scoped lang="scss">

</style>