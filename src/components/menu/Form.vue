<template>
  <div>
    <ion-grid>
      <ion-row color="primary" justify-content-center>
        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">
          <ion-item>
            <ion-label>Menu Name</ion-label>
            <ion-input
              name="name"
              type="text"
              placeholder="Item Name"
              oninput="handleNameValue(event)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Menu Price</ion-label>
            <ion-input
              name="price"
              type="number"
              placeholder="In Rupees"
              oninput="handlePriceValue(event)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Item Quantity</ion-label>
            <ion-input
              name="quantity"
              type="text"
              placeholder="Number of Items"
              oninput="handleQuantityValue(event)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Menu Description</ion-label>
            <ion-textarea
              placeholder="Write Something About Your Menu Item..."
              oninput="handleDescriptionValue(event)"
            ></ion-textarea>
          </ion-item>
          <ion-button size="medium" type="submit" expand="block">Add Menu</ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</template>

<script>
export default {
    data() {
        return {
            menu: {
                name: '',
                price: 0,
                quantity: 0,
                description: ''
            }
        }
    },
    methods: {
        handleNameValue(event) {
            this.name = event.target.value;
        },
        handlePriceValue(event) {
            this.price = event.target.value;
        },
        handleQuantityValue(event) {
            this.quantity = event.target.value;
        },
        handleDescriptionValue(event) {
            this.description = event.target.value;
        }
    }
};
</script>

<style scoped>
    ion-label {
        font-family: Montserrat;
        color: blue;
    }
</style>