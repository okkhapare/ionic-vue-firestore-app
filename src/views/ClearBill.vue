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
      amt_due: 0
    };
  },

  methods: {
    clearBill() {
      const docRef = customerCollection.doc(this.$route.params.customerId);
      db.runTransaction(transaction => {
        return transaction.get(docRef).then(doc => {
          // changing value at server
          var newAmtDue = +doc.data().amt_due - +this.amt_due;
          transaction.update(docRef, { amt_due: newAmtDue });
        });
      });
    }
  },

  activated() {
    customerCollection.get().then(res => {
      res.docs.forEach(doc => {
        if (doc.id == this.$route.params.customerId) {
          this.amt_due = doc.data().amt_due;
        }
      });
    });
  }
};
</script>

<style scoped>
ion-card-header {
  font-family: Montserrat !important;
  font-size: 18px;
}

ion-input {
  font-family: Montserrat !important;
  font-size: 16px !important;
  padding: 2px 20px !important;
  border: 0 !important;
}

ion-icon {
  font-size: 18px !important;
}

#clear-button {
  font-family: Montserrat !important;
  font-size: 18px !important;
  border-top: 1px solid rgb(105, 105, 105) !important;
  margin: 0px 20px 20px !important;
  padding-top: 15px !important;
}
</style>