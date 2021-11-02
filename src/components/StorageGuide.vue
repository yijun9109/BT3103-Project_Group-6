<template>
  <div>
    <v-card class="rounded-card">
      <br>
      <h3>STORAGE GUIDE</h3>
      <v-data-table
        :headers="headers"
        :items="food"
        item-key="name"
        class="elevation-1"
        :search="search"
        :custom-filter="filterNonCapsText"
        id = "table"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search (lower case only)"
            class="mx-4"
          ></v-text-field>
        </template>
      </v-data-table>
      </v-card>
      <br>
      <v-btn id="chart" onclick="window.open('https://www.sfa.gov.sg/images/default-source/section-content/food/foodstoragechart1.gif', 'popup', 'height=500, width=500'); return false;">View food storage chart</v-btn>
      <v-btn id="back" @click ="goToTips()">
        Back <v-icon>
          mdi-arrow-right
        </v-icon>
      </v-btn>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        food: [
          {
            name: 'Fresh whole apples',
            location: 'Fridge',
            time: '5-7 days on the counter, 4-6 weeks in the fridge',
          },
          {
            name: 'Ripe bananas',
            location: 'Fridge',
            time: '2-3 days on the counter, 1 week in the fridge',
          },
          {
            name: 'Raw beef',
            location: 'Freezer',
            time: '3 days in the fridge, 4-12 months in the freezer'
          },
          { name: "UHT milk", 
            location: "Fridge",
            time: "6-9 months on the counter unopened, 7-10 days in the fridge after opening"
          },
          { name: "Fresh spinach",
            location: "Fridge",
            time: "5-7 days in the fridge"
          },
          { name: "Cereal",
            location: "Cabinet",
            time: "4-6 months on the counter in an airtight container"
          },
          { name: "Frozen fish fillet",
            location: "Freezer",
            time: "3-8 months in the freezer"
          },
        ],
      }
    },
    computed: {
      headers () {
        return [
          {
            text: 'Items',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Optimal Storage Location', value: 'location' },
          { text: 'Typical Storage Time', value: 'time' },
        ]
      },
    },
    methods: {
      filterNonCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleLowerCase().indexOf(search) !== -1
      },
      goToTips() {
            this.$router.push({name:'Tips'})
      },
    },
  }
</script>

<style scoped>
#table{
  margin-left: 65px;
  margin-right: 65px;
  border-radius: 10px;
  color: #2D3748;
}
.rounded-card{
    border-radius:20px;
    margin-left: 50px;
    margin-right: 50px;
}
#back{
  background-color: #CBD5E0;
  color: white;
  float: right;
  margin-right: 50px;
}
#chart{
  background-color: #F5C790;
  color: white;
  float: left;
  margin-left: 50px;
}
h3{
  text-align: left;
  margin-left: 30px;
  color: #2D3748;
}
</style>