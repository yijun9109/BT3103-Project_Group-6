<template>
  <div id="bg">
    <div id="container">
      <div id="heading">
        <h1>Thank you for using MyFridge</h1>
        <br><br>
        <!-- <h3>Click on the Log Out Button to proceed</h3> -->
      </div>
      <div id="logout">
        <LogOutComponent />
      </div>
    </div>
  </div>
</template>

<script>
import LogOutComponent from "@/components/LogOut.vue";
export default {
  name: "LogOut",
  components: {
    LogOutComponent,
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
#logout {
    padding-top: 50px;
}
</style>
