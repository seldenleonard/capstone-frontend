<template>
  <div class="users-show">
    <img :src="user.image_url" alt="" />
    <h2>{{ user.name }}</h2>
    <router-link :to="`/colleges/${user.college_id}`">
      <p>{{ user.college_name }}</p>
    </router-link>
    <p v-if="user.graduation_year">Class of {{ user.graduation_year }}</p>
    <p v-if="user.major">Major: {{ user.major }}</p>
    <p v-if="user.minor">Minor: {{ user.minor }}</p>
    <p v-if="user.art_style">Style of Art: {{ user.art_style }}</p>
    <p v-if="user.bio">Bio: {{ user.bio }}</p>
    <p v-if="user.artist">Contact: {{ user.email }}</p>
    <p v-else>Email: {{ user.email }}</p>
    <router-link
      v-if="user.id === $parent.getUserId()"
      :to="`/users/${user.id}/edit`"
    >
      <button>Edit Profile</button>
    </router-link>
    <div v-for="artwork in user.artworks">
      <div v-for="image in artwork.images">
        <img :src="image.url" alt="" />
      </div>
      <router-link :to="`/artworks/${artwork.id}`">
        <h2>{{ artwork.title }}</h2>
      </router-link>
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
      <button v-if="artwork.upvote" v-on:click="destroyUpvote(artwork)">
        Destroy Upvote
      </button>
      <button v-else v-on:click="createUpvote(artwork)">Upvote</button>
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
    createUpvote: function(artwork) {
      let params = {
        artwork_id: artwork.id,
      };
      axios
        .post("/api/upvotes", params)
        .then((response) => {
          artwork.upvote = true;
          artwork.upvotes_count++;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          console.log(this.errors);
        });
    },
    destroyUpvote: function(artwork) {
      axios
        .delete(`/api/upvotes/${artwork.id}`)
        .then((response) => {
          artwork.upvote = false;
          artwork.upvotes_count--;
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
