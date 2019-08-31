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
              required
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked" color="primary">Price</ion-label>
            <ion-input
              @input="menu.price = $event.target.value"
              :value="menu.price"
              name="price"
              type="number"
              required
            ></ion-input>
          </ion-item>

          <ion-item v-if="this.categoryId == 4">
            <ion-label position="stacked" color="primary">Quantity</ion-label>
            <ion-input
              @input="menu.quantity = $event.target.value"
              :value="menu.quantity"
              name="quantity"
              type="number"
              required
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
            <ion-button size="medium" @click="editMenu()" color="light" expand="full">Edit Menu</ion-button>
          </ion-footer>
        </ion-list>
      </form>
    </ion-content>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      menu: {},
      categoryId: this.$route.params.categoryId,
      menuId: this.$route.params.menuId
    };
  },
  computed: {
    ...mapGetters([
      "getBreakfastMenu",
      "getLunchMenu",
      "getDinnerMenu",
      "getMiscellaneousMenu"
    ])
  },
  methods: {
    ...mapActions([
      "updateBreakfastMenu",
      "updateLunchMenu",
      "updateDinnerMenu",
      "updateMiscellaneousMenu"
    ]),
    async editMenu() {
      if (this.categoryId == 1) {
        this.updateBreakfastMenu(this.menu);
      } else if (this.categoryId == 2) {
        this.updateLunchMenu(this.menu);
      } else if (this.categoryId == 3) {
        this.updateDinnerMenu(this.menu);
      } else if (this.categoryId == 4) {
        this.updateMiscellaneousMenu(this.menu);
      }
    }
  },
  activated() {
    if (this.categoryId == 1) {
      this.getBreakfastMenu.forEach(element => {
        if (this.menuId == element.id) {
          this.menu = element;
        }
      });
    } else if (this.categoryId == 2) {
      this.getLunchMenu.forEach(element => {
        if (this.menuId == element.id) {
          this.menu = element;
        }
      });
    } else if (this.categoryId == 3) {
      this.getDinnerMenu.forEach(element => {
        if (this.menuId == element.id) {
          this.menu = element;
        }
      });
    } else if (this.categoryId == 4) {
      this.getMiscellaneousMenu.forEach(element => {
        if (this.menuId == element.id) {
          this.menu = element;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>