<template>
<div class="bg">

    <v-app>
        <v-card class="card">
            <v-card-title>
                <h2>Edit Item</h2>
            </v-card-title>

            <v-card-text>
                <v-form class="px-3" ref="form">
                    <v-text-field label="Name" v-model="name" readonly></v-text-field>
                    <v-text-field label="Quantity" v-model="qty" :rules="qtyRules"></v-text-field>
                    <v-select
                        :items="units"
                        label="Unit" v-model="unit"
                        ></v-select>
                    <v-select
                        :items="locations"
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
import { doc, setDoc, deleteDoc }  from 'firebase/firestore'
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
          unit: '',
          locations: ['Fridge', 'Freezer', 'Cabinet'],
          units: ['No unit', 'kg', 'g', 'l', 'ml'],
          rules: {
            required: value => !!value || 'This field must be filled'
          },
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

    async editData() { 
            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

            var item = this.name
            var quantity = parseInt(this.qty)
            var u = this.unit;
            var expiry = this.due
            var storage = this.loc
            
            var oldI = this.item;
            var oldE = this.expiry;
            var oldS = this.storage;

            if (u == 'No unit') {
              u = ''
            } else if (u == 'g'&& quantity >= 1000) {
              quantity = quantity/1000
              u = 'kg'
            } else if (u == 'ml' && quantity >= 1000) {
              quantity = quantity/1000
              u = 'l'
            }

            try {
                const docRef = await setDoc(doc(db, String(this.fbuser), item + ' ' + expiry + ' ' + storage), {
                    item: item, 
                    quantity: quantity, 
                    unit: u,
                    expiry: expiry, 
                    storage: storage
                })
                await deleteDoc(doc(db, String(this.fbuser), oldI + ' ' + oldE + ' ' + oldS))
                // document.getElementById('input').reset();
                console.log(item + ' is updated')
                console.log(docRef)
                this.$emit("added")
                
            }
            catch (error) {
                console.error("Error adding item: " + item)
                console.log(error)
            }

            this.$refs.form.reset()
            this.$router.push({name: 'List'})
        },
  },

    mounted() {
        this.item = this.$route.params.item
        this.expiry = this.$route.params.expiry
        this.storage = this.$route.params.storage
        this.quant = this.$route.params.quantity
        this.u = this.$route.params.unit
        this.name = this.item
        this.due = this.expiry
        this.loc = this.storage
        this.qty = this.quant
        this.unit = this.u
    }

}
</script>

<style>
.bg {
    background-color: #FFF8EF;
    height: 800px;
}

.card {
    width: 40%;
    margin: auto;
    margin-top: 100px;
}
</style>