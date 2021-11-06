<template>
  <div id="container">
    <!-- <div id="nav">
        <a href="/" class="brand">myfridge</a>
        <router-link to="/Home" v-if="this.loggedIn"> Home </router-link>
        <router-link to="/Tips" v-if="this.loggedIn"> Tips </router-link>
        <router-link to="/ShoppingList" v-if="this.loggedIn"> Shopping List </router-link>
        <router-link to="/LogOut" v-if="this.loggedIn"> Log Out </router-link>
        <router-link to="/LogIn" v-else > Log In </router-link>
       
    </div> -->
    <div id = "nav" v-if="this.loggedIn">
      <a href="/" class="brand">myfridge</a>
      <router-link to="/Home" > Home </router-link>
      <router-link to="/Tips" > Tips </router-link>
      <router-link to="/ShoppingList"> Shopping List </router-link>
      <router-link to="/LogOut"> Log Out </router-link>
    </div>
    <div id = "nav" v-else>
      <a href="/" class="brand">myfridge</a>
      <router-link to="/LogIn"> Log In </router-link>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
}

#nav {
  padding-top: 30px;
  padding-bottom:30px;
  padding-right: 50px;
  text-align: right;
  /* background: rgb(241, 220, 150); */
  background: white;
  margin-top: 0px;
  margin-left: -10px;
  width: 100%;
  position: relative;
}

a {
    text-decoration: none; /* removes the underline in the hyperlinks*/
}

#nav .brand {
    position: absolute;
    font-size: 180%;
    font-weight: bolder;
    /* top: -5px;  */ /* for use if p tag for brandname */
    top: 20px;
    left: 30px;
}

#logo-img {
  background: url('/src/assets/icon.png') no-repeat;
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  /* width: 20%; */
  /* width: 30px;
  height: 30px; */
}

#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
  color: #FFA235;
  padding-left: 10px;
  padding-right: 10px;
}

#nav a.router-link-exact-active {
  /* color: aliceblue; */
  color: #2c3e50;

  
}

@media (max-width: 900px)  {
    #nav {
        width: 770px;
    }
}
</style>