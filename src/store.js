import Vue from "vue";
import Vuex from "vuex";
import { ErrorService } from "./Services/ErrorService";
import axios from "axios";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    todos: [],
    errors: [],
    users: [],
  },

  actions: {
    async getTodos({ commit }) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/todos`
        );
        const { data } = response;
        commit("STORE_TODOS", data);
      } catch (error) {
        // Handling HTTPs Errors
        commit("STORE_ERRORS", error);
      }
    },

    async getUsers({ commit }) {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users`
        );
        const { data } = response;
        commit("STORE_USERS", data);
      } catch (error) {
        // Handling HTTPs Errors
        commit("STORE_ERRORS", error);
      }
    },
  },

  mutations: {
    STORE_TODOS: (state, data) => {
      state.todos = data;
    },

    STORE_ERRORS: (state, error) => {
      // Call Error Service here
      ErrorService.onError(error);
      ErrorService.initHandler();

      // Store error to state(optional)
      if (error.response) {
        state.errors = error.response;
      }
    },

    STORE_USERS: (state, data) => {
      state.users = data;
    },
  },

  getters: {
    getTodo: (state) => (id) => {
      return state.todos.find((todo) => todo.id == id);
    },
    getUser: (state) => (id) => {
      return state.users.find((user) => user.id == id);
    },
  },

  // strict: true
});

export default store;
