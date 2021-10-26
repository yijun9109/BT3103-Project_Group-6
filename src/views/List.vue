<template>
  <div>
  <h1> This is the list page</h1>
  <MainList/>
  </div>
</template>

<script>
import MainList from '@/components/MainList.vue'

export default {
    Name: "List",

    components: {
        MainList
    }
}
</script>

<style>

</style>