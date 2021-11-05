<template>
<div id = "bg">
    <br>
    <div data-app>
        <WRecipes/>
    </div>
</div>
</template>

<script>
import WRecipes from "@/components/WRecipes.vue"
export default {
    name : "WesternRecipes",
    components: {
        WRecipes
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