// mouse.js
import { ref,reactive, onMounted } from 'vue'
export function fetch(){

  const x = ref(0)
  const y = ref(0)
  const userData=ref('')

  function changeData(){
    userData.value="ajax is coding..."
}
 changeData()

  return{x,y,userData}
}


