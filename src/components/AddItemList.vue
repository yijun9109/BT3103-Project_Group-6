<template>
    <div>
        <div>
            <button type = 'button' v-on:click='back()'>Back</button>
        </div>
        <form id = "input">
            <div class = 'inForm'>
                <label for="item"> Item Name </label>
                <input type="text" id = 'item1' required = "" placeholder="Please enter item name">
                <label for="quantity">Item Quantity</label>
                <input type="number" id="quantity1" required="" placeholder="Please enter item quantity">
                <label for="expiry">Expiry Date</label>
                <input type="date" id = "expiry1" required="" placeholder="dd/mm/yyyy">
                <label for="storage"> Storage Location </label>
                <select id="storage1">
                    <option disabled value="">Please select one</option>
                    <option value="Fridge">Fridge</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Cabinet">Cabinet</option>
                </select>
            </div>

            <div class = 'save'>
                <button class = 'savebutton' type = 'button' v-on:click ='saveData()'> Save </button>
                <button type = 'button' id = 'cancelbutton' v-on:click='cancel()'> Cancel </button>
            </div>
        </form>
        <div id="ok" class="modal">
            <span onclick="document.getElementById('ok').style.display = none" class="close" title="Close Modal">&times;</span>
                <form class="modal-content">
                    <div class='content' id='deleteContent'>
                    <p> You have the same item, stored with the same expiry date and location. <br><br>
                        Please use the edit function if you want to store this item.</p>

                    <div class='confirmation'>
                        <button type='button' id='confirm'> Ok </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebaseApp from '@/firebase.js'
import { getFirestore } from 'firebase/firestore'
import { collection, query, doc, setDoc, where, getDocs }  from 'firebase/firestore'
import { getAuth} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: "AddItemList",

    data() {
        return {
            fbuser: ""
        }
    },

    methods: {
        back() {
            this.$router.push({name: 'List'})
        },
        
        cancel() {
            this.$router.push({name: 'List'})
        },

        async saveData() { 
            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

            var item = document.getElementById('item1').value
            var quantity = parseInt(document.getElementById('quantity1').value)
            var expiry = document.getElementById('expiry1').value.toLowerCase()
            var storage = document.getElementById('storage1').value

            const food = collection(db, String(this.fbuser));
            const q = query(food, where('item', '==', item), where('expiry', '==', expiry), where('storage', '==', storage))
            const que = await getDocs(q)

            if (!que.empty) {
                document.getElementById('ok').style.display = 'block'
                document.getElementById('confirm').onclick = () => {
                    console.log('ok')
                    document.getElementById('ok').style.display = 'none'
                    document.getElementById('input').reset();
                }
                return;
            }
            
            try {
                const docRef = await setDoc(doc(db, String(this.fbuser), item + ' ' + expiry + ' ' + storage), { //Support for storing multiple items with the same name.
                    item: item, 
                    quantity: quantity, 
                    expiry: expiry, 
                    storage: storage
                })
                document.getElementById('input').reset();
                console.log(docRef)
                this.$emit("added")
                alert(item + " has been added!")
            }
            catch (error) {
                console.error("Error adding item: " + item)
                console.log(error)
            }
        }
    }
}

</script>

<style>

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: white;
  /* background-color: #474e5d; */
  padding-top: 50px;
}

.modal button {
    margin:20px;
}

</style>