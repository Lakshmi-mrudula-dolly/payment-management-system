<template>
  <div class="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">
      {{ isEdit ? "Edit Payment" : "Add Payment" }}
    </h1>

    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label class="block text-gray-600 mb-1">Amount</label>
        <input
          v-model="form.amount"
          type="number"
          min="0"
          class="w-full border rounded-lg p-2"
          required
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Type</label>
        <select v-model="form.type" class="w-full border rounded-lg p-2" required>
          <option value="">Select Type</option>
          <option value="INCOMING">INCOMING</option>
          <option value="OUTGOING">OUTGOING</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Status</label>
        <select v-model="form.status" class="w-full border rounded-lg p-2" required>
          <option value="">Select Status</option>
          <option value="PENDING">PENDING</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="FAILED">FAILED</option>
        </select>
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Category</label>
        <input
          v-model="form.category"
          type="text"
          class="w-full border rounded-lg p-2"
          placeholder="e.g., Utilities, Salary"
        />
      </div>

      <div>
        <label class="block text-gray-600 mb-1">Date</label>
        <input
          v-model="form.date"
          type="date"
          class="w-full border rounded-lg p-2"
          :max="today"
          required
        />
      </div>

      <button
        type="submit"
        class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {{ isEdit ? "Update Payment" : "Create Payment" }}
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const isEdit = !!route.params.id;
    const today = new Date().toISOString().split("T")[0]; 

    const form = ref({
      amount: "",
      type: "",
      status: "",
      category: "",
      date: ""
    });

    onMounted(async () => {
      await store.dispatch("payments/fetchPayments");
      if (isEdit) {
        const payment = store.state.payments.list.find(
          p => p.id === parseInt(route.params.id)
        );
        if (payment) Object.assign(form.value, payment);
      }
    });

    const submitForm = async () => {
      try {
        if (isEdit) {
          await store.dispatch("payments/updatePayment", form.value);
        } else {
          await store.dispatch("payments/createPayment", form.value);
        }
        router.push("/payments");
      } catch (err) {
        alert(err.message);
      }
    };

    return { form, submitForm, isEdit,today };
  }
};
</script>
