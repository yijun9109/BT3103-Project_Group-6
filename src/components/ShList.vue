<template>
  <v-data-table :headers="headers" :items="items" sort-by="quant" class="elevation-1" id="table">
    <template v-slot:top>
      <v-toolbar flat>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Add Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="ITEM NAME" id="name">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.quant" label="Item Quantity" id="IQuant">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.current" label="Current Quantity" id="CQuant">

                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
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
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Item</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="ITEM NAME" id="name1">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.quant" label="Item Quantity" id="IQuant1">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.current" label="Current Quantity" id="CQuant1">

                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>





        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template> 
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import {  deleteDoc, getDocs, collection, setDoc, doc, getFirestore, updateDoc, getDoc } from 'firebase/firestore'
import firebaseApp from '../firebase'
import { getAuth} from "firebase/auth";

const db = getFirestore(firebaseApp)
  export default {
    data: () => ({
      fbuser: "",
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      headers: [
        {
          text: 'ITEMS',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'QUANTITY TO BUY', value: 'quant' },
        { text: 'CURRENT QUANTITY', value: 'current' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      items: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        quant: 0,
        current: 0,
      },
      defaultItem: {
        name: '',
        quant: 0,
        current: 0,
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogEdit (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    async created () {
      var a = await getDocs(collection(db, "Shopping List"))
      console.log(a)
      a.forEach((docs) => {
        let data = docs.data()
        this.items.push({
            name: data.name,
            quant: data.iquant,
            current: data.cquant,
          })
      })
    },
    methods: {
      initialize () {
        this.items = []
      },
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogEdit = true
      },
      async deleteItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true

        var i = item
        await deleteDoc(doc(db, "Shopping List", i.name));
      },
      deleteItemConfirm () {
        this.items.splice(this.editedIndex, 1)
        this.closeDelete()
      },
      close () {
        this.dialog = false
        this.dialogEdit = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async save () {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;

        if (this.editedIndex > -1) {
          
          Object.assign(this.items[this.editedIndex], this.editedItem)
          var name1 = document.getElementById("name1").value
          var iquant1 = document.getElementById("IQuant1").value
          var cquant1 = document.getElementById("CQuant1").value
          var i = this.editedItem.name
          const docRef = doc(db, "Shopping List", i);
          if (i == name1) {
            await updateDoc(docRef, {
              iquant: iquant1,
              cquant: cquant1
            })
          }
          } else {
          this.items.push(this.editedItem)
          var name = document.getElementById("name").value
          var iquant = document.getElementById("IQuant").value
          var cquant = document.getElementById("CQuant").value

          const nRef = doc(db, "Food", name)
          const next = await getDoc(nRef)

          if (next.exists()) {
            let data = next.data()
            const docRef = await setDoc(doc(db, "Shopping List", name), {
            name: name, iquant: iquant, cquant: data.quantity
            })
            console.log(docRef)
            window.location.reload();
          } else {
            const docRef = await setDoc(doc(db, "Shopping List", name), {
            name: name, iquant: iquant, cquant: cquant
            })
            console.log(docRef)
          }  
          const SList = collection(db, "Shopping List");
          const que = await getDocs(SList)
          
          que.forEach((docs) => {
                let data = docs.data()
                name += data.name;
                iquant += data.iquant;
                cquant += data.cquant;
          })
          this.$emit("added")
        }
        this.close()
      },
    }
  }

</script>

