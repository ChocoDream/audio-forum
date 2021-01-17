<template>
  <div class="container">
    <h2>Users</h2>
    <ul class="list-group">
      <li
        class="list-group-item"
        v-for="(user, i) of users"
        :key="`${user.username}+${i}`"
      >
        <div class="container-fluid">
          <div class="row">
            <div class="col col-3">
              <div class="row">
                <div class="col col-12 text-left">
                  {{ user.username }} #{{ user.id }}
                </div>
                <div class="col col-12 text-left">{{ user.email }}</div>
              </div>
            </div>
            <div class="col offset-1 col-8">
              <div class="row">
                <div class="col col-3">
                  <button class="btn btn-primary"></button>
                </div>
                <div class="col col-3">
                  <button class="btn btn-primary"></button>
                </div>
                <div class="col col-3">
                  <button class="btn btn-primary"></button>
                </div>
                <div class="col col-2 offset-1">
                  <button class="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {{ user }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Security extends Vue {
  $store: any;
  get users() {
    return this.$store.state.users;
  }

  created() {
    this.$store.dispatch("fetchUsers");
  }
}
</script>

<style scoped lang="scss"></style>
