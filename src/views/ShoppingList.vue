<template>
<div>
    <h1>Shopping List</h1>
    <div data-app>
        <ShList />
    </div>
</div>
</template>

<script>
import ShList from "@/components/ShList.vue"
export default {
    name : "ShoppingList",
    components: {
        ShList
    },
}
</script>