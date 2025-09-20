import { shallowMount, flushPromises } from '@vue/test-utils';
import PaymentForm from '../../src/views/payments/PaymentForm.vue';
import { createStore } from 'vuex';
import { createRouter, createMemoryHistory } from 'vue-router';
import { nextTick } from 'vue';

const store = createStore({
  modules: {
    payments: {
      namespaced: true,
      state: () => ({
        list: [
          { id: 1, amount: 1000, type: 'INCOMING', category: 'Salary', status: 'COMPLETED', date: '2025-09-01' },
        ],
      }),
      actions: {
        fetchPayments: jest.fn(),
      },
    },
  },
});

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/payments/new', name: 'PaymentForm', component: PaymentForm },
    { path: '/payments/:id/edit', name: 'EditPayment', component: PaymentForm },
  ],
});

describe('PaymentForm.vue', () => {
  it('renders the form correctly for new payment', async () => {
    router.push('/payments/new');
    await router.isReady();

    const wrapper = shallowMount(PaymentForm, {
      global: {
        plugins: [store, router],
      },
    });

    await nextTick();

    expect(wrapper.find('input[type="number"]').exists()).toBe(true);
    expect(wrapper.findAll('select').at(0).exists()).toBe(true);
    expect(wrapper.find('input[type="date"]').exists()).toBe(true);
  });

  it('disallows future date by setting max attribute', async () => {
    router.push('/payments/new');
    await router.isReady();

    const wrapper = shallowMount(PaymentForm, {
      global: {
        plugins: [store, router],
      },
    });

    const dateInput = wrapper.find('input[type="date"]');
    expect(dateInput.attributes('max')).toBe(new Date().toISOString().split('T')[0]);
  });

  
  
});
