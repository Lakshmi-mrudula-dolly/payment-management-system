<template>
    <div>
  <form @submit.prevent="save">
    <div>Payment Form</div>
    <div>
    <label>Amount : </label>
    <input v-model="amount" type="number" placeholder="Amount" required />
    </div>
    <div>
        <label>Type</label>
    <select v-model="type">
      <option value="INCOMING">Incoming</option>
      <option value="OUTGOING">Outgoing</option>
    </select>
    </div>
    <div>
        <label>Category : </label>
    <input v-model="category" placeholder="Category" />
    </div>
    <div>
    <button type="submit">Save</button>
    </div>
  </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const amount = ref("");
    const type = ref("INCOMING");
    const category = ref("");
    const store = useStore();

    const save = () => {
      store.dispatch("payments/createPayment", {
        amount: amount.value,
        type: type.value,
        category: category.value,
      });
    };

    return { amount, type, category, save };
  }
};
</script>
