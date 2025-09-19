let mockUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "Viewer" }
];

export default {
  namespaced: true,
  state: () => ({
    list: []
  }),
  mutations: {
    SET_USERS(state, users) {
      state.list = users;
    },
    ADD_USER(state, user) {
      state.list.push(user);
    },
    UPDATE_USER(state, updated) {
      const idx = state.list.findIndex(u => u.id === updated.id);
      if (idx !== -1) state.list[idx] = updated;
    },
    DELETE_USER(state, id) {
      state.list = state.list.filter(u => u.id !== id);
    }
  },
  actions: {
    fetchUsers({ commit }) {
      commit("SET_USERS", mockUsers);
    },
    createUser({ commit }, user) {
      const newUser = { ...user, id: Date.now() };
      mockUsers.push(newUser);
      commit("ADD_USER", newUser);
    },
    updateUser({ commit }, user) {
      const idx = mockUsers.findIndex(u => u.id === user.id);
      if (idx !== -1) mockUsers[idx] = user;
      commit("UPDATE_USER", user);
    },
    deleteUser({ commit }, id) {
      mockUsers = mockUsers.filter(u => u.id !== id);
      commit("DELETE_USER", id);
    }
  }
};
