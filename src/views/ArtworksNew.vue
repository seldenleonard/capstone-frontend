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
          <label>length:</label>
          <input type="number" class="form-control" v-model="length" />
          <label>Width:</label>
          <input type="number" class="form-control" v-model="width" />
          <label>height:</label>
          <input type="number" class="form-control" v-model="height" />
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
      length: "",
      width: "",
      height: "",
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
      formData.append("year", this.year);
      formData.append("image_url", this.imageUrl);
      if (this.length && this.width && this.height) {
        formData.append(
          "dimensions",
          `${this.length}" x ${this.width}" x ${this.height}"`
        );
      } else if (this.length && this.width) {
        formData.append("dimensions", `${this.length}" x ${this.width}"`);
      } else if (this.length && this.height) {
        formData.append("dimensions", `${this.length}" x ${this.height}"`);
      } else if (this.height && this.width) {
        formData.append("dimensions", `${this.height}" x ${this.width}"`);
      } else if (this.length || this.height || this.width) {
        formData.append(
          "dimensions",
          `${this.length || this.height || this.width}"`
        );
      }
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
