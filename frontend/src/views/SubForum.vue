<template>
  <div class="container subforum">
    <button class="btn btn-primary" v-if="!isGuest" @click="toggleModal">
      New Thread
    </button>
    <ul class="list-group">
      <li
        v-for="(item, i) of threadData"
        :key="`${item}+${i}`"
        class="list-group-item item"
        @click="goToRoute(item.id)"
      >
        <div class="d-flex justify-content-between">
          <h4 class="item-title">
            {{ item.title }}
          </h4>
          <span>
            <!--ADD ICON-->
          </span>
        </div>
      </li>
    </ul>

    <new-thread
      v-if="modalState"
      @sendDataToParent="makeNewThread"
      @closeModal="toggleModal"
    />
  </div>
</template>

<script lang="ts">
import NewThread from "../components/Thread/NewThread.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    NewThread,
  },
})
export default class SubForum extends Vue {
  $route: any;
  $router: any;
  $store: any;
  modalState = false;

  toggleModal() {
    this.modalState = !this.modalState;
  }

  currentRoute() {
    return this.$route.path;
  }

  goToRoute(id: any) {
    this.$router.push(`${this.currentRoute()}/${id}`);
  }

  async makeNewThread(data: any) {
    if (!this.user.roles.includes("user")) return; //Last frontend protection to prevent guests from posting
    const body = {
      content: data,
      subForumId: this.$route.params.subforum,
    };
    await fetch("/api/threads", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status === 201) return response.json();
        else if (response.status === 400) {
          console.log("Error when creating a new thread");
        }
      })
      .then((data) => {
        const newId = data.lastInsertRowid;
        this.goToRoute(newId);
      })
      .catch((error) => console.error(error));
  }

  created() {
    this.$store.dispatch(
      "fetchThreadsWithSubForumId",
      this.$route.params.subforum
    );
  }

  get user() {
    return this.$store.state.currentUser;
  }

  get isGuest() {
    return this.user.roles.includes("guest");
  }

  get threadData() {
    return this.$store.state.threads || [];
  }
}
</script>

<style scoped lang="scss">
.subforum {
  padding-top: 6vh;
}
.item:hover {
  background-color: lightblue;
}
</style>
