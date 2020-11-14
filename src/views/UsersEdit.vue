<template>
  <div class="users-edit">
    <form v-on:submit.prevent="updateUser()">
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
      <!-- IF ARTIST IS FALSE, THE FOLLOWING USER INPUTS ARE NOT SHOWN -->
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
    <button class="" v-on:click="destroyUser()">Delete</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      user: {},
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
      formData.append("password", this.user.password);
      formData.append("password_confirmation", this.user.passwordConfirmation);
      // formData.append("artist", this.artist);
      formData.append("art_style", this.user.art_style);
      formData.append("college_id", this.user.college_id);
      formData.append("major", this.user.major);
      formData.append("minor", this.user.minor);
      formData.append("graduation_year", this.user.graduation_year);
      formData.append("bio", this.user.bio);
      if (this.user.image) {
        formData.append("image_url", this.image);
        // I HAD "this.image" AS "this.user.image" BUT SAW IN THE setFile() METHOD THAT IT SET this.image = event.target.files[0]; SO I CHANGED IT BACK TO "this.image" (AS IT IS RIGHT NOW, BUT STILL NO LUCK)
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
      if (confirm("Are you sure you would like to delete this account?")) {
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
