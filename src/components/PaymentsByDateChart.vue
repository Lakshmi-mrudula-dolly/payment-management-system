<template>
  <Bar v-if="chartData" :data="chartData" :options="options" />
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { computed } from "vue";
import { useStore } from "vuex";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: "PaymentsByDateChart",
  components: { Bar },
  props: {
    filters: { type: Object, required: true }
  },
  setup(props) {
    const store = useStore();

    const filteredPayments = computed(() => {
      return store.state.payments.list.filter(p => {
        const paymentDate = new Date(p.date);
        const matchCategory = !props.filters.category || p.category === props.filters.category;
        const matchStart = !props.filters.startDate || paymentDate >= new Date(props.filters.startDate);
        const matchEnd = !props.filters.endDate || paymentDate <= new Date(props.filters.endDate);
        return matchCategory && matchStart && matchEnd;
      });
    });

    const chartData = computed(() => {
      const grouped = {};
      filteredPayments.value.forEach(p => {
        grouped[p.date] = (grouped[p.date] || 0) + p.amount;
      });

      return {
        labels: Object.keys(grouped),
        datasets: [
          {
            label: "Payments by Date",
            data: Object.values(grouped),
            backgroundColor: "#3b82f6"
          }
        ]
      };
    });

    const options = {
      responsive: true,
      maintainAspectRatio: false, 
      plugins: {
        legend: { position: "bottom" }
      }
    };

    return { chartData, options };
  }
};
</script>
