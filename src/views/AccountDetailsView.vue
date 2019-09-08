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

    <ion-card>
      <ion-card-header>{{ this.selectedCustomerDetails.name }}</ion-card-header>
      <ion-card-content>
        Mobile No: {{ this.selectedCustomerDetails.mobile }}
        <br />
        Company: {{ this.selectedCustomerDetails.company }}
        <br />
        Note: {{ this.selectedCustomerDetails.note }}
        <br />
        Created at: {{ this.selectedCustomerDetails.accountTS | timeFormat }}
        <br />
        Due Amount: &#8377;{{ this.selectedCustomerDetails.amt_due }}
        <br />
        <ion-button @click="goToEditAccount($route.params.customerId)">Edit</ion-button>
        <ion-button @click="deleteAccount($route.params.customerId)">Delete</ion-button>
        <ion-button @click="goToBill($route.params.customerId)">Bill</ion-button>
      </ion-card-content>
    </ion-card>

    <ion-card>
      <ion-card-header>Order</ion-card-header>
      <ion-card-content>{{ this.getTodaysDate() }}</ion-card-content>
      <ion-card-content>
        Amount: &#8377;
        <ion-input
          type="number"
          name="amount_due"
          @input="cost = $event.target.value" 
          :value="cost"
        ></ion-input>
      </ion-card-content>
      <ion-button size="medium" @click="addOrder()" color="light" expand="full">Add Order</ion-button>
    </ion-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { db, customerCollection, orderCollection } from "../firebase";
import moment from "moment";

export default {
  name: "AccountDetailsView",
  data() {
    return {
      selectedCustomerDetails: {},
      cost: 0,
    };
  },
  filters: {
    timeFormat(value) {
      var datetime = moment(value * 1000).format("DD/MM/YYYY h:mm a");
      return datetime;
    }
  },
  methods: {
    ...mapActions(["deleteCustomer"]),
    getTodaysDate() {
      var today = moment().format("LLLL");
      return today;
    },
    goToEditAccount(customerId) {
      this.$router.push({
        name: "EditAccount",
        params: { customerId: customerId }
      });
    },
    goToBill(customerId) {
      this.$router.push({
        name: "Bill",
        params: { customerId: customerId }
      });
    },
    addOrder() {
      const docRef = customerCollection.doc(this.$route.params.customerId);
      db.runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          // changing value locally
          this.selectedCustomerDetails.amt_due += +this.cost;
          // changing value at server
          var newAmtDue = +doc.data().amt_due + +this.cost;
          transaction.update(docRef, { amt_due: newAmtDue });
        });
      });

      // add order
      orderCollection.add({
        custId: this.$route.params.customerId,
        orderTS: firebase.firestore.Timestamp.now(),
        price: +this.cost
      });
    },
    deleteAccount(customerId) {
      this.deleteCustomer(customerId);
      orderCollection.get().then(res => {
        res.docs.forEach(order => {
          if (order.custId == customerId) {
            order.delete();
          }
        });
      });
      this.$router.push({ name: "AccountList" });
    },
    getCustomer(customerId) {
      customerCollection
        .doc(customerId)
        .get()
        .then(docRef => {
          this.selectedCustomerDetails = {
            name: docRef.data().name,
            mobile: +docRef.data().mobile,
            company: docRef.data().company,
            amt_due: +docRef.data().amt_due,
            note: docRef.data().note,
            accountTS: docRef.data().accountTS.seconds
          };
        });
    }
  },
  activated() {
    this.getCustomer(this.$route.params.customerId);
    this.cost = 0;
  }
};
</script>

<style scoped>
</style>