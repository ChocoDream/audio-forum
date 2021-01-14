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
        :class="{ 'is-invalid': errorMessage }"
        pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        @change="errorMessage = ''"
        required
      />
      <label for="inputUsername">
        <h4>
          Username
        </h4>
      </label>
      <input
        type="text"
        id="inputUsername"
        class="form-control"
        :class="{ 'is-invalid': errorMessage }"
        placeholder="Enter Username"
        @change="errorMessage = ''"
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
      <p class="text-danger" v-show="errorMessage">{{ errorMessage }}</p>

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
  errorMessage = "";
  loginUser() {
    this.$router.push("/log-in");
  }

  register(e: any) {
    const user = {
      email: e.target.inputEmail.value,
      username: e.target.inputUsername.value,
      password: e.target.inputPassword.value,
    };
    this.attemptRegister(user);
  }
  async attemptRegister(user: object) {
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 201) return response.json();
        else if (response.status === 400) {
          this.errorMessage = "Email or Username already exists";
        }
      })
      .then((data) => {
        if (data) {
          //ATTEMPT LOGIN?
          this.$router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  row-gap: 4%;
  padding-bottom: 20vh;
  h2 {
    text-align: center;
  }

  .wrapper-form {
    width: 50%;
    justify-self: center;
    .text-danger {
      margin-top: 3vh;
      font-size: 16px;
    }
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
