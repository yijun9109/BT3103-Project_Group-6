//Landing and Home
import Landing from "@/views/Landing.vue";
import Home from "@/views/Home.vue";
import List from "@/views/List.vue";
import AddList from "@/views/AddList.vue";
import EditList from "@/views/EditList.vue";
//Account matters
import LogIn from "@/views/LogIn.vue";
import LogOut from "@/views/LogOut.vue";
// import Registration from '@/views/Registration.vue'
// import ForgetPassword from '@/views/ForgetPassword.vue'
// Tips Page
import Tips from "@/views/Tips.vue";
import StorageGuide from "@/views/StorageGuide.vue";
import Recipes from "@/views/Recipes.vue";
import RecipeDemo from "@/views/RecipeDemo.vue";

// Shopping List Page
import ShoppingList from "@/views/ShoppingList.vue";
import Router from "vue-router";
import Vue from "vue";

// temp
import temp from "@/views/temp.vue";
import edit2 from "@/views/EditList2.vue";

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
      path: "/AddList",
      name: "AddList",
      component: AddList,
    },
    {
      path: "/EditList/:item",
      name: "EditList",
      component: EditList,
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
      path: "/RecipeDemo",
      name: "RecipeDemo",
      component: RecipeDemo,
    },
    {
      path: "/ShoppingList",
      name: "ShoppingList",
      component: ShoppingList,
    },

    {
      path: "/temp",
      name: "temp",
      component: temp,
    },

    {
      path: "/edit2",
      name: "edit2",
      component: edit2,
    },

    {
      path: "/edit2/:item",
      name: "edit2",
      component: edit2,
    },

    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});
