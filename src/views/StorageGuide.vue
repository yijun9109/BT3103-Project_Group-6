<template>
<div id = "bg">
    <br>
    <div data-app>
        <SGuide/>
    </div>
</div>
</template>

<script>
import SGuide from "@/components/StorageGuide.vue"
export default {
    name : "StorageGuide",
    components: {
        SGuide
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