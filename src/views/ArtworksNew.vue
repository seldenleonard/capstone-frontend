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
          <input
            type="text"
            class="form-control"
            v-model="title"
            placeholder="The Starry Night"
          />
        </div>
        <div class="form-group">
          <label>Year:</label>
          <input
            type="number"
            class="form-control"
            v-model="year"
            placeholder="1889"
          />
        </div>
        <div class="form-group">
          <label>Medium:</label>
          <input
            type="text"
            class="form-control"
            v-model="medium"
            placeholder="Oil on Canvas"
          />
        </div>
        <div class="form-group">
          <label>Length:</label>
          <input
            type="number"
            class="form-control"
            v-model="length"
            placeholder="29"
          />
          <label>Width:</label>
          <input
            type="number"
            class="form-control"
            v-model="width"
            placeholder="36"
          />
          <label>Height:</label>
          <input
            type="number"
            class="form-control"
            v-model="height"
            placeholder="For 3-Dimensional Artworks"
          />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <input
            type="text"
            class="form-control"
            v-model="description"
            placeholder="The view from the east-facing window of my asylum room at Saint-Rémy-de-Provence, just before sunrise, with the addition of an imaginary village."
          />
        </div>
        <div class="form-group">
          <label>Price: $</label>
          <input
            type="number"
            class="form-control"
            v-model="price"
            placeholder="273000000"
          />
          <!-- consider making this placeholder like 10 dollars or something more similar to what people might actually input as opposed to this massive actual value of The Starry Night -->
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input
            type="file"
            class="form-control"
            v-on:change="setFile($event)"
            ref="fileInput"
          />
        </div>
        <div v-if="image1" class="form-group">
          <label>Image:</label>
          <input
            type="file"
            class="form-control"
            v-on:change="setFile($event)"
            ref="fileInput"
          />
        </div>
        <div v-if="image2" class="form-group">
          <label>Image:</label>
          <input
            type="file"
            class="form-control"
            v-on:change="setFile($event)"
            ref="fileInput"
          />
        </div>
        <!-- Image 1: {{ image1 }} Image 2: {{ image2 }} Image 3: {{ image3 }} -->
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
      image1: "",
      image2: "",
      image3: "",
      length: "",
      width: "",
      height: "",
      errors: [],
    };
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        if (this.image2) {
          this.image3 = event.target.files[0];
        } else if (this.image1) {
          this.image2 = event.target.files[0];
        } else {
          this.image1 = event.target.files[0];
        }
      }
    },
    createArtwork: function() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("medium", this.medium);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("year", this.year);
      if (this.image1) {
        formData.append("image1", this.image1);
      }
      if (this.image2) {
        formData.append("image2", this.image2);
      }
      if (this.image3) {
        formData.append("image3", this.image3);
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
