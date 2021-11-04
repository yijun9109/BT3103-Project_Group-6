<template>
<div id = "bg">
    <br>
    <div data-app>
        <CRecipes/>
    </div>
</div>
</template>

<script>
import CRecipes from "@/components/CRecipes.vue"
export default {
    name : "ChineseRecipes",
    components: {
        CRecipes
    }
}
</script>

<style scoped>
#bg{
    background-color: #FFF8EF;
    width: 100%;
    height: 100vh;
}
</style>