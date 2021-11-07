<template>
  <div class="bg">

    <MainList :key="refresh"/>


    <div id="delete" class="modal">
        <div class="actual-modal">
            <!-- <span onclick="document.getElementById('delete').style.display = none" class="close" title="Close Modal">&times;</span> -->
            <form class="modal-content">
            <div class='content' id='deleteContent'>
                <h1>Confirm Delete</h1>
                <p> Do you want to delete this item? </p>

                <div class='confirmation'>
                    <button type="button" id="cancel"> Cancel </button>
                    <button type='button' id='confirm'> Delete </button>
                </div>
            </div>
        </form>
        </div> 
    </div>

    <div class="modal-overlay" v-if="showDelete"></div>

       <!--Add Item Vuetify-->
    <v-app id="vuetify">
        <template>
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
                    <v-text-field label="Name" v-model="name" :rules=[rules.required]></v-text-field>
                    <v-text-field label="Quantity" v-model="qty" :rules="qtyRules"></v-text-field>
                    <v-select
                        :items="units"
                        label="Unit" v-model="unit"
                        ></v-select>
                    <v-select
                        :items="loki"
                        label="Storage Location" v-model="loc"
                        :rules=[rules.required]></v-select>
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
                @click="submit"
                id="cfmbtn"
              >
                Save
              </v-btn>

              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
            </v-card-actions>
        </v-card>

        </v-dialog>



    </template>
    </v-app>

    <div id="recoedit" class="modal">
        <div class="actual-modal">
            <!-- <span onclick="document.getElementById('delete').style.display = none" class="close" title="Close Modal">&times;</span> -->
            <form class="modal-content">
            <div class='content' id='recoContent'>
                <h1>Duplicate Item</h1>
                <p> Your item has already been stored! </p>
                <p>If you would like to make changes, <br> please use the edit function instead.</p>

                <div class='confirmation'>
                    <button type='button' id='ack'> OK </button>
                </div>
            </div>
        </form>
        </div> 
    </div>

    <div class="modal-overlay" v-if="showModal"></div>   

  </div>
</template>

<script>
import MainList from '@/components/MainList.vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, query, where, getDocs }  from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    Name: "List",
    data() {
        return {
            // vuetify
            showModal: false, 
            name: '',
            qty: '',
            unit: '',
            due: null,
            loc: '',
            dialog: false,
            units: ['No unit', 'kg', 'g', 'l', 'ml'],
            loki: ['Fridge', 'Freezer', 'Cabinet'],
            rules: {
                required: value => !!value || 'This field must be filled'
            },
            qtyRules: [
                v => v.length > 0 || 'This field may not be empty',
                v => Number.isInteger(Number(v)) || "The value must be an integer number"
            ],
            refresh:0,
        }
    },

    components: {
        MainList,
    }, 

    methods: {
        // submit btn for vuetify
        async submit() {
            if (this.$refs.form.validate())  {  // performs validation check
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
              b = b/1000
              e = 'kg'
            } else if (e == 'ml' && b >= 1000) {
              b = b/1000
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
                        this.change()
                    } catch(error) {
                        console.error("Error adding document: ", error);
                    }
                }
                this.$refs.form.reset()
                this.close()
            }

        },
        change() {
            this.refresh +=1; 
        },

        // closing add item dialog
        close() {
            this.dialog = false
        },


    },  watch: {
            dialog(val) {
                val || this.close()
            }, 
    },
}
</script>

<style>
.container table {
    text-align: center;
    margin: auto;
}

</style>

<style scoped>
.bg {
    /* background-color: #fbd09e; */
    background-color: #FFF8EF;
    height: 85vh;
    padding: 20px;
    margin-left: -10px;
    margin-right: -40px;
    /* overflow: hidden; */
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

/* .container {
    background-color: white;
    border-radius: 30px;
    margin: auto;
    width: 40%;

} */


/* Vuetify */

.bg #vuetify {
    margin-top: 0px;
    height: 20px;
}

#addbtn {
    position: relative;
    height: 40px;
    width: 130px;
    left: 85%;
    font-size: 15px;
    /* font-weight: bold; */
    background-color: #90B3F5;
    border-radius: 30px;
    text-transform: uppercase;
    color: white;
    margin-top:20px;
}

#addbtn:hover {
    box-shadow: 0px 3.5px 5.5px rgba(3, 2, 2, 0.5);
}

</style>