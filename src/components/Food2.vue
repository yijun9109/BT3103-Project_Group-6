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
            src="https://www.simplyrecipes.com/thmb/wc6AR5n8ReYkmjUVVP3UUoCSh40=/1600x1067/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2008__08__shrimp-fried-rice-horiz-a-1600-1d45831476cb4e89a385b58b716bca26.jpg">
        </v-img>
        </v-col>
        <v-col>
        <div id="title">
        <br><br>
        <h2>Fried rice</h2>
        <br>
        Serves 3
        <br>
        Cooking time 5 mins
        <br><br>
        <h4>Ingredients</h4><br>
        1. 115g chicken breast<br>
        2. 115g shrimp<br>
        3. 1 cup of frozen mixed vegetables<br>
        4. 340g steamed white rice<br>
        5. 2 eggs
        </div>
        </v-col>
        <v-col>
        <div id = "steps">
        <br><br>
        <h4>Cooking method</h4><br>
        Step 1: Heat up a wok or pan with the oil. Add the garlic and stir fry until aromatic, follow by the chicken, shrimp, and mixed vegetables. Stir fry until the chicken and shrimp are half cooked. 
        <br><br>
        Step 2: Add in the rice and stir well with the ingredients. 
        <br><br>
        Step 3: Add the fish sauce, soy sauce, oyster sauce, white pepper and continue to stir the fried rice for a couple of minutes.
        <br><br>
        Step 4: Using the spatula, push the rice to the side of the wok and make a "well" in the middle of the fried rice. Pour the beaten eggs in the "well." Wait for 30 seconds and then cover the eggs with the fried rice. Leave it for 30 seconds to 1 minute and continue to stir-fry so the eggs form into small pieces and mix well with the fried rice. 
        <br><br>
        Step 5: Add salt to taste and do some quick stirs, dish out and serve hot.
        <br><br>
        </div>
        </v-col>
        </v-row>
    </v-card>
    <br>
    <v-btn id="back" @click ="$router.go(-1)">
        Back <v-icon>
          mdi-arrow-right
        </v-icon>
    </v-btn>
</div>
</template>

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