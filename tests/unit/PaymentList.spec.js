import { mount } from "@vue/test-utils";
import PaymentList from "../../src/views/payments/PaymentList.vue";
import { createStore } from "vuex";

describe("PaymentList.vue", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        payments: {
          namespaced: true,
          state: () => ({
            list: [
              { id: 1, amount: 200, type: "INCOMING" },
              { id: 2, amount: 100, type: "OUTGOING" },
            ],
          }),
          actions: {
            fetchPayments: jest.fn(),
          },
        },
      },
    });
  });

  it("renders payment list", () => {
    const wrapper = mount(PaymentList, {
      global: {
        plugins: [store],
        stubs: {
          RouterLink: { template: "<a><slot /></a>" }, // ✅ stub router-link
        },
      },
    });

    expect(wrapper.text()).toContain("200");
    expect(wrapper.text()).toContain("100");
  });

it("sorts payments by amount when header is clicked", async () => {
  const wrapper = mount(PaymentList, {
    global: {
      plugins: [store],
      stubs: {
        RouterLink: { template: "<a><slot /></a>" },
      },
    },
  });

  // Find header with "Amount"
  const amountHeader = wrapper.findAll("th").find((th) => th.text().includes("Amount"));
  await amountHeader.trigger("click");

  const rows = wrapper.findAll("tbody tr");

  // First row should have the smaller amount (100)
  expect(rows[0].text()).toContain("100");
  expect(rows[1].text()).toContain("200");
});

});
