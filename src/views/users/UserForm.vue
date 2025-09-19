<template>
<div>
  <form @submit.prevent="save" class="space-y-3">
    <div>
        <label>Name : </label>
        <input v-model="name" type="text" placeholder="Name" />
    </div>

    <div>
    <label>Email : </label>
    <input v-model="email" type="email" placeholder="Email" />
    <p v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</p>
    </div>

    <div>
    <select v-model="role">
      <option disabled value="">Select role</option>
      <option value="admin">Admin</option>
      <option value="finance_manager">Finance Manager</option>
      <option value="viewer">Viewer</option>
    </select>
    </div>

    <button type="submit" :disabled="!!emailError">Save</button>
  </form>
</div>
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const role = ref("");
    const emailError = ref("");
    const store = useStore();

    // Watcher for email validation
    watch(email, (newVal) => {
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = pattern.test(newVal) ? "" : "Invalid email format";
    });

    const save = () => {
      if (emailError.value || !role.value) return;

      store.dispatch("users/createUser", {
        name: name.value,
        email: email.value,
        role: role.value,
      });

      name.value = "";
      email.value = "";
      role.value = "";
    };

    return { name, email, role, save, emailError };
  },
};
</script>
