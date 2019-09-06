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
    <div>
      <ion-card v-if="!this.isLoading">
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
        </ion-card-content>
      </ion-card>
      <ion-card v-else>
        <ion-card-header>
          <ion-skeleton-text
            :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"
          ></ion-skeleton-text>
        </ion-card-header>
        <ion-card-content>
          <ion-skeleton-text
            :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"
          ></ion-skeleton-text>
          <ion-skeleton-text
            :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"
          ></ion-skeleton-text>
          <ion-skeleton-text
            :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"
          ></ion-skeleton-text>
          <ion-skeleton-text
            :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"
          ></ion-skeleton-text>
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
            @input="amt_due = $event.target.value"
            :value="amt_due"
          ></ion-input>
        </ion-card-content>
        <ion-button size="medium" @click="addOrder()" color="light" expand="full">Add Order</ion-button>
      </ion-card>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db, customerCollection, orderCollection } from "../firebase";
import moment from "moment";

export default {
  name: "AccountDetailsView",
  data() {
    return {
      selectedCustomerDetails: {},
      amt_due: 0,
      isLoading: true
    };
  },
  filters: {
    timeFormat(value) {
      var datetime = moment(value * 1000).format("DD/MM/YYYY h:mm a");
      return datetime;
    }
  },
  methods: {
    getTodaysDate() {
      var today = moment().format('LLLL');
      return today
    },
    goToEditAccount(customerId) {
      this.$router.push({
        name: "EditAccount",
        params: { customerId: customerId }
      });
    },
    addOrder() {
      const docRef = customerCollection.doc(this.$route.params.customerId)
      db.runTransaction((transaction) => {
        return transaction.get(docRef).then((doc) => {
          var newAmtDue = +doc.data().amt_due + +this.amt_due
          // changing value locally
          this.selectedCustomerDetails.amt_due += +this.amt_due
          // changing value at server
          transaction.update(docRef, { amt_due: newAmtDue })
        })
      })

      // add order
      orderCollection.add({
        custId: this.$route.params.customerId,
        orderTS: firebase.firestore.Timestamp.now(),
        price: +this.amt_due
      })
    },
    deleteAccount(customerId) {
      customerCollection.doc(customerId).delete();
      orderCollection.get().then(res => {
        res.docs.forEach(order => {
          if (order.custId == customerId) {
            order.delete();
          }
        });
      });
      this.$router.push({ name: "AccountList" });
    },
    getCustomer(id) {
      customerCollection.get().then(res => {
        res.docs.forEach(doc => {
          if (doc.id == id) {
            this.selectedCustomerDetails = {
              id: doc.id,
              name: doc.data().name,
              mobile: +doc.data().mobile,
              company: doc.data().company,
              amt_due: +doc.data().amt_due,
              note: doc.data().note,
              accountTS: doc.data().accountTS.seconds
            };
            this.isLoading = false;
          }
        });
      });
    }
  },
  activated() {
    this.getCustomer(this.$route.params.customerId);
  }
};
</script>

<style scoped>
</style>