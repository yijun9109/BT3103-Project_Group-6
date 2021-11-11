<template>
<div class="bg">

    <button type='button' class = 'viewexp' v-on:click ="goExp()"> View expiring </button>

    <div id="delete" class="modal">
        <div class="actual-modal">
            <form class="modal-content" >
            <div class='content' id='deleteContent'>
                <h1>Confirm Delete</h1>
                <p> Do you want to delete {{del}} from myfridge? </p>

                <div class='confirmation'>
                    <button type="button" id="cancel"> Cancel </button>
                    <button type='button' id='confirm'> Delete </button>
                </div>
            </div>
        </form>
        </div> 
    </div>

    <div class="modal-overlay" v-if="showDelete"></div>

    <v-icon
        small
        id='cale'
        style='color: #91a3b8;
        position: relative; right: -28%; top: -16px;'>
        mdi-calendar
    </v-icon>

    <button type='button' class = 'dlcal' v-on:click ='dlcalendar()'> Download Calendar </button>


    <div id='list' style='position:absolute;'>

        <h1>All Items</h1>
        <hr style = "    
        position: relative;
        top: 50px;
        width: 98%;
        margin-left: 1%;
        opacity: 0.4;" v-if="dropdown">
        <hr v-else>
        <table id = "table" style="text-align: center">
            <tr>
                <th >Index</th>
                <th>Items
                    <v-icon
                        small
                        id='itemorder'
                        style='color: #A0AEC0;'
                        @click="itemOrder()">
                        mdi-filter
                    </v-icon>
                </th>
                <th>Quantity
                    <v-icon
                        small
                        id='quantityorder'
                        style='color: #A0AEC0;'
                        @click="quantityOrder()">
                        mdi-filter
                    </v-icon>
                </th>
                <th> Units
                </th>
                <th>
                    Storage Location
                    <v-icon
                        small
                        id='dropdown'
                        style='color: #A0AEC0;'
                        @click="dropDown()">
                        mdi-menu-down
                    </v-icon>
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
                    <v-icon
                        small
                        id='expiryorder'
                        style='color: #A0AEC0;'
                        @click="expiryOrder()">
                        mdi-filter
                    </v-icon>
                </th>
            </tr>
        </table>
        <br>
    </div>

    <div id = 'disclaimer'>
        <p><i>*Note: For Quantity Sorting, 1kg and 1l are treated as 1 unit</i></p>
    </div>

    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">

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
            item: "",
            del: "",
            showDelete: false,

        }
    },
    methods: { 
        goExp() {
            location.href='/Home';
        },

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
                this.orderByList = [5, 'asc']
            } else if (this.orderByExpiry % 3 == 2) {
                this.orderByList = [5, 'desc']
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
                for (let c = 1; c < 6; c++) {
                    calarr.push(cells[c].innerHTML)
                }
                let date = String(calarr[4])
                let moddate = date.split('-').map(function(x) {
                    return parseInt(x, 10)
                })
                moddate.push(0)
                moddate.push(0)
                console.log(moddate)
                let name = "You have " + calarr[1] + calarr[2] + ' ' + calarr[0] + " expiring today!"
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
                var cell8 = row.insertCell(7);

                cell1.innerHTML = index;
                cell2.innerHTML = data.item;
                cell3.innerHTML = parseFloat(data.quantity);
                cell4.innerHTML = data.unit;
                cell5.innerHTML = data.storage;
                cell6.innerHTML = data.expiry;

                var editBut = document.createElement('i')
                editBut.className = "mdi mdi-pencil mdi-24px"
                editBut.id = String(data.item)
                editBut.onclick = () => { 
                    this.editItem(editBut.id, data.expiry, data.storage, data.quantity, data.unit)
                }

                var deleteBut = document.createElement('i')
                deleteBut.className = 'mdi mdi-delete mdi-24px'
                deleteBut.id = String(data.item)
                deleteBut.onclick = () => { 
                    this.showDelete = true // added
                    this.del = data.item
                    document.getElementById('delete').style.display = 'block'
                    document.getElementById('confirm').onclick = () => {
                        this.deleteItem(data.item, data.expiry, data.storage)
                        console.log("deleted")
                        this.showDelete =false // closes delete modal
                        document.getElementById('delete').style.display = 'none'
                    }
                    document.getElementById('cancel').onclick = () => { 
                        this.showDelete = false //added
                        document.getElementById('delete').style.display = 'none'
                    }

                }

                cell7.appendChild(editBut)
                cell8.appendChild(deleteBut)
                index += 1
            })

            if (this.orderByList.length != 0) {
                this.sortTable(this.orderByList[0], this.orderByList[1])
            }

        },

        editItem(i, e, s, q, u) { 
            this.$router.push({name: 'Edit', params: {item: i, expiry: e, storage: s, quantity: q, unit: u}})
        },

        async deleteItem(item, expiry, storage) {
            var i = item 
            await deleteDoc(doc(db, String(this.fbuser), i + ' ' + expiry + ' ' + storage))
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
                if (index == 5 || index == 1) {
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
                        let xu = table.rows[i].getElementsByTagName('TD')[3].innerHTML
                        let yu = table.rows[i + 1].getElementsByTagName('TD')[3].innerHTML
                        let xinner = parseFloat(x.innerHTML)
                        if (xu == 'g' || xu == 'ml') {
                            xinner = xinner/1000
                        }
                        let yinner = parseFloat(y.innerHTML)
                        if (yu == 'g' || yu == 'ml') {
                            yinner = yinner/1000
                        }
                        console.log(xinner)
                        if (direction == 'asc') {
                            if (xinner > yinner) {
                                table.rows[i].parentNode.insertBefore(table.rows[i + 1], table.rows[i])
                                sw = true;
                            }
                        } else {
                            if (xinner < yinner) {
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
    }, watch: {
        dialog(val) {
            val || this.close()
        }
    }

}

</script>

<style scoped>

.bg {
    height: 85vh;
    overflow: hidden;
}

/* Vuetify */

#vuetify {
    margin-top: 620px;
}

#addbtn {
    position: relative;
    height: 40px;
    width: 130px;
    left: 85%;
    font-size: 15px;
    /* font-weight: bold; */
    background-color: #90B3F5;
    border-radius: 30px;
    text-transform: uppercase;
    color: white;
    margin-top:20px;
}

#addbtn:hover {
    box-shadow: 0px 3.5px 5.5px rgba(3, 2, 2, 0.5);
}


.viewexp {
    text-decoration:none;
    /* color: #2c3e50; */
    font-size: 15px;
    position: relative;
    right: -44%;
    top: -15px;

    border: 1px solid #91a3b8;
    width: 200px;
    height: 35px;
    border-radius: 10px;
    background-color: #91a3b8;
    color: white
}

.viewexp:hover {
    /* color: rgb(66, 66, 66, 0.6); */

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
    width: 90%;
    height: 550px;
    left: 96px;
    top: 145px;

    background: #FFFFFF;
    border: 1px solid #A0AEC0;
    box-sizing: border-box;
    box-shadow: 0px 3.5px 5.5px rgba(0, 0.5, 0.5, 0.2);
    border-radius: 15px;
    padding-bottom: 10px;
    overflow: auto;
    padding-left: 10px;
    padding-right: 10px;
}


#disclaimer {
    position: absolute;
    width: 90%;
    left: 110px;
    top: 700px;
    text-align: left;
    font-size: 12px;
}

#list th {
    color: #A0AEC0;
    text-transform: uppercase;
    font-size: 15px;
    padding: 5px;
}

#table {
    width: 100%;
}

hr {
    position: relative;
    top: 33px;
    width: 98%;
    margin-left: 1%;
    opacity: 0.4;
}



.dlcal {
    position: relative;
    border: 1px solid #91a3b8;
    /* border: 1px solid #2c3e50; */
    width: 200px;
    height: 35px;
    border-radius: 10px;
    color: #91a3b8;
    right: -15%;
    text-align: left;
    padding-left: 20px;
    /* right: -350px; */
    top: -15px;
}

.dlcal:hover {
    border: 1px solid #91a3b8;
    color: #91a3b8;
}


.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 99;
  width: 30%;
  height: 30%;

  overflow: auto; /* Enable scroll if needed */
  background-color: white;
  /* background-color: #474e5d; */
  padding-top: 50px;

  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 16px;
  border: 1px solid;
}

.modal button {
    margin:20px;
}

.modal-overlay { /* added */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 95;
    height: 150vh;
    background-color: rgba(255, 248, 239, 0.3);
}

#deleteContent h1{
    text-align: center;
    margin-left: -10px;
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