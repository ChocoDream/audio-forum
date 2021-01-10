<template>
  <div class="wrapper">
    <h2>
      Register
    </h2>
    <form class="wrapper-form" @submit.prevent="register">
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
      <label for="inputUsername">
        <h4>
          Username
        </h4>
      </label>
      <input
        type="email"
        id="inputUsername"
        class="form-control"
        placeholder="Enter Username"
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
        Register Account
      </button>
      <div>
        <a @click="loginUser()" class="login-user">
          Already a member?
        </a>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Register extends Vue {
  $router: any;
  loginUser() {
    this.$router.push("/log-in");
  }

  register(e: any) {
    const user = {
      email: e.target.inputEmail.value,
      username: e.target.usernameEmail.value,
      password: e.target.inputPassword.value,
    };
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

    .login-user:hover {
      cursor: pointer;
    }
  }
}
</style>
