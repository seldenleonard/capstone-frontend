<template>
  <div class="artworks-index">
    <!-- WRAPPER -->
    <div class="wrapper">
      <!-- HOME -->
      <section
        class="module module-header bg-dark bg-dark-50"
        data-background="/assets/images/section-7.jpg"
        style="background-image: url(/assets/images/section-7.jpg);"
      >
        <div class="container">
          <!-- MODULE TITLE -->
          <div class="row">
            <div class="col-sm-6 col-sm-offset-3">
              <h1 class="module-title font-alt align-center">
                <i class="fa fa-paint-brush"></i>
                <p></p>
                Artworks
              </h1>

              <div class="module-subtitle font-inc align-center">
                <i class="fa fa-quote-left"></i>
                To string incongruities and absurdities together in a wandering
                and sometimes purposeless way, and seem innocently unaware that
                they are absurdities, is the basis of the American art, if my
                position is correct.
                <i class="fa fa-quote-right"></i>

                <strong>
                  <p class="font-inc font-uppercase">- Mark Twain</p>
                </strong>
              </div>
            </div>
          </div>
          <!-- /MODULE TITLE -->
        </div>
      </section>
      <!-- /HOME -->

      <!-- PORTFOLIO -->
      <section class="module-small p-t-30">
        <div class="container">
          <!-- PORTFOLIO FILTER -->
          <div class="row">
            <div class="col-sm-12">
              <datalist id="titles">
                <option v-for="artwork in artworks">{{ artwork.title }}</option>
              </datalist>
              <ul id="filters" class="filter font-inc hidden-xs p-t-20">
                <li>
                  <div class="form-group">
                    <strong
                      ><input
                        class="form-control input-md"
                        v-model="allAttributeFilter"
                        placeholder="Search"
                    /></strong>
                  </div>
                </li>
                <li>
                  <router-link
                    to="#"
                    data-filter="*"
                    class="current wow fadeInUp"
                    ><button
                      type="submit"
                      class="btn btn-border-d btn-circle"
                      v-on:click="setSortAttribute('title')"
                    >
                      Sort by Title
                    </button></router-link
                  >
                </li>
                <li>
                  <router-link
                    to="#"
                    data-filter="*"
                    class="current wow fadeInUp"
                    ><button
                      type="submit"
                      class="btn btn-border-d btn-circle"
                      v-on:click="setSortAttribute('year')"
                    >
                      Sort by Year
                    </button></router-link
                  >
                </li>
                <li>
                  <router-link
                    to="#"
                    data-filter="*"
                    class="current wow fadeInUp"
                    ><button
                      type="submit"
                      class="btn btn-border-d btn-circle"
                      v-on:click="setSortAttribute('medium')"
                    >
                      Sort by Medium
                    </button></router-link
                  >
                </li>
                <li>
                  <router-link
                    to="#"
                    data-filter="*"
                    class="current wow fadeInUp"
                    ><button
                      type="submit"
                      class="btn btn-border-d btn-circle"
                      v-on:click="setSortAttribute('college')"
                    >
                      Sort by College
                    </button></router-link
                  >
                </li>
              </ul>
              <strong
                ><div class="divider py-1 bg-dark"><hr /></div>
              </strong>
            </div>
          </div>
          <!-- /PORTFOLIO FILTER -->

          <!-- PORTFOLIO LIST -->
          <ul
            id="works-grid"
            class="works-grid works-grid-3 works-hover-w"
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
            <!-- PORTFOLIO ITEM -->
            <li
              class="work-item illustration webdesign"
              v-for="image in artwork.images"
            >
              <router-link :to="`/artworks/${artwork.id}`">
                <div class="work-image">
                  <img :src="image.url" alt="" />
                </div>
                <div class="work-caption">
                  <h3 class="work-title font-alt">{{ artwork.title }}</h3>
                  <div class="work-descr font-inc">
                    {{ artwork.user.name }}<br />
                    {{ artwork.college.abbreviation }}
                  </div>
                </div>
              </router-link>
            </li>

            <!-- /PORTFOLIO ITEM -->
          </ul>
          <!-- /PORTFOLIO LIST -->
        </div>
      </section>
      <!-- /PORTFOLIO -->

      <!-- PAGINATION -->
      <section class="module-small p-t-0">
        <div class="container">
          <div class="pagination font-inc text-uppercase">
            <router-link to="#"
              ><i class="fa fa-angle-left"></i> Prev</router-link
            >
            <router-link to="#"
              >Next <i class="fa fa-angle-right"></i
            ></router-link>
          </div>
        </div>
      </section>
      <!-- /PAGINATION -->

      <!-- DIVIDER -->
      <hr class="divider-w" />
      <!-- /DIVIDER -->
    </div>
    <!-- /WRAPPER -->

    <!-- MY OLD CODE -->
    <!-- <div>
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
      <p v-if="artwork.dimensions">Dimensions: {{ artwork.dimensions }}</p>
      <p v-if="artwork.description">Description: {{ artwork.description }}</p>
      <p v-if="artwork.price">Price: $ {{ artwork.price }}</p>
      <p>Upvotes: {{ artwork.upvotes_count }}</p>
      <h5 class="category">Posted {{ relativeDate(artwork.created_at) }}</h5> -->
    <!-- CONSIDER REMOVING SOME OF THIS INFO AND LEAVING ONLY "artwork.title", "artwork.user.name", "artist.college.abbreviation", "artist.college.graduation_year", "artwork.year", "artwork.upvotes.count", and maybe "artwork.medium" -->
    <!-- <button v-if="artwork.upvote" v-on:click="destroyUpvote(artwork)">
        Destroy Upvote
      </button>
      <button v-else v-on:click="createUpvote(artwork)">Upvote</button> -->
    <!-- Note: I will need to put a v:if in my routerlink tag to say that if current user id from local storage matches the id of the user show, then the edit button will be available (need to do this for the user edit button above as well). it will look something like this: v-if="artwork.user.id === $parent.getUserId()" -->
    <!-- <router-link :to="`/artworks/${artwork.id}`">
        <button>More Info</button>
      </router-link> -->
    <!-- </div> -->
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
          console.log(response.data);
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
