<template>
  <div>
    <h2 class="text-xl font-bold">Users</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} , {{ user.email }} , {{ user.role }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

// get store instance
const store = useStore();

// state (users list)
const users = computed(() => store.state.users.list);

// fetch users on mount
onMounted(() => {
  store.dispatch("users/fetchUsers");
});
</script>