<template>
  <div class="artworks-show">
    <div v-for="image in artwork.images">
      <img :src="image.url" alt="" />
    </div>
    <div>
      <h2>Title: {{ artwork.title }}</h2>
      <p>Artist: {{ artwork.user.name }}</p>
      <p>College: {{ artwork.college.name }}</p>
      <p>Medium: {{ artwork.medium }}</p>
      <p>Description: {{ artwork.description }}</p>
      <p>Price: $ {{ artwork.price }}</p>
      <p>Dimensions: {{ artwork.dimensions }}</p>
      <p>Year: {{ artwork.year }}</p>
      <p>Upvotes: {{ artwork.upvotes }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <router-link
        v-if="artwork.user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link>
    </div>
    <button v-if="artwork.upvote" v-on:click="destroyUpvote()">
      Destroy Upvote
    </button>
    <button v-else v-on:click="createUpvote()">Upvote</button>
    <!-- I WAS CONSIDERING MAKING THIS BUTTON DYNAMIC IN THAT IT WOULD SAY "UPVOTE" AND THEN ONCE CLICKED IT WOULD SAY "REMOVE UPVOTE", BUT I GUESS IF ITS GOING TO BE A HEART OR A THUMBS UP, MAYBE I SHOULD WAIT FOR MY THEME? -->
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

    // ASK DANI FOR HELP WITH UPVOTES
    createUpvote: function() {
      let params = {
        artwork_id: this.artwork.id,
      };
      axios
        .post("/api/upvotes", params)
        .then((response) => {
          this.artwork.upvote = true;
          this.artwork.upvotes++;
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
          this.artwork.upvotes--;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          // CARL SAYS LOOK INTO HOW TO PASS PARAMS WITH A DELETE REQUEST, AND THEN FIND/ID THE UPVOTE I WANT TOO DESTROY BASED ON THOSE REQUESTS, THEN ID DESTROY IT
        });
    },
  },
};
</script>
