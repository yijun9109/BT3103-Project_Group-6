<template>
<div>
    <form class="search-form">
    <input type="text" name="q">
    <button id = "searchbutton" type = "button" v-on:click = "search()"> Search </button>
    </form>
</div>
</template>

<script>
export default {
    methods:{
        async search() {
            var cx = 'b8eb2ad231f32c9e5';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
        }
    }
}
</script>

<style>

</style>