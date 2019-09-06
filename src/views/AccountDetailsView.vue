<template>
  <div class="ion-page">
    <ion-card>
      <ion-card-header>{{ this.selectedCustomerDetails.name }}</ion-card-header>
      <ion-card-content>
        {{ this.selectedCustomerDetails.mobile }}
        <br />
        {{ this.selectedCustomerDetails.company }}
        <br />
        {{ this.selectedCustomerDetails.note }}
        <br />
        {{ this.selectedCustomerDetails.accountTS | timeFormat }}
        <br />
        <ion-button @click="goToEditAccount($route.params.customerId)">Edit</ion-button>
        <ion-button @click="deleteAccount($route.params.customerId)">Delete</ion-button>
      </ion-card-content>
    </ion-card>
    <ion-content v-if="this.orders.length > 0">
      <ion-list>
        <ion-item v-for="order in orders" :key="order.id">{{ order.orderTS }}</ion-item>
      </ion-list>
    </ion-content>
    <ion-list v-else>
      <ion-card>
        <ion-item
          v-for="i in 7"
          :key="i"
          :style="'width: ' + Math.random() * Math.floor(100) + '%;'"
        >
          <ion-skeleton-text></ion-skeleton-text>
        </ion-item>
      </ion-card>
    </ion-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { customerCollection, orderCollection } from "../firebase";
import moment from "moment";

export default {
  name: "AccountDetailsView",
  data() {
    return {
      selectedCustomerDetails: {},
      orders: []
    };
  },
  filters: {
    timeFormat(value) {
      var datetime = moment(value * 1000).format("DD/MM/YYYY h:mm a");
      return datetime;
    }
  },
  methods: {
    goToEditAccount(customerId) {
      this.$router.push({
        name: "EditAccount",
        params: { customerId: customerId }
      });
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
              mobile: doc.data().mobile,
              company: doc.data().company,
              note: doc.data().note,
              accountTS: doc.data().accountTS.seconds
            };
          }
        });
      });
    },
    async getOrders(id) {
      this.orders = [];
      await orderCollection.get().then(res => {
        res.docs.forEach(doc => {
          if (doc.data().custId == id) {
            var orderObject = { id: doc.id, ...doc.data() };
            this.orders.unshift(orderObject);
          }
        });
      });
    }
  },
  activated() {
    this.getCustomer(this.$route.params.customerId);
    this.getOrders(this.$route.params.customerId);
  }
};
</script>

<style scoped>
</style>