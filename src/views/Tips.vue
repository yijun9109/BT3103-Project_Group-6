<template>
<div id="bg">
    <br>
    <h3> TIPS </h3>
    <body>
    <div class="main">
        <v-row 
            :align="align"
            no-gutters>
        <v-col>
        <router-link to="/StorageGuide">
            <v-card class="rounded-card" id="first">
                <v-avatar
                    size="90"
                    id="bulb">
                    <img src="https://live.staticflickr.com/65535/51654697314_1c14375fa5_o.png" alt="Bulb">
                </v-avatar>
                <h2>Storage guide</h2>
                <br><br>
                Guide for storage recommendations <br> of common food items
            </v-card>
        </router-link>
        </v-col>
        <v-col>
        <router-link to="/Recipes">
            <v-card class="rounded-card" id="second">
                <v-avatar
                    size="90"
                    id="food">
                    <img src="https://live.staticflickr.com/65535/51654709049_58e4beae47_o.png" alt="Food">
                </v-avatar>
                <h2>Recipes</h2>
                <br><br>
                Discover recipes to better make use of <br> leftover food items and the items you have
            </v-card>
        </router-link>
        </v-col>
        </v-row>
    </div>
    </body>
</div>
</template>

<script>
export default {
    name : "Tips"
}
</script>

<style scoped>
    h3{
        text-align: left;
        margin-left: 50px;
    }
    #first{
        text-align: center;
        background-color: #F0F7E6;
        height: 400px;
        color: slategray;
        margin: 50px;
    }
    #second{
        text-align: center;
        background-color: #EAEFFB;
        height: 400px;
        color: slategray;
        margin: 50px;
    }
    #first:hover{
        background-color: #eaf7d9;
    }
    #second:hover{
        background-color: #e2e9fa;
    }
    #bg{
        background-color: #FFF8EF;
        width: 100%;
        height: 100vh;
    }
    #bulb, #food{
        margin: 50px;
    }
    h2{
        color: #2D3748;
    }
</style>