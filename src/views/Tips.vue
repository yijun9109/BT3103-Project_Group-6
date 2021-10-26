<template>
<div>
    <h2> Tips </h2>
    <br>
    <body>
    <div class="main">
        <div class="first">
            <router-link to="/StorageGuide"> Storage Guide </router-link>
            <br><br>
            Guide for storage recommendations of common food items
        </div>
        <div class="second">
            <router-link to="/Recipes"> Recipes </router-link>
            <br><br>
            Discover recipes to better make use of leftover food items and the items you have
        </div>
    </div>
    </body>
</div>
</template>

<script>
export default {
    name : "Tips"
}
</script>

<style>
    h2{
        text-align: left;
    }
    .first{
        text-align: center;
        width: 48%;
        height: 400px;
        background-color: #d4fcd4;
        float: left;
        color: slategray;
    }
    .second{
        text-align: center;
        width: 48%;
        height: 400px;
        background-color: paleturquoise;
        float: right;
        color: slategray;
    }
    .first:hover{
        background-color: #b3fab3;
        color: slategray;
    }
    .second:hover{
        background-color: rgb(153, 224, 218);
        color: slategray;
    }
</style>