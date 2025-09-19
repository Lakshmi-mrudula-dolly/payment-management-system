// store/modules/payments.js
let mockPayments = [
  { id: 1, amount: 1000, type: "INCOMING", category: "Salary", status: "COMPLETED", date: "2025-09-01" },
  { id: 2, amount: 200, type: "OUTGOING", category: "Groceries", status: "PENDING", date: "2025-09-05" }
];

export default {
  namespaced: true,
  state: () => ({
    list: [],
    current: null
  }),
  mutations: {
    SET_PAYMENTS(state, payments) {
      state.list = payments;
    },
    SET_PAYMENT(state, payment) {
      state.current = payment;
    },
    ADD_PAYMENT(state, payment) {
      state.list.push(payment);
    },
    UPDATE_PAYMENT(state, updated) {
      const idx = state.list.findIndex(p => p.id === updated.id);
      if (idx !== -1) state.list[idx] = updated;
    },
    DELETE_PAYMENT(state, id) {
      state.list = state.list.filter(p => p.id !== id);
    }
  },
  actions: {
    fetchPayments({ commit }) {
      commit("SET_PAYMENTS", mockPayments);
    },
    fetchPaymentById({ commit }, id) {
      const payment = mockPayments.find(p => p.id == id);
      commit("SET_PAYMENT", payment);
    },
    createPayment({ commit }, payment) {
      const newPayment = {
        ...payment,
        id: Date.now(),
        status: "PENDING",
        date: new Date().toISOString().split("T")[0]
      };
      mockPayments.push(newPayment);
      commit("ADD_PAYMENT", newPayment);
    },
    updatePayment({ commit }, payment) {
      const idx = mockPayments.findIndex(p => p.id === payment.id);
      if (idx !== -1) mockPayments[idx] = payment;
      commit("UPDATE_PAYMENT", payment);
    },
    deletePayment({ commit }, id) {
      mockPayments = mockPayments.filter(p => p.id !== id);
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
