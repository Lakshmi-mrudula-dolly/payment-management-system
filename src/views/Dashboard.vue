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
          <p class="text-3xl font-bold text-gray-800 mt-2">{{ filteredPayments.length }}</p>
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

    <!-- Charts Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
     <PaymentStatusChart :filters="chartFilters" class="h-72" /> 
     </div>
     <div>
      <PaymentsByDateChart :filters="chartFilters" class="h-96" /> 
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import PaymentStatusChart from "../components/PaymentStatusChart.vue";
import PaymentsByDateChart from "../components/PaymentsByDateChart.vue";

export default {
  components: { PaymentStatusChart, PaymentsByDateChart },
  setup() {
    const store = useStore();

    // Filters
    const selectedCategory = ref("");
    const startDate = ref("");
    const endDate = ref("");

    onMounted(() => {
      store.dispatch("payments/fetchPayments");
      store.dispatch("users/fetchUsers");
    });

    // Unique categories
    const categories = computed(() =>
      [...new Set(store.state.payments.list.map(p => p.category))].filter(Boolean)
    );

    // Chart filters (pass to child components)
    const chartFilters = computed(() => ({
      category: selectedCategory.value,
      startDate: startDate.value,
      endDate: endDate.value
    }));

    // Filtered payments (reactive)
    const filteredPayments = computed(() => {
    return store.state.payments.list.filter(p => {
      const paymentDate = new Date(p.date); // convert string → Date
      const matchCategory = !selectedCategory.value || p.category === selectedCategory.value;
      const matchStart = !startDate.value || paymentDate >= new Date(startDate.value);
      const matchEnd = !endDate.value || paymentDate <= new Date(endDate.value);
      return matchCategory && matchStart && matchEnd;
    });
  });


    // Summary computations
    const totalIncoming = computed(() =>
      filteredPayments.value
        .filter(p => p.type === "INCOMING")
        .reduce((sum, p) => sum + Number(p.amount), 0)
    );

    const totalOutgoing = computed(() =>
      filteredPayments.value
        .filter(p => p.type === "OUTGOING")
        .reduce((sum, p) => sum + Number(p.amount), 0)
    );

    const pendingPayments = computed(() =>
      filteredPayments.value.filter(p => p.status === "PENDING").length
    );

    return {
      selectedCategory,
      startDate,
      endDate,
      filteredPayments,
      totalIncoming,
      totalOutgoing,
      pendingPayments,
      categories,
      chartFilters
    };
  }
};
</script>
