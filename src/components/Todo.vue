<template>
  <div class="hello">
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">{{
          todo.title
        }}</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener">{{
          todo.completed
        }}</a>
      </li>
      <li>
        <a
          @click.prevent="displayAlert"
          href="https://forum.vuejs.org"
          target="_blnk"
          rel="noopener"
          >{{ getUserName(todo.userId) }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorService from "../Services/ErrorService";

export default {
  name: "HelloWorld",
  props: {
    todo: Object,
  },
  computed: {
    ...mapGetters(["getUser"]),
  },

  methods: {
    getUserName(id) {
      const user = this.getUser(id);
      if (user) return user.username;
    },

    // Handling Errors in component
    methodThrowsException() {
      try {
        // Do unexpected job
      } catch (error) {
        ErrorService.onError(error);
      }
    },

    displayAlert() {
      ErrorService.displayErrorAlert("Testing message");
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
