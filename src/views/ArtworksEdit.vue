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
        <label>Length:</label>
        <input type="text" name="" v-model="length" />

        <label>Width:</label>
        <input type="text" name="" v-model="width" />

        <label>Height:</label>
        <input type="text" name="" v-model="height" />
      </div>

      <div>
        <label>Description:</label>
        <input type="text" name="" v-model="artwork.description" />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="" v-model="artwork.price" />
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          class="form-control"
          v-on:change="setFile($event)"
          ref="fileInput"
        />
        <!-- v-model="artwork.image" -->
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
      dimensions: "",
      length: "",
      width: "",
      height: "",
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
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updateArtwork: function() {
      let formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("medium", this.artwork.medium);
      formData.append("description", this.artwork.description);
      formData.append("price", this.artwork.price);
      formData.append("year", this.artwork.year);
      if (this.image) {
        formData.append("image", this.image);
      }
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
        .patch(`/api/artworks/${this.artwork.id}`, formData)
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
    // WILL LIKELY NEED TO MAKE A destroyImage METHOD TOO -- WHICH I CAN HAVE A BUTTON CALLING THE METHOD INSIDE THE LOOP THAT CREATES MORE IMAGE UPLOAD FIELDS
  },
};
</script>

// NOTE TO SELF ABOUT DIMENSIONS AS (L x W x H) IN THREE SEPEARATE INPUTS AND
WITH LOGIC TO MAKE THEM FIT TOGETHER NO MATTER WHAT BOXES ARE FILLED IN: I
STOPPED IMPLEMENTING IT PREMATURELY BECAUSE ADDING CLOUDINARY WOULD CHANGE IT NO
MATTER WHAT. SO FAR I HAVE ENTERED IN THE INPUT BOXES AND THE DATA VALUES SO ALL
I NEED TO DO LEFT IS ADD IN THE formData.append() if statements and logic etc.
