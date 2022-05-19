<template>
    <h1>question</h1>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
        ...mapGetters(['examId'])
    }
}
</script>