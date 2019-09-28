<template>
  <div class="ion-page">
    <ion-header>
      <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size="1.5" style="text-align: center;">
              <ion-icon name="arrow-back" @click="$router.push({ name: 'AccountDetails' })"></ion-icon>
            </ion-col>
            <ion-col style="font-size: 18px;">
              <p style="margin: 0px;">Bill Report</p>
            </ion-col>
          </ion-row>
        </ion-grid>
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
          <ion-col class="order">{{ order.orderTS.seconds | timeFormat }}</ion-col>
          <ion-col v-if="order.order_type" style="color: green;">- &#8377;{{ order.price }}</ion-col>
          <ion-col v-else class="order">&#8377;{{ order.price }}</ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-button @click="goToClearBill($route.params.customerId)" expand="full">&#8377; Clear Bill</ion-button>
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
  font-size: 16px;
}

.order {
  font-size: 14px;
}

ion-col {
  font-family: Montserrat !important;
}

ion-icon {
  font-size: 16px !important;
}

div > ion-button {
  font-family: Montserrat !important;
  font-size: 16px !important;
}
</style>