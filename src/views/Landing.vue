<template>
  <div class="bg">
      <div class="loggedin" v-if="this.loggedIn">
          <div class = "profile">
                <br><br><br><br>
                <p class="wlc">Welcome <strong>{{user.displayName}}</strong><br/></p>
                <p class="wwyltd"> What would you like to do today?</p>


                <div class="row">
                    <div class="tile">
                        <a href="/Home">
                        <img src="https://www.svgrepo.com/show/36123/warning.svg">
                        </a>
                        <p class="label">Home</p>
                    </div>
                    <div class="tile">
                        <a href="/List">
                        <img src="https://www.svgrepo.com/show/57953/refrigerator.svg">
                        </a>
                        <p class="label">Inventory</p>
                    </div>
                    <div class="tile">
                        <a href="/ShoppingList">
                        <img src="https://www.svgrepo.com/show/38114/shopping-bag.svg">
                        </a>
                        <p class="label">Shopping List</p>
                    </div>
                    <div class="tile">
                        <a href="/Tips">
                        <img src="https://www.svgrepo.com/show/282350/file-storage.svg">
                        </a>
                        <p class="label">Tips</p>
                    </div>
                </div>
                <!-- <img src="data:," id="imgId" style="height:20px;"> --- CANT GET USER PFP TO DISPLAY-->

                <!-- <pre id="account-details"></pre> -->
                <!-- <p>Image: {{profile.photoUrl}}</p> -->
                <!-- <p>Email: <strong>{{user.email}}</strong><br></p> -->
                
          </div>
        <!-- <div class="box">
            <a href="/Home">keep track of your food items</a>
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
        </div> -->
      </div>

    <div class="loggedout" v-else>
        <div class="message">
            <p class = "msg">Here at <span style="color:#FFA235"><b>myfridge</b></span>, you get to list inventory items and track the expiry dates all in one place!
                Browse through our recipes to cook your leftover ingredients with or even look up tips we have for storing
                the food. Track and check off your very own shopping list when you go grocery 
                shopping with myfridge today. <br><br>
                <b>Love,</b> your personal inventory tracker.
            </p>
        </div>

        <div class= "login">
            <br><br><br>
            <p class= "title">Welcome Back</p>
            <!-- <p><span style="background-color: rgba(255, 255, 255, 0.3);">Login to continue.</span></p> -->
            <p><i>Login to continue.</i></p>
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
        

        // var displayName = user.displayName;
        // var email = user.email;
        var photoURL = user.photoURL;

        console.log(photoURL)

        if (document.getElementById('imgId') != null) {
            document.getElementById('imgId').src = user.photoURL;
        }

        
        // document.getElementById('account-details').textContent = JSON.stringify({
        //         displayName: displayName,
        //         email: email,
        //         photoURL: photoURL,
        //       }, null, '  ');
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
  margin-top: -70px;
}

p {
  font-size: 20px;
  color: black;
}

.labels {
    color: black;
    font-weight: bold;
}

#home {
    margin-left: 120px;
        z-index:99;
}

.tile {
  color: black; /* added */
  height: 300px;
  width: 20%;
  /* border: 1px solid black; */
  background-color: #f8f4ef;
  position: relative;
  margin: 20px;
  left: 80px;
  top: 150px;
  overflow: hidden;
  float: left;
  border-radius: 30px; /* added */
  z-index:94;
}

.tile p {
    font-weight: bold;
    margin-top: 200px;
    margin-left: 160px;
} 

.tile:hover { 
    background-color: rgba(0,0,0,0.1);
}

.tile img {
    margin-left: 40px;
    margin-top: 50px;
    height: 200px;
    z-index:94;
}

.message {
    /* background-color: white; */
    background-color: rgba(255, 255, 255, 1);
    height: 60%;
    width: 30%;
    padding: 30px;
    margin-top: 10%;
    margin-left: 10%;
    text-align: left;
}

.login {
    width: 40%;
    height: 1300px;
    margin-left: 60%;
    margin-top: -57%;
    background-color: rgba(255, 255, 255, 0.6);
    
}

.title {
    font-weight: bold;
    font-size: 50px;
    margin-top: 85%;  
    color: black;
}

.msg {
    font-size: 18px;
    margin-left: 10px;
}

.wlc {
    font-size: 40px;
    margin-left: 80px;
}

.wwyltd {
    margin-left: 80px;
    font-size: 25px;
}

.profile {
    margin-top: 40px;
    text-align: left;
    margin-left: 0px;
}

</style>
