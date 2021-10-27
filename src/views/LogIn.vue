<template>
  <div id="bg">
    <div id="container">
      <div id="heading">
        <h1>Welcome to MyFridge</h1>
        <br />
        <p>Log in or register with the following options</p>
      </div>
      <!-- <LogIn /> -->
      <div id="login">
        <LogInComponent />
      </div>
    </div>
  </div>
</template>

<script>
import LogInComponent from "@/components/LogIn.vue";
export default {
  name: "LogIn",
  components: {
    LogInComponent,
  },
};
</script>

<style scoped>
#bg {
  background-image: url("../assets/gradient_background.svg");
  position: fixed;
  height: 100%;
  width: 100%;
  background-repeat: repeat-y;
  /* background-size: cover; */
}
#container {
  background-color: white;
  text-align: center;
  padding-top: 50px;
  border-radius: 20px;
  width: 350px;
  height: 400px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
}
</style>
