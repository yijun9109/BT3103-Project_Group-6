<template>
  <div class="bg">
    <h2 class = "header"> INVENTORY</h2>
    <h2 class = "shadow"> INVENTORY</h2>
    <div class = "container">
        <MainList/>
    </div>
  </div>
</template>

<script>
import MainList from '@/components/MainList.vue'

export default {
    Name: "List",

    components: {
        MainList
    }
}
</script>

<style>
.container table {
    text-align: center;
    margin: auto;
}

</style>

<style scoped>
.bg {
    background-color: #fbd09e;
    height: 85vh;
    padding: 20px;
    margin-left: -10px;
    margin-right: -40px;
}

.container {
    background-color: white;
    border-radius: 30px;
    margin: auto;
    width: 40%;

}

h2 {
    font-size: 40px;
}

.shadow {
    color: white;
    margin-top: -53px;
    margin-left: 10px;
}

.header {
    color: #a77235;

}

</style>