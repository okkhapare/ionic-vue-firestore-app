<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-button
          color="primary"
          expand="full"
          size="large"
          shape="round"
          @click="$router.push({ name: 'MenuList' })"
        >
          <ion-icon name="arrow-back"></ion-icon>Back
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form>
        <ion-list>
          <ion-item>
            <ion-label position="stacked" color="primary">Name</ion-label>
            <ion-input
              @input="menu.name = $event.target.value"
              :value="menu.name"
              name="name"
              type="text"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Price</ion-label>
            <ion-input
              @input="menu.price = $event.target.value"
              :value="menu.price"
              name="price"
              type="number"
            ></ion-input>
          </ion-item>

          <ion-item v-if="categoryId == 4">
            <ion-label position="stacked" color="primary">Quantity</ion-label>
            <ion-input
              @input="menu.quantity = $event.target.value"
              :value="menu.quantity"
              name="quantity"
              type="number"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Description</ion-label>
            <ion-textarea
              @input="menu.description = $event.target.value"
              :value="menu.description"
              name="description"
            ></ion-textarea>
          </ion-item>

          <ion-footer>
            <ion-button size="medium" @click="addMenu()" color="light" expand="full">Add Menu</ion-button>
          </ion-footer>
        </ion-list>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      menu: {}
    };
  },
  methods: {
    ...mapActions([
      "addBreakfastMenu",
      "addLunchMenu",
      "addDinnerMenu",
      "addMiscellaneousMenu"
    ]),
    addMenu() {
      if (this.categoryId == 1) {
        this.addBreakfastMenu(this.menu);
      } else if (this.categoryId == 2) {
        this.addLunchMenu(this.menu);
      } else if (this.categoryId == 3) {
        this.addDinnerMenu(this.menu);
      } else if (this.categoryId == 4) {
        this.addMiscellaneousMenu(this.menu);
      }
    }
  }
};
</script>

<style scoped>
</style>