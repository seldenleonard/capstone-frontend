<template>
  <div class="colleges-index">
    <!-- HEADER -->
    <section
      class="module module-header bg-dark bg-dark-50"
      data-background="/assets/images/section-7.jpg"
      style="background-image: url(/assets/images/Sky-unsplash.jpg);"
    >
      <div class="container">
        <!-- MODULE TITLE -->
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2">
            <h1 class="module-title font-alt align-center">
              <i class="fa fa-institution"></i>
              <p></p>
              Colleges
            </h1>

            <div class="module-subtitle font-inc align-center">
              <i class="fa fa-quote-left"></i>
              The future belongs to young people with an education and the
              imagination to create
              <i class="fa fa-quote-right"></i>

              <strong>
                <p class="font-inc font-uppercase">- Barack Obama</p>
              </strong>
            </div>
          </div>
        </div>
        <!-- /MODULE TITLE -->
      </div>
    </section>
    <!-- /HEADER -->

    <!-- PORTFOLIO DESCRIPTION -->
    <section class="module-small p-b-30">
      <div class="container">
        <div class="row p-b-30">
          <div class="col-sm-6">
            <div class="work-details">
              <h3 class="work-details-title font-alt">
                <strong> Art & The American Collegiate Experience </strong>
              </h3>
              <h5 class="work-details-title font-alt">
                <em
                  >Fostering Creative Vision and Realization; A Cultural Lens
                  for Critical Analysis
                </em>
              </h5>
              <p>
                <strong>Art U</strong> believes in the power of education, and
                particularly the American collegiate experience as a unique
                opportunity to live and create in a collaborative exploratory
                environment. We seek to highlight the artists whose work and
                style were, at least in part, realized through the distinct
                pressures, experiences, and lifestyles that are fostered in
                American colleges and universities. Across these institutions,
                there is a marked culture of learning and embracing college as
                not only a formal education, but also as fundamental to shaping
                and grounding nearly all aspects of one's life for a period of
                years. Existing within this broader culture, there is certainly
                a great degree of variation between any two colleges in the
                United States, which is exactly why we give you the opportunity
                to explore them all, and see those differences, similarities,
                and recurring themes as they are conveyed through the artworks
                of students.
              </p>
            </div>
          </div>

          <div class="col-sm-6">
            <blockquote class="font-serif align-right">
              <br /><br />
              <p>
                "Art does not reproduce what we see. It makes us see."
              </p>
              <p class="font-inc font-uppercase">
                <strong>- Paul Klee</strong>
              </p>
            </blockquote>
            <blockquote class="font-serif align-right">
              <br />
              <p>
                "I like to pretend that my art has nothing to do with me."
              </p>
              <p class="font-inc font-uppercase">
                <strong>- Roy Lichtenstein</strong>
              </p>
            </blockquote>
            <blockquote class="font-serif align-right">
              <br />
              <p>
                "The job of the artist is always to deepen the mystery."
              </p>
              <p class="font-inc font-uppercase">
                <strong>- Francis Bacon</strong>
              </p>
            </blockquote>
          </div>
        </div>
        <strong>
          <div class="divider py-1 bg-dark"><hr /></div>
        </strong>
      </div>
    </section>
    <!-- /PORTFOLIO DESCRIPTION -->

    <!-- PORTFOLIO FILTER -->
    <section class="module-small p-b-0 p-t-0">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h3 class="font-alt font-uppercase text-center">
              <strong> Explore Colleges </strong>
            </h3>
            <datalist id="names">
              <option v-for="college in colleges">{{ college.name }}</option>
            </datalist>
            <ul id="filters" class="filter font-inc hidden-xs p-t-20">
              <li>
                <router-link
                  to="#"
                  data-filter="*"
                  class="current wow fadeInUp animated"
                  style="visibility: visible; animation-name: fadeInUp;"
                  ><button
                    type="submit"
                    class="btn btn-d btn-circle btn-lg"
                    v-on:click="setSortAttribute('name')"
                  >
                    <strong> Sort by Name </strong>
                  </button></router-link
                >
              </li>
              <li>
                <router-link
                  to="#"
                  data-filter="*"
                  class="current wow fadeInUp animated"
                  style="visibility: visible; animation-name: fadeInUp;"
                  ><button
                    type="submit"
                    class="btn btn-d btn-circle btn-lg"
                    v-on:click="setSortAttribute('state')"
                  >
                    <strong> Sort by State </strong>
                  </button></router-link
                >
              </li>
            </ul>
            <strong>
              <div class="divider py-1 bg-dark"><hr /></div>
            </strong>
          </div>
        </div>
      </div>
    </section>
    <!-- /PORTFOLIO FILTER -->

    <!-- PORTFOLIO CONTENT -->
    <section class="module p-t-0 p-b-70">
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
          <router-link
            :to="`/colleges/${college.id}`"
            class="popup"
            title="Work 1"
          >
            <div class="work-image">
              <img :src="college.image_url" alt="" />
            </div>
            <div class="work-caption">
              <h3 class="work-title font-alt">
                <span class="icon-magnifying-glass"></span>
                <br /><br />
                <strong>{{ college.name }}</strong
                ><br />
                {{ college.city }}, {{ college.state }}
              </h3>
            </div>
          </router-link>
        </li>
        <!-- /PORTFOLIO ITEM -->
      </ul>
    </section>
    <!-- /PORTFOLIO CONTENT -->

    <strong
      ><div class="divider py-1 bg-dark"><hr /></div>
    </strong>
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
