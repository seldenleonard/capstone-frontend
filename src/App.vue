<template>
  <div id="app">
    <div id="nav">
      <div><router-link to="/">Home</router-link></div>
      <div><router-link to="/about">About</router-link></div>
      <div v-if="!isLoggedIn()">
        <router-link to="/signup">Signup</router-link>
      </div>
      <div v-if="!isLoggedIn()">
        <router-link to="/login">Login</router-link>
      </div>
      <div v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
      </div>
      <div><router-link to="/artworks">Artworks</router-link></div>
      <div><router-link to="/colleges">Colleges</router-link></div>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    // getUserId: function() {
    //   return parseInt(localStorage.getItem("user_id"));
    // },
    // LOOK AT REFERENCES JENEEN GAVE ME AND DETERMINE IF I NEED TO IMPLEMENT THIS
  },
};
</script>
