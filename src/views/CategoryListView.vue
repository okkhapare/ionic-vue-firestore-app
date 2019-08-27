<template>
  <div>
    <app-category v-for="category in categories" :key="category.categoryId">
      <router-link
        :to="'/category/' + category.categoryId + '/menu-list'"
        tag="p"
      >{{ category.name }}</router-link>
    </app-category>
  </div>
</template>

<script>
import Category from "../components/category/Category";

export default {
  data() {
    return {
      categories: [
        { categoryId: 1, name: "Breakfast" },
        { categoryId: 2, name: "Lunch" },
        { categoryId: 3, name: "Dinner" },
        { categoryId: 4, name: "Miscellaneous" }
      ]
    };
  },
  components: {
    appCategory: Category
  }
};
</script>

<style scoped>
p {
  font-family: Montserrat;
  font-size: 20px;
  margin: 5px;
}
</style>