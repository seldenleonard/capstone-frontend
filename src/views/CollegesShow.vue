<template>
  <div class="colleges-show">
    <img :src="college.image_url" alt="" />
    <h1>{{ college.name }}</h1>
    <p>{{ college.abbreviation }}</p>
    <p>{{ college.city }}, {{ college.state }}</p>
    <p>{{ college.bio }}</p>
    <div v-for="user in college.users">
      <img :src="user.image_url" alt="" />
      <h2>{{ user.name }}</h2>
      <p>Class of {{ user.graduation_year }}</p>
      <p>{{ user.major }} Major</p>
      <p>{{ user.minor }} Minor</p>
      <p>Style of Art is {{ user.art_style }}</p>
      <p>{{ user.bio }}</p>
      <!-- <div v-for="artwork in user.artworks"> -->
      <!-- <p>{{ artwork.title }}</p> -->
      <!-- <img :src="image" alt="" /> -->
      <!-- <div v-for="artwork in user.artworks"> -->
      <!-- <p>{{ artwork.images.url }}</p> -->
      <!-- </div> -->
      <!-- </div> -->
      <!-- THIS IS AN ATTEMPT TO HAVE SOME OF EACH ARTISTS' ARTWORKS IMAGES SHOW UP, BUT IT IS NOT MVP SO DONT BOTHER FOR NOW -->
      <router-link :to="`/users/${user.id}`">
        <!-- This^ means same as v-bind -->
        <button>View Artist</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      college: {},
      errors: [],
    };
  },
  created: function() {
    axios
      .get(`/api/colleges/${this.$route.params.id}`)
      .then((response) => {
        console.log(response.data);
        this.college = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
};
</script>
