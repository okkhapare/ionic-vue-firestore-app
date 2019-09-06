<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button
          color="primary"
          expand="full"
          size="large"
          shape="round"
          @click="$router.push({ name: 'AccountDetails' })"
        >
          <ion-icon name="arrow-back"></ion-icon>Back
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Name</ion-label>
            <ion-input
              @input="customer.name = $event.target.value"
              :value="customer.name"
              name="name"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Mobile No.</ion-label>
            <ion-input
              @input="customer.mobile = $event.target.value"
              :value="customer.mobile"
              name="mobile"
              type="number"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Company</ion-label>
            <ion-input
              @input="customer.company = $event.target.value"
              :value="customer.company"
              name="company"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Due Amount</ion-label>
            <ion-input
              @input="customer.amt_due = $event.target.value"
              :value="customer.amt_due"
              name="amt_due"
              type="number"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Note</ion-label>
            <ion-textarea
              @input="customer.note = $event.target.value"
              :value="customer.note"
              name="note"
            ></ion-textarea>
          </ion-item>

          <ion-footer>
            <ion-button
              size="medium"
              @click="editCustomer()"
              color="light"
              expand="full"
            >Edit Account</ion-button>
          </ion-footer>
        </ion-list>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { customerCollection } from "../../firebase";

export default {
  data() {
    return {
      customer: {}
    };
  },
  methods: {
    editCustomer() {
      customerCollection.doc(this.$route.params.customerId).update({
        name: this.customer.name,
        mobile: this.customer.mobile,
        company: this.customer.company,
        amt_due: this.customer.amt_due,
        note: this.customer.note
      });
    }
  },
  activated() {
    customerCollection.get().then(res => {
      res.docs.forEach(doc => {
        if (doc.id == this.$route.params.customerId) {
          var customerObject = { id: doc.id, ...doc.data() };
          this.customer = customerObject;
        }
      });
    });
  }
};
</script>

<style scoped>
</style>