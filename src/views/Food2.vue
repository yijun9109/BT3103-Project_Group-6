<template>
<div id = "bg">
    <br>
    <div data-app>
        <FRice/>
    </div>
</div>
</template>

<script>
import FRice from "@/components/Food2.vue"
export default {
    name : "Food2",
    components: {
        FRice
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