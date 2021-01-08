<template>
  <div class="users-show">
    <!-- HEADER -->
    <section
      class="module module-header bg-dark bg-dark-50"
      :data-background="user.image_url"
      :style="`background-image: url(${user.image_url})`"
    >
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <h1 class="module-title font-alt align-center">
              <i v-if="user.artist" class="fa fa-graduation-cap"></i>
              <p></p>
              {{ user.name }}
            </h1>
            <div
              class="module-subtitle font-inc align-center"
              v-if="user.artist"
            >
              <div class="post-meta font-inc">
                {{ user.college_abbreviation }} | {{ user.art_style }} |
                {{ user.artworks.length }} Artworks
              </div>
            </div>
          </div>
        </div>
        <!-- /MODULE TITLE -->
      </div>
    </section>
    <!-- /HEADER -->

    <!-- PORTFOLIO DESCRIPTION -->
    <section class="module-small p-b-30">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="work-details">
              <h3
                class="work-details-title font-alt"
                v-if="user.artist && user.id === $parent.getUserId()"
              >
                <strong>Artist Profile </strong>
                <router-link :to="`/users/${user.id}/edit`">
                  <i class="fa fa-edit"></i>
                </router-link>
              </h3>
              <h3 class="work-details-title font-alt" v-else-if="user.artist">
                <strong>Artist Profile </strong>
              </h3>
              <h3 class="work-details-title font-alt" v-else>
                <strong>User Profile </strong>
                <router-link :to="`/users/${user.id}/edit`">
                  <i class="fa fa-edit"></i>
                </router-link>
              </h3>
              <ul>
                <li v-if="user.artist && user.college_id" class="font-inc">
                  <router-link :to="`/colleges/${user.college_id}`">
                    <strong>{{ user.college_name }}</strong>
                  </router-link>
                </li>
                <li v-if="user.artist && user.graduation_year" class="font-inc">
                  <strong>Class of {{ user.graduation_year }}</strong>
                </li>
                <li v-if="user.artist && user.major" class="font-inc">
                  <strong>Major: </strong>{{ user.major }}
                </li>
                <li v-if="user.artist && user.minor" class="font-inc">
                  <strong>Minor: </strong>{{ user.minor }}
                </li>
                <li v-if="user.artist && user.art_style" class="font-inc">
                  <strong>Style of Art: </strong>{{ user.art_style }}
                </li>
                <li v-if="user.artist && user.bio" class="font-inc">
                  <strong>Bio: </strong>{{ user.bio }}
                </li>
                <li v-if="user.artist && user.email" class="font-inc">
                  <strong>Contact: </strong>{{ user.email }}
                </li>
                <li v-else>
                  Name: {{ user.name }}<br /><br />
                  Email: {{ user.email }}
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="col-sm-12">
              <h3 class="work-details-title font-alt align-right">---</h3>
              <blockquote v-if="!user.artist" class="font-serif align-right">
                <p>
                  “An artist is not paid for his labor but for his vision.”
                </p>
                <p class="font-inc font-uppercase">- James McNeill Whistler</p>
              </blockquote>
              <blockquote v-if="user.artist" class="font-serif align-right">
                <p>
                  “I don’t listen to what art critics say. I don’t know
                  <br />anybody who needs a critic to find out what art is.”
                </p>
                <p class="font-inc font-uppercase">- Jean-Michel Basquiat</p>
              </blockquote>
            </div>
          </div>
        </div>
        <strong>
          <div class="divider py-1 bg-dark"><hr /></div>
        </strong>
      </div>
    </section>
    <!-- /PORTFOLIO DESCRIPTION -->

    <!-- BLOG GRID -->
    <section class="module p-b-0 p-t-10">
      <div class="container">
        <div class="row multi-columns-row post-columns">
          <!-- POST ITEM -->
          <div
            class="col-sm-6 col-md-6 col-lg-6"
            v-for="artwork in user.artworks"
          >
            <div class="post">
              <div class="post-thumbnail">
                <router-link :to="`/artworks/${artwork.id}`">
                  <img :src="artwork.images[0].url" alt="" />
                </router-link>
              </div>
              <div class="post-header">
                <h2 class="post-title font-alt">
                  <router-link :to="`/artworks/${artwork.id}`">
                    <strong>{{ artwork.title }} </strong></router-link
                  >
                  <router-link
                    v-if="user.id === $parent.getUserId()"
                    :to="`/artworks/${artwork.id}/edit`"
                  >
                    <i class="fa fa-edit"></i>
                  </router-link>
                </h2>
                <div class="post-meta font-inc" v-if="artwork.dimensions">
                  {{ artwork.year }}
                  | {{ artwork.medium }} | {{ artwork.dimensions }}
                </div>
                <div class="post-meta font-inc" v-else>
                  {{ artwork.year }}
                  | {{ artwork.medium }}
                </div>
              </div>
              <div class="post-entry">
                <p>{{ artwork.description }} <br /></p>
                <p>
                  <strong>{{ artwork.upvotes_count }} Upvotes </strong>
                  <i class="fa fa-child"></i>
                </p>
              </div>
              <div class="post-more font-inc">
                <router-link :to="`/artworks/${artwork.id}`" class="more-link"
                  >View Artwork</router-link
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
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    this.$parent.headerImagePath = "college-girl.jpeg";
    axios
      .get(`/api/users/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
