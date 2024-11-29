<template>
  <div>
    <div class="title">
      爱回译
    </div>
    <div class="back-groud"></div>
    <div class="entry-box">
      <van-button @click="goLearn" type="primary">learn</van-button>
      <van-button type="primary">review</van-button>
    </div>

  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const onClickLeft = () => {
  history.back();
}
const goLearn = () => {
  router.push({name: 'learn'})
};
</script>

<style lang='less' scoped>
.title {
  height: 10vh;
  margin-top: 10vh;
  line-height: 10vh;
  font-size: 24px;
  font-weight: bold;
}
.back-groud {
  margin: 10px auto;
  display: block;
  height: 40vh;
  width: 90vw;
  background: url('../../assets/image/main_bg.jpg') no-repeat;
  background-size: contain;
  background-position: center;
}
.entry-box{
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}
</style>
