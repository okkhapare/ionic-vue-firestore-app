<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row justify-content-around>
            <ion-col size="10">
              <b id="title">Accounts</b>
            </ion-col>
            <ion-col size="auto">
              <ion-icon id="logout" name="log-out" @click="logout"></ion-icon>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
      <ion-searchbar
        @ionInput="handleInput($event)"
        type="text"
        showCancelButton="always"
        animated="true"
        placeholder="Search Account"
      ></ion-searchbar>
    </ion-header>

  <transition name="fade">
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
                <ion-label>
                  <b>{{ customer.name }}</b>
                </ion-label>
              </ion-col>
              <ion-col>
                <ion-badge>{{ customer.company }}</ion-badge>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-item>
      </ion-list>
    </ion-content>
     </transition>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToAddAccount()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";

export default {
  name: "AccountListView",

  data() {
    return {
      isLoggedIn: false,
      currentUserId: false
    };
  },

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
    },

    logout() {
      return this.$ionic.alertController
        .create({
          header: "Alert",
          message: "Are you sure you want to logout?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Yes",
              handler: () => {
                firebase
                  .auth()
                  .signOut()
                  .then(
                    () => {
                      this.$router.go({ path: this.$router.path });
                    },
                    err => console.log(err)
                  );
              }
            }
          ]
        })
        .then(a => a.present());
    },

    presentLoading() {
      return this.$ionic.loadingController
        .create({
          message: "Loading",
          duration: 2000
        })
        .then(l => {
          setTimeout(function() {
            l.dismiss();
          }, 2000);
          return l.present();
        });
    }
  },

  created() {
    if (firebase.auth().currentUser) {
      this.isLoggedIn = true;
      this.currentUserId = firebase.auth().currentUser.uid;
    }
    this.presentLoading();
    this.fetchCustomerList();
  }
};
</script>

<style scoped>
b {
  color: #737373 !important;
}

#title {
  font-family: Montserrat !important;
  font-size: 18px !important;
  letter-spacing: 1px !important;
  font-size: 18px;
}

#logout {
  font-size: 18px;
}

ion-label,
ion-badge,
ion-searchbar {
  font-family: Montserrat !important;
}

ion-label {
  font-size: 16px !important;
}

ion-badge {
  font-size: 14px !important;
  letter-spacing: 1px !important;
}
</style>