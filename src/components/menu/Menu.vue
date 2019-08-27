<template>
  <div>
    <div>
      <ion-card>

        <ion-card-header>
          <ion-grid>
            <ion-row color="primary">

              <ion-col align-self-center>
                <!-- <ion-card-title> -->
                  <slot name="name"></slot>
                <!-- </ion-card-title> -->
              </ion-col>

              <ion-col align-self-center size=2>
                <!-- <ion-card-subtitle> -->
                  <slot name="price"></slot>
                <!-- </ion-card-subtitle> -->
              </ion-col>

            </ion-row>

            <ion-row>
              <ion-col align-self-center>
                <!-- <ion-card-subtitle> -->
                  <slot name="quantity"></slot>
                <!-- </ion-card-subtitle> -->
              </ion-col>
            </ion-row>

          </ion-grid>
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
  color: rgb(61, 61, 61);
  font-weight: 600;
  font-family: Montserrat;
  font-size: 22px;
  margin: 0;
  max-width: fit-content;
}
p {
  color: rgb(90, 90, 90);
  font-family: Montserrat;
  font-size: 20px;
  margin: 0;
  max-width: fit-content;
}

ion-card-header {
  padding-bottom: 5px;
}

ion-card-content {
  padding-top: 5px;
}

ion-grid, ion-row, ion-col {
  padding: 0;
}

ion-badge {
    display: inline;
    position: relative;
    top: -2px;
}
</style>