<template>
  <div id="app">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Catering App</ion-title>
      </ion-toolbar>
    </ion-header>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </div>
</template>

<style scoped>
ion-title {
  font-family: Montserrat;
  font-size: 26px;
  letter-spacing: 1px;
  color: rgb(255, 255, 255);
}
</style>

