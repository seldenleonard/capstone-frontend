<template>
  <!-- NOTE: BECAUSE OF THE WAY I HAVE THIS VUE SET UP, IF AN A USER WHO IS AN ARTIST DOES NOT HAVE AN ARTWORK, THEIR USER SHOW VUE WILL BREAK (BECAUSE THE IMAGES ARE GETTING CALLED AS .URL, SO IF THEY DONT EXIST, THEY CANT BE CALLED)-->
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

    <!-- PORTFOLIO CONTENT (PROFILE IMAGE) -->
    <!-- <section class="module p-t-0 p-b-0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <p class="text-center">
              <img v-if="user.artist" :src="user.image_url" alt="" />
            </p>
          </div>
        </div>
      </div>
    </section> -->
    <!-- /PORTFOLIO CONTENT (PROFILE IMAGE) -->

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
                  <!-- CANNOT FIGURE OUT HOW TO GET ONE IMAGE FOR EACH ARTWORK TO LOAD -->
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

    <!-- MY OLD CODE -->
    <!-- <img v-if="user.artist" :src="user.image_url" alt="" />
    <h2>{{ user.name }}</h2>
    <router-link :to="`/colleges/${user.college_id}`">
      <p v-if="user.artist && user.college">{{ user.college_name }}</p>
    </router-link>
    <p v-if="user.artist && user.graduation_year">
      Class of {{ user.graduation_year }}
    </p>
    <p v-if="user.artist && user.major">Major: {{ user.major }}</p>
    <p v-if="user.artist && user.minor">Minor: {{ user.minor }}</p>
    <p v-if="user.artist && user.art_style">
      Style of Art: {{ user.art_style }}
    </p>
    <p v-if="user.artist && user.bio">Bio: {{ user.bio }}</p>
    <p v-if="user.artist">Contact: {{ user.email }}</p>
    <p v-else>Email: {{ user.email }}</p>
    <router-link
      v-if="user.id === $parent.getUserId()"
      :to="`/users/${user.id}/edit`"
    >
      <button>Edit Profile</button>
    </router-link> -->
    <!-- <div v-for="artwork in user.artworks">
      <div v-for="image in artwork.images">
        <img :src="image.url" alt="" />
      </div>
      <router-link :to="`/artworks/${artwork.id}`">
        <h2>{{ artwork.title }}</h2>
      </router-link>
      <p>{{ artwork.year }}</p>
      <p>{{ artwork.medium }}</p>
      <p v-if="artwork.dimensions">{{ artwork.dimensions }}</p>
      <p v-if="artwork.description">{{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5> -->
    <!-- <router-link
        v-if="user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link> -->
    <!-- </div> -->
    <!-- <button v-if="artwork.upvote" v-on:click="destroyUpvote(artwork)">
        Destroy Upvote
      </button>
      <button v-else v-on:click="createUpvote(artwork)">Upvote</button> -->
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
    this.$parent.headerImagePath = "college-girl.jpeg"; // I THINK THAT BECAUSE I GOT RID OF THIS IMAGE, I SHOULD GET RID OF THIS, BUT FOR SOME REASON EVERYTHING WORKS OK SO IM NOT GOING TO
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
    // createUpvote: function(artwork) {
    //   let params = {
    //     artwork_id: artwork.id,
    //   };
    //   axios
    //     .post("/api/upvotes", params)
    //     .then((response) => {
    //       artwork.upvote = true;
    //       artwork.upvotes_count++;
    //     })
    //     .catch((error) => {
    //       this.errors = error.response.data.errors;
    //       console.log(this.errors);
    //     });
    // },
    // destroyUpvote: function(artwork) {
    //   axios
    //     .delete(`/api/upvotes/${artwork.id}`)
    //     .then((response) => {
    //       artwork.upvote = false;
    //       artwork.upvotes_count--;
    //     })
    //     .catch((error) => {
    //       this.errors = error.response.data.errors;
    //     });
    // },
  },
};
</script>
