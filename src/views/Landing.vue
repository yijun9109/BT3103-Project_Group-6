<template>
  <div class="bg">
      <div class="loggedin" v-if="this.loggedIn">
        <div class="box">
            <a href="/Home">keep track of your food items</a>
            <!-- <a href="/LogIn">keep track of your food items</a> -->
        </div>

        <div class="row">
            <div class="tile milk">
                <img src="../assets/milk.jpg" />
                <p>2-3 days after opening</p>
            </div>
            <div class="tile beef">
                <img src="../assets/beef.png" />
                <p>1-2 months in the fridge</p>
            </div>
            <div class="tile broccoli">
                <img src="../assets/broccoli.jpeg" />
                <p>3 days in the fridge</p>
            </div>
            <div class="tile apple">
                <img src="../assets/apple.jpeg" />
                <p>1-2 weeks in the fridge</p>
            </div>
        </div>
      </div>

    <div class="loggedout" v-else>
        <div class="message">
            <p>Here at myfridge, you get to list inventory items and track the expiry dates all in one place !
                Browse through our recipes to cook your leftover ingredients with. Or even look up our tips for storing
                the different food categories. Track and check off your very own shopping list when you go grocery 
                shopping with myfridge today. Love, your personal inventory tracker.
            </p>
        </div>

        <div class= "login">
            <p class= "title">Welcome Back</p>
            <p>Login to continue.</p>
            <LogInComponent />
        </div>
    </div>



  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LogInComponent from "@/components/LogIn.vue";

export default {
  name: "Landing",

  data() {
    return {
      user: false,
      loggedIn: false,
    };
  },
    components: {
    LogInComponent,
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
.bg {
  background-image: url("../assets/kitchen.jpeg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 95vh;
  text-align: center;
  vertical-align: middle;
  padding: 20px;
  margin-left: -10px;
  margin-right: -40px;
  overflow: hidden;
}

.box {
  height: 100px;
  width: 80%;
  padding: 15px;
  background-color: #ffffff;
  box-shadow: 5px 8px 5px;
  margin-left: 7%;
  margin-top: 10%;
  border-radius: 15px;
  opacity: 90%;
}

a {
  font-weight: bold;
  font-size: 50px;
  margin: 5px;
  color: #2c3e50;
}

a:focus {
  /* other possible attributes :focus, :visited, :link, :active */
  color: orange;
}

a:hover {
  color: orange;
}

img {
  max-width: 80%;
  max-height: 80%;
}

.row {
  width: 100%;
}

p {
  font-size: 20px;
  color: black;
}

.tile {
  color: white;
  height: 300px;
  width: 20%;
  /* border: 1px solid black; */
  background-color: white;
  position: relative;
  margin: 20px;
  left: 80px;
  top: 150px;
  overflow: hidden;
  float: left;
}

.message {
    background-color: white;
    height: 60%;
    width: 30%;
    padding: 30px;
    margin-top: 10%;
    margin-left: 10%;
}

.login {
    width: 20%;
    height: 800px;
    margin-left: 60%;
    margin-top: -18%;
}

.title {
    font-weight: bold;
    font-size: 40px;
    color: black;
}

</style>
