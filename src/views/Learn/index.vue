<template>
  <div>
    <topBack title="learn"/>
    <div class="talk-area" ref="talkAreaRef">
      <div v-for="item in talkLeftHistory" :key="item" class="talk-item talk-left">
        <span class="avater">R</span>
        <div class="chat-bubble">
          {{item}}
        </div>
      </div>
      <div v-for="item in talkRightHistory" :key="item" class="talk-item talk-right">
        <span class="avater">me</span>
        <div class="chat-bubble">
          {{item}}
        </div>
      </div>

    </div>
    <div class="bottom-box">
      <div class="input">
        <van-cell-group inset>
          <van-field v-model="inputValue" label="答案" placeholder="请输入答案" />
        </van-cell-group>
      </div>
      <div class="bottoms">
        <van-button :disabled="!inputValue" size="small" block round type="primary"  @click="submit">
          提交
        </van-button>
        <van-button size="small" block type="primary" round @click="goAI">
          ai交互
        </van-button>
        
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import axios from 'axios';

import { ref,nextTick, onMounted } from 'vue';
import {plmhttp, http} from '@/http/index.ts'
import topBack from '@/components/topBack.vue'
const router = useRouter();
const talkLeftHistory = ref([1,2,3,4,4,4,5,6,7,8])
const talkAreaRef = ref()
const talkRightHistory = ref<string|number[]>([1,2,3,4,4,4,5,6,7,8])

const inputValue = ref('')

onMounted(() => {
  testRequest()
})
const testRequest = () => {
  http.post('/startSession', {
  "user_id": "wx_o1234567",
  "ssid": ""
});
axios.post('/startSession', {
  "user_id": "wx_o1234567",
  "ssid": ""
})
};
const onClickLeft = () => {
  history.back();
}
const goAI = () => {
  router.push({name: 'aiAssistant'})
};
const submit = () => {
  talkRightHistory.value.push(inputValue.value)
  inputValue.value = ''
  nextTick(() => {
    scrollToBottom()
  })
}
const scrollToBottom = () => {
  talkAreaRef.value.scrollTop = talkAreaRef.value.scrollHeight;
}
</script>

<style lang='less' scoped>
.talk-area {
  height: calc(100vh - 120px - 46px);
  overflow-y: auto;
  // 这个4px要跟下面的left/right的4px保持一致
  padding: 0 4px ;
  // width: 100vw;
  position: relative;
  .talk-item {
    margin: 10px 0;
    position: relative;
    display: flex;
  }
  .talk-left {
    left: 4px;
    text-align: left;
    .chat-bubble{
      background: #f5f4f7;
    }

  }
  .talk-right {
    right: 4px;
    text-align: right;
    flex-direction: row-reverse;
    .chat-bubble{
      background: #dfeeff;
    }
  }

  .avater {
      text-align: center;
      display: inline-block;
      line-height: 32px;
      width: 32px;
      height: 32px;
      margin: 0 10px;
      border-radius: 50%;
      background: #70d33d;
  }
  .chat-bubble {
    background: #fff;
    padding: 10px;
    max-width: 60vw;
  }
}
.bottom-box {
  margin-top: 4px;
  height: 116px;
  overflow: hidden;
  .input {

  }
  .bottoms {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    button {
      width: 40vw;
    }
  }
}
</style>
