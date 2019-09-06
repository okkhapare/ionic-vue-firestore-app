<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title>Accounts</ion-title>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar
          @ionInput="handleInput($event)"
          showCancelButton="always"
          debounce="0"
          placeholder="Search Account Name"
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-list>
          <ion-item
            v-for="customer in customerList"
            :key="customer.id"
            @click="goToAccountDetails(customer.id)"
          >
            <ion-label>{{ customer.name }}</ion-label>
            <ion-label>{{ customer.mobile }}</ion-label>
            <ion-label>{{ customer.company }}</ion-label>
          </ion-item>
        </ion-list>
      </ion-grid>
    </ion-content>
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToAddAccount()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import { customerCollection } from '../firebase'

export default {
  name: "AccountListView",
  data() {
    return {
      customerList: []
    };
  },
  methods: {
    goToAccountDetails(customerId) {
        this.$router.push({
        name: "AccountDetails",
        params: { customerId: customerId }
      });
    },
    goToAddAccount() {
      this.$router.push({
        name: "AddAccount"
      });
    },
    handleInput(event) {
      const items = Array.from(document.querySelector("ion-list").children);
      const query = event.target.value.toLowerCase();
      requestAnimationFrame(() => {
        items.forEach(item => {
          const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
          item.style.display = shouldShow ? "block" : "none";
        });
      });
    },
    getCustomerList() {
    customerCollection.get().then((res) => {
      res.docs.forEach((doc) => {
        var customerObject = { id: doc.id, ...doc.data() }
        this.customerList.unshift(customerObject)
      })
    })
  },
  },
  activated() {
    this.getCustomerList()
  }
};
</script>

<style scoped>
</style>