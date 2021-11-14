<template>
  <div id="bg">

    <div id="container">
      <div id="main">
          <br><br><br><br><br>
        <h1>404</h1>
        <h2>We can't seem to find the page you are looking for.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "NotFound",

  data() {
    return {
      user: false,
    };
  },

  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;
      }
    });
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
#main {
  background-color: white;
  text-align: center;
  border-radius: 15px;
  width: 650px;
  height: 400px;
  padding: auto;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;

}
/* #main {
    background-color: white;
    width: 400px;

    padding-top:50px;

} */




img {
    width: 80px;
}

h1 {
    font-size: 80px;
    background: -webkit-linear-gradient(rgb(248, 170, 117), rgb(192, 110, 218));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

#credits {
  margin-top: 30px;
}

h2 {
    font-weight: 500;
    background: -webkit-linear-gradient(rgb(248, 170, 117), rgb(192, 110, 218));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}  



</style>
