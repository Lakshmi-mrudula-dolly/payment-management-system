export default ({
      namespaced: true,
      state: () => ({
        list: []
      }),
      mutations: {
        ADD_USER(state, user) {
          state.list.push(user);
        },
        SET_USERS(state, users) {
          state.list = users;
        }
      },
      actions: {
        createUser({ commit }, user) {
          commit("ADD_USER", user);
        },
        async fetchUsers({commit}){
            const data = [
                {id:1,name:'Alice',email:'alice.@example.com',role:'Admin'},
                {id:2,name:'BoB',email:'bob@example.com',role:'Finance Manager'}
            ];
            commit("SET_USERS",data);
        }
      }
});