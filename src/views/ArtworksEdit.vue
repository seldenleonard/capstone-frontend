<template>
  <div class="artworks-edit">
    <form v-on:submit.prevent="updateArtwork()">
      <h1>Edit Artwork</h1>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <label>Title:</label>
        <input type="text" name="" v-model="artwork.title" />
      </div>
      <div>
        <label>Year:</label>
        <input type="number" name="" v-model="artwork.year" />
      </div>
      <div>
        <label>Medium:</label>
        <input type="text" name="" v-model="artwork.medium" />
      </div>
      <div>
        <div>
          <label>Dimensions:</label>
          <input type="text" name="" v-model="artwork.dimensions" />
        </div>
        <label>Description:</label>
        <input type="text" name="" v-model="artwork.description" />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="" v-model="artwork.price" />
      </div>
      <div>
        <label>Image:</label>
        <input type="text" name="" v-model="artwork.image" />
      </div>
      <div>
        <input type="submit" class="" value="Update" />
      </div>
      <button class="" v-on:click="destroyArtwork()">Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      artwork: {},
      images: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/artworks/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.artwork = response.data;
    });
  },
  methods: {
    updateArtwork: function() {
      let params = {
        title: this.artwork.title,
        medium: this.artwork.medium,
        description: this.artwork.description,
        price: this.artwork.price,
        dimensions: this.artwork.dimensions,
        year: this.artwork.year,
      };
      axios
        .patch(`/api/artworks/${this.artwork.id}`, params)
        .then((response) => {
          this.$router.push(`/artworks/${this.artwork.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyArtwork: function() {
      if (confirm("Are you sure you would like to delete this artwork?")) {
        axios
          .delete(`/api/artworks/${this.artwork.id}`)
          .then((response) => {
            console.log(
              "Artwork has successfully been destroyed",
              response.data
            );
            this.$router.push("/artworks");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
