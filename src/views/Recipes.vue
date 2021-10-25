<template>
<div>
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
}
</script>