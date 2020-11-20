<template>
  <div class="artworks-show">
    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- HOME -->
      <section
        class="module module-header bg-dark bg-dark-50"
        data-background="/assets/images/section-7.jpg"
        style="background-image: url(/assets/images/section-7.jpg);"
      >
        <div class="container">
          <!-- MODULE TITLE -->
          <div class="row">
            <div class="hs-caption container">
              <div class="caption-content">
                <div class="hs-title-size-3 font-alt m-b-20">
                  <i class="fa fa-paint-brush"></i>
                  <p></p>
                  {{ artwork.title }}
                </div>
                <div class="hs-title-size-1 font-inc">
                  <div>
                    By
                    <router-link :to="`/users/${artwork.user.id}`">{{
                      artwork.user.name
                    }}</router-link>
                    | {{ artwork.year }} | {{ artwork.medium }}<br /><br />
                    <strong>{{ artwork.upvotes_count }} Upvotes </strong
                    ><i class="fa fa-child"></i> <br /><br /><br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /MODULE TITLE -->
        </div>
      </section>

      <!-- HOME -->
      <!-- <section
      id="home"
      class="module-hero module-parallax module-fade module-full-height bg-dark-50"
      data-background="assets/images/section-1.jpg"
    >
      <div class="hs-caption container">
        <div class="caption-content">
          <div class="hs-title-size-3 font-alt m-b-20">
            {{ artwork.title }}
          </div>
          <div class="hs-title-size-1 font-inc">
            <div>
              By
              <router-link :to="`/users/${artwork.user.id}`">{{
                artwork.user.name
              }}</router-link>
              | {{ artwork.year }} | {{ artwork.medium }}<br /><br />
              <strong>{{ artwork.upvotes_count }} Upvotes</strong>
            </div>
          </div>
        </div>
      </div>
    </section> -->
      <!-- /HOME -->
      <!-- WRAPPER -->
      <!-- <div class="wrapper"> -->

      <!-- PORTFOLIO DESCRIPTION -->
      <section class="module-small">
        <div class="container">
          <div class="row">
            <div class="col-sm-6">
              <div class="work-details">
                <h3 class="work-details-title font-alt">
                  {{ artwork.title }}
                  <router-link
                    v-if="artwork.user.id === $parent.getUserId()"
                    :to="`/artworks/${artwork.id}/edit`"
                  >
                    <i class="fa fa-edit"></i>
                  </router-link>
                </h3>
                <ul>
                  <li class="font-inc">
                    <strong>Artist: </strong>
                    <router-link :to="`/users/${artwork.user.id}`">
                      {{ artwork.user.name }}
                    </router-link>
                  </li>
                  <li class="font-inc">
                    <strong>College: </strong
                    ><router-link :to="`/colleges/${artwork.college.id}`">
                      {{ artwork.college.name }}
                    </router-link>
                  </li>
                  <li class="font-inc">
                    <strong>Date: </strong>{{ artwork.year }}
                  </li>
                  <li class="font-inc">
                    <strong>Medium: </strong>{{ artwork.medium }}
                  </li>
                  <li v-if="artwork.dimensions" class="font-inc">
                    <strong>Dimensions: </strong>{{ artwork.dimensions }}
                  </li>
                  <!-- <br /> -->
                </ul>
              </div>
            </div>
            <div class="work-details">
              <div class="col-sm-6">
                <!-- <br /><br /><br /> -->
                <ul>
                  <li>
                    <button
                      v-if="artwork.upvote"
                      v-on:click="destroyUpvote()"
                      type="submit"
                      class="btn btn-d btn-round"
                    >
                      <i class="fa fa-child"></i> Remove Upvote
                    </button>
                    <button
                      v-else
                      v-on:click="createUpvote()"
                      type="submit"
                      class="btn btn-border-d btn-round"
                    >
                      <i class="fa fa-child"></i> Upvote
                    </button>
                  </li>
                  <li v-if="artwork.description" class="font-inc">
                    <strong>Description: </strong>{{ artwork.description }}
                  </li>
                  <li v-if="artwork.price" class="font-inc">
                    <strong>Price: </strong>${{ artwork.price }}
                  </li>
                  <li v-else class="font-inc"><strong>Price: </strong>N/A</li>
                  <li class="font-inc">
                    <strong>Inquiries: </strong>{{ artwork.user.email }}
                  </li>
                  <li class="font-inc">
                    <strong>Posted: </strong>
                    {{ relativeDate(artwork.created_at) }}
                  </li>
                  <li class="font-inc">
                    <strong>Upvotes: </strong>{{ artwork.upvotes_count }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- /PORTFOLIO DESCRIPTION -->

      <!-- PORTFOLIO CONTENT -->
      <section class="module p-t-0 p-b-0">
        <div class="container">
          <div class="row">
            <div v-for="image in artwork.images" class="col-sm-12 text-center">
              <p><img :src="image.url" alt="" /></p>
            </div>
          </div>
          <!-- .row -->
        </div>
      </section>
      <!-- /PORTFOLIO CONTENT -->

      <!-- PAGINATION -->
      <section class="module-small p-t-50">
        <div class="container">
          <div class="pagination font-inc text-uppercase">
            <a href="#"><i class="fa fa-angle-left"></i> Prev</a>
            <router-link :to="`/users/${artwork.user.id}`"
              ><button>Artist Profile</button></router-link
            >
            <a href="#">Next <i class="fa fa-angle-right"></i></a>
          </div>
        </div>
      </section>
      <!-- /PAGINATION -->

      <!-- DIVIDER -->
      <hr class="divider-w" />
      <!-- /DIVIDER -->
    </div>
    <!-- /WRAPPER -->
    <!-- XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX -->
    <!-- MY OLD CODE -->
    <!-- <div v-for="image in artwork.images">
      <img :src="image.url" alt="" />
    </div> -->
    <div>
      <!-- <h2>Title: {{ artwork.title }}</h2>
      <p>Artist: {{ artwork.user.name }}</p>
      <p>College: {{ artwork.college.name }}</p>
      <p>Date: {{ artwork.year }}</p>
      <p>Medium: {{ artwork.medium }}</p> -->
      <!-- <p v-if="artwork.dimensions">Dimensions: {{ artwork.dimensions }}</p>
      <p v-if="artwork.description">Description: {{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p> -->
      <!-- <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5> -->
      <!-- <router-link
        v-if="artwork.user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link> -->
      <!-- <router-link :to="`/users/${artwork.user.id}`"
        ><button>View Artist</button></router-link
      > -->
    </div>
    <!-- <button v-if="artwork.upvote" v-on:click="destroyUpvote()">
      Destroy Upvote
    </button>
    <button v-else v-on:click="createUpvote()">Upvote</button> -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      artwork: {
        user: {},
        college: {},
        // These user and college objects are unnecessary, but by preloading them here, I avoid the error that pops up when I call artwork.user.name and artwork.college.name, because now these objects are preloaded before the request returns that data.
      },
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`api/artworks/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.artwork = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    createUpvote: function() {
      let params = {
        artwork_id: this.artwork.id,
      };
      axios
        .post("/api/upvotes", params)
        .then((response) => {
          this.artwork.upvote = true;
          this.artwork.upvotes_count++;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUpvote: function() {
      axios
        .delete(`/api/upvotes/${this.artwork.id}`)
        .then((response) => {
          this.artwork.upvote = false;
          this.artwork.upvotes_count--;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
