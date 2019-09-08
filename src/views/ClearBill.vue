<template>
  <div class="ion-page">
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
    <ion-button @click="clearBill()">Clear Bill</ion-button>
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