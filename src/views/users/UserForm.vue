<template>
  <div class="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4">{{ isEdit ? "Edit User" : "Add User" }}</h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label>Name</label>
        <input v-model="form.name" type="text" class="w-full border rounded p-2" required />
      </div>

      <div>
        <label>Email</label>
        <input v-model="form.email" type="email" class="w-full border rounded p-2" required />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div>
        <label>Role</label>
        <select v-model="form.role" class="w-full border rounded p-2" required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Finance Manager">Finance Manager</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      <button type="submit" :disabled="!!emailError" class="bg-green-600 text-white px-4 py-2 rounded">
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

    const form = ref({ name: "", email: "", role: "" });
    const emailError = ref("");

    onMounted(() => {
      if (isEdit) {
        const user = store.state.users.list.find(u => u.id === parseInt(route.params.id));
        if (user) Object.assign(form.value, user);
      }
    });

    watch(
      () => form.value.email,
      (val) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        emailError.value = pattern.test(val) ? "" : "Invalid email format";
      }
    );

    const submitForm = () => {
      if (emailError.value) return;
      if (isEdit) store.dispatch("users/updateUser", form.value);
      else store.dispatch("users/createUser", form.value);
      router.push("/users");
    };

    return { form, isEdit, submitForm, emailError };
  }
};
</script>
