<template>
  <div id="bg">
    <div id="container">
      <div id="main">
        <h1>OOPS</h1>
        <img src="@/assets/emoticon.png" alt="emoticon" width="250px" />
        <h2>We can't seem to find the page you are looking for.</h2>
        <br /><br />
        <h3>Please click on the options above to continue.</h3>
      </div>
    </div>
    <div id="credits">
      <h6>
        Icons made by
        <a href="https://www.flaticon.com/authors/senapedia" title="Senapedia"
          >Senapedia</a
        >
        from
        <a href="https://www.flaticon.com/" title="Flaticon"
          >www.flaticon.com</a
        >
      </h6>
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

<style>
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

#credits {
  margin-top: 30px;
}
</style>
