<template>
<div id = "bg">
    <br>
    <div data-app>
        <Carb/>
    </div>
</div>
</template>

<script>
import Carb from "@/components/Food3.vue"
export default {
    name : "Food3",
    components: {
        Carb
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