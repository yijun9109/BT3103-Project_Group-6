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
            <th>Units</th>
            <th>Location</th>
            <th>Expiry Date</th>
            </tr>
        </table>

        <h2 id = "count"></h2> 
        
    </div>
</template>

<script>
import {  deleteDoc, doc, getFirestore, getDocs, collection,  orderBy, query, where } from 'firebase/firestore';
// import { getDocs, collection, Timestamp, query, where } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged } from  'firebase/auth';

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
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
            this.fbuser = auth.currentUser.email;
            console.log(String(this.fbuser));
            this.display();
        } else {
            console.log("no user");
        }
      });
        // this.display();
    },

    watch: {
        refresh: function() {
            this.display()
        }
    },

    props: ['refresh'],

    methods: {
        clearEntry() {
            // Clears the table for refresh to work.
            var table = document.getElementById('table')
            while (table.rows.length > 1) {
                table.deleteRow(1)
            }
        },

        async display() {
            this.clearEntry()
            // const auth = getAuth();
            // this.fbuser = auth.currentUser.email;
            // console.log(String(this.fbuser));

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

            let idx = 1
            var lim = 8

            var time = new Date(new Date().getTime() + 3*24*60*60*1000).toLocaleDateString("en-GB");
            var arrTime = time.split('/')
            if (parseInt(arrTime[1]) < 10) {
                arrTime[1] = '0' + arrTime[1]
            }
            if (parseInt(arrTime[0]) < 10) {
                arrTime[0] = '0' + arrTime[0]
            }
            var end = arrTime[2] + '-' + arrTime[1] + '-' + arrTime[0]
            console.log(end)
            console.log(new Date().toLocaleDateString("en-GB"))


            // const q = query(collection(db, String(this.fbuser)+" Food"));
            // const q = query(collection(db, "Food"), orderBy('expiry'));
            // query all the docs, but lim in table so that still can display
            // actual number of food expiring "4 Items" text
            // removed limit(lim) since im technically doing it within the table 
            // limit(3) works
            // endBefore, endAt() 0 items
            // where query 0 items

            // const z = await getDocs(q);
            const z = await getDocs(query(collection(db, String(this.fbuser)), orderBy("expiry"), where('expiry', '<=', end)))

            z.forEach((docs) => {

                console.log(docs)

                let yy = docs.data()
                // need to filter query : expiry date within 3 days

                var table = document.getElementById("table")
                // var row = table.insertRow(idx)

                var name = (yy.item)
                var quant = parseInt(yy.quantity)
                var u = yy.unit
                var exp = (yy.expiry)
                var loc = (yy.storage)

                if (idx <= lim) { // only add and display when idx <= lim
                    var row = table.insertRow(idx)
                    var cell1 = row.insertCell(0); var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2); var cell4 = row.insertCell(3);
                    var cell5 = row.insertCell(4); var cell6 = row.insertCell(5)

                    cell1.innerHTML = idx; cell2.innerHTML = name; 
                    cell3.innerHTML = quant.toString(); cell4.innerHTML = u;
                    cell5.innerHTML = loc; cell6.innerHTML = exp;
                } else {
                    return;
                }
                idx ++ // to show number of items expiring if it goes beyond limit

                // console.log(typeof exp)
                // console.log(name)
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
  width: 95%;
  border: 2px solid #2c3e50; 
  margin: auto;
  text-align: center
}

th,td {
  border: 1px solid #2c3e50; 
  text-align: center; 
  padding: 3px;
  background-color: #2c3e50; 
  /* color: #2c3e50; */
  color: white; 
}

/* Q. how to adjust styles under insertrow */


h2 {
    padding-top: 20px;
    padding-right: 25px;

    font-size: 60px;
    font-weight: 100;
    color: white;
    float: right;
}
</style>