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
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <router-link
        v-if="artwork.user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link>
      <!-- NOTE: IN DANI'S SCREENCAST, SHE CHANGES THIS TRIPLE EQUALS SIGN INTO A DOUBLE EQUALS SIGN BECAUSE LOCALSTORAGE HOLDS A USER ID AS A STRING BUT THEN ITS BEING COMPARED TO A NUMBER. HOWEVER, I CHECKED IN MY APP, AND MY LOCALSTORAGE FOR SOME REASON STORES IT AS A NUMBER (THE TWO LINES OF CODE BELOW DEMONSTRATE THAT). ANYWAY, SO I LEFT THE TRIPLE EQUALS SIGN. -->
      <!-- <p>{{ typeof $parent.getUserId() }}</p>
      <p>{{ typeof artwork.user.id }}</p> -->
    </div>
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
  },
};
</script>
