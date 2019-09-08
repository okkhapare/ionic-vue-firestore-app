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
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-label>Bill Amount</ion-label>
            <ion-input
              type="number"
              name="bill_amt"
              @input="amt_due = $event.target.value"
              :value="amt_due"
            ></ion-input>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-button @click="clearBill()">&#8377; Clear Bill</ion-button>
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
ion-label {
  font-family: Montserrat !important;
  font-size: 18px !important;
}

ion-input {
  font-family: Montserrat !important;
  font-size: 16px !important; 
  border: 1px solid !important;
  border-radius: 25px !important; 
  margin-top: 10px !important;
  padding: 5px 10px !important;
}

ion-input:hover {
  border: 1px solid green !important;
}

ion-button {
  font-family: Montserrat !important;
  font-size: 16px !important;
}

</style>