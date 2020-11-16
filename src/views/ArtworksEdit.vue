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
        <label>Dimensions:</label>
        <p>{{ artwork.dimensions }}</p>
        <input
          type="checkbox"
          id="checkbox"
          class="form-control"
          v-model="dimensions"
        />
        <label for="checkbox">Edit</label>

        <!-- THIS IS AN ATTEMPT TO SHOW DIMENSIONS AND THEN HAVE AN EDIT CHECKBOX THAT WILL THEN DISPLAY THE L, W, AND H IF CHECKED (IN ORDER TO AVOID THE DIFFICULTY OF ATTEMPTING TO POPULATE THE L, W, AND H BOXES BECAUSE THEY AR ENOT ATRIBUTES OF THE MODEL) -->
        <div v-if="dimensions">
          <label>Length:</label>
          <input type="text" name="" v-model="length" />

          <label>Width:</label>
          <input type="text" name="" v-model="width" />

          <label>Height:</label>
          <input type="text" name="" v-model="height" />
        </div>
      </div>
      <div>
        <label>Description:</label>
        <input type="text" name="" v-model="artwork.description" />
      </div>
      <div>
        <label>Price: $</label>
        <input type="number" name="" v-model="artwork.price" />
      </div>

      <div>
        <input type="submit" class="" value="Update" />
      </div>
      <button class="" v-on:click="destroyArtwork()">Delete</button>
    </form>

    <div class="form-group">
      <label>New Image:</label>
      <input
        type="file"
        class="form-control"
        v-on:change="setFile($event)"
        ref="fileInput"
      />
    </div>
    <button v-on:click="createImage()">Add Image</button>
    <div v-for="image in artwork.images">
      <img :src="image.url" alt="" />
      <button v-on:click="destroyImage(image)">Delete</button>
    </div>
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
      // url: "",
      artwork: {},
      errors: [],
      image: "",
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
    createImage: function() {
      let formData = new FormData();
      formData.append("artwork_id", this.artwork.id);
      if (this.image) {
        formData.append("image", this.image);
      }
      axios
        .post("/api/images", formData)
        .then((response) => {
          console.log(response.data);
          this.artwork.images.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
    destroyImage: function(image) {
      axios
        .delete(`/api/images/${image.id}`)
        .then((response) => {
          console.log("Image has successfully been destroyed", response.data);
          this.artwork.images.splice(this.artwork.images.indexOf(image), 1);
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

// NOTE TO SELF ABOUT DIMENSIONS AS (L x W x H) IN THREE SEPEARATE INPUTS AND
WITH LOGIC TO MAKE THEM FIT TOGETHER NO MATTER WHAT BOXES ARE FILLED IN: I
STOPPED IMPLEMENTING IT PREMATURELY BECAUSE ADDING CLOUDINARY WOULD CHANGE IT NO
MATTER WHAT. SO FAR I HAVE ENTERED IN THE INPUT BOXES AND THE DATA VALUES SO ALL
I NEED TO DO LEFT IS ADD IN THE formData.append() if statements and logic etc.
