<template>
  <div class="ai-page">
    <van-nav-bar title="AI助手" @click-right="onClose">
      <template #right>
        <van-icon name="cross" size="16" />
      </template>
    </van-nav-bar>
    <div class="talk-area" ref="talkAreaRef">
      <div v-for="(item, index) in talkList" :key="index">
        <div
        v-if="item.type === 'ai'"
        class="talk-item talk-left"
      >
        <span class="avater">AI</span>
        <div class="chat-bubble">
          {{ item.content }}
        </div>
      </div>
      <div
        v-if="item.type === 'mine'"
        class="talk-item talk-right"
      >
        <span class="avater">me</span>
        <div class="chat-bubble">
          {{ item.content }}
        </div>
      </div>
      </div>
      
    </div>
    <div class="bottom-box">
      <div class="input">
        <van-cell-group inset>
          <van-field v-model="inputValue" placeholder="请输入" />
        </van-cell-group>
      </div>
      <div class="bottoms">
        <van-button
          :disabled="!inputValue"
          size="normal"
          block
          type="primary"
          @click="
            () => {
              submit();
            }
          "
        >
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref, nextTick, defineEmits, defineExpose } from 'vue';
import topBack from '@/components/topBack.vue';
const router = useRouter();
const talkList = ref([]);
const talkLeftHistory = ref([1, 2, 3, 4, 4, 4, 5, 6, 7, 8]);
const talkAreaRef = ref();
const talkRightHistory = ref<string | number[]>([1, 2, 3, 4, 4, 4, 5, 6, 7, 8]);
const emits = defineEmits(['close']);
const props = defineProps(['question']);
const inputValue = ref('');
const onClickLeft = () => {
  history.back();
};
const goLearn = () => {
  router.push({ name: 'learn' });
};
const onClose = () => {
  emits('close');
};

const outAnswer = (data) => {
  console.log('answer');
  submit(data);
};

const submit = (parmas) => {
  talkList.value.push({
    content: inputValue.value,
    type: 'mine',
  });
  // talkRightHistory.value.push(inputValue.value);
  // todo loading
  console.log(' props =========> ', props);
  axios
    .post('/userMessage', {
      user_id: props.question.user_id,
      type: 'text',
      ssid: props.question.ssid,
      content: inputValue.value,
      ext: null,
      ...parmas,
    })
    .then((res) => {
      talkList.value.push({
        content: 'inputValue.value',
        type: 'ai',
      });
      scrollToBottom();
      scrollToBottom();
      inputValue.value = '';
    })
    .finally((res) => {
      talkList.value.push({
        content: 'inputValue.value',
        type: 'ai',
      });
      scrollToBottom();
      scrollToBottom();
      inputValue.value = '';
    });
};

const scrollToBottom = () => {
  talkAreaRef.value.scrollTop = talkAreaRef.value.scrollHeight;
};
defineExpose({
  outAnswer,
});
</script>

<style lang="less" scoped>
.ai-page {
  // height: 90vh;
  background-color: #f7f8fa;
}
.talk-area {
  height: calc(100vh - 120px - 46px - 10px);
  overflow-y: auto;
  // 这个4px要跟下面的left/right的4px保持一致
  padding: 5px 4px;
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
    .chat-bubble {
      background: #f5f4f7;
    }
  }
  .talk-right {
    right: 4px;
    text-align: right;
    flex-direction: row-reverse;
    .chat-bubble {
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
    padding: 10px;
  }
}
</style>
