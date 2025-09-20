<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Update Payment Status</h2>

    <form v-if="form" @submit.prevent="save" class="bg-white shadow-md rounded-lg p-6 space-y-4">
      <div>
        <label class="block font-semibold mb-1">Payment ID</label>
        <p class="border rounded px-3 py-2 bg-gray-100">{{ form.id }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Amount</label>
        <p class="border rounded px-3 py-2 bg-gray-100">{{ form.amount }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Category</label>
        <p class="border rounded px-3 py-2 bg-gray-100">{{ form.category }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Date</label>
        <p class="border rounded px-3 py-2 bg-gray-100">{{ form.date }}</p>
      </div>

      <div>
        <label class="block font-semibold mb-1">Status</label>
        <select v-model="form.status" class="border px-3 py-2 rounded w-full">
          <option value="COMPLETED">COMPLETED</option>
          <option value="PENDING">PENDING</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>

      <div class="flex space-x-2">
        <button
          type="submit"
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
        <router-link
          to="/payments"
          class="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </router-link>
      </div>
    </form>

    <div v-else class="text-gray-500">Loading...</div>
  </div>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
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
      amount: 0,
      type: "",
      status: "PENDING",
      category: "",
      date: "",
    });

    const payment = computed(() => store.state.payments.current);

    onMounted(async () => {
      await store.dispatch("payments/fetchPaymentById", id);
      if (payment.value) {
        Object.assign(form, payment.value);
      }
    });

    const save = async () => {
      try {
        await store.dispatch("payments/updatePayment", { ...form });
        router.push("/payments");
      } catch (err) {
        alert(err.message);
      }
    };

    return { form, save };
  },
};
</script>
