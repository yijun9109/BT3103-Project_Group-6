<template>
  <div class="bg">
    <div class="box">
      <a href="/Home#/Home" v-if="this.LoggedIn">keep track of your food items</a>
      <a href="/Home#/LogIn" v-else>keep track of your food items</a>
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
</template>

<script>
// import NavBar from "@/components/NavBar.vue";
export default {
  name: "Landing",
  //   component: {
  //     NavBar,
  //   },
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
  height: 350px;
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
</style>
