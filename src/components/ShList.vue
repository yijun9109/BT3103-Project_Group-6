<template>
<div>
  <v-data-table v-model="selected" :headers="headers" :items="items" :single-select="singleSelect" item-key="name" 
  sort-by="quant" show-select class="elevation-1" id="table" >
    <template v-slot:top>
      <v-toolbar flat>
        <h2>SHOPPING LIST</h2>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" id="addBtn">
             + Add Item
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
                    <v-text-field v-model="editedItem.name" label="Item Name" id="name">
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
        <div id="deleteBtn">
        <v-btn color="secondary"  @click="deleteA()" >
              Delete All
        </v-btn>
        </div>
        <v-dialog v-model="dialogEdit" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">EDIT ITEM</span>
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
              <v-btn color="blue darken-1" text @click="closeDelete">No, cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">Yes, confirm</v-btn>
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
  </v-data-table>
</div>
</template>

<script>
import {  deleteDoc, getDocs, collection, setDoc, doc, getFirestore, updateDoc, query, where } from 'firebase/firestore'
import firebaseApp from '../firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp)
  export default {
    data: () => ({
      singleSelect: false,
      selected: [],
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
        return this.editedIndex === -1 ? 'ADD ITEM' : 'Edit'
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
    created () {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
      if (user) {
        this.initialize()
      } else {
        console.log("no user")
      }
      })
    },
    methods: {
      async initialize () {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        var a = await getDocs(collection(db, String(this.fbuser) + " Shopping"))
        console.log(this.fbuser)
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
      editItem (item) {
        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogEdit = true
      },
      async deleteItem (item) {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;

        this.editedIndex = this.items.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true

        var i = item
        await deleteDoc(doc(db, String(this.fbuser) + " Shopping", i.name));
      },
      async deleteA () {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        onAuthStateChanged(auth, (user) => {
          if (user) {
            this.deleteAll()
          } else {
            console.log("no user")
          }
        })
      }, 
      async deleteAll () {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
  
        const SList = collection(db, String(this.fbuser) + " Shopping");
        const que = await getDocs(SList)
        console.log(que.size)
        que.forEach((docs) => {
          deleteDoc(doc(db, String(this.fbuser) + " Shopping", docs.id))
        })
        window.location.reload();
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

        const SList = collection(db, String(this.fbuser) + "Shopping");
        const que = await getDocs(SList)
        que.forEach((docs) => {
              let data = docs.data()
              name += data.name;
              iquant += data.iquant;
              cquant += data.cquant;
        })

       if (this.editedIndex > -1) {
          
          Object.assign(this.items[this.editedIndex], this.editedItem)
          var name1 = document.getElementById("name1").value
          var iquant1 = document.getElementById("IQuant1").value
          var cquant1 = document.getElementById("CQuant1").value
          var i = this.editedItem.name
          const docRef = doc(db, String(this.fbuser)+ " Shopping", i);
          if (i == name1) {
            await updateDoc(docRef, {
              iquant: iquant1,
              cquant: cquant1
            })
          }
          } else {
          this.items.push(this.editedItem)
          console.log(this.items)
          var name = document.getElementById("name").value
          var iquant = document.getElementById("IQuant").value
          var cquant = document.getElementById("CQuant").value
    

          const ndoc = collection(db, String(this.fbuser))
          const nRef = query(ndoc, where('item', '==', name))
          const next = await getDocs(nRef)
          console.log(next)
      
          if (!next.empty) {
            var totquant = ""
            next.forEach((docs) => {
              let data = docs.data()
              totquant += parseInt(data.quantity)
              totquant += data.unit
              console.log(totquant)
            })
            console.log(totquant)
            const docRef = await setDoc(doc(db, String(this.fbuser) + " Shopping", name), {
            name: name, iquant: iquant, cquant: totquant
            })
            window.location.reload()
            console.log(docRef)
          } else {
            const docRef = await setDoc(doc(db, String(this.fbuser) + " Shopping", name), {
            name: name, iquant: iquant, cquant: cquant
            })
            console.log(docRef)
          }  
          this.$emit("added")
        }
        this.close()
      },
    }
  }
</script>
<style scoped>
#table {
  margin-left: 65px;
  margin-right: 65px;
  border-radius: 10px;
}
.v-sheet.v-toolbar {
    border-radius: 10px;
}
.theme--light.v-btn.v-btn--has-bg {
    background-color: rgb(240, 123, 123);
}
.theme--dark.v-btn.v-btn--has-bg {
    background-color: rgb(121, 186, 226);
}
#deleteBtn {
  margin-left: 5px;
  margin-right:15px;
  margin-top: 20px;
}
#addBtn {
  margin-top: 20px;
}
.v-btn{
        border-radius:28px!important;
}
h2 {
  font-size: 28px;
  margin-top: 20px;
}
header {
  margin-bottom: 25px;
}
</style>


