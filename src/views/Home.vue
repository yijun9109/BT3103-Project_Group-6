<template>
   <div>
       <button id="List" @click ="goToListView()"> List View </button>
   </div> 
</template>
<script>

export default {
    name: "Home",
    methods: {
        goToListView() {
            this.$router.push({name:'List'})
        }
    }
}
</script>

<style>

</style>