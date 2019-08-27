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
  font-size: 24px;
}
</style>

