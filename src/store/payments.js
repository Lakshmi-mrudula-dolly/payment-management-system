const STORAGE_KEY = "payments";

function loadPayments() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);

  // Add mock payments if storage is empty
  const today = new Date().toISOString().split("T")[0];
  const mockPayments = [
    { id: 1, amount: 1000, type: "OUTGOING", category: "Salary", status: "COMPLETED", date: "2024-01-01" },
    { id: 2, amount: 200, type: "OUTGOING", category: "Vendor Payment", status: "PENDING", date: "2025-02-25" },
    { id: 3, amount: 150, type: "OUTGOING", category: "Salary", status: "COMPLETED", date: "2025-09-01" },
    { id: 4, amount: 500, type: "INCOMING", category: "Client Invoice", status: "COMPLETED", date: "2025-07-07" },
    { id: 5, amount: 300, type: "OUTGOING", category: "Vendor Payment", status: "FAILED", date: "2025-04-01" },
    { id: 6, amount: 700, type: "INCOMING", category: "Client Invoice", status: "PENDING", date: today }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockPayments));
  return mockPayments;
}

function savePayments(payments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
}

export default {
  namespaced: true,
  state: () => ({
    list: loadPayments(),
    current: null
  }),
  mutations: {
    SET_PAYMENTS(state, payments) {
      state.list = payments;
      savePayments(state.list);
    },
    SET_PAYMENT(state, payment) {
      state.current = payment;
    },
    ADD_PAYMENT(state, payment) {
      state.list.push(payment);
      savePayments(state.list);
    },
    UPDATE_PAYMENT(state, updated) {
      const idx = state.list.findIndex(p => p.id === updated.id);
      if (idx !== -1) state.list[idx] = updated;
      savePayments(state.list);
    },
    DELETE_PAYMENT(state, id) {
      state.list = state.list.filter(p => p.id !== id);
      savePayments(state.list);
    }
  },
  actions: {
    fetchPayments({ commit }) {
      commit("SET_PAYMENTS", loadPayments());
    },
    fetchPaymentById({ commit, state }, id) {
      const payment = state.list.find(p => p.id === id);
      commit("SET_PAYMENT", payment);
    },
    createPayment({ commit, state }, payment) {
      const today = new Date().toISOString().split("T")[0];
      if (payment.date && payment.date > today) {
        throw new Error("Payment date cannot be in the future");
      }

      const newPayment = {
        ...payment,
        id: state.list.length ? Math.max(...state.list.map(p => p.id)) + 1 : 1,
        date: payment.date || today
      };
      commit("ADD_PAYMENT", newPayment);
    },
    updatePayment({ commit }, payment) {
      const today = new Date().toISOString().split("T")[0];
      if (payment.date && payment.date > today) {
        throw new Error("Payment date cannot be in the future");
      }
      commit("UPDATE_PAYMENT", payment);
    },
    deletePayment({ commit }, id) {
      commit("DELETE_PAYMENT", id);
    }
  },
  getters: {
    filteredPayments: state => filter => {
      if (!filter) return state.list;
      return state.list.filter(p => p.type === filter);
    }
  }
};
