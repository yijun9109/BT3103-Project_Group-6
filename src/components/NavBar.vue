<template>
  <div id="container">
    <!-- <div id = "logged" v-if = "user"> -->
    <div id="nav">
      <router-link to="/Home" v-if="this.loggedIn"> Home </router-link>
      <router-link to="/Tips" v-if="this.loggedIn"> Tips </router-link>
      <router-link to="/ShoppingList" v-if="this.loggedIn"> ShoppingList </router-link>
      <router-link to="/LogOut" v-if="this.loggedIn"> Log Out </router-link>
      <router-link to="/LogIn" v-else > Log In / Register </router-link>
       
      <!-- <LogInComponent /> -->
    </div>
    
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
//import LogOut from '@/components/LogOut.vue'
// import LogInComponent from '@/components/LogIn.vue'
export default {
  name: "NavBar",

  data() {
    return {
      user: false,
      loggedIn: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
        this.loggedIn = user;
      }
    });
  },
};
</script>

<style scoped>
#nav {
  padding: 30px;
  text-align: end;
  background-color: rgb(247, 183, 65);
}
#nav a {
  font-weight: bold;
  color: white;
}
#nav a.router-link-exact-active {
  color: rgb(119, 192, 221);
}
</style>