<template>
  <div class="colleges-index">
    <!-- HEADER -->
    <section
      class="module module-header bg-dark bg-dark-50"
      data-background="/assets/images/section-7.jpg"
      style="background-image: url(/assets/images/section-7.jpg);"
    >
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <h1 class="module-title font-alt align-center">Post title</h1>

            <div class="module-subtitle font-inc align-center">
              <div class="post-meta font-inc">
                By <a href="#">Thomas Anderson</a> | 31 DEC 2014 | 3 Comments |
                <a href="#">Photography</a>, <a href="#">Web Design</a>
              </div>
            </div>
          </div>
        </div>
        <!-- /MODULE TITLE -->
      </div>
    </section>
    <!-- /HEADER -->
    <!-- PORTFOLIO DESCRIPTION -->
    <section class="module-small">
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="work-details">
              <h3 class="work-details-title font-alt">Description</h3>
              <ul>
                <li class="font-inc"><strong>Client: </strong>SomeCompany</li>
                <li class="font-inc">
                  <strong>Date: </strong>23 November, 2015
                </li>
                <li class="font-inc">
                  <strong>Online: </strong
                  ><a href="#" target="_blank">www.example.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-sm-6">
            <p>
              The languages only differ in their grammar, their pronunciation
              and their most common words. Everyone realizes why a new common
              language would be desirable: one could refuse to pay expensive
              translators.
            </p>
            <p>
              The languages only differ in their grammar, their pronunciation
              and their most common words. Everyone realizes why a new common
              language would be desirable: one could refuse to pay expensive
              translators.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- /PORTFOLIO DESCRIPTION -->

    <!-- PORTFOLIO CONTENT -->
    <section class="module p-t-0 p-b-0">
      <!-- PORTFOLIO LIST -->
      <ul
        id="works-grid"
        class="works-grid works-grid-masonry works-grid-2 works-hover-w"
      >
        <!-- PORTFOLIO ITEM -->
        <li
          class="work-item"
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
          <a href="assets/images/work-1.jpg" class="popup" title="Work 1">
            <div class="work-image">
              <img :src="college.image_url" alt="" />
            </div>
            <div class="work-caption">
              <h3 class="work-title font-alt">
                <span class="icon-magnifying-glass"></span>
              </h3>
            </div>
          </a>
        </li>
        <!-- /PORTFOLIO ITEM -->
      </ul>
    </section>
    <!-- /PORTFOLIO CONTENT -->

    <!-- MY OLD CODE -->
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
      <h2>{{ college.name }}</h2>
      <p>{{ college.abbreviation }}</p>
      <p>{{ college.city }}, {{ college.state }}</p>
      <p>{{ college.bio }}</p>
      <h5 class="category">
        {{ college.users.length }} Student Artists Represented
      </h5>
      <router-link :to="`/colleges/${college.id}`">
        <button>Explore Student Artists</button>
      </router-link>
    </div>
  </div>
</template>
//
---------------------------------------------------------------------------------
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
    this.$parent.headerImagePath = "section-7.jpg";
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
