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

    <!-- Note: I will need to put a v:if in my routerlink tag to say that if current user id from local storage matches the id of the user show, then the edit button will be available -->
    <router-link :to="`/users/${user.id}/edit`">
      <!-- This^ means same as v-bind -->
      <button>Edit</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

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
  methods: {},
};
</script>
