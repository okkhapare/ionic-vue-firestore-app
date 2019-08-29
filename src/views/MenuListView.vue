<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button
            color="primary"
            expand="full"
            size="large"
            shape="round"
            @click="$router.push({ name: 'CategoryList' })"
          >
            <ion-icon name="arrow-back"></ion-icon>Back
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header>Menu</ion-header>

      <ion-list v-if="currentMenu.length > 0">
        <ion-card v-for="menuItem in currentMenu" :key="menuItem.id">
          <ion-card-header>
            <ion-card-title>{{ menuItem.name }} | {{ menuItem.price }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </ion-list>
      <ion-list v-else>
        <ion-item v-for="i in 20" :key="i">
          <ion-card>
            <ion-skeleton-text animated></ion-skeleton-text>
          </ion-card>
        </ion-item>
      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="goToAddMenu()">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setTimeout } from "timers";

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
    goToAddMenu() {
      this.$router.push({
        name: "AddMenuItem",
        params: { categoryId: this.categoryId }
      });
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
  }
};
</script>

<style scoped>
</style>