<template>
  <div class="users-show">
    <img :src="user.image_url" alt="" />
    <h2>{{ user.name }}</h2>
    <router-link :to="`/colleges/${user.college_id}`">
      <p>{{ user.college_name }}</p>
    </router-link>
    <p>Class of {{ user.graduation_year }}</p>
    <p>Major: {{ user.major }}</p>
    <p>Minor: {{ user.minor }}</p>
    <p>Style of Art: {{ user.art_style }}</p>
    <p>Bio: {{ user.bio }}</p>
    <p>Contact: {{ user.email }}</p>
    <!-- THE ISSUE HERE IS THAT FOR NON-ARTISTS WHO DONT HAVE DATA IN MOST OF THESE ATTRIBUTES, THE HTML TEXT (ATTRIBUTE LABEL) SHOWS UP AND THERES THERES NO DATA TO FILL IT OUT -->

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
      <p>{{ artwork.year }}</p>
      <p>{{ artwork.medium }}</p>
      <p>{{ artwork.dimensions }}</p>
      <p>{{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <router-link
        v-if="user.id === $parent.getUserId()"
        :to="`/artworks/${artwork.id}/edit`"
      >
        <button>Edit Artwork</button>
      </router-link>
      <button v-if="artwork.upvote" v-on:click="destroyUpvote()">
        Destroy Upvote
      </button>
      <button v-else v-on:click="createUpvote()">Upvote</button>
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
    // MY createUpvote AND destroyUpvote ACTIONS ALMOST WORK, BUT IM GETTING THE ERROR THAT "id" IS UNDEFINED (same thing in my ArtworksIndex.vue)
    createUpvote: function() {
      let params = {
        artwork_id: this.artwork.id,
      };
      axios
        .post("/api/upvotes", params)
        .then((response) => {
          this.artwork.upvote = true;
          this.artwork.upvotes_count++;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUpvote: function() {
      axios
        .delete(`/api/upvotes/${this.artwork.id}`)
        .then((response) => {
          this.artwork.upvote = false;
          this.artwork.upvotes_count--;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
