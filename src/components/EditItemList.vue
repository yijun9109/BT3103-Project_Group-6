<template>
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
                <button class = 'savebutton' type = 'button' v-on:click ='editData()'> Save </button>
                <button type = 'button' id = 'cancelbutton' v-on:click='cancel()'> Cancel </button>
            </div>
    </form>
</template>

<script>
import firebaseApp from '../firebase.js'
import { getFirestore } from 'firebase/firestore'
import { doc, setDoc, }  from 'firebase/firestore'
import { getAuth} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: 'EditItemList',

    data() {
        return {
            item: ""
        }
    },

    methods: {
        cancel() {
            this.$router.push({name: 'List'})
        },

        async editData() { 
            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

            var item = this.item
            var quantity = parseInt(document.getElementById('quantity1').value)
            var expiry = document.getElementById('expiry1').value.toLowerCase()
            var storage = document.getElementById('storage1').value

            try {
                const docRef = await setDoc(doc(db, String(this.user), item), {
                    item: item, 
                    quantity: quantity, 
                    expiry: expiry, 
                    storage: storage
                })
                document.getElementById('input').reset();
                console.log(item + ' is updated')
                console.log(docRef)
                this.$emit("added")
                this.$router.push({name: 'List'})
            }
            catch (error) {
                console.error("Error adding item: " + item)
                console.log(error)
            }
        }
    },

    mounted() {
        this.item = this.$route.params.item
        document.getElementById('item1').value = this.item
        document.getElementById('item1').readOnly = true
    }

}
</script>

<style>

</style>