<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Users</h1>

    <router-link
      to="/users/new"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add User
    </router-link>

    <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th
            class="py-2 px-4 text-left cursor-pointer"
            @click="sortBy('id')"
          >
            ID <span>{{ sortSymbol('id') }}</span>
          </th>
          <th
            class="py-2 px-4 text-left cursor-pointer"
            @click="sortBy('name')"
          >
            Name <span>{{ sortSymbol('name') }}</span>
          </th>
          <th
            class="py-2 px-4 text-left cursor-pointer"
            @click="sortBy('email')"
          >
            Email <span>{{ sortSymbol('email') }}</span>
          </th>
          <th
            class="py-2 px-4 text-left cursor-pointer"
            @click="sortBy('role')"
          >
            Role <span>{{ sortSymbol('role') }}</span>
          </th>
          <th
          class="py-2 px-4 text-left cursor-pointer"
          >
          Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in sortedUsers"
          :key="user.id"
          class="hover:bg-gray-50 border-b"
        >
          <td class="py-2 px-4">{{ user.id }}</td>
          <td class="py-2 px-4">{{ user.name }}</td>
          <td class="py-2 px-4">{{ user.email }}</td>
          <td class="py-2 px-4">{{ user.role }}</td>
          <td class="py-2 px-4" space-x-2>
            <router-link
              :to="`/users/${user.id}/edit`"
              class="text-blue-600 hover:underline mr-2"
            >
              Edit
            </router-link>
            <button
              @click="removeUser(user.id)"
              class="text-red-600 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="4" class="text-center py-4 text-gray-400">
            No users found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("users/fetchUsers");
    });

    const users = computed(() => store.state.users.list);

    const sortField = ref("");
    const sortAsc = ref(true);

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value; // toggle order
      } else {
        sortField.value = field;
        sortAsc.value = true;
      }
    };

    const sortSymbol = (field) => {
      if (sortField.value !== field) return "";
      return sortAsc.value ? "▲" : "▼";
    };

    const sortedUsers = computed(() => {
      if (!sortField.value) return users.value;

      return [...users.value].sort((a, b) => {
        const aVal = a[sortField.value];
        const bVal = b[sortField.value];

        // handle numbers
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortAsc.value ? aVal - bVal : bVal - aVal;
        }

        // handle strings
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return sortAsc.value ? -1 : 1;
        if (aStr > bStr) return sortAsc.value ? 1 : -1;
        return 0;
      });
    });

    const removeUser = (id) => {
      if (confirm("Are you sure you want to delete this user?")) {
        store.dispatch("users/deleteUser", id);
      }
    };  

    return { users, sortedUsers, sortBy, sortSymbol, removeUser };
  },
};
</script>
