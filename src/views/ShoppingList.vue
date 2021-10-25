<template>
<div>
    <h1>Shopping List</h1>
    <div data-app>
        <SList />
    </div>
</div>
</template>

<script>
import SList from "@/components/SList.vue"
export default {
    name : "ShoppingList",
    components: {
        SList
    },
}
</script>