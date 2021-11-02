<template>
<div>
    <v-row 
        :align="align"
        no-gutters>
    <v-col>
    <br>
    <h3> RECIPES </h3>
    </v-col>
    <v-col>
    <div id = "searchBar">
        <br>
        <script type="application/javascript" defer src="https://cse.google.com/cse.js?cx=b8eb2ad231f32c9e5"></script>
        <div class="gcse-search"></div>
    </div>
    </v-col>
    </v-row>
    <v-row 
        :align="align"
        no-gutters>
        <v-col>
        <router-link to="/RecipeDemo">
            <v-card class="rounded-card" id="one">
                <center>
                <v-img 
                    id="image"
                    contain
                    src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/2/25/0/bw2b07_hambugers1.jpg.rend.hgtvcom.616.462.suffix/1558017418187.jpeg">
                </v-img>
                </center>
                <h2>Hamburger</h2>
                <br>
                Serves 4
                <br>
                Cooking time 30 mins
            </v-card>
        </router-link>
        </v-col>
        <v-col>
        <router-link to="">
            <v-card class="rounded-card" id="two">
                <center>
                <v-img 
                    id="image"
                    contain
                    src="https://www.simplyrecipes.com/thmb/wc6AR5n8ReYkmjUVVP3UUoCSh40=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2008__08__shrimp-fried-rice-horiz-a-1600-1d45831476cb4e89a385b58b716bca26.jpg">
                </v-img>
                </center>
                <h2>Fried rice</h2>
                <br>
                Serves 3
                <br>
                Cooking time 5 mins
            </v-card>
        </router-link>
        </v-col>
        <v-col>
        <router-link to="">
            <v-card class="rounded-card" id="three">
                <center>
                <v-img 
                    id="image"
                    contain
                    src="https://i2.wp.com/dashofsavory.com/wp-content/uploads/2015/08/IMG_78541.jpg?fit=2000%2C1334&ssl=1">
                </v-img>
                </center>
                <h2>Carbonara</h2>
                <br>
                Serves 6
                <br>
                Cooking time 30 mins
            </v-card>
        </router-link>
        </v-col>
    </v-row>
    <br>
    <v-btn id="back" @click ="goToTips()">
        Back <v-icon>
          mdi-arrow-right
        </v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    methods: {
        goToTips() {
            this.$router.push({name:'Tips'})
        }
    }
}
</script>

<style scoped>
#back{
  background-color: #CBD5E0;
  color: white;
  float: right;
  margin-right: 50px;
}
#searchBar{
    width: 50%;
    float: right;
    margin-right: 50px;
}
h3{
    text-align: left;
    margin-left: 50px;
}
#one{
    text-align: center;
    background-color: #F5E6F7;
    height: 450px;
    color: slategray;
    margin: 50px;
    margin-bottom: 0px;
}
#two{
    text-align: center;
    background-color: #EAEFFB;
    height: 450px;
    color: slategray;
    margin: 50px;
    margin-bottom: 0px;
}
#three{
    text-align: center;
    background-color: #FBEAEA;
    height: 450px;
    color: slategray;
    margin: 50px;
    margin-bottom: 0px;
}
h2{
    color: #2D3748;
}
#image{
    width: 300px;
    height: 300px;
}
</style>