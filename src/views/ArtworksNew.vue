<template>
  <div class="artworks-new">
    <div>
      <form v-on:submit.prevent="createArtwork()">
        <h1>New Artwork</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Title:</label>
          <input type="text" class="form-control" v-model="title" />
        </div>
        <div class="form-group">
          <label>Year:</label>
          <input type="number" class="form-control" v-model="year" />
        </div>
        <div class="form-group">
          <label>Medium:</label>
          <input type="text" class="form-control" v-model="medium" />
        </div>
        <div class="form-group">
          <label>Height:</label>
          <input type="number" class="form-control" v-model="height" />
          <label>Width:</label>
          <input type="number" class="form-control" v-model="width" />
          <label>Length:</label>
          <input type="number" class="form-control" v-model="length" />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input type="text" class="form-control" v-model="description" />
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input type="number" class="form-control" v-model="price" />
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input type="text" class="form-control" v-model="imageUrl" />
        </div>
        <input type="submit" class="button" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      userId: "",
      // IS THERE ANY REASON THAT I WOULD NEED "userId" IN MY ArtworksNew.vue, WHEN I DONT EVEN CALL IT?
      title: "",
      medium: "",
      description: "",
      price: "",
      dimensions: "",
      year: "",
      imageUrl: "",
      height: "",
      width: "",
      length: "",
      errors: [],
    };
  },
  methods: {
    createArtwork: function() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("medium", this.medium);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append(
        "dimensions",
        `${this.height}" x ${this.width}" x ${this.length}"`
      );
      formData.append("year", this.year);
      formData.append("image_url", this.imageUrl);
      axios
        .post("/api/artworks", formData)
        .then((response) => {
          this.$router.push(`/artworks/${response.data.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
