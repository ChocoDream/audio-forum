<template>
  <div class="shadow-overlay" @click.self="closeModal">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Create New Thread</h5>
          <button class="close" @click="closeModal" aria-label="Close">
            <i class="material-icons align-middle">clear</i>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="threadNameInput">Thread name</label>
              <input
                type="text"
                class="form-control"
                id="threadNameInput"
                aria-describedby="NameOfThread"
                placeholder="New Thread..."
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" @click="closeModal">Cancel</button>
          <button class="btn btn-primary" @click="createThread">
            Create Thread
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class NewThread extends Vue {
  name = "";

  closeModal() {
    this.$emit("closeModal");
  }

  createThread() {
    this.$emit("sendDataToParent", name);
  }
}
</script>

<style scoped lang="scss">
.shadow-overlay {
  background-color: rgba(120, 120, 120, 0.33);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 20vw;
}
</style>
