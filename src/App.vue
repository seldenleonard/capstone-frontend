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
        <router-link :to="`/users/${getUserId()}`">My Profile</router-link>
      </div>
      <div v-if="isLoggedIn()">
        <router-link to="/artworks/new">Create Artwork</router-link>
      </div>
      <div v-if="isLoggedIn()">
        <router-link to="/logout">Logout</router-link>
      </div>
      <div><router-link to="/artworks">Artworks</router-link></div>
      <div><router-link to="/colleges">Colleges</router-link></div>
      <!-- <div>
        <button @click="openUploadModal">Upload files</button>
      </div> -->
    </div>
    <router-view :key="$route.path" />
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
img {
  width: 250px;
}
</style>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  // name: "App", // MAYBE I SHOULD UNCAPITALIZE THE "A" SO IT MATCHES MY DIV ID
  // components: {},
  // data: function() {
  //   return {
  //     url: "",
  //   };
  // },
  methods: {
    // openUploadModal() {
    //   window.cloudinary
    //     .openUploadWidget(
    //       {
    //         cloud_name: "xxxcloudxxx",
    //         upload_preset: "lryaylj0",
    //       },
    //       (error, result) => {
    //         if (!error && result && result.event === "success") {
    //           console.log("Done uploading..: ", result.info);
    //           this.url = result.info.url;
    //         }
    //       }
    //     )
    //     .open();
    // },
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return parseInt(localStorage.getItem("user_id"));
    },
  },
};
</script>
