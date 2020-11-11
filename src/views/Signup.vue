<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirmation"
        />
      </div>

      <!-- ADDITIONS TO SIGNUP -->
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="bio" />
      </div>
      <div class="form-group">
        <label>Style of Art:</label>
        <input type="text" class="form-control" v-model="art_style" />
      </div>
      <div class="form-group">
        <label>Profile Image:</label>
        <input type="text" class="form-control" v-model="image_url" />
      </div>

      <div class="form-group">
        <label
          >I am a current student artist attending a college or university ...
        </label>
        <input type="boolean" class="form-control" v-model="artist" />
      </div>
      <!-- Need to make this have two checkboxes, with "yes" or "no" -->
      <!-- If the user selects no, then nothing happens, but if the user selects "yes", the rest of the inputs (below) will appear -->

      <div class="form-group">
        <label>Name of School:</label>
        <input type="text" class="form-control" v-model="college" />
      </div>
      <!-- Need to make this a dropdown menu -->
      <!-- also need to add a note saying "If your college or university is not listed in the dropdown menu, we apologize but your school is not currently supported by this platform" -->
      <div class="form-group">
        <label>Minor:</label>
        <input type="text" class="form-control" v-model="minor" />
      </div>
      <div class="form-group">
        <label>Graduation Year:</label>
        <input type="number" class="form-control" v-model="graduation_year" />
      </div>

      <!-- ADDITIONS END HERE -->

      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
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
      bio: "",
      art_style: "",
      image_url: "",
      artist: "",
      college: "",
      major: "",
      minor: "",
      graduation_year: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
