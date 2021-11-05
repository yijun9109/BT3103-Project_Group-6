<template>
<div id="bg">
    <v-app>
    <v-card class="card">
            <v-card-title>
                <h2>Edit Item</h2>
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
                @click="cancel()"
            >
                Cancel
            </v-btn>

                <v-btn
                color="blue darken-1"
                text
                @click="editData()"
                id="savebutton"
            >
                Save
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
            
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc, }  from 'firebase/firestore'
import { getAuth} from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
  name: "Edit",
  data() {
      return {
          item: '',

          name: '',
          qty: '',
          due: null,
          loc: '',
          locations: ['Fridge', 'Freezer', 'Cabinet'],
          qtyRules: [
                v => v.length > 0 || 'This field may not be empty',
                v => Number.isInteger(Number(v)) || "The value must be an integer number"
            ],
      }
  },
  
  methods: {
    cancel() {
            this.$router.push({name: 'List'})
    },

    change() {
        this.refresh += 1;
    },

    async editData() { 
            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

            var item = this.name
            var quantity = parseInt(this.qty)
            var expiry = this.due
            var storage = this.loc

            try {
                const docRef = await setDoc(doc(db, String(this.user), item + ' ' + expiry + ' ' + storage), {
                    item: item, 
                    quantity: quantity, 
                    expiry: expiry, 
                    storage: storage
                })
                // document.getElementById('input').reset();
                console.log(item + ' is updated')
                console.log(item, quantity, expiry, storage)
                console.log(docRef)
                this.change()
                // this.$emit("added")
                // this.$router.push({name: 'List'})
            }
            catch (error) {
                console.error("Error adding item: " + item)
                console.log(error)
            }
            this.$refs.form.reset()
            this.cancel()
        }
  },

    mounted() {
        this.item = this.$route.params.item
        this.name = this.item
    }

}
</script>

<style scoped>
#bg {
    background-color: #FFF8EF;
    /* height: 800px; */
    width: 100%;
    height: 100vh;
}

.card {
    width: 40%;
    margin: auto;
    top: -50px;
}
</style>