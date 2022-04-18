<template>
  <div>
    I am {{ name }}
    <br />
    <myButton
      
      @onHover="authName"
      @buttonClicked="sayHello"
      text="hello world"
      :authCompany="authCompany"
    />
    {{ counter }}

    <button @click="incrementCounter(2)">click me !</button>

    <br />
    <br />
    {{ apiData.name }} ---{{transform}}--
    <br />
    <input type="text" v-model="apiData.name" />
    <p ref="myNameRef">Ijambo {{userData}} </p>
  </div>
</template>
<script setup>
import { ref,reactive,computed,onMounted,nextTick } from "vue";
import{ fetch} from './components/helper'
import myButton from "./components/myButton.vue";


const counter = ref(0)

const {x,y,userData}=fetch()

const incrementCounter=  (amount)=>{
  counter.value+=amount
 console.log("*****"+userData.value)
//it does something when the dom has updated
//  await nextTick()
//  console.log("salut tout le monde")

}











const name = ref("Bienfait");
const age = ref(22);
const authCompany= ref("Ajax");

const myNameRef =ref("Ijambo Izuba")

const apiData = ref({
  name: "bienfait",
  email: "",
});

const svData=reactive({
  x:0,
  name:"john"
})

const transform=computed(( )=>svData.name.toUpperCase())

const count = ref(1)
const plusOne = computed(() => count.value + 1)


const sayHello = (id) => {
  alert(name.value + "" + id);
};


onMounted(()=>{
  console.log("hello world")
 myNameRef.value="jj"
})
</script>