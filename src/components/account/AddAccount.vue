<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size="1.5" style="text-align: center;">
              <ion-icon name="arrow-back" @click="$router.push({ name: 'AccountList' })"></ion-icon>
            </ion-col>
            <ion-col style="font-size: 18px;">
              <p style="margin: 0px; font-family: Montserrat;">Add Account</p>
            </ion-col>
          </ion-row>
        </ion-grid>
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
    <ion-button @click="addCustomerAlert()" expand="full">Add Account</ion-button>
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
    ...mapActions(["addCustomer"]),
    addCustomerAlert() {
      if (this.customer.name == '' && this.customer.company == '') {
        return this.$ionic.alertController
          .create({
            header: 'Alert',
            message: 'Please fill the fields with * mark',
            buttons: ['OK'],
          })
          .then(a => a.present())
      } else if (this.customer.name == '' || this.customer.company == '') {
        return this.$ionic.alertController
          .create({
            header: 'Alert',
            message: 'Please fill the fields with * mark',
            buttons: ['OK'],
          })
          .then(a => a.present())
      } else {
        this.addCustomer(this.customer)
        this.$router.push({ name: 'AccountList' })
        return this.$ionic.alertController
          .create({
            header: 'Success',
            message: 'Account successfully added!',
            buttons: ['OK'],
          })
          .then(a => a.present())
      }
    }
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
  font-size: 16px !important;
}

ion-label {
  font-family: Montserrat !important;
  font-size: 16px !important;
}

ion-input,
ion-textarea {
  font-family: Montserrat !important;
  font-size: 16px !important;
  padding: 8px !important;
  color: #737373 !important;
}

div > ion-button {
  font-family: Montserrat !important;
  font-size: 16px !important;
}
</style>