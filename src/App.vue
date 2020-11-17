<template>
  <div id="app">
    <!-- PRELOADER -->
    <div class="page-loader">
      <div class="loader">Loading...</div>
    </div>
    <!-- /PRELOADER -->

    <!-- NAVIGATION -->
    <nav
      class="navbar navbar-custom navbar-black navbar-fixed-top"
      role="navigation"
    >
      <!-- Note: the navbar was originally "transparent" instead of black but i changed it cause I couldnt see it, but change it back when I put more of the theme in -->
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
          <h1>
            <router-link to="/artworks" class="navbar-brand">Art U</router-link>
          </h1>
        </div>
        <div class="collapse navbar-collapse" id="custom-collapse">
          <!-- Router Links in Nav Bar -->
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/">Home</router-link>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
            <li>
              <router-link v-if="!isLoggedIn()" to="/signup"
                >Signup</router-link
              >
            </li>
            <li>
              <router-link v-if="!isLoggedIn()" to="/login">Login</router-link>
            </li>
            <li>
              <router-link v-if="isLoggedIn()" :to="`/users/${getUserId()}`"
                >My Profile</router-link
              >
            </li>
            <li>
              <router-link v-if="isLoggedIn()" to="/artworks/new"
                >Create Artwork</router-link
              >
            </li>
            <li>
              <router-link v-if="isLoggedIn()" to="/logout">Logout</router-link>
            </li>
            <li>
              <router-link to="/artworks">Artworks</router-link>
            </li>
            <li>
              <router-link to="/colleges">Colleges</router-link>
            </li>

            <!-- Below is the "Features dropdown menu from the original theme, I am keeping it so I can use the dropdown for my own purposes" -->
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                >Features</a
              >
              <ul class="dropdown-menu" role="menu">
                <li>
                  <a href="comp-alerts-wells.html"
                    ><i class="fa fa-bolt"></i> Alerts and Wells</a
                  >
                </li>
                <li>
                  <a href="comp-buttons.html"
                    ><i class="fa fa-link fa-sm"></i> Buttons</a
                  >
                </li>
                <li>
                  <a href="comp-collapses-tabs.html"
                    ><i class="fa fa-tasks"></i> Collapses &amp; Tabs</a
                  >
                </li>
                <li>
                  <a href="comp-content-box.html"
                    ><i class="fa fa-list-alt"></i> Contents Box</a
                  >
                </li>
                <li>
                  <a href="comp-forms.html"
                    ><i class="fa fa-check-square-o"></i> Forms</a
                  >
                </li>
                <li>
                  <a href="comp-icons.html"><i class="fa fa-star"></i> Icons</a>
                </li>
                <li>
                  <a href="comp-progress-bars.html"
                    ><i class="fa fa-server"></i> Progress Bars</a
                  >
                </li>
                <li>
                  <a href="comp-typography.html"
                    ><i class="fa fa-font"></i> Typography</a
                  >
                </li>
              </ul>
            </li>

            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- /NAVIGATION -->

    <!-- PRE-THEME Installation Router-Links and Such -->
    <!-- <div id="nav">
      <div> 
        <button @click="openUploadModal">Upload files</button>
      </div> -->
    <!-- </div> -->
    <!-- FOOTER -->
    <footer class="footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <p class="copyright font-inc m-b-0">
              © 2015 <a href="index.html">SEMANTIC</a>, All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    <!-- /FOOTER -->
    <!-- Scroll-up -->
    <div class="scroll-up">
      <a href="#totop"><i class="fa fa-angle-double-up"></i></a>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

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
