<template>
  <div class="colleges-show">
    <!-- HEADER -->
    <section
      class="module module-header bg-dark bg-dark-50"
      :data-background="college.image_url"
      :style="`background-image: url(${college.image_url})`"
    >
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <h1 class="module-title font-alt align-center">
              <i class="fa fa-institution"></i>
              <p></p>
              <strong>{{ college.name }}</strong>
            </h1>

            <div class="module-subtitle font-inc align-center">
              <div class="post-meta font-inc">
                <strong>{{ college.city }}, {{ college.state }}</strong>
              </div>

              <br /><br />
              <div>
                <h2 class="work-title font-alt">
                  <!-- <span class="icon-globe"></span> -->
                </h2>
              </div>
            </div>
          </div>
        </div>
        <!-- /MODULE TITLE -->
      </div>
    </section>
    <!-- /HEADER -->

    <!-- BODY -->
    <section class="module-small p-b-30">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="work-details">
              <h3 class="work-details-title font-alt">
                <!-- <strong>{{ college.name }}</strong> -->
                <i class="fa fa-institution"></i
                ><strong> {{ college.abbreviation }}</strong>
              </h3>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="work-details">
              <h3 class="work-details-title font-alt"></h3>
              <ul>
                <li class="font-inc">
                  <i class="fa fa-globe"></i>
                  <strong> Location: </strong>{{ college.city }},
                  {{ college.state }}
                </li>
                <li class="font-inc">
                  <i class="fa fa-fire"></i>
                  <strong> Abbreviation: </strong>{{ college.abbreviation }}
                </li>
                <li class="font-inc">
                  <i class="fa fa-graduation-cap"></i>

                  <strong> Student Artists: </strong> {{ college.users.length }}
                </li>
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="work-details">
              <h3 class="work-details-title font-alt"></h3>
              <ul>
                <li class="font-inc">
                  {{ college.bio }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <strong>
          <div class="divider py-1 bg-dark"><hr /></div>
        </strong>
      </div>
    </section>
    <!-- PORTFOLIO DESCRIPTION -->
    <!-- <section class="module-small">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <div
              class="work-details align-center"
              v-for="user in college.users"
            >
              <img :src="user.image_url" alt="" />
              <h3 class="work-details-title font-alt">{{ user.name }}</h3>
              <ul v-if="user.artist">
                <li class="font-inc">
                  Class of <strong>{{ user.graduation_year }}</strong>
                </li>
                <li class="font-inc">
                  Major: <strong>{{ user.major }}</strong>
                </li>
                <li v-if="user.artist && user.minor" class="font-inc">
                  Minor: <strong>{{ user.minor }}</strong>
                </li>
                <li v-if="user.artist && user.art_style" class="font-inc">
                  Style of Art: <strong>{{ user.art_style }}</strong>
                </li>
                <li v-if="user.artist && user.bio" class="font-inc">
                  Bio: <strong>{{ user.bio }}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section> -->
    <!-- /PORTFOLIO DESCRIPTION -->

    <!-- BLOG GRID -->
    <section class="module p-b-0 p-t-10">
      <div class="container">
        <div class="row multi-columns-row post-columns">
          <!-- POST ITEM -->
          <div class="col-sm-6 col-md-6 col-lg-6" v-for="user in college.users">
            <div class="post">
              <div class="post-thumbnail">
                <router-link :to="`/users/${user.id}`">
                  <img :src="user.image_url" alt=""
                /></router-link>
              </div>
              <div class="post-header">
                <h2 class="post-title font-alt">
                  <router-link :to="`/users/${user.id}`">
                    <strong>{{ user.name }}</strong></router-link
                  >
                </h2>
                <div class="post-meta font-inc">
                  Class of
                  {{ user.graduation_year }}
                  | {{ user.art_style }}
                </div>
              </div>
              <div class="post-entry">
                <p>
                  {{ user.bio }}
                </p>
              </div>
              <div class="post-more font-inc">
                <router-link :to="`/users/${user.id}`" class="more-link"
                  >View Profile</router-link
                >
              </div>
            </div>
          </div>

          <!-- /POST ITEM -->
        </div>
        <strong>
          <div class="divider py-1 bg-dark"><hr /></div>
        </strong>
      </div>
    </section>
    <!-- /BLOG GRID -->

    <!-- /BODY -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      college: {
        users: [],
      },
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`/api/colleges/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.college = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
};
</script>
