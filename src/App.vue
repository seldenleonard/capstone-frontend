<template>
  <div id="app">
    <!-- NAVIGATION -->
    <nav
      class="navbar navbar-custom navbar-transparent navbar-fixed-top"
      role="navigation"
    >
      <div class="container">
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#custom-collapse"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand" to="/">Art U</router-link>
        </div>
        <div class="collapse navbar-collapse" id="custom-collapse">
          <!-- Router Links in Nav Bar -->
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/colleges">Colleges</router-link>
            </li>
            <li>
              <router-link to="/artworks">Artworks</router-link>
            </li>
            <li v-if="!isLoggedIn()">
              <router-link to="/signup">Signup</router-link>
            </li>
            <li v-if="!isLoggedIn()">
              <router-link to="/login">Login</router-link>
            </li>
            <li v-if="isLoggedIn()">
              <router-link :to="`/users/${getUserId()}`"
                >My Profile</router-link
              >
            </li>
            <li v-if="isLoggedIn()">
              <router-link to="/artworks/new">Create Artwork</router-link>
            </li>
            <li v-if="isLoggedIn()">
              <router-link to="/logout">Logout</router-link>
            </li>
          </ul>
          <!-- /Router Links in Nav Bar -->
        </div>
      </div>
    </nav>
    <!-- /NAVIGATION -->

    <!-- WRAPPER -->
    <div class="wrapper">
      <router-view :key="$route.path" />
      <!-- CONTACT -->
      <section class="module-small">
        <div class="container">
          <div class="row">
            <!-- CONTENT BOX -->
            <div class="col-sm-4">
              <div class="content-box">
                <div class="content-box-icon">
                  <span class="icon-map-pin"></span>
                </div>
                <div class="content-box-title font-inc">
                  007 Patron Street, Collegetown, USA
                </div>
              </div>
            </div>
            <!-- /CONTENT BOX -->

            <!-- CONTENT BOX -->
            <div class="col-sm-4">
              <div class="content-box">
                <div class="content-box-icon">
                  <span class="icon-phone"></span>
                </div>
                <div class="content-box-title font-inc">
                  +1 234 567 89 00
                </div>
              </div>
            </div>
            <!-- /CONTENT BOX -->

            <!-- CONTENT BOX -->
            <div class="col-sm-4">
              <div class="content-box">
                <div class="content-box-icon">
                  <span class="icon-envelope"></span>
                </div>
                <div class="content-box-title font-inc">
                  info@artu.com
                </div>
              </div>
            </div>
            <!-- /CONTENT BOX -->
          </div>
        </div>
      </section>
      <!-- /CONTACT -->
      <!-- FOOTER -->
      <footer class="footer">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 text-center">
              <p class="copyright font-inc m-b-0">
                © 2020 <router-link to="/colleges">Art U</router-link>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <!-- /FOOTER -->
    </div>
    <!-- /WRAPPER -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  data: function() {
    return {
      headerImagePath: "",
    };
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return parseInt(localStorage.getItem("user_id"));
    },
  },
};
</script>
