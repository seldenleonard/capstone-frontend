<template>
  <div class="users-show">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <p>{{ user.artist }}</p>
    <p>{{ user.bio }}</p>
    <p>{{ user.art_style }}</p>
    <p>{{ user.image_url }}</p>
    <p>{{ user.college_id }}</p>
    <p>{{ user.major }}</p>
    <p>{{ user.minor }}</p>
    <p>{{ user.graduation_year }}</p>
    <router-link :to="`/users/${user.id}/edit`">
      <!-- This^ means same as v-bind -->
      <button>Edit</button>
    </router-link>
    <div v-for="artwork in user.artworks">
      <div v-for="image in artwork.images">
        <img :src="image.url" alt="" />
      </div>
      <!-- NEED HELP GETTING IMAGES TO SHOW UP (NOT SURE WHY WHAT I COMMENTED-OUT ABOVE DOES NOT WORK, IT WORKS IN ArtworksShow.vue) -->
      <h2>{{ artwork.title }}</h2>
      <p>{{ artwork.medium }}</p>
      <p>{{ artwork.description }}</p>
      <p>$ {{ artwork.price }}</p>
      <p>{{ artwork.dimensions }}</p>
      <p>{{ artwork.year }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <!-- Note: I will need to put a v:if in my routerlink tag to say that if current user id from local storage matches the id of the user show, then the edit button will be available (need to do this for the user edit button above as well). it will look something like this: v-if="artwork.user.id === $parent.getUserId()" -->
      <router-link :to="`/artworks/${artwork.id}/edit`">
        <!-- This^ means same as v-bind -->
        <button>Edit</button>
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
