<template>
  <div class="users-new">
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
      <div class="form-group">
        <label>Artist:</label>
        <input type="text" class="form-control" v-model="user.artist" />
      </div>
      <!-- IF ARTIST IS FALSE, THEN I NEED THE FOLLOWING USER INPUTS TO NOT BE SHOWN, AND ACTUALLY TURN BLANK IN THE DATABASE -->

      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="user.bio" />
      </div>
      <div class="form-group">
        <label>Art Style:</label>
        <input type="text" class="form-control" v-model="user.art_style" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="user.image_url" />
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
          type="text"
          class="form-control"
          v-model="user.graduation_year"
        />
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
    <!-- <button v-on:click="destroyUser">Delete</button> Figure this button out -->
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
    updateUser: function() {
      let params = {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        password_confirmation: this.user.password_confirmation, // Will likely get rid of this when I do the password authentication stuff that we had a mini-lesson on today (Nov 3)
        artist: this.user.artist,
        bio: this.user.bio,
        art_style: this.user.art_style,
        image_url: this.user.image_url,
        college_id: this.user.college_id,
        major: this.user.major,
        minor: this.user.minor,
        graduation_year: this.user.graduation_year,
      };
      axios
        .patch(`/api/users/${this.user.id}`, params)
        .then((response) => {
          this.$router.push(`/users/${this.user.id}`);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
