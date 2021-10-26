<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="food"
      item-key="name"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
    </v-data-table>
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
      filterOnlyCapsText (value, search) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search) !== -1
      },
    },
  }
</script>