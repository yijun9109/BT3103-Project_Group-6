<template>
<div>
    <h2>Storage Guide</h2>
    <div data-app>
        <SGuide/>
    </div>
</div>
</template>

<script>
import SGuide from "@/components/StorageGuide.vue"
export default {
    name : "StorageGuide",
    components: {
        SGuide
    },
}
</script>