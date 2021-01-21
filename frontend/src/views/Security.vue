<template>
  <div class="container">
    <h2>Security Tab</h2>
    <h3 class="text-left">Users</h3>
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
                <div class="col col-4">
                  <Badges
                    v-for="(role, i) of user.roles"
                    :key="`${role}+${i}`"
                    :role="role"
                    :size="'1.3em'"
                  />
                </div>
                <div class="col col-5">
                  <v-select
                    multiple
                    label="title"
                    :options="subForums"
                  ></v-select>
                </div>
                <div class="col col-3">
                  <div class="row">
                    <div class="col col-4">
                      <button class="btn btn-warning" @click="banUser(user.id)">
                        Ban
                      </button>
                    </div>
                    <div class="col col-6 offset-2">
                      <button
                        class="btn btn-danger"
                        @click="deleteUser(user.id)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {{
        users
      }}
    </ul>
  </div>
</template>

<script lang="ts">
import Badges from "../components/Badges.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    Badges,
  },
})
export default class Security extends Vue {
  $store: any;

  get users() {
    return this.$store.state.users;
  }

  get subForums() {
    return this.$store.state.subForums;
  }

  banUser(userId: string) {
    console.log(userId);
  }

  deleteUser(userId: string) {
    console.log(userId);
  }

  created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchSubForums");
  }
}
</script>

<style scoped lang="scss"></style>
