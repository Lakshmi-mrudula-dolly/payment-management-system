<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4 text-gray-800">Payments</h1>

    <router-link
      to="/payments/new"
      class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4 inline-block"
    >
      + Add Payment
    </router-link>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 text-left text-gray-600">ID</th>
            <th class="py-2 px-4 text-left text-gray-600">User</th>
            <th class="py-2 px-4 text-left text-gray-600">Amount</th>
            <th class="py-2 px-4 text-left text-gray-600">Type</th>
            <th class="py-2 px-4 text-left text-gray-600">Status</th>
            <th class="py-2 px-4 text-left text-gray-600">Category</th>
            <th class="py-2 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in payments"
            :key="payment.id"
            class="hover:bg-gray-50 border-b"
          >
            <td class="py-2 px-4">{{ payment.id }}</td>
            <td class="py-2 px-4">{{ payment.userName }}</td>
            <td class="py-2 px-4">{{ payment.amount }}</td>
            <td class="py-2 px-4">{{ payment.type }}</td>
            <td class="py-2 px-4">{{ payment.status }}</td>
            <td class="py-2 px-4">{{ payment.category }}</td>
            <td class="py-2 px-4 space-x-2">
              <router-link
                :to="`/payments/${payment.id}`"
                class="text-blue-600 hover:underline"
              >
                View
              </router-link>
              <router-link
                :to="`/payments/${payment.id}/edit`"
                class="text-green-600 hover:underline"
              >
                Edit
              </router-link>
            </td>
          </tr>
          <tr v-if="payments.length === 0">
            <td colspan="7" class="text-center py-4 text-gray-400">
              No payments found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("payments/fetchPayments");
    });

    const payments = computed(() =>
      store.state.payments.all.map((p) => ({
        ...p,
        userName:
          store.state.users.all.find((u) => u.id === p.userId)?.name || "N/A",
      }))
    );

    return { payments };
  },
};
</script>
