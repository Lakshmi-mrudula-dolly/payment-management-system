<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Payment Details</h1>

    <div v-if="payment" class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <p><strong>ID:</strong> {{ payment.id }}</p>
      <p><strong>Amount:</strong> {{ payment.amount }}</p>
      <p><strong>Type:</strong> {{ payment.type }}</p>
      <p><strong>Status:</strong> {{ payment.status }}</p>
      <p><strong>Category:</strong> {{ payment.category }}</p>
      <p><strong>Date:</strong> {{ payment.date }}</p>
    </div>
    <div v-else class="text-gray-500">Loading...</div>

    <router-link
      to="/payments"
      class="mt-4 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
    >
      Back
    </router-link>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    const id = Number(route.params.id);

    onMounted(() => {
      store.dispatch("payments/fetchPaymentById", id);
    });

    const payment = computed(() => store.state.payments.current);

    return { payment };
  },
};
</script>
