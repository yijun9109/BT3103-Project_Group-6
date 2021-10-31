<template>
<div>
    <h1> Edit Items </h1>
    <MainList :key="refreshComp"/>
    <EditItemList @added="change"/>
</div>
</template>

<script>
import EditItemList from '@/components/EditItemList.vue'
import MainList from '@/components/MainList.vue'
export default {
    Name: "EditList",

    components: {
        EditItemList,
        MainList
    },

    data() {
        return {
            refreshComp: 0
        }
    },

    methods: {
        change() { 
            this.refreshComp += 1
        }
    }

}
</script>

<style>

</style>