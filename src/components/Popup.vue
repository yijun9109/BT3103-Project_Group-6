<template>
<div>
    <v-app :color="transparent">
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
                        :items="locations"
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
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc }  from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const db = getFirestore(firebaseApp);


    export default {
        name: 'Popup',
        data() {
                return {
                    showModal: true,
                    name: '',
                    qty: '',
                    due: null,
                    loc: '',
                    dialog: false,
                    fbuser: '',

                    locations: ['Fridge', 'Freezer', 'Cabinet'],
                    qtyRules: [
                        v => v.length > 0 || 'This field may not be empty',
                        v => Number.isInteger(Number(v)) || "The value must be an integer number"
                    ],
                }
            }, methods: {
                async submit() {
                    if (this.$refs.form.validate())  {  // performs validation check
                        // console.log(this.name, this.qty); // replace with what u need to do
                        const auth = getAuth();
                        this.fbuser = auth.currentUser.email;

                        var a = this.name
                        var b = this.qty
                        var c = this.due
                        var d = this.loc

                        if (!((a ==""  || b == "")  || (c == "" || d == ""))) {
                            alert("Saving item: " + b + "x " + a)
                            try {
                                const docRef = await setDoc(doc(db, String(this.fbuser), a), {
                                // const docRef = await setDoc(doc(db, String(this.fbuser), "Food"), {
                                    item: a, quantity: b, expiry: c, storage: d, 
                                })
                                console.log(docRef)
                                this.$emit("added") 
                            } catch(error) {
                                console.error("Error adding document: ", error);
                            }
                        }
                        this.close()
                    }

                },

                close() {
                this.dialog = false
                }

            }, watch: {
                dialog(val) {
                    val || this.close()
                }
            }
    }
</script>

<style scoped>
#addbtn {
    width: 150px;
    background-color: black;
    color: white;
    /* margin-left: 400px;
    margin-top: 600px; */
}

#cfmbtn {
    /* background-color: black;
    color: white; */
}

#cancelbtn {
    margin-left: 20px;
}

</style>