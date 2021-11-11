<template>
  <div id="bg">
    <div id="container">
      <div id="heading">
        <h1>myfridge</h1>
        <br><br>
        <h3>Log in or register with the following options</h3>
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
#h1 {
    font-family:monospace;
}
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
  padding-top: 30px;
  border-radius: 15px;
  width: 500px;
  height: 350px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 10px;
}
</style>
