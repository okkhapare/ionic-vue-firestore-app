<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-grid>
          <ion-row>
            <ion-col size="1.5" style="text-align: center;">
              <ion-icon name="arrow-back" @click="$router.push({ name: 'AccountList' })"></ion-icon>
            </ion-col>
            <ion-col style="font-size: 18px;">
              <p style="margin: 0px;">Account Details</p>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col>
              <b>{{ this.selectedCustomerDetails.name }}</b>
            </ion-col>
            <ion-col
              size="auto"
            >(Account Created At: {{ this.selectedCustomerDetails.accountTS | timeFormat }})</ion-col>
          </ion-row>
          <ion-row>
            <ion-col><p style="display: inline; font-size: 15px; font-weight: 600;">Mobile</p> - {{ this.selectedCustomerDetails.mobile }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col><p style="display: inline; font-size: 15px; font-weight: 600;">Company</p> - {{ this.selectedCustomerDetails.company }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col><p style="display: inline; font-size: 15px; font-weight: 600;">Note</p> - {{ this.selectedCustomerDetails.note }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-chip>
                <ion-icon name="cash"></ion-icon>
                <ion-label>Amount Due</ion-label>
              </ion-chip>
              <ion-chip color="primary">&#8377; {{ this.selectedCustomerDetails.amt_due }}</ion-chip>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>

      <ion-grid>
        <ion-row>
          <ion-col text-center>
            <ion-chip @click="goToEditAccount($route.params.customerId)" color="primary">
              <ion-icon name="create"></ion-icon>
              <ion-label>Edit</ion-label>
            </ion-chip>
          </ion-col>
          <ion-col text-center>
            <ion-chip @click="goToBill($route.params.customerId)" color="primary">
              <ion-icon name="card"></ion-icon>
              <ion-label>Bill</ion-label>
            </ion-chip>
          </ion-col>
          <ion-col text-center>
            <ion-chip @click="deleteAccount($route.params.customerId)" color="danger">
              <ion-icon name="trash"></ion-icon>
              <ion-label>Delete</ion-label>
            </ion-chip>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col>
              <b>Order</b>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>{{ this.getTodaysDate() }}</ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                type="number"
                name="amount_due"
                placeholder="Enter Order Amount"
                @input="cost = $event.target.value"
                :value="cost"
              ></ion-input>
            </ion-col>
          </ion-row>
          <!-- <ion-row>
          <ion-col>-->
          <ion-button id="add-order" @click="addOrder()" expand="full" fill="clear">+ Add Order</ion-button>
          <!-- </ion-col>
          </ion-row>-->
        </ion-grid>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import { db, customerCollection, orderCollection } from "../firebase";
import moment from "moment";

export default {
  name: "AccountDetailsView",
  data() {
    return {
      selectedCustomerDetails: {},
      cost: ""
    };
  },
  filters: {
    timeFormat(value) {
      var datetime = moment(value * 1000).format("DD/MM/YYYY h:mm a");
      return datetime;
    }
  },
  methods: {
    ...mapActions(["deleteCustomer"]),
    getTodaysDate() {
      var today = moment().format("LLLL");
      return today;
    },
    goToEditAccount(customerId) {
      this.$router.push({
        name: "EditAccount",
        params: { customerId: customerId }
      });
    },
    goToBill(customerId) {
      this.$router.push({
        name: "Bill",
        params: { customerId: customerId }
      });
    },
    addOrder() {
      if (this.cost == "" || this.cost == 0) {
        return this.$ionic.alertController
          .create({
            header: "Alert",
            message: "Please enter valid amount!",
            buttons: ["OK"]
          })
          .then(a => a.present());
      } else {
        const docRef = customerCollection.doc(this.$route.params.customerId);
        db.runTransaction(transaction => {
          return transaction.get(docRef).then(doc => {
            // changing value locally
            this.selectedCustomerDetails.amt_due += +this.cost;
            // changing value at server
            var newAmtDue = +doc.data().amt_due + +this.cost;
            transaction.update(docRef, { amt_due: newAmtDue });
          });
        });

        // add order
        orderCollection.add({
          custId: this.$route.params.customerId,
          orderTS: firebase.firestore.Timestamp.now(),
          price: +this.cost
        });

        return this.$ionic.alertController
          .create({
            header: "Success",
            message: "Order placed successfully!",
            buttons: ["OK"]
          })
          .then(a => a.present());
      }
    },
    deleteAccount(customerId) {
      return this.$ionic.alertController
        .create({
          header: "Alert",
          message: "Are you sure you want to delete this account?",
          buttons: [
            {
              text: "Cancel",
              role: "cancel"
            },
            {
              text: "Yes",
              handler: () => {
                // delete from server
                orderCollection.get().then(res => {
                  res.docs.forEach(order => {
                    if (order.custId == customerId) {
                      order.delete();
                    }
                  });
                });
                // delete from local
                this.deleteCustomer(customerId);
                // push to account list
                this.$router.push({ name: "AccountList" });
              }
            }
          ]
        })
        .then(a => a.present());
    },
    getCustomer(customerId) {
      customerCollection
        .doc(customerId)
        .get()
        .then(docRef => {
          this.selectedCustomerDetails = {
            name: docRef.data().name,
            mobile: +docRef.data().mobile,
            company: docRef.data().company,
            amt_due: +docRef.data().amt_due,
            note: docRef.data().note,
            accountTS: docRef.data().accountTS.seconds
          };
        });
    }
  },
  activated() {
    this.getCustomer(this.$route.params.customerId);
    this.cost = "";
  }
};
</script>

<style scoped>
ion-card {
  padding: 5px;
}

ion-col {
  font-family: Montserrat !important;
  /* padding: 7px 15px; */
}

b {
  font-family: Montserrat !important;
  font-size: 16px !important;
}

ion-icon {
  font-size: 16px !important;
}

ion-label,
ion-chip,
ion-input {
  font-family: Montserrat !important;
  font-size: 16px !important;
}

ion-input {
  font-family: Montserrat !important;
  font-size: 16px !important;
  padding: 0px 10px !important;
  border: none !important;
}

#add-order {
  font-family: Montserrat !important;
  font-size: 16px !important;
  border-top: 1px solid #737373 !important;
  margin: 5px 15px !important;
  padding-top: 10px !important;
}

ion-chip {
  padding: 5px 12px !important;
}
</style>