const STORAGE_KEY = "users";

function loadUsers() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  // Add mock users if storage is empty
  const mockUsers = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Viewer" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Finance Manager" },
    { id: 4, name: "Diana", email: "diana@example.com", role: "Viewer" },
    { id: 5, name: "Eve", email: "eve@example.com", role: "Admin" },
    { id: 6, name: "Frank", email: "frank@example.com", role: "Finance Manager" }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
  return mockUsers;
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export default {
  namespaced: true,
  state: () => ({
    list: loadUsers()
  }),
  mutations: {
    SET_USERS(state, users) {
      state.list = users;
      saveUsers(state.list);
    },
    ADD_USER(state, user) {
      state.list.push(user);
      saveUsers(state.list);
    },
    UPDATE_USER(state, updated) {
      const idx = state.list.findIndex(u => u.id === updated.id);
      if (idx !== -1) state.list[idx] = { ...updated};
      saveUsers(state.list);
    },
    DELETE_USER(state, id) {
      state.list = state.list.filter(u => u.id !== id);
      saveUsers(state.list);
    }
  },
  actions: {
    fetchUsers({ commit }) {
      const users = loadUsers();
      commit("SET_USERS", users);
    },
    createUser({ commit, state }, user) {
      const newUser = {
        ...user,
        id: state.list.length ? Math.max(...state.list.map(u => u.id)) + 1 : 1
      };
      commit("ADD_USER", newUser);
    },
    updateUser({ commit }, user) {
      commit("UPDATE_USER", user);
    },
    deleteUser({ commit }, id) {
      commit("DELETE_USER", id);
    }
  }
};
