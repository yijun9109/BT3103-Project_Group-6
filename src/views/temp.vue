<template>
    <!-- feat my failed attempt to sort by date to see those expiring within 3 days
    Different from cw: his is a manual filter button, mine filters the data before display
    and user cant manually do anything..? i think its different?

    Original intention: to use where query to sort items expiring within 3 days
    to do that i realised in additem the usual input fields save date as strings.
    
    By default date stored as string if u dont do anything to it

    however back on display page i cant compare by strings so i decided: 
    1. convert string date to numerics form and save the numeric and convert when i needed it back
        so db date as numbers with Date.parse()
        back on display page: i have to compare where('expiry', '<' end)
        

    2. save as string
        compare by string i can do this superficially... lexicographically...
        but if want to be exact and comapre actual date
        since expiry stored as string in db when i query
        i cant do where(Date.parse('expiry'), <, Date.parse(end))
    
    
     -->
    <div>

        <br>
        <table id = "table">
            <tr>  
            <th>Index</th>       
            <th>Item</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
            <th>Location</th>
            </tr>
        </table>
        <h2 id = "count"></h2> 
    </div>
</template>

<script>
import {  deleteDoc, doc, getFirestore, getDocs, collection, query, orderBy,  } from 'firebase/firestore';
// import { getDocs, collection, Timestamp, query, where } from 'firebase/firestore';
import firebaseApp from '@/firebase.js';
import { getAuth, onAuthStateChanged } from  'firebase/auth';

const db = getFirestore(firebaseApp);

export default {
    name: "temp",
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
            this.display();
        } else {
            console.log("no user");
        }
      });
        // this.display();
    },
    methods: {
        async display() {

            const auth = getAuth();
            this.fbuser = auth.currentUser.email;
            // console.log(String(this.fbuser));

            // Filter query : expiry date within 3 days
            var start = new Date();
            start.setHours(0,0,0,0);

            var end = new Date(start.getTime());
            end.setHours(72,59,59,999);
            end = Date.parse(end)
            console.log(end)


            const q = query(collection(db, "Food"), orderBy('expiry'));
            // limit(3) works
            // endBefore, endAt() 0 items
            // where query 0 items
            const z = await getDocs(q);
            // const z = await getDocs(collection(db, "Food"), where("expiry", "<=", end)

            let idx = 1

            z.forEach((docs) => {
                let yy = docs.data()

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
                cell3.innerHTML = quant; 
                
                // var year = new Date(exp).getFullYear().toString().substring(2,4)
                var year = new Date(exp).getFullYear()
                var month = new Date(exp).getMonth() +1 // for some reason new date makes it -1?? 
                month = month.toString().padStart(2, "0")
                var day = new Date(exp).getDate()
                
                // cell4.innerHTML = new Date(exp).toDateString();
                // cell4.innerHTML = day + " / " + month + " / " + year;
                cell4.innerHTML = year+"-"+month+"-"+day;
                cell5.innerHTML = loc;

                // console.log(typeof Date.parse(exp))
                // console.log(exp)
                console.log(day + " " + month + " " + year)

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
    color: black;
    float: right;
}
</style>