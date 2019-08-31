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
          <ion-button @click.prevent="goToEditMenu(menuItem.id)">Edit</ion-button>
          <ion-button @click.prevent="deleteMenu(menuItem.id)">Delete</ion-button>
        </ion-card>
      </ion-list>
      <ion-list v-else>
        <ion-item v-for="i in 20" :key="i">
          <ion-card :style="'width: ' + Math.random() * Math.floor(100) + '%;'">
            <ion-skeleton-text></ion-skeleton-text>
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
      "deleteBreakfastMenu",
      "deleteLunchMenu",
      "deleteDinnerMenu",
      "deleteMiscellaneousMenu"
    ]),
    goToAddMenu() {
      this.$router.push({
        name: "AddMenuItem",
        params: { categoryId: this.categoryId }
      });
    },
    goToEditMenu(menuItemId) {
      this.$router.push({
        name: "EditMenuItem",
        params: { categoryId: this.categoryId, menuId: menuItemId }
      });
    },
    deleteMenu(menuItemId) {
      if (this.categoryId == 1) {
        this.deleteBreakfastMenu(menuItemId);
      } else if (this.categoryId == 2) {
        this.deleteLunchMenu(menuItemId);
      } else if (this.categoryId == 3) {
        this.deleteDinnerMenu(menuItemId);
      } else if (this.categoryId == 4) {
        this.deleteMiscellaneousMenu(menuItemId);
      }
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