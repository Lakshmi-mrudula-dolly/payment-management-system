<template>
  <div class="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">
      {{ isEdit ? "Edit User" : "Add User" }}
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-gray-600 mb-1">Name</label>
        <input
          v-model="form.name"
          type="text"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          required
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Email</label>
        <input
          v-model="form.email"
          type="email"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          required
        />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Role</label>
        <select
          v-model="form.role"
          class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Finance Manager">Finance Manager</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      <button
        type="submit"
        :disabled="!!emailError"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {{ isEdit ? "Update User" : "Create User" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isEdit = !!route.params.id;

    const form = ref({
      name: "",
      email: "",
      role: "",
    });

    const emailError = ref("");

    // Load existing user if editing
    onMounted(() => {
      if (isEdit) {
        const user = store.state.users.list.find(
          (u) => u.id === parseInt(route.params.id)
        );
        if (user) Object.assign(form.value, user);
      }
    });

    // Watch email changes for validation
    watch(
      () => form.value.email,
      (newVal) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailError.value = pattern.test(newVal) ? "" : "Invalid email format";
      }
    );

    const submitForm = () => {
      if (emailError.value) return; // prevent invalid submit

      if (isEdit) {
        store.dispatch("users/updateUser", form.value);
      } else {
        store.dispatch("users/createUser", form.value);
      }
      router.push("/users");
    };

    return { form, submitForm, isEdit, emailError };
  },
};
</script>
