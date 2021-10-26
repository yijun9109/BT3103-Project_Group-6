<template>
<div>
    <button id="Back" @click ="goToTips()"> Back </button>
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
    methods: {
        goToTips() {
            this.$router.push({name:'Tips'})
        }
    }
}
</script>