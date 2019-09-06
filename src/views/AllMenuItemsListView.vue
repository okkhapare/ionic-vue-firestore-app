<template>
  <div class="ion-page">
    <ion-content fullscreen>
      <ion-list>
        <ion-list-header>Breakfast</ion-list-header>
        <ion-item>
          <ion-label></ion-label>
          <ion-checkbox
            slot="end"
          ></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>Lunch</ion-list-header>
        <ion-item>
          <ion-label></ion-label>
          <ion-checkbox
            slot="end"
          ></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>Dinner</ion-list-header>
        <ion-item>
          <ion-label></ion-label>
          <ion-checkbox
            slot="end"
          ></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>Miscellaneous</ion-list-header>
        <ion-item>
          <ion-label></ion-label>
          <ion-checkbox
            slot="end"
          ></ion-checkbox>
        </ion-item>
      </ion-list>
    </ion-content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breakfastMenu: [],
      lunchMenu: [],
      dinnerMenu: [],
      miscellaneousMenu: []
    };
  }
};
</script>

<style scoped>
</style>