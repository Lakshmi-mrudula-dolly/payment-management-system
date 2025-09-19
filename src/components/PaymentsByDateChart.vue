<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";
import { computed } from "vue";
import { useStore } from "vuex";
import { defineProps } from "vue";

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

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
  const grouped = {};
  filteredPayments.value.forEach(p => {
    const date = p.date;
    if (!grouped[date]) grouped[date] = { INCOMING: 0, OUTGOING: 0 };
    grouped[date][p.type] += p.amount;
  });

  const sortedDates = Object.keys(grouped).sort();

  return {
    labels: sortedDates,
    datasets: [
      {
        label: "Incoming Payments",
        borderColor: "#10B981",
        backgroundColor: "rgba(16,185,129,0.2)",
        data: sortedDates.map(d => grouped[d].INCOMING),
        fill: true,
        tension: 0.3
      },
      {
        label: "Outgoing Payments",
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        data: sortedDates.map(d => grouped[d].OUTGOING),
        fill: true,
        tension: 0.3
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "top" } },
  scales: {
    x: { title: { display: true, text: "Date" } },
    y: { title: { display: true, text: "Amount" }, beginAtZero: true }
  }
};
</script>
