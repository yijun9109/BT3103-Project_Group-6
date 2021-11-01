<template>
    <!-- <v-data-table
        :headers="headers"
        :items="items"
        sort-by="quant"
        class="elevation-1"
    >

    </v-data-table> -->
    <div>

        <br>
        <table id = "table">
            <tr>  
            <th>Index</th>       
            <th>Item</th>
            <th>Quantity</th>
            <th>Location</th>
            <th>Expiry Date</th>
            </tr>
        </table>
        <h2 id = "count"></h2> 
    </div>
</template>

<script>
import {  deleteDoc, doc, getFirestore, getDocs, collection, query, where} from 'firebase/firestore';
// import { getDocs, collection, Timestamp, query, where } from 'firebase/firestore';
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
        // const auth = getAuth();
        // this.fbuser = auth.currentUser.email;
        // this.display(this.fbuser);
        this.display();
    },
    methods: {
        async display() {

            const auth = getAuth();
            this.fbuser = auth.currentUser.email;

        // async display(user) {
            // let z = await getDocs(collection(db, "Food"))
            // let z = await getDocs(collection(db, String(user)))
            //  let data = await getDocs(collection(z, "Food"))

            // let data = await db
            //             .collection(String(user))
            //             .doc('Food')
            //             .get()

            // let data = await getDocs(doc(db, String(user), "Food"))

            // let data = await getDocs(collectionGroup(db,"Food").where("id", "==", String(user))) 
            
            // let data = await getDocs(collectionGroup(db,String(user))) 

            // let data = await db.collection(String(user)).doc("Food")

            // let ref = db.collection(String(this.fbuser)).doc("Food")
            // let data = await ref.listCollections()

            // const docRef = doc(db, String(this.fbuser), "Food");     
            // const docSnap = await getDocs(docRef);

            // let z = await getDocs(collection(db, String(this.fbuser)+"/Food"))

            // const now = new Date();
            // function in3days() {
            //     const aft = now.setHours(72, 0, 0, 0) // +5 hours for Eastern Time
            //     const timestamp = Timestamp.fromDate(aft)
            //     return timestamp // ex. 1631246400
            // }

            var start = new Date();
            start.setHours(0,0,0,0);

            var end = new Date(start.getTime());
            end.setHours(72,59,59,999);


            const q = query(collection(db, "undefined"), where("expiry", "<=", end));
            const z = await getDocs(q);
            // const z = await getDocs(collection(db, "undefined"))

            let idx = 1

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
                    var cell5 = row.insertCell(4); 

                    cell1.innerHTML = idx; cell2.innerHTML = name; 
                    cell3.innerHTML = quant; cell4.innerHTML = exp;
                    cell5.innerHTML = loc;

                    idx ++
                })

            document.getElementById("count").innerHTML = (idx-1 + " ITEMS")

        },
        
        async deleteItem(name) {
            var x = name
            alert("You are deleting " + x + ". Confirm?")
            await deleteDoc(doc(db, String(this.fbuser), x))
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