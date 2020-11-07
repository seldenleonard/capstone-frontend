<template>
  <div class="artworks-show">
    <div v-for="image in artwork.images">
      <p>{{ image.url }}</p>
    </div>
    <div>
      <h2>Title: {{ artwork.title }}</h2>
      <p>Artist: {{ artwork.user.name }}</p>
      <p>Medium: {{ artwork.medium }}</p>
      <p>Description: {{ artwork.description }}</p>
      <p>Price: $ {{ artwork.price }}</p>
      <p>Dimensions: {{ artwork.dimensions }}</p>
      <p>Year: {{ artwork.year }}</p>
      <button>
        <router-link :to="`/artworks/${artwork.id}/edit`">Edit</router-link>
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      artwork: {
        user: {},
        // This user object is unnecessary, but by preloading it here, I avoid the error that pops up when I call artwork.user.name, and it loads before the request returns that data.
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
};
</script>
