<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button fill="clear" @click="$router.push({ name: 'Bill' })">
          <ion-icon name="arrow-back"></ion-icon>
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-card-header>Bill Amount</ion-card-header>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-input
                type="number"
                name="bill_amt"
                @input="amt_due = $event.target.value"
                :value="amt_due"
              ></ion-input>
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-button id="clear-button" fill="clear" expand="full" @click="clearBill()">Clear Bill</ion-button>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { db, customerCollection } from "../firebase";

export default {
  name: "ClearBill",

  data() {
    return {
      amt_due: 0,
      temp_amt_due: 0
    };
  },

  methods: {
    clearBill() {
      if (this.temp_amt_due < this.amt_due) {
        return this.$ionic.alertController
          .create({
            header: "Alert",
            message: "The amount cannot be more than the due amount!",
            buttons: ["OK"]
          })
          .then(a => a.present());
      } else if (this.amt_due == 0) {
        return this.$ionic.alertController
          .create({
            header: "Alert",
            message: "Amount cannot be zero!",
            buttons: ["OK"]
          })
          .then(a => a.present());
      } else {
        const docRef = customerCollection.doc(this.$route.params.customerId);
        db.runTransaction(transaction => {
          return transaction.get(docRef).then(doc => {
            // changing value at server
            var newAmtDue = +doc.data().amt_due - +this.amt_due;
            transaction.update(docRef, { amt_due: newAmtDue });
            this.amt_due = this.temp_amt_due - this.amt_due;
          });
        });

        return this.$ionic.alertController
          .create({
            header: "Success",
            message: "Amount successfully paid!",
            buttons: ["OK"]
          })
          .then(a => a.present());
      }
    }
  },

  activated() {
    customerCollection.get().then(res => {
      res.docs.forEach(doc => {
        if (doc.id == this.$route.params.customerId) {
          this.amt_due = doc.data().amt_due;
          this.temp_amt_due = doc.data().amt_due;
        }
      });
    });
  }
};
</script>

<style scoped>
ion-card-header {
  font-family: Montserrat !important;
  font-size: 16px;
  padding-bottom: 0px;
}

ion-input {
  font-family: Montserrat !important;
  font-size: 16px !important;
  padding: 2px 20px !important;
  border: 0 !important;
}

ion-icon {
  font-size: 16px !important;
}

#clear-button {
  font-family: Montserrat !important;
  font-size: 16px !important;
  border-top: 1px solid #737373 !important;
  margin: 10px 25px !important;
  padding-top: 5px !important;
}
</style>