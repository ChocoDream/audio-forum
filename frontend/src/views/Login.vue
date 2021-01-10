<template>
  <div class="wrapper">
    <h2>
      Log In
    </h2>
    <form class="wrapper-form" @submit.prevent="login">
      <label for="inputEmail">
        <h4>
          Email
        </h4>
      </label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Enter email"
        pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        required
      />
      <label for="inputPassword">
        <h4>
          Password
        </h4>
      </label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Enter password"
        required
      />
      <button class="btn btn-primary" type="submit" value="submit">
        Log in
      </button>
      <div>
        <a @click="registerUser()" class="register-user">
          Not a member?
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class LoginModal extends Vue {
  $router: any;
  registerUser() {
    this.$router.push("/register");
  }

  login(e: any) {
    const user = {email: e.target.inputEmail.value, password: e.target.inputPassword.value}

  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  row-gap: 4%;

  h2 {
    text-align: center;
  }

  .wrapper-form {
    width: 50%;
    justify-self: center;
    .btn {
      margin-top: 10vh;
      width: 80%;
    }

    .register-user:hover {
      cursor: pointer;
    }
  }
}
</style>
