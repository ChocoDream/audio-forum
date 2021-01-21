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
        <div class="row">
          <div class="col col-5">
            <div class="row">
              <div class="col col-1">
                <lock :stateFromParent="false" />
              </div>
              <div class="col col-11">
                <h4 class="item-title text-left">
                  {{ item.title }}
                </h4>
              </div>
            </div>
          </div>
          <div class="col col-7">
            <div class="row">
              <div class="col offset-10 col-2">
                <span>2222</span>
                <span class="pl-1 material-icons align-middle">message</span>
              </div>
            </div>
          </div>
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
import Lock from "../components/Lock.vue";

import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component({
  components: {
    NewThread,
    Lock,
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

  lockThread(id: any) {
    console.log("hello");
    return "";
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

.lock-icon-btn {
  cursor: pointer;
  color: lightgray;
  &:hover {
    color: red;
  }
  .active {
    color: yellow;
  }
}
</style>
