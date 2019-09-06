<template>
  <div class="ion-page">
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
        <ion-skeleton-text :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"></ion-skeleton-text>
      </ion-card-header>
      <ion-card-content>
        <ion-skeleton-text :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"></ion-skeleton-text>
        <ion-skeleton-text :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"></ion-skeleton-text>
        <ion-skeleton-text :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"></ion-skeleton-text>
        <ion-skeleton-text :style="'width: ' + Math.random() * Math.floor(100) + '%;' + 'border-radius: 25px;'"></ion-skeleton-text>
      </ion-card-content>
    </ion-card>
    <!-- <ion-content v-if="this.orders.length > 0">
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
    </ion-list>-->
    <!-- <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToAddOrder()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>-->
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
              amt_due: doc.data().amt_due,
              note: doc.data().note,
              accountTS: doc.data().accountTS.seconds
            };
            this.isLoading = false
          }
        });
      });
    }
    //   async getOrders(id) {
    //     this.orders = [];
    //     await orderCollection.get().then(res => {
    //       res.docs.forEach(doc => {
    //         if (doc.data().custId == id) {
    //           var orderObject = { id: doc.id, ...doc.data() };
    //           this.orders.unshift(orderObject);
    //         }
    //       });
    //     });
    //   }
  },
  activated() {
    this.getCustomer(this.$route.params.customerId);
    // this.getOrders(this.$route.params.customerId);
  }
};
</script>

<style scoped>
</style>