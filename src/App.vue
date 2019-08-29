<template>
  <ion-app>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </ion-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions([
      'fetchBreakfastMenu',
      'fetchLunchMenu',
      'fetchDinnerMenu',
      'fetchMiscellaneousMenu'
    ])
  },
  created() {
    this.fetchBreakfastMenu();
    this.fetchLunchMenu();
    this.fetchDinnerMenu();
    this.fetchMiscellaneousMenu();
  }
}
</script>

<style scoped>

</style>

