<template>
  <div class="learn-page" @touchstart="handlePageTouch">
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="onClickLeft" />
      </div>
      <div class="page-title">回译训练</div>
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
        <div class="tran-tips">
          {{ step === 1 ? '请将下面内容翻译为中文' : '请将下面内容回译为英文' }}
        </div>
        <div class="wait-translate">
          <!-- <div :class="['text', step === 2 ? 'diagonal-block-text' : '']">
            {{ question.english_content }}
          </div> -->
          <div v-if="step===1" class="text">
            {{ question.english_content}}
          </div>
           <div v-else class="text">
            {{ question.chineseAnswer}}
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
          <div class="section-title">英文对比</div>
          <div class="line-text standard-english-text">{{ question.english_content || '-' }}</div>
          <div class="line"></div>
          <div class="line-text standard-english-text">{{ question.englishAnswer || '-' }}</div>
        </div>
        <div class="review-area">
          <div class="section-title">中文对比</div>
          <div class="line-text standard-chinese-text">{{ question.chinese_content || '-' }}</div>
          <div class="line"></div>
          <div class="line-text standard-chinese-text">{{ question.chineseAnswer || '-' }}</div>
        </div>
        <div class="review-area">
          <div class="section-title">回译解析</div>
          <div class="standard-chinese-text" v-html="question.jiexi"></div>
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
    <AIAssistant ref="aiRef"  v-show="activeTab === 'ai'" :question="question" />
  </div>
  <BottomInput
    :activeTab="activeTab"
    @sendMsg="sendMsg"
    @scrollToTop="scrollToTop"
    :placeholder="activeTab === 'ai' ? '请输入你的疑问' : '请输入你的答案'"
    @activeChange="activeChange"
  ></BottomInput>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import axios from 'axios';
import { isIOS } from '@/utils/common.ts';
import AIAssistant from './AIAssistant.vue';
import BottomInput from './BottomInput.vue';
import markdownit from 'markdown-it';
const md = markdownit()

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
const aiLoading = ref(false);

const activeTab = ref('practice');

onMounted(() => {
  getQuestion();
});

const activeChange = (tab: string) => {
  activeTab.value = tab;
};
const getQuestion = () => {
  axios
    .post('/api/startSession', {
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

const getjiexiResult = () => {
  aiLoading.value = true;
  question.value.jiexi = 'AI正在解析中...';
  axios
    .post('/userMessage', {
      user_id: question.value.user_id,
      type: 'answer',
      ssid: question.value.ssid,
      "content": "我刚刚提交了一份我的翻译结果",
      ext: {
          ssid: question.value.ssid,
          question_id: question.value.question_id,
          type: 'translation',
          chinese_answer: question.value.chineseAnswer,
          english_answer: question.value.englishAnswer,
        },
    })
    .then((res) => {
      question.value.jiexi = md.render(res.data.data.content) 
    })
    .catch(() => {
      question.value.jiexi = 'AI出错了';
    })
    .finally(() => {
      aiLoading.value = false;
    });
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
    getjiexiResult()
    step.value = 3;
  }
};
const scrollToTop = () => {
  talkAreaRef.value.scrollTop = 0;
};

const handlePageTouch = (e: MouseEvent) => {
  if (!isIOS) return
  // 检查点击的目标是否是输入框或其父元素
  const target = e.target as HTMLElement;
  if (!target.closest('.bottom-box')) {
    // 获取所有输入框元素并让它们失去焦点
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => input.blur());
  }
};
</script>

<style lang="less" scoped>
.learn-page {
  height: 100vh;
  // height: calc(var(--vh, 1vh) * 100);
  padding-bottom: 170px;
  position: relative;
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
  font-weight: 800;
  font-size: 18px;
  margin: 4px 0;
  //color: #2C3E50;
  color: #2980B9;
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50%;
    height: 2px;
    background-color: #2C3E50;
    z-index: -1;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
}

.color-black {
  font-size: 16px;
  font-weight: normal;
  background: #303133;
  background-clip: text;
}

.talk-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  // flex-direction: column-reverse;
  overflow-y: auto;
  // position: absolute;
  // bottom: 170px;
  // 移除固定高度
  height: calc(100% - 170px - 3.4em);
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
        .standard-english-text();
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
  margin: 20px;
  width: calc(100vw - 40px);
  margin: 0 auto;

  // 覆盖 van-button 的默认样式
  background-color: #2980B9;  
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  height: 44px;
  line-height: 44px;
  color: white;

  // 添加半透明效果
  opacity: 0.9;
  backdrop-filter: blur(5px);

  // 点击状态
  &:active {
    opacity: 0.8;
    background-color: #2C3E50;  // 点击时颜色加深
  }
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
  margin: 20px 20px;
  padding: 10px;
  text-align: left;
  background-color: rgba(248, 248, 248, 0.5);
  border-radius: 4px;
  .line-text{
    font-size: 15px;
  }
  .line {
    height: 1px;
    background: rgba(177.3, 179.4, 183.6, 0.6);
  margin: 10px 0;    
  }
}

// 添加通用文本样式类
.standard-english-text {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", "PingFang SC", "Arial", sans-serif;
  //font-family: "Cambria", "Times New Roman", "PingFang SC", "Helvetica Neue", serif;
  font-size: 20px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  color: #333;
  padding: 12px 0;
}
.page-title {
  font-size: 16px;
  font-weight: 400;
  color: #303133;
  flex: 1;
  text-align: center;
}
.section-title {
  font-weight: 800;
  font-size: 16px;
  margin: 4px 0;
  color: #3498DB;
  display: inline-block;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50%;
    height: 2px;
    background-color: #2C3E50;
    z-index: -1;
    transition: width 0.3s;
  }
  &:hover::after {
    width: 100%;
  }
}
.standard-chinese-text {
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #333;
  padding: 12px 0;

  // 确保子元素也继承这些样式
  * {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }
}
</style>
