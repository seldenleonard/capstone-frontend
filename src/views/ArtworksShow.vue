<template>
  <div class="artworks-show">
    <!-- <div v-for="image in artwork.images">
      <img src="artwork.images" alt="" />
      <img :src="artwork.image" alt="" />
    </div> -->
    <div>
      <!-- NEED TO FIGURE OUT HOW TO PUT MULTIPLE IMAGES IN FOR A SINGLE ARTWORK (the commented-out stuff above is my attempts)-->
      <h2>Title: {{ artwork.title }}</h2>
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
      artwork: {},
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
