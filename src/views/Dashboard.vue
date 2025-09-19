<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">Fintech Dashboard</h1>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-end">
      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-600 mb-1">Category</label>
        <select v-model="selectedCategory" class="border rounded-lg p-2 w-48 focus:ring-2 focus:ring-green-500">
          <option value="">All</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-600 mb-1">From</label>
        <input type="date" v-model="startDate" class="border rounded-lg p-2 w-40 focus:ring-2 focus:ring-green-500" />
      </div>

      <div class="flex flex-col">
        <label class="text-sm font-medium text-gray-600 mb-1">To</label>
        <input type="date" v-model="endDate" class="border rounded-lg p-2 w-40 focus:ring-2 focus:ring-green-500" />
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
        <div>
          <p class="text-gray-500 font-semibold">Total Payments</p>
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ filteredPayments?.length || 0 }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
        <div>
          <p class="text-gray-500 font-semibold">Total Incoming</p>
          <p class="text-3xl font-bold text-green-600 mt-2">{{ totalIncoming }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
        <div>
          <p class="text-gray-500 font-semibold">Total Outgoing</p>
          <p class="text-3xl font-bold text-red-600 mt-2">{{ totalOutgoing }}</p>
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
        <div>
          <p class="text-gray-500 font-semibold">Pending Payments</p>
          <p class="text-3xl font-bold text-yellow-500 mt-2">{{ pendingPayments }}</p>
        </div>
      </div>
    </div>

    <!-- Charts Section 
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <PaymentStatusChart :filters="filters" class="h-80" />
      <PaymentsByDateChart :filters="filters" class="h-80" />
    </div>-->
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import PaymentStatusChart from ".././components/PaymentStatusChart.vue";
import PaymentsByDateChart from ".././components/PaymentsByDateChart.vue";

export default {
// components: { PaymentStatusChart, PaymentsByDateChart },
  setup() {
    const store = useStore();
    const selectedCategory = ref("");
    const startDate = ref("");
    const endDate = ref("");

    onMounted(() => {
      store.dispatch("users/fetchUsers");
      store.dispatch("payments/fetchPayments");
    });

    const categories = computed(() =>
      [...new Set(store.state.payments.list.map(p => p.category))].filter(Boolean)
    );

    const filters = computed(() => ({
      category: selectedCategory.value,
      startDate: startDate.value,
      endDate: endDate.value
    }));

    const filteredPayments = computed(() => {
      return store.state.payments.list.filter(p => {
        const matchCategory = !filters.value.category || p.category === filters.value.category;
        const matchStart = !filters.value.startDate || p.date >= filters.value.startDate;
        const matchEnd = !filters.value.endDate || p.date <= filters.value.endDate;
        return matchCategory && matchStart && matchEnd;
      });
    });

    const totalIncoming = computed(() =>
      filteredPayments.value.filter(p => p.type === "INCOMING").reduce((sum, p) => sum + p.amount, 0)
    );

    const totalOutgoing = computed(() =>
      filteredPayments.value.filter(p => p.type === "OUTGOING").reduce((sum, p) => sum + p.amount, 0)
    );

    const pendingPayments = computed(() =>
      filteredPayments.value.filter(p => p.status === "PENDING").length
    );

    return {
      selectedCategory,
      startDate,
      endDate,
      filters,
      filteredPayments,
      totalIncoming,
      totalOutgoing,
      pendingPayments,
      categories
    };
  }
};
</script>
