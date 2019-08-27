<template>
  <div>
    <app-category v-for="category in categories" :key="category.categoryId">
      <router-link
        :to="'/category/' + category.categoryId + '/menu-list'"
        tag="p"
      ><i :class=category.icon></i> {{ category.name }}</router-link>
    </app-category>
  </div>
</template>

<script>
import Category from "../components/category/Category";

export default {
  data() {
    return {
      categories: [
        { categoryId: 1, name: "Breakfast", icon: 'fas fa-coffee' },
        { categoryId: 2, name: "Lunch", icon: 'fas fa-clock' },
        { categoryId: 3, name: "Dinner", icon: 'fas fa-utensils' },
        { categoryId: 4, name: "Miscellaneous", icon: 'fas fa-cookie-bite' }
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
  font-size: 22px;
  margin: 2px;
  color: rgb(90, 90, 90);
}

i {
  margin-right: 10px;
}
</style>