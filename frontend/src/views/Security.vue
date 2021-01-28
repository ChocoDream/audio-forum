<template>
  <div class="container page">
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
                  />
                </div>
                <div class="col col-6">
                  <v-select
                    multiple
                    label="title"
                    :options="subForums"
                    :reduce="(title) => title.id"
                    :value="user.subforumId"
                    @option:deselecting="testme"
                    @option:selecting="addRole(user.id, $event.id)"
                  ></v-select>
                </div>
                <div class="col col-2">
                  <div class="row">
                    <div class="col col-4"></div>
                    <div class="col col-6 offset-2 text-right">
                      <span
                        class="material-icons align-middle delete-icon"
                        @click="deleteUser(user.id)"
                        v-show="user.id !== currentUser.id"
                      >
                        delete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    {{users}}
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

  testme(data: any) {
    console.log(data);
  }

  testmore(data: any, user: any) {
    console.log(data);
    console.log(user);
  }

  get users() {
    return this.$store.state.users;
  }

  get subForums() {
    return this.$store.state.subForums;
  }

  get currentUser() {
    return this.$store.state.currentUser;
  }

  deleteUser(id: string) {
    this.$store.dispatch("deleteUser", id);
    this.$store.dispatch("fetchUsers");
  }

  created() {
    this.$store.dispatch("fetchUsers");
    this.$store.dispatch("fetchSubForums");
  }

  async addRole(userId: number, subforumId: number) {
    const body = {
      userId,
      subforumId,
    };
    await fetch("/api/roles", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>

<style scoped lang="scss">
.delete-icon {
  font-size: 1.8em;
  padding: 5%;
  &:hover {
    color: red;
    cursor: pointer;
    transition: 100ms;
  }
}

.page {
  padding-bottom: 20vh;
}
</style>
