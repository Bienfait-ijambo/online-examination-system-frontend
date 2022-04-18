
<template>
  <div>
    {{props.authCompany }}
    <h2 @click="handleBtnClicked">{{ props.text }}</h2>
  </div>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
  text: {
    type: String,
    default: "I have no text",
  },
  authCompany: {
    type: String,
    default: "ajax",
  },
});

const emit = defineEmits(["buttonClicked"]);

const authName = () => {
  alert("Bienfait ijambo");
};
const handleBtnClicked = () => {
  emit("buttonClicked", 12);
};
// setup code
</script>
