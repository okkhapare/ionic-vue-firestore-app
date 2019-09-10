<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-title text-center><b>Accounts</b></ion-title>
      </ion-toolbar>
      <ion-searchbar
        @ionInput="handleInput($event)"
        type="text"
        showCancelButton="always"
        animated="true"
        placeholder="Search Account"
      ></ion-searchbar>
    </ion-header>

    <ion-content>
      <ion-list lines padding-end>
        <ion-item
          v-for="customer in getCustomerList"
          :key="customer.id"
          @click="goToAccountDetails(customer.id)"
        >
          <ion-grid>
            <ion-row>
              <ion-col>
                <ion-label><b>{{ customer.name }}</b></ion-label>
              </ion-col>
              <ion-col>
                <ion-badge>{{ customer.company }}</ion-badge>
              </ion-col>
            </ion-row>
          </ion-grid>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AccountListView",

  computed: {
    ...mapGetters(["getCustomerList"])
  },

  methods: {
    ...mapActions(["fetchCustomerList"]),

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
    }
  },

  created() {
    this.fetchCustomerList();
  }
};
</script>

<style scoped>
b {
  color: #737373 !important;
}

ion-title, ion-label, ion-badge, ion-searchbar {
  font-family: Montserrat !important; 
}

ion-title {
  font-size: 18px !important; 
  letter-spacing: 2px !important;
}

ion-label { 
  font-size: 16px !important;
}

ion-badge {
  font-size: 14px !important; 
  letter-spacing: 1px !important;
}
</style>