<template>
  <div class="talk-area" ref="talkAreaRef">
    <div v-for="(item, index) in talkList" :key="index">
      <div v-if="item.type === 'AI'" class="talk-item talk-left">
        <div class="chat-bubble">
          <div class="standard-chinese-text" v-html="item.content"></div>
        </div>
      </div>
      <div v-if="item.type === 'MINE'" class="talk-item talk-right">
        <div class="chat-bubble">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, nextTick, defineEmits, defineExpose } from 'vue';
const talkList = ref<{ content: string; type: 'AI' | 'MINE' }[]>([]);
const aiLoading = ref(false);
const talkAreaRef = ref();
const emits = defineEmits(['close']);
const props = defineProps(['question']);

const outAnswer = (data) => {
  let content = '';
  if (data?.ext?.answer) {
    aiLoading.value = false;
    content = `${data.content}${data?.ext?.answer}`;
  } else {
    content = data.content;
  }
  if (aiLoading.value) return;
  talkList.value.push({
    content,
    type: 'MINE',
  });
  submit(data);
};

const submit = (parmas) => {
  scrollToBottom();
  aiLoading.value = true;
  // todo loading
  talkList.value.push({
    content: 'AI正在思考中...',
    type: 'AI',
  });
  const AIDoingIndex = talkList.value.length - 1;
  axios
    .post('/api/userMessage', {
      user_id: props.question.user_id,
      type: 'text',
      ssid: props.question.ssid,
      ext: null,
      ...parmas,
    })
    .then((res) => {
      if (res.data.data?.content?.overallComment) {
        talkList.value[AIDoingIndex].content = res.data.data?.content?.overallComment;
      } else {
        talkList.value[AIDoingIndex].content = res.data.data.content || '-';
      }
    })
    .catch(() => {
      talkList.value[AIDoingIndex].content = 'AI出错了，请重新输入';
    })
    .finally(() => {
      aiLoading.value = false;
      scrollToBottom();
    });
};

const scrollToBottom = () => {
  nextTick(() => {
    talkAreaRef.value.scrollTop = talkAreaRef.value.scrollHeight;
  });
};
defineExpose({
  outAnswer,
});
</script>

<style lang="less" scoped>
.talk-area {
  word-break: break-word;
  height: calc(100vh - 186px - 3.4em);
  overflow-y: auto;
  border-radius: 8px;
  // 这个4px要跟下面的left/right的4px保持一致
  padding: 5px 8px;
  // width: 100vw;
  position: relative;
  .talk-item {
    margin: 10px 0;
    position: relative;
    display: flex;
    text-align: left;
  }
  .talk-left {
    left: 4px;
    .chat-bubble {
      border-radius: 0 8px 8px;
      background: #f5f4f7;
    }
  }
  .talk-right {
    right: 4px;
    flex-direction: row-reverse;
    .chat-bubble {
      border-radius: 8px 0 8px 8px;
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
.talk-item {
  &.talk-left {
    .chat-bubble {
      :deep(.standard-chinese-text) {
        font-size: 15px;
        line-height: 1.5;
      }
    }
  }
}
</style>
