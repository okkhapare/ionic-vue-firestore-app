<template>
  <div>
    <div>
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <slot name="name"></slot>
          </ion-card-title>
          <ion-card-subtitle>
            <slot name="price"></slot>
            <slot name="quantity"></slot>
          </ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <slot name="description"></slot>
        </ion-card-content>
      </ion-card>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categoryId"]
};
</script>

<style scoped>
h2 {
  font-size: 20px;
  font-family: Montserrat;
  color: rgb(10, 10, 88);
  margin: 0;
}
p {
  font-family: Montserrat;
  font-size: 16px;
  margin: 0;
  padding: 3px;
}

ion-card-subtitle {
  padding: 5px;
}

ion-badge {
  display: inline;
}

</style>