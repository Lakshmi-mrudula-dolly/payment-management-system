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
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('id')"
            >
              ID <span>{{ sortSymbol('id') }}</span>
            </th>
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('amount')"
            >
              Amount <span>{{ sortSymbol('amount') }}</span>
            </th>
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('type')"
            >
              Type <span>{{ sortSymbol('type') }}</span>
            </th>
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('status')"
            >
              Status <span>{{ sortSymbol('status') }}</span>
            </th>
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('category')"
            >
              Category <span>{{ sortSymbol('category') }}</span>
            </th>
            <th
              class="py-2 px-4 text-left cursor-pointer"
              @click="sortBy('date')"
            >
              Payment Date <span>{{ sortSymbol('date') }}</span>
            </th>
            <th class="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in sortedPayments"
            :key="payment.id"
            class="hover:bg-gray-50 border-b"
          >
            <td class="py-2 px-4">{{ payment.id }}</td>
            <td class="py-2 px-4">{{ payment.amount }}</td>
            <td class="py-2 px-4">{{ payment.type }}</td>
            <td class="py-2 px-4">{{ payment.status }}</td>
            <td class="py-2 px-4">{{ payment.category }}</td>
            <td class="py-2 px-4">{{ payment.date }}</td>
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
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("payments/fetchPayments");
    });

    const payments = computed(() => store.state.payments.list);

    const sortField = ref("");
    const sortAsc = ref(true);

    const sortBy = (field) => {
      if (sortField.value === field) {
        sortAsc.value = !sortAsc.value; // toggle order
      } else {
        sortField.value = field;
        sortAsc.value = true;
      }
    };

    const sortSymbol = (field) => {
      if (sortField.value !== field) return "";
      return sortAsc.value ? "▲" : "▼";
    };

    const sortedPayments = computed(() => {
      if (!sortField.value) return payments.value;

      return [...payments.value].sort((a, b) => {
        const aVal = a[sortField.value];
        const bVal = b[sortField.value];

        // handle numbers
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortAsc.value ? aVal - bVal : bVal - aVal;
        }

        // handle strings and dates
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return sortAsc.value ? -1 : 1;
        if (aStr > bStr) return sortAsc.value ? 1 : -1;
        return 0;
      });
    });

    return { payments, sortedPayments, sortBy, sortSymbol };
  },
};
</script>
