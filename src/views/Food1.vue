<template>
<div id = "bg">
    <br>
    <div data-app>
        <RDemo/>
    </div>
</div>
</template>

<script>
import RDemo from "@/components/Food1.vue"
export default {
    name : "Food1",
    components: {
        RDemo
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