<template>
  <div class="bg">

    <MainList :key="refresh"/>

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
                    <v-text-field label="Name" v-model="name" ></v-text-field>
                    <v-text-field label="Quantity" v-model="qty" :rules="qtyRules"></v-text-field>
                    <v-select
                        :items="loki"
                        label="Storage Location" v-model="loc"
                        ></v-select>
                    <v-menu max-width="290" class="mx-100">
                        <template v-slot:activator="{ on }">
                            <v-text-field :value="due" v-on="on" label="Expiry Date"></v-text-field>
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

  </div>
</template>

<script>
import MainList from '@/components/MainList.vue'
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc }  from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    Name: "List",
    data() {
        return {
            // vuetify
            name: '',
            qty: '',
            due: null,
            loc: '',
            dialog: false,
            loki: ['Fridge', 'Freezer', 'Cabinet'],
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

                if (!((a ==""  || b == "")  || (c == "" || d == ""))) {
                    // alert("Saving item: " + b + "x " + a)
                    try {
                        const docRef = await setDoc(doc(db, String(this.fbuser), a + ' ' + c + ' ' + d), {
                        // const docRef = await setDoc(doc(db, String(this.fbuser), "Food"), {
                            item: a, quantity: b, expiry: c, storage: d, 
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