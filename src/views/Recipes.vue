<template>
<div>
    <button id="Back" @click ="goToTips()"> Back </button>
    <h2>Recipes</h2>
    <br>
    <div data-app>
        <Recipe/>
    </div>
</div>
</template>

<script>
import Recipe from "@/components/Recipes.vue"
export default {
    name : "Recipes",
    components: {
        Recipe
    },
    methods: {
        goToTips() {
            this.$router.push({name:'Tips'})
        }
    }
}
</script>