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
            src="https://i2.wp.com/dashofsavory.com/wp-content/uploads/2015/08/IMG_78541.jpg?fit=2000%2C1334&ssl=1">
        </v-img>
        </v-col>
        <v-col>
        <div id="title">
        <br><br>
        <h2>Carbonara</h2>
        <br>
        Serves 6
        <br>
        Cooking time 30 mins
        <br><br>
        <h4>Ingredients</h4><br>
        1. 227g thick cut bacon<br>
        2. 3-4 whole eggs<br>
        3. 1 cup grated Parmesan cheese<br>
        4. 450g spaghetti<br>
        </div>
        </v-col>
        <v-col>
        <div id = "steps">
        <br><br>
        <h4>Cooking method</h4><br>
        Step 1: Cook bacon in a pan slowly until crispy.
        <br><br>
        Step 2: Add the garlic and cook another minute, then turn off the heat and put the pancetta and garlic into a large bowl.
        <br><br>
        Step 3: In a small bowl, beat the eggs and mix in about half of the cheese.
        <br><br>
        Step 4: Cook the pasta is al dente, use tongs to move it to the bowl with the bacon and garlic.
        <br><br>   
        Step 5: Move the pasta from the pot to the bowl quickly. Then toss everything to combine.
        <br><br>
        Step 6: Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. 
        <br><br>
        Step 7: Serve at once with the rest of the parmesan and freshly ground black pepper.
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