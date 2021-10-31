<template>
  <div>
      <h1>Add Items</h1>
      <AddItemList @added="change"/>
  </div>
</template>

<script>
import AddItemList from '@/components/AddItemList.vue'
export default {
    name: 'AddList',

    components: {
        AddItemList
    }

}
</script>

<style>

</style>