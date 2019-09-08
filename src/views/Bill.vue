<template>
  <div class="ion-page">
    <ion-header>
      <ion-grid>
        <ion-row>
          <ion-col>Date & Time</ion-col>
          <ion-col>Price</ion-col>
        </ion-row>
      </ion-grid>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row v-for="order in orderList" :key="order.id">
          <ion-col>{{ order.orderTS.seconds | timeFormat }}</ion-col>
          <ion-col>{{ order.price }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-button @click="goToClearBill($route.params.customerId)">Clear Bill</ion-button>
  </div>
</template>

<script>
import { orderCollection } from "../firebase";
import ClearBill from '../views/ClearBill'
import moment from "moment";

export default {
  name: "Bill",

  data() {
    return {
      orderList: []
    };
  },

  filters: {
    timeFormat(value) {
      var datetime = moment(value * 1000).format("DD/MM/YYYY h:mm a");
      return datetime;
    }
  },

  methods: {
    getOrderList(customerId) {
      this.orderList = [];
      orderCollection
        .where("custId", "==", customerId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            var orderObject = { id: doc.id, ...doc.data() };
            this.orderList.unshift(orderObject);
          });
        });
    },
    goToClearBill(customerId) {
        this.$router.push({
            name: 'ClearBill',
            params: {
                customerId: customerId
            }
        })
    }
  },

  activated() {
    this.getOrderList(this.$route.params.customerId);
  }
};
</script>