<template>
  <div class="learn-page">
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="onClickLeft" />
      </div>
      <div class="title">回译训练</div>
      <div class="right">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="talk-area" ref="talkAreaRef" v-if="activeTab === 'practice'">
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
    <AIAssistant
      v-if="activeTab === 'ai'"
      ref="aiRef"
      :question="question"
    />
    <div class="bottom-box">
      <div class="tab-group">
        <div 
          :class="['tab-item', activeTab === 'practice' ? 'active' : '']" 
          @click="activeTab = 'practice'"
        >
          <span class="tab-icon">👨‍🎓</span>
          训练模式
        </div>
        <div 
          :class="['tab-item', activeTab === 'ai' ? 'active' : '']" 
          @click="activeTab = 'ai'"
        >
          <span class="tab-icon">🤖</span>
          AI指导模式
        </div>
      </div>
      <div class="input-area">
        <textarea
          v-model="inputValue" 
          class="message-input"
          placeholder="请输入你的问题"
          rows="3"
        ></textarea>
        <div class="send-btn">
          <img src="@/assets/icon/send.svg" alt="send" />
        </div>
      </div>
    </div>
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

const inputValue = ref('');
const activeTab = ref('practice');

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
const submit = () => {
  const answer = inputValue.value;
  inputValue.value = '';
  if (step.value === 1) {
    question.value.chineseAnswer = answer;
    step.value = 2;
  } else {
    question.value.englishAnswer = answer;
    step.value = 3;
  }
  activeTab.value = 'ai';
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
          answer: answer,
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
.learn-page {
  height: 100vh;
  display: flex;
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

.talk-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 4px;
  // 移除固定高度
  // height: calc(100vh - 120px - 46px);
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
  padding: 8px 16px 8px;
  margin-bottom: 20px;
  background: transparent;
  
  .tab-group {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    
    .tab-item {
      flex: 1;
      padding: 8px 16px;
      color: #666;
      cursor: pointer;
      border-radius: 16px;
      background: #f5f7fa;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: all 0.3s;
      
      .tab-icon {
        font-size: 20px;
      }
      
      &.active {
        color: #4080ff;
        background: #fff;
        font-weight: 500;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    }
  }

  .input-area {
    position: relative;
    background: #f5f7fa;
    border-radius: 12px;
    padding: 8px 16px;
    
    .message-input {
      width: 100%;
      min-height: 80px;
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      resize: none;
      padding-right: 40px;
      
      &::placeholder {
        color: #999;
      }
    }
    
    .send-btn {
      position: absolute;
      right: 16px;
      bottom: 12px;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
