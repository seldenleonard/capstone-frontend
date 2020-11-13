<template>
  <div class="signup">
    <form v-on:submit.prevent="createUser()">
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
        <label>Password Confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirmation"
        />
      </div>
      <div class="form-group">
        <label
          >Are you a student artist attending a college or university?
        </label>
        <input
          type="checkbox"
          id="checkbox"
          class="form-control"
          v-model="artist"
        />
        <label for="checkbox">{{ artist }}</label>
      </div>
      <!-- Need to make this have two checkboxes, with "yes" or "no" -->
      <!-- If the user selects no, then nothing happens, but if the user selects "yes", the rest of the inputs (below) will appear -->
      <div v-if="artist">
        <div class="form-group">
          <label>Style of Art:</label>
          <input type="text" class="form-control" v-model="artStyle" />
        </div>
        <div class="form-group">
          <label>Name of School:</label>
          <input type="text" class="form-control" v-model="college_id" />
        </div>
        <!-- Need to make this a dropdown menu -->
        <!-- also need to add a note saying "If your college or university is not listed in the dropdown menu, we apologize but your school is not currently supported by this platform" -->

        <div class="form-group">
          <label>Major:</label>
          <input type="text" class="form-control" v-model="major" />
        </div>
        <div class="form-group">
          <label>Minor:</label>
          <input type="text" class="form-control" v-model="minor" />
        </div>
        <div class="form-group">
          <label>Graduation Year:</label>
          <input type="number" class="form-control" v-model="graduationYear" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="bio" />
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
      artist: "true",
      artStyle: "",
      college_id: "",
      major: "",
      minor: "",
      graduationYear: "",
      bio: "",
      image: "",
      errors: [],
    };
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
      formData.append("college_id", this.college_id);
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
