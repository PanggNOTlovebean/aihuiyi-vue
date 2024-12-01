<template>
  <div class="learn-page">
    <topBack title="learn" />
    <div class="talk-area" ref="talkAreaRef">
      <div class="question-area">
        <p class="tran-tips">请将下面内容翻译为中文</p>
        <div class="wait-translate">
          {{ question.english_content }}
        </div>
      </div>
      <div v-if="question.chineseAnswer" class="talk-item talk-right">
        <span class="avater">me</span>
        <div class="chat-bubble">
          <!-- todo 参考答案打个标签 -->
          <van-tag type="primary" plain>参考答案</van-tag>
          <div>
            {{ question.chinese_content }}
          </div>
          <div class="line"></div>
          <van-tag type="primary">我的答案</van-tag>
          <div>{{ question.chineseAnswer }}</div>
        </div>
      </div>
      <div v-if="question.chineseAnswer" class="question-area">
        <p class="tran-tips">请将上述中文回译为英文</p>
      </div>
      <div v-if="question.englishAnswer" class="talk-item talk-right">
        <span class="avater">me</span>
        <div class="chat-bubble">
          <p>{{ question.englishAnswer }}</p>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="input">
        <van-cell-group inset>
          <van-field
            v-model="inputValue"
            label="答案"
            placeholder="请输入答案"
          />
        </van-cell-group>
      </div>
      <div class="bottoms">
        <van-button
          v-if="step === 3"
          size="small"
          block
          type="primary"
          round
          @click="nextQuestion"
        >
          下一题
        </van-button>
        <van-button
          v-else
          :disabled="!inputValue"
          size="small"
          block
          round
          type="primary"
          @click="submit"
        >
          提交
        </van-button>
        <van-button size="small" block type="primary" round @click="goAI">
          ai交互
        </van-button>
      </div>
    </div>
    <van-popup
      v-model:show="show"
      position="bottom"
      :style="{ height: '100vh' }"
    >
      <AIAssistant
        ref="aiRef"
        :question="question"
        @close="
          () => {
            show = false;
          }
        "
      />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import AIAssistant from '@/views/AIAssistant/index.vue';

import { ref, nextTick, onMounted } from 'vue';
import topBack from '@/components/topBack.vue';
const router = useRouter();
const talkAreaRef = ref();
const aiRef = ref();
const question = ref({});
const step = ref(1);
const show = ref(false);

const inputValue = ref('');

onMounted(() => {
  getQuestion();
});
const getQuestion = () => {
  axios
    .post('/startSession', {
      user_id: 'wx_o1234567',
      ssid: '',
    })
    .then((res) => {
      question.value = { ...res.data.data, user_id: 'wx_o1234567' };
    });
};
const onClickLeft = () => {
  history.back();
};
const nextQuestion = () => {
  axios
    .post('/endSession', {
      user_id: 'wx_o1234567',
      ssid: question.value.ssid,
    })
    .then((res) => {
      step.value = 1;
      question.value = {};
      getQuestion();
    })
    .finally((res) => {
      step.value = 1;
      question.value = {};
      getQuestion();
    });
};
const goAI = () => {
  show.value = true;
};
const submit = () => {
  if (step.value === 1) {
    question.value.chineseAnswer = inputValue.value;
    inputValue.value = '';
    step.value = 2;
  } else {
    question.value.englishAnswer = inputValue.value;
    step.value = 3;
  }
  show.value = true;
  nextTick(() => {
    aiRef.value?.outAnswer &&
      aiRef.value.outAnswer({
        type: 'answer',
        content: '我刚刚提交了一份我的翻译结果',
        ext: {
          ssid: question.value.ssid,
          translate_question_id: question.value.question_id,
          type: 'translation',
          from: 'en',
          to: 'zh-CN',
          answer: inputValue.value,
        },
      });
    scrollToBottom();
  });
};
const scrollToBottom = () => {
  talkAreaRef.value.scrollTop = talkAreaRef.value.scrollHeight;
};
</script>

<style lang="less" scoped>
.talk-area {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(11px);
  height: calc(100vh - 120px - 46px);
  overflow-y: auto;
  // 这个4px要跟下面的left/right的4px保持一致
  padding: 0 4px;
  // width: 100vw;
  position: relative;
  .question-area {
    margin: 10px;
    padding: 10px;
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 8px;
    text-align: left;
  }
  .talk-item {
    margin: 10px 0;
    position: relative;
    display: flex;
  }
  .talk-right {
    right: 4px;
    text-align: right;
    flex-direction: row-reverse;
    .chat-bubble {
      background: #fff;
      border-radius: 4px;
      .line {
        height: 1px;
        margin: 8px 0;
        background: #d4d7de;
        width: 100%;
      }
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
