import { mount } from "@vue/test-utils";
import PaymentDetail from "../../src/views/payments/PaymentDetail.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

describe("PaymentDetail.vue", () => {
  let store;
  let actions;
  let router;

  beforeEach(() => {
    actions = {
      fetchPaymentById: jest.fn(),
    };

    store = createStore({
      modules: {
        payments: {
          namespaced: true,
          state: () => ({
            current: null,
          }),
          actions,
        },
      },
    });

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/payments/:id", component: PaymentDetail },
        { path: "/payments", component: { template: "<div>Payments</div>" } }, // ✅ back button route
      ],
    });
  });

  it("dispatches fetchPaymentById with the correct id on mount", async () => {
    router.push("/payments/5");
    await router.isReady();

    mount(PaymentDetail, {
      global: {
        plugins: [store, router],
      },
    });

    // ✅ removed `undefined`
    expect(actions.fetchPaymentById).toHaveBeenCalledWith(expect.any(Object), 5);
  });

  it("renders payment details when available", async () => {
    store.state.payments.current = {
      id: 10,
      amount: 500,
      type: "INCOMING",
      status: "COMPLETED",
      category: "Salary",
      date: "2023-09-01",
    };

    router.push("/payments/10");
    await router.isReady();

    const wrapper = mount(PaymentDetail, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.text()).toContain("ID: 10");
    expect(wrapper.text()).toContain("Amount: 500");
    expect(wrapper.text()).toContain("Salary");
  });
});
