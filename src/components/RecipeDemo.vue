<template>
<div>
    <br>
    <h3> RECIPES </h3>
    <v-card class="rounded-card" id="container">
        <v-row 
            :align="align">
        <v-col>
        <v-img
            id="image"
            contain
            src="https://food.fnr.sndimg.com/content/dam/images/food/fullset/2004/2/25/0/bw2b07_hambugers1.jpg.rend.hgtvcom.616.462.suffix/1558017418187.jpeg">
        </v-img>
        </v-col>
        <v-col>
        <div id="title">
        <br><br>
        <h2>Hamburger</h2>
        <br>
        Serves 4
        <br>
        Cooking time 30 mins
        <br><br>
        <h4>Ingredients</h4><br>
        1. 500g beef<br>
        2. 1 lettuce<br>
        3. 3 tomato<br>
        4. 4 sliced cheese<br>
        5. 4 burger buns<br>
        </div>
        </v-col>
        <v-col>
        <div id = "steps">
        <br><br>
        <h4>Cooking method</h4><br>
        Step 1: In a bowl, mix ground beef, egg, onion, bread crumbs, Worcestershire, garlic, 1/2 teaspoon salt, and 1/4 teaspoon pepper until well blended. Divide mixture into four equal portions and shape each into a patty about 4 inches wide.
        <br><br>
        Step 2: Lay burgers on an oiled barbecue grill over a solid bed of hot coals or high heat on a gas grill (you can hold your hand at grill level only 2 to 3 seconds); close lid on gas grill. Cook burgers, turning once, until browned on both sides and no longer pink inside (cut to test), 7 to 8 minutes total. Remove from grill.
        <br><br>
        Step 3: Lay buns, cut side down, on grill and cook until lightly toasted, 30 seconds to 1 minute.
        <br><br>
        Step 4: Spread mayonnaise and ketchup on bun bottoms. Add lettuce, tomato, burger, onion, and salt and pepper to taste. Set bun tops in place.
        <br><br>
        </div>
        </v-col>
        </v-row>
    </v-card>
    <br>
    <v-btn id="back" @click ="goToRecipe()">
        Back <v-icon>
          mdi-arrow-right
        </v-icon>
    </v-btn>
</div>
</template>

<script>
export default {
    methods: {
        goToRecipe() {
            this.$router.push({name:'Recipes'})
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
h3{
    text-align: left;
    margin-left: 50px;
}
#container{
    text-align: center;
    background-color: white;
    color: slategray;
    margin: 50px;
    margin-bottom: 0px;
}
h2, h4{
    color: #2D3748;
}
#image{
    width: 400px;
    height: 400px;
    margin-left: 40px;
}
#title{
    text-align: left;
    margin-left: 50px;
}
#steps{
    text-align: left; 
    text-align: justify;
    margin-right: 40px;
    width: 500px;
}
</style>