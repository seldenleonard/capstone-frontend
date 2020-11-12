<template>
  <div class="users-show">
    <img :src="user.image_url" alt="" />
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <!-- <p>{{ user.artist }}</p> -->
    <p>{{ user.bio }}</p>
    <p>{{ user.art_style }}</p>
    <p>{{ user.college_id }}</p>
    <p>{{ user.major }}</p>
    <p>{{ user.minor }}</p>
    <p>{{ user.graduation_year }}</p>
    <router-link
      v-if="user.id === $parent.getUserId()"
      :to="`/users/${user.id}/edit`"
    >
      <button>Edit Profile</button>
    </router-link>
    <!-- I ADDED THIS FUNCTIONALITY SAYING THAT IF THE CURRENT USER IS LOOKING AT THEIR PROFILE, AN EDIT BUTTON WILL POP UP, BUT IF I WOULD LIKE TO HAVE THAT FUNCTIONALITY FOR SEEING THAT USER EDIT PAGE AT ALL, CAN I JUST PUT THIS SAME V-IF IN MY WHOLE UsersEdit.vue div? I beleive the answer is yes, especially if I want to make "Edit Profile" an option in my navbar -->
    <div v-for="artwork in user.artworks">
      <div v-for="image in artwork.images">
        <img :src="image.url" alt="" />
      </div>
      <h2>{{ artwork.title }}</h2>
      <p>{{ artwork.medium }}</p>
      <p>{{ artwork.description }}</p>
      <p>$ {{ artwork.price }}</p>
      <p>{{ artwork.dimensions }}</p>
      <p>{{ artwork.year }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <router-link
        v-if="user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

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
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
