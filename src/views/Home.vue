<template>

  <div class="bg">
              
    <div class="board">
        <h2> EXPIRING SOON</h2>

        <div class ="table">
            <ExpMini :key="refresh"/> 
            <!-- listens to additem within this page..this.change() increases refresh count -->
        </div>
    </div>

    <section class="drawers">
      <!-- <div class="btn">-->
        <!-- <a href="/#/List">ALL ITEMS</a> -->
      <!-- </div> --> 

        <v-app>
        <template>

        <v-row>
            <v-col cols='6'>

            <v-btn id="allbtn" href="/List">All Items</v-btn>
            </v-col>

            <v-col cols='6'>

                <v-dialog v-model="dialog" max-width = "600px">

                <template v-slot:activator="{ on }">
                <v-btn  v-on="on" id="addbtn">Add Item</v-btn> 
                </template>

                <v-card>
                    <v-card-title>
                        <h2>Add a new item</h2>
                    </v-card-title>

                    <v-card-text>
                        <v-form class="px-3" ref="form">
                            <v-text-field label="Name" v-model="name" :rules=[rules.required] ></v-text-field>
                            <v-text-field label="Quantity" v-model="qty" :rules="qtyRules" ></v-text-field>
                            <v-select
                                :items="units"
                                label="Unit" v-model="unit"
                                ></v-select>
                            <v-select
                                :items="locations"
                                label="Storage Location" v-model="loc" :rules=[rules.required]
                                ></v-select>
                            <v-menu max-width="290" class="mx-100">
                                <template v-slot:activator="{ on }">
                                    <v-text-field :value="due" v-on="on" label="Expiry Date" :rules=[rules.required]></v-text-field>
                                </template>
                                <v-date-picker v-model="due"></v-date-picker>
                            </v-menu>

                        </v-form>
                    </v-card-text>


                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                    >
                        Cancel
                    </v-btn>

                        <v-btn
                        color="blue darken-1"
                        text
                        @click="submit"
                        id="cfmbtn"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>

                </v-dialog>
            </v-col>
        </v-row>

    </template>
    </v-app>

    
    </section>

    <!-- this is for the buttons-->
    <div class="white"></div> 
    <!-- vuetify buttons the default background cannot set transparent :( --> 

    <div id="recoedit" class="modal">
        <div class="actual-modal">
            <!-- <span onclick="document.getElementById('delete').style.display = none" class="close" title="Close Modal">&times;</span> -->
            <form class="modal-content">
            <div class='content' id='recoContent'>
                <h1>Duplicate Item</h1>
                <p> Your item has already been stored! </p>
                <p>If you would like to make changes, please use the edit function instead.</p>

                <div class='confirmation'>
                    <button type='button' id='ack'> Ok </button>
                </div>
            </div>
        </form>
        </div> 
    </div>

    <div class="modal-overlay" v-if="showModal"></div>  

  </div>
</template>

<script>
// import AddItem from "../components/AddItem.vue";
// import MainList from "../components/MainList.vue"
import ExpMini from "@/components/ExpMini.vue"
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, query, where, getDocs}  from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// import Popup from "@/components/Popup.vue"

const db = getFirestore(firebaseApp);

export default {
  name: "Home",
  components: {
    // AddItem, 
    // Popup,
    ExpMini,
    // MainList
  },
  data() {
    return {
       showModal: false,
    //     showModal: true,
        name: '',
        qty: '',
        due: null,
        loc: '',
        unit: '',
        dialog: false,
        fbuser: '',
        run: 0,

        refresh: 0,

        locations: ['Fridge', 'Freezer', 'Cabinet'],
        units: ['No unit', 'kg', 'g', 'l', 'ml'],
        rules: {
            required: value => !!value || 'This field must be filled'
        },
        qtyRules: [
            v => v.length > 0 || 'This field may not be empty',
        ],
    };
  },

  methods: {
    // goToListView() {
    //   this.$router.push({ name: "List" });
    // },
    // toggle() {
    //   this.showModal = false;
    // },
    change() {
      this.refresh += 1;  
    },

    async submit() {
        if (this.$refs.form.validate())  {  // performs validation check
            // console.log(this.name, this.qty); // replace with what u need to do
            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

            var a = this.name
            var b = this.qty
            var c = this.due
            var d = this.loc
            var e = this.unit

            if (e == 'No unit') {
              e = ''
            } else if (e == 'g'&& b >= 1000) {
              b = parseFloat(b)/1000
              e = 'kg'
            } else if (e == 'ml' && b >= 1000) {
              b = parseFloat(b)/1000
              e = 'l'
            }

            const food = collection(db, String(this.fbuser));
            const q = query(food, where('item', '==', a), where('expiry', '==', c), where('storage', '==', d))
            const que = await getDocs(q)

            if (!que.empty) {
                this.showModal = true;
                document.getElementById('recoedit').style.display = 'block'
                this.close()
                document.getElementById('ack').onclick = () => {
                    console.log('ok')
                    this.showModal = false;
                    document.getElementById('recoedit').style.display = 'none'
                }
                return;
            }

            if (!((a ==""  || b == "")  || (c == "" || d == ""))) {
                // alert("Saving item: " + b + "x " + a)
                try {
                    const docRef = await setDoc(doc(db, String(this.fbuser), a + ' ' + c + ' ' + d), {
                    // const docRef = await setDoc(doc(db, String(this.fbuser), "Food"), {
                        item: a, quantity: b, unit: e, expiry: c, storage: d, 
                    })
                    console.log(docRef)
                    // this.$emit("added") - used to be additem component now here
                    this.change() 
                } catch(error) {
                    console.error("Error adding document: ", error);
                }
            }
            this.$refs.form.reset()
            this.close()

        }
    },

    close() {
      this.dialog = false
      this.run += 1;
    }

  },
  watch: {
    dialog(val) {
        val || this.close()
        }
     }
};
</script>

<style scoped>
.button {
  /* new modal implementation */
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  display: inline-block;
  padding: 15px 25px;
  background-image: linear-gradient(to right, #db9387, #fbd09e);
  /* background-image: linear-gradient(to right, #CC2E5D, #FF5858); */
  border-radius: 30px;

  color: #fff;
  font-size: 18px;
  font-weight: 700;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  filter: drop-shadow(1px 1px 2px #4a4a4a);
  transition: 0.4s ease-out;

  font-size: 25px;
  font-weight: bold;
  color: white;
  height: 50px;
  width: 200px;
  line-height: 6px;
  text-align: center;
}

&:hover {
  box-shadow: 6px 6px rgba(0, 0, 0, 0.6);
}

/* vuetify */ 
.v-application {
    background-color: transparent;
}

#addbtn {
    width: 150px;
    background-image: linear-gradient(to right, #db9387, #fbd09e);
    color: white;
    font-size: 18px;
    /* font-weight: 700; */
}

#allbtn {
    width: 150px;
    background-image: linear-gradient(to right, #db9387, #fbd09e);
    color: white;
    font-size: 18px;
    margin-left: -30px;
    /* font-weight: 700; */
}


.white {
    background-color: white;
    width: 140%;
    height: 300px;
    margin-left: -40px;
    margin-top: -90px;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  /*z-index: 1;*/ /* Sit on top */
  z-index: 99;
  /* left: 0;
  top: 0; */
  /* width: 100%; /* Full width */
  /* height: 100%; Full height  */
  width: 30%;
  height: 30%;

  overflow: auto; /* Enable scroll if needed */
  background-color: white;
  /* background-color: #474e5d; */
  padding-top: 50px;

  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 16px;
  border: 1px solid;
}

.modal button {
    margin:20px;
}

.modal-overlay { /* added */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 95;
    background-color: rgba(255, 248, 239, 0.3);
}

#recoContent h1{
    text-align: center;
    margin-left: -10px;
}


.confirmation button {
    color: white;
    height: 30px;
    width: 100px;
    border-radius: 30px;
    border: 0px;
    font-weight: bold;
    background-color: #90B3F5;
}

#ack:hover {
    background-color: #5a7dbd;
}

/* .modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  padding: 25px;
}

.modal .button {
  width: 60px;
} 

.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(50%) translateX(50vw);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
*/

.bg {
  background-image: url("../assets/fridge.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 85vh;
  text-align: center;
  vertical-align: middle;
  padding: 20px;
  margin-left: -10px;
  margin-right: -40px;
  overflow: hidden; /* prevents scrolling down the abyss of nothginness */

  min-width: 800px;
  min-height: 770px
}

.btn {
  /* background-color: #FBD09E; */
  background-image: linear-gradient(to right, #db9387, #fbd09e);
  height: 50px;
  width: 200px;
  border-radius: 30px;
  text-align: center;
  float: left;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.2);
  filter: drop-shadow(1px 1px 2px #4a4a4a);
}

.btn:nth-child(1) {
  /* setting for first button */
  margin-left: 280px;
  margin-right: 650px;
}

.btn a {
  font-size: 25px;
  font-weight: bold;
  color: white;
  line-height: 50px;
}

/* .listview {
  float: right;
  margin-top: -40px;
  margin-right: 40px;
} */

.drawers {
  box-sizing: border-box;
  width: 100%;
  height: 30%;
  padding-top: 150px;
}

h2 {
  /* color: #c41d1d; */
  padding-top: 25px;
  padding-left: 30px;
  font-size: 30px;
}

.board {
  background-color: rgba(255, 255, 255, 0.5); /* 0.5 opacity for bg only */
  height: 400px;
  width: 90%;
  border-radius: 20px;
  margin: auto;
  text-align: left;
  padding-left: ;
}

/* TILES */
/* .tile {
  height: 250px;
  width: 250px;
  background-color: white;
  margin: 50px;
  margin-top: 30px;
  overflow: hidden;
  float: left;
}

.tile:nth-child(1) {
  margin-left: 100px;
}

.tile p {
  color: black;
  font-size: 30px;
  margin-top: 180px;
  text-align: center;
} */

/* HOVER DIM */
.tile:after {
  /*add button for edit and delete */
  /* content: "Expiring on 15/10/21 \a Storage Location: Fridge";
  white-space: pre;
  color: #fff;
  position: absolute;
  width: 100%;
  height: 100%; /* why does it not take the whole width of tile but almost the whole screen */
  /* top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
  height: 250px;
  width: 250px; */ 
}

.tile:hover:after {
  /* opacity: 1; */
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}

.table {
    /* padding-left: 30px; */
}

@media (max-width: 900px)  {
/* (min-height: 770px) (min-width: 900px) */
    .bg {
        /* width: auto !important;
        width: 900px; */
        min-height: 800px !important;
    }

    .white {
        margin-top: 60px;
        margin-left: 40px;
    }
}
</style>