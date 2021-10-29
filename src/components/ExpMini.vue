<template>
    <!-- <v-data-table
        :headers="headers"
        :items="items"
        sort-by="quant"
        class="elevation-1"
    >

    </v-data-table> -->
    <div>

        
        <table id = "table" class = "auto-index" :key="count">
            <tr>  
            <th>Index</th>       
            <th>Item</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Expiry Date</th>
            <th>Actions</th>
            </tr>
        </table>
        <h2 id = "count"></h2> 
    </div>
</template>

<script>
import {  deleteDoc, getDocs, collection, doc, getFirestore } from 'firebase/firestore';
import firebaseApp from '../firebase';
import { getAuth } from  'firebase/auth';
const db = getFirestore(firebaseApp);

export default {
    name: "ExpMini",
    data() {
        return {
            fbuser: "",
        }
    },
    mounted() {
        const auth = getAuth();
        this.fbuser = auth.currentUser.email;
        this.display();
    },
    methods: {
        async display() {
            let z = await getDocs(collection(db, "Food"))
            let idx = 1
            // maybe can count total num expiring items, last idx 

                z.forEach((docs) => {
                    let yy = docs.data()
                    // need to filter query : expiry date within 3 days

                    var table = document.getElementById("table")
                    var row = table.insertRow(idx)

                    var name = (yy.item)
                    var quant = parseInt(yy.quantity)
                    var exp = (yy.expiry)
                    var loc = (yy.storage)

                    var cell1 = row.insertCell(0); var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2); var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4); var cell6 = row.insertCell(5);

                    cell1.innerHTML = idx; cell2.innerHTML = name; 
                    cell3.innerHTML = quant; cell4.innerHTML = exp;
                    cell5.innerHTML = loc;

                    var bu = document.createElement("button")
                    bu.className = "bwt"
                    bu.id = String(name)
                    bu.innerHTML = "Delete"
                    bu.onclick = function() {
                        this.deleteItem(name)
                    }
                    cell6.appendChild(bu)
                    idx ++
                })

            document.getElementById("count").innerHTML = (idx-1 + " ITEMS")

        },
        
        async deleteItem(name) {
            var x = name
            alert("You are deleting " + x + ". Confirm?")
            await deleteDoc(doc(db, "Food", x))
            console.log("Item successfully deleteed!", x);
            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            this.display()
        }
    }
}
</script>

<style scoped>

table {
  border-collapse: collapse;
  width: 80%;
  /* border: 2px solid #2c3e50; */
  /* text-align: center */
}

th,td {
  /* border: 1px solid #2c3e50; */
  /* text-align: center; */
  /* padding: 8px; */
  /* background-color: #2c3e50;  */
  color: #2c3e50;
  /* color: white; */
}

h2 {
    padding-top: 140px;
    padding-right: 25px;
    font-size: 60px;
    font-weight: 100;
    color: white;
    float: right;
}
</style>