<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button
          color="primary"
          expand="full"
          size="large"
          shape="round"
          @click="$router.push({ name: 'AccountList' })"
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
            <ion-button size="medium" @click="addCustomer()" color="light" expand="full">Add Account</ion-button>
          </ion-footer>
        </ion-list>
      </form>
    </ion-content>
  </div>
</template>

<script>
import firebase from "firebase";
import { customerCollection } from "../../firebase";

export default {
  data() {
    return {
      customer: {}
    };
  },
  methods: {
    addCustomer() {
      customerCollection.add({
        name: this.customer.name,
        mobile: +this.customer.mobile,
        company: this.customer.company,
        amt_due: +this.customer.amt_due,
        note: this.customer.note,
        accountTS: firebase.firestore.Timestamp.now()
      });
    }
  },
  activated() {
    this.customer = {
      name: "",
      mobile: 0,
      company: "",
      amt_due: 0,
      note: ""
    };
  }
};
</script>

<style scoped>
</style>