<template>
  <button id = "LogOutButton" @click = "signOut()" v-if = "user"> Logout </button>
</template>

<script>
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";

export default {
    name: "LogOut",

    data() {
        return {
            user:false,
        }
    },

    mounted() {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user) {
                this.user = user;
            }
        })
    },

    methods: {
        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth, user)
            //this.$router.push({name:'Landing'})
            
            //this.$router.go()
           
            this.$router.go('/')
            //this.$router.go('http://localhost:8080/')
        }
        
    }
}
</script>

<style scoped>
#LogOutButton {
  /* new modal implementation */
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background-color: #fab05c;
  /* background-image: linear-gradient(to right, #db9387, #fbd09e); */
  /* background-image: linear-gradient(to right, #CC2E5D, #FF5858); */
  border-radius: 10px;

  color: #fff;
  font-size: 18px;
  font-weight: 700;
  /* box-shadow: 3px 3px rgba(0, 0, 0, 0.2); */
  /* filter: drop-shadow(1px 1px 2px #4a4a4a); */
  transition: 0.4s ease-out;

  font-size: 20px;
  font-weight: bold;
  color: white;
  height: 40px;
  width: 120px;
  line-height: 4px;
  text-align: center;
}
</style>