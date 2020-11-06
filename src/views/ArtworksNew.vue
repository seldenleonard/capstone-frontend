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
          <label>Medium:</label>
          <input type="text" class="form-control" v-model="medium" />
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
          <label>dimensions:</label>
          <input type="number" class="form-control" v-model="dimensions" />
          <!-- NEED TO MAKE THIS INTO 3 INPUTS (LENGTH, WIDTH, HEIGHT) AND THEN PROCESS THEM AND SEND THEM TO THE DATABASE FORMATTED -->
        </div>
        <div class="form-group">
          <label>Year:</label>
          <input type="number" class="form-control" v-model="year" />
        </div>
        <!-- NEED TO INCORPORATE INPUT FOR IMAGES (WHICH ARE A DIFFERENT MODEL ENTIRELY) -->
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
      user_id: "",
      title: "",
      medium: "",
      description: "",
      price: "",
      dimensions: "",
      year: "",
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
      formData.append("dimensions", this.dimensions);
      formData.append("year", this.year);
      axios
        .post("/api/artworks", formData)
        .then((response) => {
          this.$parent.flashMessage = "Artwork created successfully";
          this.$router.push("/artworks");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
