<template>
<div class="bg">
    <h1> Edit </h1>
    <EditItemList @added="change" :key="refresh" />
    
    <!-- <MainList :key="refreshComp"/> -->


    <div id="edit" class="modal">
        <div class="actual-modal">
            <!-- <EditItemList @added="change"/> -->
        </div> 
    </div>

    <div class="modal-overlay" v-if="showEdit"></div>


</div>
</template>

<script>
// import MainList from '@/components/MainList.vue'
import EditItemList from '@/components/EditItemList.vue'
export default {
    Name: "EditList",

    components: {
        // MainList,
        EditItemList,
    },

    data() {
        return {
            refreshComp: 0,
            showEdit: true,
            refresh:0,
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
.bg {
    /* background-color: #FFF8EF;
    width: 100%; */

}


</style>