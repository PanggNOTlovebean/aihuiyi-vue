<template>
  <div class="learn-page">
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="onClickLeft" />
      </div>
      <div class="title">回译训练</div>
      <div class="right">
        <van-icon
          name="wap-home-o"
          @click="
            () => {
              router.push({ name: 'main' });
            }
          "
        />
      </div>
    </div>
    <div class="talk-area" ref="talkAreaRef" v-show="activeTab === 'practice'">
      <div v-if="step !== 3" class="question-area">
        <div class="tran-tips">{{step===1 ? '请将下面内容翻译为中文' : '请将下面内容回译为英文'}}</div>
        <div class="wait-translate">
          <!-- <div :class="['text', step === 2 ? 'diagonal-block-text' : '']">
            {{ question.english_content }}
          </div> -->
          <div class="text">
            {{ step===1 ? question.english_content :  question.chineseAnswer}}
          </div>
        </div>
      </div>

      <!-- <div v-if="question.chineseAnswer" class="answer-item">
        <div class="chat-bubble">
          <div class="answer-area padding-b-0" v-show="answerTab === 'mine'">
            {{ question.chineseAnswer }}
          </div>
          <div
            class="answer-area padding-b-0"
            v-show="answerTab === 'AIAnswer'"
          >
            {{ question.chinese_content }}
          </div>
          <van-tabs v-model:active="answerTab">
            <van-tab title="我的答案" name="mine"> </van-tab>
            <van-tab title="标准答案" name="AIAnswer"> </van-tab>
          </van-tabs>
        </div>
      </div> -->
      <!-- <div v-if="question.chineseAnswer" class="question-area">
        <div class="tran-tips color-black">请将上述中文回译为英文</div>
      </div> -->
      <div v-if="step === 3">
        <div class="review-area">
          <div class="tran-tips color-black">英文对比</div>
          <div class="line-text">{{ question.english_content || '-' }}</div>
          <div class="line"></div>
          <div class="line-text">{{ question.englishAnswer || '-' }}</div>
        </div>
        <div class="review-area">
          <div class="tran-tips color-black">中文对比</div>
          <div class="line-text">{{ question.chinese_content || '-' }}</div>
          <div class="line"></div>
          <div class="line-text">{{ question.chineseAnswer || '-' }}</div>
        </div>
        <div class="review-area">
          <div class="tran-tips color-black">回译解析</div>
          <div>
            xxxx
          </div>
        </div>
        <van-button
          class="next-question-btn"
          type="primary"
          block
          @click="nextQuestion"
          >下一题</van-button
        >
      </div>
    </div>
    <div class="ai-area" v-show="activeTab === 'ai'">
      <AIAssistant ref="aiRef" :question="question" />
    </div>
    <BottomInput
      :activeTab="activeTab"
      @sendMsg="sendMsg"
      :placeholder="activeTab === 'ai' ? '请输入你的疑问' : '请输入你的答案'"
      @activeChange="activeChange"
    ></BottomInput>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import AIAssistant from './AIAssistant.vue';
import BottomInput from './BottomInput.vue';

import { ref, nextTick, onMounted } from 'vue';
const router = useRouter();
const talkAreaRef = ref();
const aiRef = ref();
type Tquestion = {
  english_content?: string;
  chinese_content?: string;
  englishAnswer?: string;
  chineseAnswer?: string;
};
const question = ref<Tquestion>({});
const step = ref(1);
const answerTab = ref('mine');

const activeTab = ref('practice');

onMounted(() => {
  getQuestion();
});

const activeChange = (tab: string) => {
  activeTab.value = tab;
};
const getQuestion = () => {
  axios
    .post('/startSession', {
      user_id: 'wx_o1234567',
      ssid: '',
    })
    .then((res) => {
      question.value = {
        ...res.data.data,
        user_id: 'wx_o1234567',
      };
    });
};
const onClickLeft = () => {
  history.back();
};
const nextQuestion = () => {
  axios
    .post('/api/endSession', {
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

const sendMsg = (msg: string) => {
  console.log(' msg =========> ', msg);
  if (!msg) return;
  if (activeTab.value === 'practice') {
    submit(msg);
  } else if (activeTab.value === 'ai') {
    aiRef.value.outAnswer({ content: msg });
  }
};
const submit = (answer: string) => {
  if (step.value === 1) {
    question.value.chineseAnswer = answer;
    step.value = 2;
  } else {
    question.value.englishAnswer = answer;
    step.value = 3;
  }
  // activeTab.value = 'ai';
  // nextTick(() => {
  //   aiRef.value?.outAnswer &&
  //     aiRef.value.outAnswer({
  //       type: 'answer',
  //       content: '我刚刚提交了一份我的翻译结果：',
  //       ext: {
  //         ssid: question.value.ssid,
  //         question_id: question.value.question_id,
  //         type: 'translation',
  //         from: 'en',
  //         to: 'zh-CN',
  //         answer: answer,
  //       },
  //     });
  //   scrollToBottom();
  // });
};
const scrollToBottom = () => {
  talkAreaRef.value.scrollTop = talkAreaRef.value.scrollHeight;
};
</script>

<style lang="less" scoped>
.learn-page {
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(11px);
}
.nav-header {
  height: 3.4em;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2em;
  align-items: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .left {
    display: flex;
    align-items: center;
    gap: 0.8em;

    .van-icon {
      font-size: 1.4em;
      display: flex;
      align-items: center;
    }
  }
}
.ai-area {
}
.tran-tips {
  font-weight: bold;
  font-size: 18px;
  margin: 4px 0;
  background: linear-gradient(to right, #4a90e2, #9013fe);
  background-clip: text;
  color: transparent;
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 2px;
    width: 100%;
    height: 5px;
    background-color: rgba(74, 144, 226, 0.6);
    z-index: -1;
  }
}

.color-black {
  font-size: 16px;
  background: #303133;
  background-clip: text;
}

.talk-area {
  flex: 1;
  overflow-y: auto;
  // 移除固定高度
  // height: calc(100vh - 120px - 46px);
  .question-area {
    margin: 10px;
    padding: 10px;
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 8px;
    text-align: left;
    .wait-translate {
      position: relative;
      .mask {
        position: absolute;
        border-radius: 6px;
        width: 100%;
        height: 100%;
        background: rgba(115.2, 117.6, 122.4, 0.1);
        backdrop-filter: blur(10px);
        z-index: 1;
      }
      .text {
        z-index: 0;
      }
    }
  }
  .answer-item {
    margin: 10px;
    padding: 10px;
    text-align: left;
    margin: 10px 0;
    .chat-bubble {
      background-color: rgba(248, 248, 248, 0.8);
      border-radius: 4px;
      .answer-area {
        padding: 12px;
      }
      .padding-b-0 {
        padding-bottom: 0;
      }
    }
  }
}
.diagonal-block-text {
  background: linear-gradient(
    145deg,
    black 25%,
    transparent 25%,
    transparent 50%,
    black 50%,
    black 75%,
    transparent 75%
  );
  background-size: 10px 10px;
  background-clip: text;
  color: transparent;
}
.next-question-btn {
  margin: 10px;
  width: calc(100vw - 20px);
  margin: 0 auto;
}

:deep(.van-tabs) {
  flex-shrink: 0;

  .van-tabs__wrap {
    background-color: transparent;
    padding-top: 0.5em;
  }

  .van-tabs__nav {
    background-color: transparent;
  }
}

:deep(.van-tab) {
  color: #666;
  font-weight: 9000;
  font-size: 15px;

  &--active {
    color: #1989fa;
    font-weight: 700;
  }
}
.review-area {
  margin: 10px;
  padding: 10px;
  text-align: left;
  background-color: rgba(248, 248, 248, 0.8);
  border-radius: 4px;
  .line-text{
    font-size: 14px;
  }
  .line {
    height: 1px;
    background: rgb(177.3, 179.4, 183.6);
  margin: 10px 0;    
  }
}
</style>
