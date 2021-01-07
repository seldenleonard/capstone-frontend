<template>
  <div class="artworks-edit">
    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- HOME -->
      <section
        class="module module-header bg-dark bg-dark-50"
        data-background="assets/images/section-7.jpg"
        style="background-image: url(/assets/images/dark-sand.jpg
);"
      >
        <div class="container">
          <!-- MODULE TITLE -->
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <h1 class="module-title font-alt align-center">
                <i class="fa fa-pencil"></i>
                <p></p>
                Update Artwork
              </h1>
              <div class="module-subtitle font-inc align-center">
                <i class="fa fa-quote-left"></i>
                If people knew how hard I worked to get my mastery, it wouldn’t
                seem so wonderful at all
                <i class="fa fa-quote-right"></i>

                <strong>
                  <p class="font-inc font-uppercase">- Michelangelo</p>
                </strong>
              </div>
            </div>
          </div>
          <!-- /MODULE TITLE -->
        </div>
      </section>
      <!-- /HOME -->

      <!-- COMPONENTS -->
      <section class="module">
        <div class="container">
          <div class="row">
            <form
              v-on:submit.prevent="updateArtwork()"
              class="col-sm-8 col-sm-offset-2"
            >
              <h4 class="font-alt m-t-0 m-b-0"><strong>New</strong></h4>
              <hr class="divider-w m-t-10 m-b-20" />
              <div
                class="alert alert-danger"
                role="alert"
                v-for="error in errors"
              >
                <strong>Error:</strong> {{ error }}
              </div>
              <div class="form-group">
                <label>Title</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="artwork.title"
                  placeholder="The Starry Night"
                />
              </div>
              <div class="form-group">
                <label>Year</label>
                <input
                  type="number"
                  class="form-control input-lg"
                  v-model="artwork.year"
                  placeholder="1889"
                />
              </div>
              <div class="form-group">
                <label>Medium</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="artwork.medium"
                  placeholder="Oil on Canvas"
                />
              </div>

              <div>
                <label>Current Dimensions</label>
                <input
                  class="form-control input-lg"
                  type="text"
                  :placeholder="artwork.dimensions"
                  readonly=""
                />
                <div class="form-group">
                  <hr class="divider-w m-t-10 m-b-20" />
                  <h5 class="font-alt">Enter New Dimensions?</h5>
                  <input
                    type="checkbox"
                    id="newDimensions"
                    v-model="newDimensions"
                  />
                  <label style="padding-left: 5px;" for="checkbox">Yes</label>
                </div>
                <div v-if="newDimensions">
                  <small class="center-align"
                    >(<strong>Note:</strong> Any changes to Length, Width, or
                    Height will overwrite all previous Dimensions)</small
                  ><br /><br />
                  <div class="form-group">
                    <label>Length (in.)</label>
                    <input
                      type="number"
                      class="form-control input-lg"
                      v-model="artwork.length"
                      placeholder=""
                    />
                  </div>
                  <div class="form-group">
                    <label>Width (in.)</label>
                    <input
                      type="number"
                      class="form-control input-lg"
                      v-model="artwork.width"
                      placeholder=""
                    />
                  </div>
                  <div class="form-group">
                    <label>Height (in.)</label>
                    <input
                      type="number"
                      class="form-control input-lg"
                      v-model="artwork.height"
                      placeholder=""
                    />
                  </div>
                </div>
                <hr class="divider-w m-t-10 m-b-10" />
              </div>

              <div class="form-group">
                <label>Description</label>
                <input
                  type="text"
                  class="form-control input-lg"
                  v-model="artwork.description"
                  placeholder="The view before sunrise from east-facing window at Saint-Rémy-de-Provence."
                />
              </div>
              <div class="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  class="form-control input-lg"
                  v-model="artwork.price"
                  placeholder="273000000"
                />
              </div>
              <div class="form-group">
                <label>Images</label>
                <input
                  type="file"
                  class="form-control input-lg"
                  v-on:change="setFile($event)"
                  ref="fileInput"
                />
              </div>
              <div v-if="image1" class="form-group">
                <input
                  type="file"
                  class="form-control input-lg"
                  v-on:change="setFile($event)"
                  ref="fileInput"
                />
              </div>
              <div v-if="image2" class="form-group">
                <input
                  type="file"
                  class="form-control input-lg"
                  v-on:change="setFile($event)"
                  ref="fileInput"
                />
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-border-d btn-circle"
                  value="createImage"
                  v-on:click="createImage()"
                >
                  Add Image
                </button>
                <p></p>
              </div>
              <div v-for="image in artwork.images" class="p-t-20 p-b-10">
                <img :src="image.url" alt="" />
                <button
                  type="destroy"
                  class="btn btn btn-warning btn-circle btn-xs"
                  value="Destroy"
                  v-on:click="destroyImage(image)"
                >
                  <i class="fa fa-trash"></i> Delete Image
                </button>
              </div>

              <div class="p-t-60">
                <strong> <hr class="divider-w m-t-10 m-b-10" /> </strong>
                <div>
                  <button
                    type="submit"
                    class="btn btn-border-d btn-circle"
                    value="Submit"
                  >
                    <i class="fa fa-cog fa-spin"></i>
                    Submit
                  </button>
                  <br /><br /><br />
                  <button
                    type="destroy"
                    class="btn btn btn-danger btn-circle btn-xs"
                    value="Destroy"
                    v-on:click="destroyArtwork()"
                  >
                    <i class="fa fa-trash"></i>
                    Delete Artwork
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <!-- / COMPONENTS  -->

      <!-- DIVIDER -->
      <hr class="divider-w" />
      <!-- /DIVIDER -->
    </div>
    <!-- /WRAPPER -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      dimensions: "",
      newDimensions: false,
      image1: "",
      image2: "",
      image3: "",
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
    // setFile: function(event) {
    //   if (event.target.files.length > 0) {
    //     this.image = event.target.files[0];
    //   }
    // },
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
    updateArtwork: function() {
      let formData = new FormData();
      formData.append("title", this.artwork.title);
      formData.append("medium", this.artwork.medium);
      formData.append("description", this.artwork.description);
      formData.append("price", this.artwork.price);
      formData.append("year", this.artwork.year);
      if (this.image1) {
        formData.append("image1", this.image1);
      }
      if (this.image2) {
        formData.append("image2", this.image2);
      }
      if (this.image3) {
        formData.append("image3", this.image3);
      }
      if (this.newDimensions === true) {
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
      }
      axios
        .patch(`/api/artworks/${this.artwork.id}`, formData)
        .then((response) => {
          this.$router.push(`/artworks/${this.artwork.id}`);
          console.log(this.newDimensions);
          // Get rid of this console.log when I resolve the dimensions issue
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
