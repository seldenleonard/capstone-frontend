<template>
  <div id="app">
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
      <router-view :key="$route.path" />
    </nav>
    <!-- /NAVIGATION -->

    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- TESTIMONIAL -->
      <section class="module-small">
        <div class="container">
          <div class="row">
            <!-- MODULE TITLE -->
            <div class="col-sm-6">
              <h2 class="module-title font-alt">Someone quote</h2>
            </div>
            <!-- /MODULE TITLE -->

            <!-- BLOCKQUOTE -->
            <div class="col-sm-6">
              <blockquote class="font-serif align-right">
                <p>
                  To string incongruities and absurdities together in a
                  wandering and sometimes purposeless way, and seem innocently
                  unaware that they are absurdities, is the basis of the
                  American art, if my position is correct.
                </p>
                <p class="font-inc font-uppercase">- Mark Twain</p>
              </blockquote>
            </div>
            <!-- /BLOCKQUOTE -->
          </div>
        </div>
      </section>
      <!-- /TESTIMONIAL -->

      <!-- ABOUT -->
      <section
        class="module p-t-0 p-b-0"
        data-background="assets/images/section-4.jpg"
      >
        <div class="container-fluid">
          <div class="row relative">
            <div class="col-sm-12 col-md-6 col-md-offset-6 col-bg">
              <h2 class="module-title font-alt">About</h2>

              <div class="module-subtitle font-inc">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa.
              </div>

              <p>
                The languages only differ in their grammar, their pronunciation
                and their most common words. Everyone realizes why a new common
                language would be desirable: one could refuse to pay expensive
                translators.
              </p>

              <p>
                To achieve this, it would be necessary to have uniform grammar,
                pronunciation and more common words. If several languages
                coalesce, the grammar of the resulting language is more simple
                and regular than that of the individual languages.
              </p>

              <ul class="social-list">
                <li>
                  <a href="#"><span class="icon-facebook"></span></a>
                </li>
                <li>
                  <a href="#"><span class="icon-twitter"></span></a>
                </li>
                <li>
                  <a href="#"><span class="icon-googleplus"></span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <!-- /ABOUT -->

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
                  007 Steet, City, USA
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
                  semantic@email.com
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
                © 2015 <a href="index.html">SEMANTIC</a>, All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <!-- /FOOTER -->
    </div>
    <!-- /WRAPPER -->

    <!-- PRE-THEME Installation Router-Links and Such -->
    <!-- <div id="nav">
      <div> 
        <button @click="openUploadModal">Upload files</button>
      </div> -->
    <!-- </div> -->
  </div>
</template>

<style></style>

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
