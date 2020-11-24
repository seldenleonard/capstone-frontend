<template>
  <div class="users-edit">
    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- HOME -->
      <section
        class="module module-header bg-dark bg-dark-50"
        data-background="assets/images/section-7.jpg"
        style="background-image: url(/assets/images/sand-texture.jpg);"
      >
        <div class="container">
          <!-- MODULE TITLE -->
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2">
              <h1 class="module-title font-alt align-center">
                <i class="fa fa-wrench"></i>
                <p></p>
                Update Account
              </h1>
              <div class="module-subtitle font-inc align-center">
                <i class="fa fa-quote-left"></i>
                I shut my eyes in order to see
                <i class="fa fa-quote-right"></i>

                <strong>
                  <p class="font-inc font-uppercase">- Paul Gauguin</p>
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
              v-on:submit.prevent="updateUser()"
              class="col-sm-8 col-sm-offset-2"
            >
              <h4 class="font-alt m-t-0 m-b-0"><strong>Edit</strong></h4>
              <strong> <hr class="divider-w m-t-10 m-b-20" /> </strong>
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
                  v-model="user.name"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="email"
                  placeholder="Email"
                  v-model="user.email"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="password"
                  placeholder="New Password (Optional)"
                  v-model="user.password"
                />
              </div>
              <div class="form-group">
                <input
                  class="form-control input-lg"
                  type="password"
                  placeholder="New Password Confirmation"
                  v-model="user.password_confirmation"
                />
              </div>

              <div class="form-group">
                <label>
                  Are you a student artist attending a college or university? </label
                ><br />
                <input type="checkbox" id="checkbox" v-model="user.artist" />
                <label style="padding-left: 5px;" for="checkbox">Yes</label>
              </div>

              <div v-if="user.artist">
                <strong><hr class="divider-w m-t-10 m-b-20"/></strong>
                <div class="form-group">
                  <label>Select a College:</label><br />
                  <select
                    class="form-control input-lg"
                    v-model="user.college_id"
                  >
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
                    v-model="user.major"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Minor"
                    v-model="user.minor"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="number"
                    placeholder="Graduation Year"
                    v-model="user.graduation_year"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Style of Art"
                    v-model="user.art_style"
                  />
                </div>
                <div class="form-group">
                  <input
                    class="form-control input-lg"
                    type="text"
                    placeholder="Bio (500 Character Max)"
                    v-model="user.bio"
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
                Submit</button
              ><br /><br /><br /><br />
              <hr class="divider-w m-t-10 m-b-20 p-t-10" />
              <button
                type="destroy"
                class="btn btn btn-danger btn-circle btn-xs"
                value="Destroy"
                v-on:click="destroyUser()"
              >
                <i class="fa fa-trash"></i>
                Delete My Account
              </button>
            </form>
          </div>
        </div>
      </section>
      <!-- / COMPONENTS  -->

      <!-- DIVIDER -->
      <strong> <hr class="divider-w" /> </strong>
      <!-- /DIVIDER -->
    </div>
    <!-- /WRAPPER -->

    <!-- MY OLD CODE -->
    <!-- <form v-on:submit.prevent="updateUser()">
      <h1>Update User</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="text" class="form-control" v-model="user.password" />
      </div>
      <div class="form-group">
        <label>Password Confirmation:</label>
        <input
          type="text"
          class="form-control"
          v-model="user.password_confirmation"
        />
      </div>
      <div v-if="user.artist">
        <div class="form-group">
          <label>Style of Art:</label>
          <input type="text" class="form-control" v-model="user.art_style" />
        </div>
        <div class="form-group">
          <label>College:</label>
          <input type="text" class="form-control" v-model="user.college_id" />
        </div>
        <div class="form-group">
          <label>Major:</label>
          <input type="text" class="form-control" v-model="user.major" />
        </div>
        <div class="form-group">
          <label>Minor:</label>
          <input type="text" class="form-control" v-model="user.minor" />
        </div>
        <div class="form-group">
          <label>Graduation Year:</label>
          <input
            type="number"
            class="form-control"
            v-model="user.graduation_year"
          />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="user.bio" />
        </div>
        <div class="form-group">
          <label>Profile Image:</label>
          <input
            type="file"
            class="form-control"
            v-on:change="setFile($event)"
            ref="fileInput"
          />
        </div>
      </div>

      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <button class="" v-on:click="destroyUser()">Delete</button> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
      colleges: [],
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`/api/users/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
    axios.get("api/colleges").then((response) => {
      console.log(response.data);
      this.colleges = response.data;
      // console.log(this.collegeId);
    });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    updateUser: function() {
      // let params = {
      //   name: this.user.name,
      //   email: this.user.email,
      //   password: this.user.password,
      //   password_confirmation: this.user.password_confirmation,
      //   // artist: this.user.artist,
      //   bio: this.user.bio,
      //   art_style: this.user.art_style,
      //   image_url: this.user.image_url,
      //   college_id: this.user.college_id,
      //   major: this.user.major,
      //   minor: this.user.minor,
      //   graduation_year: this.user.graduation_year,
      // };
      let formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("email", this.user.email);
      if (this.user.password && this.user.passwordConfirmation) {
        formData.append("password", this.user.password);
        formData.append(
          "password_confirmation",
          this.user.passwordConfirmation
        );
      }
      formData.append("artist", this.artist);
      formData.append("art_style", this.user.art_style);
      formData.append("college_id", this.user.college_id);
      formData.append("major", this.user.major);
      formData.append("minor", this.user.minor);
      formData.append("graduation_year", this.user.graduation_year);
      formData.append("bio", this.user.bio);
      if (this.image) {
        formData.append("image", this.image);
      }
      axios
        .patch(`/api/users/${this.user.id}`, formData)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUser: function() {
      if (
        confirm(
          "Are you sure you would like to delete this account? This action is permanent and non-reversable."
        )
      ) {
        axios
          .delete(`/api/users/${this.user.id}`)
          .then((response) => {
            console.log("User has successfully been destroyed", response.data);
            this.$router.push("/logout");
          })
          .catch((error) => {
            this.errors = error.response.data.errors;
          });
      }
    },
  },
};
</script>
