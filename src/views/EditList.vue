<template>
<div>
    <h1> This is where you edit/add to List. </h1>
    <MainList :key="refreshComp"/>
    <AddList @added="change"/>
</div>
</template>

<script>
import AddList from '@/components/AddList.vue'
import MainList from '@/components/MainList.vue'
export default {
    Name: "EditList",

    components: {
        AddList,
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