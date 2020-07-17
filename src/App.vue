<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Todo :todo="todo" v-for="todo in todos" :key="todo.id" />
  </div>
</template>

<script>
import Todo from "./components/Todo.vue";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Todo
  },
  computed: {
    ...mapState({
      todos: state => state.todos
    })
  },
  created() {
    this.$store.dispatch("getTodos");
    this.$store.dispatch("getUsers");
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
