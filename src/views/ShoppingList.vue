<template>
<div id="test">
    <div >
        <br/><br/><br/>
    </div>
    <div data-app>
        <ShList :key="refreshComp"/>
    </div>
    <div >
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
</div>
</template>

<script>
import ShList from "@/components/ShList.vue"
export default {
    name : "ShoppingList",
    components: {
        ShList
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

<style scoped>
#test {
    background-color: #FFF8EF;
    width: 100%;
    height: 100vh;
}
</style>
