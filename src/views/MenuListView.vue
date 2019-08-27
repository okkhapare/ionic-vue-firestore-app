<template>
  <div>
    <div v-for="menu in currentMenu" :key="menu.id">
      <app-menu :categoryId="categoryId">
        <h2 slot="name">{{ menu.name }}</h2>
        <p slot="price">Price: ₹{{ menu.price }}</p>
        <div v-if="categoryId == 4" slot="quantity">
          <p>Quantity:
          <ion-badge color="primary">{{ menu.quantity }}</ion-badge></p>
        </div>
        <p slot="description">{{ menu.description }}</p>
      </app-menu>
    </div>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToAddMenu()">
        <ion-icon name="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script>
import Menu from "../components/menu/Menu";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      categoryId: this.$route.params.categoryId,
      currentMenu: []
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
      "fetchBreakfastMenu",
      "fetchLunchMenu",
      "fetchDinnerMenu",
      "fetchMiscellaneousMenu"
    ]),
    goToAddMenu() {
      this.$router.push({ name: 'AddMenu' })
    }
  },
  created() {
    if (this.categoryId == 1) {
      this.fetchBreakfastMenu();
      this.currentMenu = this.getBreakfastMenu;
    } else if (this.categoryId == 2) {
      this.fetchLunchMenu();
      this.currentMenu = this.getLunchMenu;
    } else if (this.categoryId == 3) {
      this.fetchDinnerMenu();
      this.currentMenu = this.getDinnerMenu;
    } else if (this.categoryId == 4) {
      this.fetchMiscellaneousMenu();
      this.currentMenu = this.getMiscellaneousMenu;
    }
  },
  activated() {
    if (this.categoryId == 1) {
      this.currentMenu = this.getBreakfastMenu;
    } else if (this.categoryId == 2) {
      this.currentMenu = this.getLunchMenu;
    } else if (this.categoryId == 3) {
      this.currentMenu = this.getDinnerMenu;
    } else if (this.categoryId == 4) {
      this.currentMenu = this.getMiscellaneousMenu;
    }
  },
  deactivated() {
    this.currentMenu = [];
  },
  components: {
    appMenu: Menu
  }
};
</script>

<style scoped>
</style>