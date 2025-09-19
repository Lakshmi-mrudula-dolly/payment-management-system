<template>
  <div>
    <h2 class="text-xl font-bold">Payments</h2>
    <select v-model="filter" @change="applyFilter">
      <option value="">All</option>
      <option value="INCOMING">Incoming</option>
      <option value="OUTGOING">Outgoing</option>
    </select>

    <ul>
      <li v-for="p in payments" :key="p.id">
        <router-link :to="`/payments/${p.id}`">
          {{ p.category }} - {{ p.amount }} - {{ p.status }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const filter = ref("");
    const payments = computed(() => store.getters["payments/filteredPayments"](filter.value));

    const applyFilter = () => store.dispatch("payments/fetchPayments");
    onMounted(() => store.dispatch("payments/fetchPayments"));

    return { payments, filter, applyFilter };
  }
};
</script>
