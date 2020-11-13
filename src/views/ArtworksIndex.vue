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
      <button v-on:click="setSortAttribute('medium')">
        Sort by Medium
      </button>
      <button v-on:click="setSortAttribute('college')">
        Sort by College
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
          'year',
          'user.name',
          'college.name',
          'college.abbreviation',
          'college.city',
          'college.state'
        ),
        sortAttribute
      )"
    >
      <div v-for="image in artwork.images">
        <img :src="image.url" alt="" />
      </div>
      <h2>{{ artwork.title }}</h2>
      <router-link :to="`/users/${artwork.user.id}`">
        <p>{{ artwork.user.name }}</p>
      </router-link>
      <p>
        {{ artwork.college.abbreviation }}, Class of
        {{ artwork.user.graduation_year }}
      </p>
      <p>Date: {{ artwork.year }}</p>
      <p>Medium: {{ artwork.medium }}</p>
      <p>Dimensions: {{ artwork.dimensions }}</p>
      <p>Description: {{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5>
      <!-- CONSIDER REMOVING SOME OF THIS INFO AND LEAVING ONLY "artwork.title", "artwork.user.name", "artist.college.abbreviation", "artist.college.graduation_year", "artwork.year", "artwork.upvotes.count", and maybe "artwork.medium" -->
      <button v-if="artwork.upvote" v-on:click="destroyUpvote()">
        Destroy Upvote
      </button>
      <button v-else v-on:click="createUpvote()">Upvote</button>
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
    // MY createUpvote AND destroyUpvote ACTIONS ALMOST WORK, BUT IM GETTING THE ERROR THAT "id" IS UNDEFINED (same thing in my UsersShow.vue)
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
