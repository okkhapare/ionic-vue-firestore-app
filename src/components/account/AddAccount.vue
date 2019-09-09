<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button fill="clear" @click="$router.push({ name: 'AccountList' })">
          <ion-icon name="arrow-back"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen padding>
      <form>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Name *</ion-label>
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
            <ion-label position="stacked" color="primary">Company *</ion-label>
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
        </ion-list>
      </form>
    </ion-content>
    <ion-button id="add-button" @click="addCustomer(customer)" expand="full" fill="clear">Add Account</ion-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddAccount",

  data() {
    return {
      customer: {}
    };
  },
  methods: {
    ...mapActions(["addCustomer"])
  },
  activated() {
    this.customer = {
      name: "",
      mobile: "",
      company: "",
      amt_due: "",
      note: ""
    };
  }
};
</script>

<style scoped>
ion-icon {
  font-size: 16px;
}

ion-label {
  font-family: Montserrat !important;
  font-size: 18px !important;
}

ion-input,
ion-textarea {
  font-family: Montserrat !important;
  font-size: 16px !important;
  padding: 8px !important;
}

#add-button {
  font-family: Montserrat !important;
  font-size: 18px !important;
  border-top: 1px solid rgb(105, 105, 105) !important;
  margin: 0px 20px 20px !important;
  padding-top: 15px !important;
}
</style>