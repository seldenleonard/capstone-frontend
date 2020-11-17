<template>
  <div class="colleges-index">
    <section
      id="home"
      class="module-hero module-parallax module-fade module-full-height"
      style="height: 766px; top: 0px; opacity: 1;"
    >
      <div class="hero-slider">
        <ul class="slides">
          <!-- SLIDE -->
          <li
            class="bg-dark"
            style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
          >
            <div
              class="slidebg slide-zoom bg-dark-30"
              style="background-image:url(assets/images/section-2.jpg)"
            ></div>

            <div class="hs-caption container" style="top: 0px; display: table;">
              <div class="caption-content">
                <div class="hs-title-size-3 font-alt m-b-20">
                  We are Semantic
                </div>
                <div class="hs-title-size-1 font-inc">
                  A wonderful serenity has taken possession of my entire soul,
                  like these<br />
                  sweet mornings of spring which I enjoy with my whole heart
                </div>
              </div>
            </div>
          </li>
          <!-- /SLIDE -->

          <!-- SLIDE -->
          <li
            class="bg-light"
            style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;"
          >
            <div
              class="slidebg slide-zoom bg-light-30"
              style="background-image:url(assets/images/section-9.jpg)"
            ></div>

            <div class="hs-caption container" style="top: 0px; display: table;">
              <div class="caption-content left">
                <div class="hs-title-size-3 font-alt m-b-20">
                  Incoming call
                </div>
                <div class="hs-title-size-1 font-inc">
                  A wonderful serenity has taken possession of my entire soul,
                  like these<br />
                  sweet mornings of spring which I enjoy with my whole heart
                </div>
              </div>
            </div>
          </li>
          <!-- /SLIDE -->

          <!-- SLIDE -->
          <li
            class="bg-dark flex-active-slide"
            style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;"
          >
            <div
              class="slidebg slide-zoom bg-dark-50"
              style="background-image:url(assets/images/section-8.jpg)"
            ></div>

            <div class="hs-caption container" style="top: 0px; display: table;">
              <div class="caption-content right">
                <div class="hs-title-size-3 font-alt m-b-20">
                  Yellow coat
                </div>
                <div class="hs-title-size-1 font-inc">
                  A wonderful serenity has taken possession of my entire soul,
                  like these<br />
                  sweet mornings of spring which I enjoy with my whole heart
                </div>
              </div>
            </div>
          </li>
          <!-- /SLIDE -->
        </ul>
        <ol class="flex-control-nav flex-control-paging">
          <li><a class="">1</a></li>
          <li><a class="">2</a></li>
          <li><a class="flex-active">3</a></li>
        </ol>
        <ul class="flex-direction-nav">
          <li><a class="flex-prev" href="#"></a></li>
          <li><a class="flex-next" href="#"></a></li>
        </ul>
      </div>
    </section>
    <!-- <div>
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
    </div> -->
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
