<template>
<div class>

    <a href="/#/Home" class="viewexp">VIEW EXPIRING ITEMS</a>
    <div id='list'>

        <h1>All Items</h1>
        <table id = "table" style="text-align: center">
            <tr>
                <th >Index</th>
                <th>Items
                    <button class='sorting' id='itemorder' v-on:click='itemOrder()'></button>
                </th>
                <th>Quantity
                    <button id='quantityorder' v-on:click='quantityOrder()'> V </button>
                </th>
                <th>
                    Storage Location
                     <button class='sorting' id="dropdown" v-on:click='dropDown()'> V </button>
                    <div>
                        <div id="dropmenu" v-if="dropdown">
                            <input type="checkbox" id="cabinet" class="select" value="Cabinet" v-on:click='run()'> 
                            <label for="cabinet">Cabinet</label>
                            <input type="checkbox" id="freezer" class="select" value="Freezer" v-on:click='run()'>
                            <label for="freezer">Freezer</label>
                            <input type="checkbox" id="fridge" class="select" value="Fridge" v-on:click='run()'>
                            <label for="fridge">Fridge</label>
                        </div>
                    </div>
                </th>
                <th>Expiry Date
                    <button class='sorting' id='expiryorder' v-on:click='expiryOrder()'> V </button>
                </th>
            </tr>
        </table>
    </div>

    <div id="delete" class="modal">
        <span onclick="document.getElementById('delete').style.display = none" class="close" title="Close Modal">&times;</span>
        <form class="modal-content">
            <div class='content' id='deleteContent'>
                <h1> Delete Item </h1>
                <p> Do you want to delete this item? </p>

                <div class='confirmation'>
                    <button type="button" id="cancel"> Cancel </button>
                    <button type='button' id='confirm'  > Delete </button>
                </div>
            </div>
        </form>
    </div>

    <div>
        <button type='button' class = 'add' v-on:click='addItem()'> Add Item </button>
        <button type='button' v-on:click ='dlcalendar()'> Download Calendar </button>
    </div>
</div>
</template>

<script>
import firebaseApp from "@/firebase.js"
import { getFirestore } from "firebase/firestore"
import { collection, getDocs, doc, deleteDoc, query, where, orderBy} from "firebase/firestore"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import * as ics from 'ics'
import { saveAs } from 'file-saver'

const db = getFirestore(firebaseApp);

export default { 
    name: 'MainList',

    data(){
        return{
            selected: [],
            dropdown: false,
            orderByList: [],
            orderByItems: 0,
            orderByQuantity: 0, 
            orderByExpiry: 0,
            fbuser: "",
            url: '#',
            filename: '',
            item: ""
        }
    },
    methods: { 
        itemOrder() {
            this.orderByItems += 1;
            if (this.orderByItems % 3 == 1) {
                this.orderByList = [1, 'asc']
            } else if (this.orderByItems % 3 == 2) {
                this.orderByList = [1, 'desc']
            } else {
                this.orderByList = [];
                this.orderByItems = 0;
            }
            this.run()
        },
        quantityOrder() {
            this.orderByQuantity += 1;
            if (this.orderByQuantity % 3 == 1) {
                this.orderByList = [2, 'asc']
            } else if (this.orderByQuantity % 3 == 2) {
                this.orderByList = [2, 'desc']
            } else {
                this.orderByList = [];
                this.orderByQuantity = 0;
            }
            this.run()
        },

        expiryOrder() {
            this.orderByExpiry += 1;
            if (this.orderByExpiry % 3 == 1) {
                this.orderByList = [4, 'asc']
            } else if (this.orderByExpiry % 3 == 2) {
                this.orderByList = [4, 'desc']
            } else {
                this.orderByList = []
                this.orderByExpiry = 0;
            }
            this.run()
        },

        clearEntry() {
            var table = document.getElementById('table')
            while (table.rows.length > 1) {
                table.deleteRow(1)
            }
        },

        dropDown() {
            this.dropdown = !this.dropdown;
        },

        calendar() {
            var calEntry = []
            var calarr = [];
            var table = document.getElementById('table')
            for (let i = 1; i < table.rows.length; i++) {
                let cells = table.rows[i].cells;
                for (let c = 0; c < 5; c++) {
                    calarr.push(cells[c].innerHTML)
                }
                let date = String(calarr[4])
                let moddate = date.split('-').map(function(x) {
                    return parseInt(x, 10)
                })
                moddate.push(0)
                moddate.push(0)
                console.log(moddate)
                let name = "You have " + calarr[2] + " " + calarr[1] + " expiring today!"
                let entry = {
                    title: name,
                    start: moddate,
                    duration: {hours: 24, minutes: 0}
                }
                calEntry.push(entry)
                calarr = []
            }
            console.log(calEntry)
            var val = ics.createEvents(calEntry, (error, value) => {
                if (error) { 
                    console.log(error)
                }
                return value;
            });

            return val  
                   
        },

        addItem() { 
            this.$router.push({name: 'AddList'})
        },

        dlcalendar() {
            const icsFile = this.calendar()
            var file = new File([icsFile], 'calendar.ics', {type: 'text/calendar; charset=utf-8'})
            console.log(icsFile)
            saveAs(file)
        },

        async run() { 
            this.clearEntry()
            
            var foodList;
            let s = document.getElementsByClassName('select')
            this.selected = [];
            for (let i = 0; i < s.length; i++) {
                if (s[i].checked) {
                    this.selected.push(s[i].value);
                }
            }

            if (this.selected.length == 0) {
                this.selected = ['None']
            }

            if (this.selected.includes("None")){
                foodList = await getDocs(query(collection(db, String(this.fbuser)), orderBy('expiry')))
            } else {
                const q1 = query(collection(db, String(this.fbuser)), where("storage", "in", this.selected))
                foodList = await getDocs(q1)
            }

            let index = 1

            foodList.forEach((docs) => {
                let data = docs.data()
                var table = document.getElementById("table")
                var row = table.insertRow(index)

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);

                cell1.innerHTML = index;
                cell2.innerHTML = data.item;
                cell3.innerHTML = parseInt(data.quantity);
                cell4.innerHTML = data.storage;
                cell5.innerHTML = data.expiry;

                var editBut = document.createElement('button')
                editBut.className = 'editbwt'
                editBut.id = String(data.item)
                editBut.innerHTML = 'Edit'
                editBut.onclick = () => { 
                    this.editItem(editBut.id)
                }

                var deleteBut = document.createElement('button')
                deleteBut.className = 'deletebwt'
                deleteBut.id = String(data.items)
                deleteBut.innerHTML = 'delete'
                deleteBut.onclick = () => { 
                    document.getElementById('delete').style.display = 'block'
                    document.getElementById('confirm').onclick = () => {
                        this.deleteItem(data.item)
                        console.log("deleted")
                        document.getElementById('delete').style.display = 'none'
                    }
                    document.getElementById('cancel').onclick = () => { 
                        document.getElementById('delete').style.display = 'none'
                    }

                }

                cell6.appendChild(editBut)
                cell7.appendChild(deleteBut)
                index += 1
            })

            if (this.orderByList.length != 0) {
                this.sortTable(this.orderByList[0], this.orderByList[1])
            }

        },

        editItem(i) { 
            this.$router.push({name: 'EditList', params: {item: i}})
        },

        async deleteItem(item) {
            var i = item 
            await deleteDoc(doc(db, String(this.fbuser), i))
            let tb = document.getElementById("table")
            while (tb.rows.length > 1) {
                tb.deleteRow(1)
            }
            this.run()
         },

         sortTable(index, direction) {
             var table = document.getElementById('table');
             var sw = true;
             while (sw) {
                sw = false;
                if (index == 4 || index == 1) {
                    for (let i = 1; i < (table.rows.length - 1); i++) {
                        let x = table.rows[i].getElementsByTagName('TD')[index]
                        let y = table.rows[i + 1].getElementsByTagName('TD')[index]
                        if (direction == 'asc') {
                            if (x.innerHTML > y.innerHTML) {
                                table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i])
                                sw = true;
                            }
                        } else {
                            if (x.innerHTML < y.innerHTML) {
                                table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i])
                                sw = true;
                            }
                        }
                    }
                } else {
                    for (let i = 1; i < (table.rows.length - 1); i++) {
                        let x = table.rows[i].getElementsByTagName('TD')[index]
                        let y = table.rows[i + 1].getElementsByTagName('TD')[index]
                        let xinner = parseInt(x.innerHTML)
                        let yinner = parseInt(y.innerHTML)
                        if (direction == 'asc') {
                            if (parseInt(xinner) > parseInt(yinner)) {
                                table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i])
                                sw = true;
                            }
                        } else {
                            if (parseInt(xinner) < parseInt(yinner)) {
                                table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i])
                                sw = true;
                            }
                        }
                    }
                }
             }
         }
    },

    mounted() { 
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
            this.fbuser = auth.currentUser.email;
            console.log(String(this.fbuser));
            this.run();
        } else {
            console.log("no user");
        }
      });
    }
}

</script>

<style scoped>

.viewexp {
    text-decoration:none;
    color: black;
    font-size: 15px;
    position: relative;
    right: -720px;
    font-weight: bold;
}

.viewexp:hover {
    color: rgb(66, 66, 66);

}

h1 {
    text-align: left;
    margin-left: 50px;
    margin-top: 20px;
    text-transform: uppercase;
    font-size: 30px;
}

#list {
    position: absolute;
    width: 1706px;
    height: 586px;
    left: 96px;
    top: 150px;

    background: #FFFFFF;
    border: 1px solid #A0AEC0;
    box-sizing: border-box;
    box-shadow: 0px 3.5px 5.5px rgba(0, 0, 0, 0.02);
    border-radius: 15px;
}

#list th {
    color: #A0AEC0;
    text-transform: uppercase;
    font-size: 15px;
}

#table {
    width: 100%;
}

#itemorder, #quantityorder, #dropdown, #expiryorder {
    width: 30px;
}

button {
    background-color: #90B3F5;
     /* background-image: linear-gradient(to left, #db9387, #fbd09e); */
    color: white;
    height: 30px;
    width: 100px;
    border-radius: 30px;
    border: 0px;
    font-weight: bold;
    text-transform: uppercase;
}

.add {
    
}


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

.confirmation button {
    color: white;
    height: 30px;
    width: 100px;
    border-radius: 30px;
    border: 0px;
    font-weight: bold;
    background-color: #90B3F5;
}

#confirm:hover {
    background-color: #5a7dbd;
}

#cancel {
    background-color: #B5D5E3;
}

#cancel:hover {
    background-color: #6a8e9e;
}

</style>
