<template>
  <div>
    <topBack title="learn"/>
    <div class="talk-area">
      <div v-for="item in talkHistory" :key="item" class="talk-left">
        asaasa
      </div>
      <div class="talk-right">
        assaas
      </div>

    </div>
    <div class="bottom-box">
      <div class="input"></div>
      <div class="bottoms"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import topBack from '@/components/topBack.vue'
const router = useRouter();
const talkHistory = ref([1,2,3,4,4,4,5,6,7,8])
const onClickLeft = () => {
  history.back();
}
const goLearn = () => {
  router.push({name: 'learn'})
};
</script>

<style lang='less' scoped>
.talk-area {
  height: calc(100vh - 210px);
  overflow-y: auto;
  padding: 10px;
  .talk-left{
    width: 80%;
    height: 10vh;
  }
}
</style>
