<template>
  <div>
    <form id="form">
    <ion-grid>
      <ion-row>
        <ion-col>
          <label for="name">Name:</label>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <input type="text" name="name" id="name" v-model="menu.name" />
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <label for="price">Price:</label>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <input type="number" name="price" id="price" v-model="menu.price" />
        </ion-col>
      </ion-row>

      <ion-row v-if="categoryId == 4">
        <ion-col>
          <label for="quantity">Quantity:</label>
        </ion-col>
      </ion-row>
      <ion-row v-if="categoryId == 4">
        <ion-col>
          <input type="number" name="quantity" id="quantity" v-model="menu.quantity" />
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col>
          <label for="description">Description:</label>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <textarea
            name="description"
            cols="23"
            rows="5"
            id="description"
            v-model="menu.description"
          ></textarea>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-grid>
      <ion-row>
        <ion-col>
          <slot :name="this.addOrEdit"></slot>
          <input type="reset" value="Reset Form" id="reset-form">
        </ion-col>
      </ion-row>
    </ion-grid>
    </form>
  </div>
</template>

<script>
export default {
  props: ["menu", "addOrEdit", "categoryId"]
};
</script>

<style scoped>
label {
  font-family: Montserrat;
  font-size: 18px;
}

#reset-form {
  padding: 12px 2px;
  margin: 4px 2px;
  font-family: Montserrat;
  font-size: 18px;
  color: white;
  background-color: rgb(56, 128, 255);
  border: none;
  border-radius: 30px;
  contain: content;
}

input, textarea {
  font-family: Montserrat;
  border: 1px solid rgb(61, 61, 61);
  border-radius: 10px;
  outline: none;
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
}

</style>