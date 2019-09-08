<template>
  <div class="ion-page">
    <ion-header>
      <ion-header>
        <ion-toolbar>
          <ion-button fill="clear" @click="$router.push({ name: 'AccountDetails' })">
            <ion-icon name="arrow-back"></ion-icon>
          </ion-button>
        </ion-toolbar>
      </ion-header>
      <ion-grid>
        <ion-row text-center>
          <ion-col>
            <b>Date & Time</b>
          </ion-col>
          <ion-col>
            <b>Price</b>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row v-for="order in orderList" :key="order.id" text-center>
          <ion-col>{{ order.orderTS.seconds | timeFormat }}</ion-col>
          <ion-col>{{ order.price }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-button @click="goToClearBill($route.params.customerId)">&#8377; Clear Bill</ion-button>
  </div>
</template>

<script>
import { orderCollection } from "../firebase";
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
        .orderBy("orderTS")
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
        name: "ClearBill",
        params: {
          customerId: customerId
        }
      });
    }
  },

  activated() {
    this.getOrderList(this.$route.params.customerId);
  }
};
</script>

<style scoped>
b {
  font-size: 18px;
}

ion-col {
  font-family: Montserrat !important;
}

ion-button {
  font-family: Montserrat !important;
  font-size: 16px;
}
</style>