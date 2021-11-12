//Landing and Home
import Landing from "@/views/Landing.vue";
import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
import Edit from "@/views/EditList.vue";
//Account matters
import LogIn from "@/views/LogIn.vue";
import LogOut from "@/views/LogOut.vue";
// import Registration from '@/views/Registration.vue'
// import ForgetPassword from '@/views/ForgetPassword.vue'
// Tips Page
import Tips from "@/views/Tips.vue";
import StorageGuide from "@/views/StorageGuide.vue";
import Recipes from "@/views/Recipes.vue";
import Food1 from "@/views/Food1.vue";
import Food2 from "@/views/Food2.vue";
import Food3 from "@/views/Food3.vue";
import WesternRecipes from "@/views/WRecipes.vue";
import ChineseRecipes from "@/views/CRecipes.vue";
// Shopping List Page
import ShoppingList from "@/views/ShoppingList.vue";
import Router from "vue-router";
import Vue from "vue";

// catch error
import NotFound from "@/views/NotFound.vue";

Vue.use(Router);
export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "Landing",
      component: Landing,
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
    },
    {
      path: "/List",
      name: "List",
      component: List,
    },

    {
      path: "/Login",
      name: "LogIn",
      component: LogIn,
    },
    {
      path: "/LogOut",
      name: "LogOut",
      component: LogOut,
    },
    {
      path: "/Tips",
      name: "Tips",
      component: Tips,
    },
    {
      path: "/StorageGuide",
      name: "StorageGuide",
      component: StorageGuide,
    },
    {
      path: "/Recipes",
      name: "Recipes",
      component: Recipes,
    },
    {
      path: "/Food1",
      name: "Food1",
      component: Food1,
    },
    {
      path: "/Food2",
      name: "Food2",
      component: Food2,
    },
    {
      path: "/Food3",
      name: "Food3",
      component: Food3,
    },
    {
      path: "/WRecipes",
      name: "WesternRecipes",
      component: WesternRecipes,
    },
    {
      path: "/CRecipes",
      name: "ChineseRecipes",
      component: ChineseRecipes,
    },
    {
      path: "/ShoppingList",
      name: "ShoppingList",
      component: ShoppingList,
    },

    {
      path: "/Edit/:item",
      name: "Edit",
      component: Edit,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});
