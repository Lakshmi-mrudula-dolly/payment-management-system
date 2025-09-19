<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Users</h1>

    <router-link
      to="/users/new"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add User
    </router-link>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 text-left text-gray-600">ID</th>
            <th class="py-2 px-4 text-left text-gray-600">Name</th>
            <th class="py-2 px-4 text-left text-gray-600">Email</th>
            <th class="py-2 px-4 text-left text-gray-600">Role</th>
            <th class="py-2 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 border-b"
          >
            <td class="py-2 px-4">{{ user.id }}</td>
            <td class="py-2 px-4">{{ user.name }}</td>
            <td class="py-2 px-4">{{ user.email }}</td>
            <td class="py-2 px-4">{{ user.role }}</td>
            <td class="py-2 px-4 space-x-2">
              <router-link
                :to="`/users/${user.id}/edit`"
                class="text-blue-600 hover:underline"
              >
                Edit
              </router-link>
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="users.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-400">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("users/fetchUsers");
    });

    const users = computed(() => store.state.users.list);

    const deleteUser = (id) => {
      if (confirm("Are you sure you want to delete this user?")) {
        store.dispatch("users/deleteUser", id);
      }
    };

    return { users, deleteUser };
  },
};
</script>
