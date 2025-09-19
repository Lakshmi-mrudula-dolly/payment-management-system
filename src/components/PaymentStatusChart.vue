<script setup>
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { defineProps } from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({ filters: Object });
const store = useStore();

const filteredPayments = computed(() => {
  return store.state.payments.all.filter(p => {
    const matchCategory = !props.filters.category || p.category === props.filters.category;
    const matchStart = !props.filters.startDate || p.date >= props.filters.startDate;
    const matchEnd = !props.filters.endDate || p.date <= props.filters.endDate;
    return matchCategory && matchStart && matchEnd;
  });
});

const chartData = computed(() => {
  const statuses = ["COMPLETED", "PENDING", "FAILED"];
  const counts = statuses.map(
    status => filteredPayments.value.filter(p => p.status === status).length
  );

  return {
    labels: statuses,
    datasets: [
      {
        label: "Payments",
        backgroundColor: ["#10B981", "#F59E0B", "#EF4444"],
        data: counts
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
};
</script>
