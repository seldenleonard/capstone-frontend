<template>
  <div class="colleges-index">
    <div>
      <input type="text" v-model="allAttributeFilter" placeholder="Search" />
      <datalist id="names">
        <option v-for="college in colleges">{{ college.name }}</option>
      </datalist>
      <button v-on:click="setSortAttribute('name')">
        Sort by Name
      </button>
      <button v-on:click="setSortAttribute('state')">
        Sort by State
      </button>
    </div>

    <div
      v-for="college in orderBy(
        filterBy(
          colleges,
          allAttributeFilter,
          'name',
          'abbreviation',
          'city',
          'state',
          'dimensions'
        ),
        sortAttribute
      )"
    >
      <img :src="college.image_url" alt="" />
      <!-- NEED HELP GETTING IMAGES TO SHOW UP -->
      <h2>{{ college.name }}</h2>
      <p>{{ college.abbreviation }}</p>
      <p>{{ college.city }}</p>
      <p>{{ college.state }}</p>
      <p>{{ college.bio }}</p>
      <h5 class="category">
        <!-- {{ college.users.length }} of student artists showing work -->
        <!-- DONT QUITE UNDERSTAND WHY THIS^ DOESNT WORK -->
      </h5>
      <router-link :to="`/colleges/${college.id}`">
        <button>Explore Student Artists</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      colleges: [],
      errors: [],
      allAttributeFilter: "",
      sortAttribute: "",
    };
  },
  created: function() {
    axios
      .get("api/colleges")
      .then((response) => {
        console.log(response.data);
        this.colleges = response.data;
      })
      .catch((error) => {
        this.errors = error.response.data.errors;
      });
  },
  methods: {
    setSortAttribute: function(attribute) {
      this.sortAttribute = attribute;
    },
  },
};
</script>
