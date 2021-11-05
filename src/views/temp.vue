<template>
    <div>
        <Popup/>
    </div>

</template>

<script>
// import AddItem from "@/components/AddItem.vue";
import Popup from "@/components/Popup.vue";

export default {
    name: "temp",
    components: {
        // AddItem,
        Popup
    }
};
</script>

<style scoped>
.success{
    color: black;
}


#table{
  margin-left: 65px;
  margin-right: 65px;
  border-radius: 10px;
  color: #2D3748;
}
.rounded-card{
    border-radius:20px;
    margin-left: 50px;
    margin-right: 50px;
}
#back{
  background-color: #CBD5E0;
  color: white;
  float: right;
  margin-right: 50px;
}
#chart{
  background-color: #F5C790;
  color: white;
  float: left;
  margin-left: 50px;
}
h3{
  text-align: left;
  margin-left: 30px;
  color: #2D3748;
}
</style>