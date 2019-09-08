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
      <ion-list>
        <ion-item
          v-for="customer in getCustomerList"
          :key="customer.id"
          @click="goToAccountDetails(customer.id)"
        >
          <ion-label>{{ customer.name }}</ion-label>
          <ion-label>{{ customer.company }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToAddAccount()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: "AccountListView",

  computed: {
    ...mapGetters(['getCustomerList'])
  },

  methods: {

    ...mapActions(['fetchCustomerList']),

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

  },
  
  created() {
    this.fetchCustomerList()
  },

};
</script>

<style scoped>
</style>