<template>
<div>
    <h1> Edit Items </h1>
    <MainList :key="refreshComp"/>
    <EditItemList @added="change"/>
</div>
</template>

<script>
import MainList from '@/components/MainList.vue'
import EditItemList from '@/components/EditItemList.vue'
export default {
    Name: "EditList",

    components: {
        MainList,
        EditItemList,
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