<template>
  <div>
    <app-form :categoryId="categoryId" :addOrEdit="this.addRef" :menu="this.menu">
      <ion-button
        color="primary"
        slot="add"
        expand="full"
        size="large"
        shape="round"
        @click="addMenu()"
      >Add Menu</ion-button>
    </app-form>
  </div>
</template>

<script>
import Form from "./Form";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      menu: {
        name: '',
        price: 0,
        quantity: 0,
        description: ''
      },
      addRef: "add"
    };
  },
  methods: {
    ...mapActions(["addBreakfastMenu"]),
    addMenu() {
      if (this.categoryId == 1) {
        this.addBreakfastMenu(this.menu);
      } else if (this.categoryId == 2) {
        this.addBreakfastMenu(this.menu);
      } else if (this.categoryId == 3) {
        this.addBreakfastMenu(this.menu);
      } else if (this.categoryId == 4) {
        this.addBreakfastMenu(this.menu);
      }   
    }
  },
  components: {
    appForm: Form
  }
};
</script>

<style scoped>
ion-button {
  font-family: Montserrat;
  font-size: 18px;
}

</style>