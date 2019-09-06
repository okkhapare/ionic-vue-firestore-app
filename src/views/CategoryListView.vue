<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Catering App</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="category in categories" :key="category.categoryId">
        <ion-card-header>
          <ion-card-title>
            <router-link :to="'/category/' + category.categoryId + '/menu-list'" tag="p">
              <i :class="category.icon"></i>
              {{ category.name }}
            </router-link>
          </ion-card-title>
        </ion-card-header>
      </ion-card>
    </ion-content>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "CategoryListView",
  data() {
    return {
      categories: [
        { categoryId: 1, name: "Breakfast", icon: "fas fa-coffee" },
        { categoryId: 2, name: "Lunch", icon: "fas fa-clock" },
        { categoryId: 3, name: "Dinner", icon: "fas fa-utensils" },
        { categoryId: 4, name: "Miscellaneous", icon: "fas fa-cookie-bite" }
      ]
    };
  },
  methods: {
    ...mapActions([
      'fetchBreakfastMenu',
      'fetchLunchMenu',
      'fetchDinnerMenu',
      'fetchMiscellaneousMenu'
    ])
  },
  activated() {
    this.fetchBreakfastMenu();
    this.fetchLunchMenu();
    this.fetchDinnerMenu();
    this.fetchMiscellaneousMenu();
  }
};
</script>

<style scoped>
</style>