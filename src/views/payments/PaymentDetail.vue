<template>
  <div v-if="payment">
    <h2>Payment #{{ payment.id }}</h2>
    <p>Amount: {{ payment.amount }}</p>
    <p>Status: {{ payment.status }}</p>
    <p>Category: {{ payment.category }}</p>
    <p>Date: {{ payment.date }}</p>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const payment = computed(() => store.state.payments.current);

    onMounted(() => store.dispatch("payments/fetchPaymentById", route.params.id));
    return { payment };
  }
};
</script>
