<template>
  <div class="artworks-show">
    <div v-for="image in artwork.images">
      <img :src="image.url" alt="" />
    </div>
    <div>
      <h2>Title: {{ artwork.title }}</h2>
      <p>Artist: {{ artwork.user.name }}</p>
      <p>College: {{ artwork.college.name }}</p>
      <p>Date: {{ artwork.year }}</p>
      <p>Medium: {{ artwork.medium }}</p>
      <p v-if="artwork.dimensions">Dimensions: {{ artwork.dimensions }}</p>
      <p v-if="artwork.description">Description: {{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <router-link
        v-if="artwork.user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link>
      <router-link :to="`/users/${artwork.user.id}`"
        ><button>View Artist</button></router-link
      >
    </div>
    <button v-if="artwork.upvote" v-on:click="destroyUpvote()">
      Destroy Upvote
    </button>
    <button v-else v-on:click="createUpvote()">Upvote</button>
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
