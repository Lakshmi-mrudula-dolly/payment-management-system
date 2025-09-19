<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Fintech Dashboard</h1>
      <h1 class="text-4xl font-bold text-blue-600">Hello Tailwind v4</h1>


    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Total Users -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-gray-600">Total Users</h2>
        <p class="text-3xl font-bold">{{ totalUsers }}</p>
      </div>

      <!-- Total Payments -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-gray-600">Total Payments</h2>
        <p class="text-3xl font-bold">{{ totalPayments }}</p>
      </div>

      <!-- Pending Payments -->
      <div class="bg-white shadow rounded-lg p-4">
        <h2 class="text-gray-600">Pending Payments</h2>
        <p class="text-3xl font-bold text-yellow-600">{{ pendingPayments }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    // Fetch mock data on mount
    onMounted(() => {
      store.dispatch("users/fetchUsers");
      store.dispatch("payments/fetchPayments");
    });

    // Computed stats
    const totalUsers = computed(() => store.state.users.list.length);
    const totalPayments = computed(() => store.state.payments.list.length);
    const pendingPayments = computed(
      () => store.state.payments.list.filter(p => p.status === "PENDING").length
    );

    return { totalUsers, totalPayments, pendingPayments };
  }
};
</script>

<style scoped>
/* Optional: nicer look */
</style>
