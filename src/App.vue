<template>
  <ion-app>
    <keep-alive>
      <router-view :key="$route.fullPath"></router-view>
    </keep-alive>
  </ion-app>
</template>


