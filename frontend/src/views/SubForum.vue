<template>
  <div class="container subforum">
    <button class="btn btn-primary" @click="toggleModal">
      New Thread
    </button>

    <ul class="list-group">
      <li
        v-for="(item, i) of threadData"
        :key="`${item}+${i}`"
        class="list-group-item item"
        @click="goToRoute(item)"
      >
        <div class="d-flex justify-content-between">
          <h4 class="item-title">
            {{ item.title }}
          </h4>
          <span>
            <p>
              <!--osts: 4-->
            </p>
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

  goToRoute(item: any) {
    this.$router.push(`${this.currentRoute()}/${item.id}`);
  }

  makeNewThread(data: any) {
    return;
  }

  created() {
    this.$store.dispatch(
      "fetchThreadsWithSubForumId",
      this.$route.params.subforum
    );
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
