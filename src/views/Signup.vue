<template>
  <div class="signup">
    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- HOME -->
      <section
        class="module module-header bg-dark bg-dark-50"
        data-background="assets/images/section-7.jpg"
        style="background-image: url(/assets/images/pinkish-sky.jpg);"
      >
        <div class="container">
          <!-- MODULE TITLE -->
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <h1 class="module-title font-alt align-center">
                <i class="fa fa-user"></i>
                <p></p>
                Create Account
              </h1>
              <div class="module-subtitle font-inc align-center">
                <i class="fa fa-quote-left"></i>
                If you hear a voice within you saying, ‘You are not a painter,’
                <br />then by all means paint, boy, and that voice will be
                silenced
                <i class="fa fa-quote-right"></i>

                <strong>
                  <p class="font-inc font-uppercase">- Vincent van Gogh</p>
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
              v-on:submit.prevent="createUser()"
              class="col-sm-8 col-sm-offset-2"
            >
              <h4 class="font-alt m-t-0 m-b-0"><strong>Signup</strong></h4>
              <hr class="divider-w m-t-10 m-b-20" />
              <div
                class="alert alert-danger"
                role="alert"
                v-for="error in errors"
              >
                <strong>Error:</strong> {{ error }}
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="text"
                  placeholder="Name"
                  v-model="name"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="email"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="password"
                  placeholder="Password Confirmation"
                  v-model="passwordConfirmation"
                />
              </div>

              <div class="form-group">
                <label>
                  Are you a student artist attending a college or university? </label
                ><br />
                <input type="checkbox" id="checkbox" v-model="artist" />
                <label style="padding-left: 5px;" for="checkbox">Yes</label>
              </div>

              <div v-if="artist">
                <hr class="divider-w m-t-10 m-b-20" />
                <div class="form-group">
                  <label>Select a College:</label><br />
                  <select class="form-control" v-model="collegeId">
                    <option
                      v-for="college in colleges"
                      v-bind:value="college.id"
                    >
                      {{ college.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Major"
                    v-model="major"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Minor"
                    v-model="minor"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="number"
                    placeholder="Graduation Year"
                    v-model="graduationYear"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Style of Art"
                    v-model="artStyle"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Bio (500 Character Max)"
                    v-model="bio"
                  />
                </div>
                <div class="form-group">
                  <label>Profile Image:</label>
                  <input
                    class="form-control input-lg"
                    type="file"
                    v-on:change="setFile($event)"
                    ref="fileInput"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-border-d btn-circle"
                value="Submit"
              >
                <i class="fa fa-cog fa-spin"></i>
                Submit
              </button>
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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      artist: "",
      artStyle: "",
      collegeId: "",
      major: "",
      minor: "",
      graduationYear: "",
      bio: "",
      image: "",
      colleges: [],
      errors: [],
    };
  },

  created: function() {
    console.log(this.collegeId);
    axios.get("api/colleges").then((response) => {
      console.log(response.data);
      this.colleges = response.data;
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    createUser: function() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("password_confirmation", this.passwordConfirmation);
      formData.append("artist", this.artist);
      formData.append("art_style", this.artStyle);
      formData.append("college_id", this.collegeId);
      formData.append("major", this.major);
      formData.append("minor", this.minor);
      formData.append("graduation_year", this.graduationYear);
      formData.append("bio", this.bio);
      if (this.image) {
        formData.append("image", this.image);
      }
      axios
        .post("/api/users", formData)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
  },
};
</script>
