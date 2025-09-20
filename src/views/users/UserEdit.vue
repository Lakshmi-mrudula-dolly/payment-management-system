<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Edit User</h2>

    <form v-if="form" @submit.prevent="save" class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <label class="block font-semibold mb-1">Name</label>
        <input v-model="form.name" type="text" class="border rounded px-3 py-2 w-full" required />
      </div>

      <div>
        <label class="block font-semibold mb-1">Email</label>
        <input v-model="form.email" type="email" class="border rounded px-3 py-2 w-full" required />
      </div>

      <div>
        <label class="block font-semibold mb-1">Role</label>
        <select v-model="form.role" class="border rounded px-3 py-2 w-full" required>
          <option value="Admin">Admin</option>
          <option value="Finance Manager">Finance Manager</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      <div class="flex space-x-2">
        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
        <router-link to="/users" class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
          Cancel
        </router-link>
      </div>
    </form>

    <div v-else class="text-gray-500">Loading...</div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const id = Number(route.params.id);

    const form = reactive({
      id,
      name: "",
      email: "",
      role: "Viewer",
    });

    onMounted(() => {
      const user = store.state.users.list.find((u) => u.id === id);
      if (user) {
        form.name = user.name;
        form.email = user.email;
        form.role = user.role;
      }
    });

    const save = () => {
      store.dispatch("users/updateUser", { ...form });
      router.push("/users");
    };

    return { form, save };
  },
};
</script>
