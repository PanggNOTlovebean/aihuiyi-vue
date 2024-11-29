<template>
  <div>
    <van-nav-bar
      :title="props.title"
      left-arrow
      @click-left="onClickLeft"
    />

  </div>
</template>

<script lang='ts' setup>
import {defineProps} from 'vue';
const props = defineProps(['title']);
const onClickLeft = () => {
  history.back();
}
</script>

<style lang='scss' scoped>

</style>
