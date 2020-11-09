<template>
  <div class="artworks-index">
    <div>
      <input type="text" v-model="allAttributeFilter" placeholder="Search" />
      <datalist id="titles">
        <option v-for="artwork in artworks">{{ artwork.title }}</option>
      </datalist>
      <button v-on:click="setSortAttribute('title')">
        Sort by Title
      </button>
      <button v-on:click="setSortAttribute('year')">
        Sort by Year
      </button>
    </div>

    <div
      v-for="artwork in orderBy(
        filterBy(
          artworks,
          allAttributeFilter,
          'title',
          'medium',
          'description',
          'price',
          'dimensions',
          'year'
        ),
        sortAttribute
      )"
    >
      <img :src="artwork.image" alt="" />
      <!-- NEED HELP GETTING IMAGES TO SHOW UP -->
      <h2>{{ artwork.title }}</h2>
      <!-- Need to add in the User who created the artwork -->
      <!-- Need to add in that User's college as well -->
      <p>{{ artwork.medium }}</p>
      <p>{{ artwork.description }}</p>
      <p>$ {{ artwork.price }}</p>
      <p>{{ artwork.dimensions }}</p>
      <p>{{ artwork.year }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <!-- Note: I will need to put a v:if in my routerlink tag to say that if current user id from local storage matches the id of the user show, then the edit button will be available (need to do this for the user edit button above as well). it will look something like this: v-if="artwork.user.id === $parent.getUserId()" -->
      <router-link :to="`/artworks/${artwork.id}`">
        <button>More Info</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      artworks: [],
      errors: [],
      allAttributeFilter: "",
      sortAttribute: "",
    };
  },
  created: function() {
    axios
      .get("api/artworks")
      .then((response) => {
        console.log(response.data);
        this.artworks = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
  },
};
</script>
