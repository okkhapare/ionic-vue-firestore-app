<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button fill="clear" @click="$router.push({ name: 'AccountDetails' })">
          <ion-icon name="arrow-back"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen padding>
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
        </ion-list>
      </form>
    </ion-content>
    <ion-button @click="updateCustomerAlert()" expand="full">Edit Account</ion-button>
  </div>
</template>

<script>
import { customerCollection } from "../../firebase";
import { mapActions } from "vuex";

export default {
  name: "EditAccount",

  data() {
    return {
      customer: {}
    };
  },
  methods: {
    ...mapActions(["updateCustomer"]),
    updateCustomerAlert() {
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
        this.updateCustomer(this.customer)
      return this.$ionic.alertController
          .create({
            header: 'Success',
            message: 'Account successfully edited!',
            buttons: ['OK'],
          })
          .then(a => a.present())
      }      
    }
  },
  activated() {
    customerCollection
      .doc(this.$route.params.customerId)
      .get()
      .then(docRef => {
        var customerObject = { id: docRef.id, ...docRef.data() };
        this.customer = customerObject;
      });
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