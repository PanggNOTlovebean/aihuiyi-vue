<template>
  <div class="blur-background">
    <!-- 1. 顶部导航区域 -->
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="goBack" />
        <span>{{ currentIndex }}/{{ totalWords }}</span>
      </div>
      <div class="right">
        <van-icon name="star-o" />
        <van-icon name="delete-o" />
        <van-icon name="font-o" />
        <van-icon name="ellipsis" />
      </div>
    </div>

    <!-- 主要内容区域包装器 -->
    <div class="main-content">
      <!-- 2. 单词区域 -->
      <div class="word-section">
        <div class="word">{{ word }}</div>
        <div class="pronunciation">
          <van-icon name="volume" class="audio-icon" />
          <span class="phonetic">/{{ phonetic }}/</span>
        </div>
        <div class="definition">
          <span class="part-of-speech">{{ partOfSpeech }}</span>
          {{ definition }}
        </div>
      </div>

      <!-- 3. 例句部分 -->
      <div class="example-section">
        <div class="example-content">
          <div class="english">
            {{ example.en }}
            <van-icon name="volume-o" class="audio-icon" />
          </div>
          <div class="chinese">{{ example.zh }}</div>
        </div>
      </div>

      <!-- 4. 扩展部分 -->
      <div class="extension-section">
        <!-- 先显示内容区域 -->
        <div class="tab-content-wrapper">
          <div v-show="activeTab === 'collocation'" class="tab-content">
            <div class="item" v-for="(item, index) in collocations" :key="index">
              <span class="main-text">{{ item.en }}</span>
              <span class="sub-text">{{ item.zh }}</span>
            </div>
          </div>
          
          <div v-show="activeTab === 'derivation'" class="tab-content">
            <div class="item" v-for="(item, index) in derivations" :key="index">
              <span class="main-text">{{ item.word }}</span>
              <div class="sub-content">
                <span class="type">{{ item.type }}</span>
                <span class="sub-text">{{ item.meaning }}</span>
              </div>
            </div>
          </div>
          
          <div v-show="activeTab === 'synonym'" class="tab-content">
            <div class="item" v-for="(item, index) in synonyms" :key="index">
              <span class="main-text">{{ item.word }}</span>
              <div class="sub-content">
                <span class="type">{{ item.type }}</span>
                <span class="sub-text">{{ item.meaning }}</span>
              </div>
            </div>
          </div>

          <!-- tabs紧跟内容之后 -->
          <van-tabs v-model:active="activeTab">
            <van-tab title="词组搭配" name="collocation" />
            <van-tab title="派生" name="derivation" />
            <van-tab title="近义" name="synonym" />
          </van-tabs>
        </div>
      </div>
    </div>

    <!-- 5. 底部按钮 -->
    <div class="action-buttons">
      <van-button class="next-btn" type="primary" @click="nextWord">下一词</van-button>
      <van-button plain type="primary" @click="markAsKnown">记错了</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import topBack from '@/components/topBack.vue'
import { Button, Icon } from 'vant'
import { useRouter } from 'vue-router'

const word = ref('fickle')
const phonetic = ref('fɪkl')
const partOfSpeech = ref('adj.')
const definition = ref('(人)善变的 (情况)变化无常的')
const example = ref({
  en: "Well, the weather's pretty fickle, it may have changed. What's it doing out there, Lou?",
  zh: '气象非常多变，也许现在已经变了。你那里现在怎么样了，罗？',
  audio: ''
})

// 添加计数属性
const currentIndex = ref(0)
const totalWords = ref(20)

// 词组搭配数据
const collocations = ref([
  { en: 'fickle weather', zh: '多变的天气' },
  { en: 'fickle mind', zh: '善变的心思' },
])

// 派生词数据
const derivations = ref([
  { 
    word: 'fickleness', 
    type: 'n.',
    meaning: '反复无常；善变',
    example: 'The fickleness of youth is well known.'
  },
  { 
    word: 'fickly', 
    type: 'adv.',
    meaning: '反复无常地；善变地',
    example: 'He fickly changed his mind again.'
  }
])

// 近义词数据
const synonyms = ref([
  {
    word: 'changeable',
    type: 'adj.',
    meaning: '易变的，无常的',
    similarity: 90
  },
  {
    word: 'capricious',
    type: 'adj.',
    meaning: '反复无常的，任性的',
    similarity: 85
  },
])

// 添加 activeTab 的定义
const activeTab = ref('collocation')

const router = useRouter()

const goBack = () => {
  router.push('/review')
}

const nextWord = () => {
  // 获取下一个单词的逻辑
}

const markAsKnown = () => {
  // 标记为已掌握的逻辑
}
</script>

<style lang="less" scoped>
.blur-background {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  letter-spacing: 0.02em;
  text-align: left;
}

.nav-header {
  height: 4em;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2em;
  align-items: center;
  
  .left {
    display: flex;
    align-items: center;
    gap: 0.8em;
    
    .van-icon {
      font-size: 1.4em;
      display: flex;
      align-items: center;
    }
    
    span {
      font-size: 1.2em;
      display: flex;
      align-items: center;
      height: 1.4em;
      margin-bottom: 0.1em;
    }
  }
  
  .right {
    display: flex;
    gap: 1.4em;
    
    .van-icon {
      font-size: 1.4em;
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  text-align: left;
}

.word-section {
  padding: 1.25em;
  flex: 0 0 auto;
  
  .word {
    font-size: 2.4em;
    font-weight: bold;
    margin-bottom: 0.5em;
    letter-spacing: 0.04em;
    text-align: left;
  }
  
  .pronunciation {
    display: flex;
    align-items: center;
    gap: 0.5em;
    color: #666;
    margin-bottom: 1em;
    letter-spacing: 0.03em;
    text-align: left;
  }
  
  .definition {
    letter-spacing: 0.03em;
    text-align: left;
  }
}

.example-section {
  padding: 0 1em;
  margin-bottom: 1.25em;
  flex: 0 0 auto;

  .example-content {
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 8px;
    padding: 1em;
    position: relative;

    .english {
      margin-bottom: 0.5em;
      line-height: 1.6;
    }

    .audio-icon {
      position: absolute;
      right: 1em;
      bottom: 1em;
      color: #666;
    }

    .chinese {
      color: #666;
      line-height: 1.6;
    }
  }
}

.extension-section {
  padding: 0 1em;
  
  .tab-content-wrapper {
    background-color: rgba(248, 248, 248, 0.5);
    border-radius: 8px;
    flex: 1;
    overflow-y: auto;
    padding-bottom: 0;
    
    .tab-content {
      padding: 1em;
      
      .item {
        padding: 0.75em 0;
        
        .main-text {
          display: block;
          font-size: 1.1em;
          margin-bottom: 0.3em;
        }
        
        .sub-text {
          display: block;
          color: #666;
        }
        
        .type {
          display: block;
          font-size: 1.1em;
          margin-bottom: 0.3em;
        }
        
        .sub-content {
          display: flex;
          gap: 0.5em;
          color: #666;
        }
      }
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
}

.action-buttons {
  padding: 0 1em 1.5em;
  margin-top: -2em;
  display: flex;
  gap: 0.75em;
  
  .van-button {
    flex: 1;
    height: 2.75em;
    background: transparent !important;
    border: none !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-weight: 600 !important;
    position: relative;
    font-size: 1.1em !important;
    letter-spacing: 0.02em;
    
    &.next-btn {
      font-weight: 00 !important;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 3px;
    }
    
    &.next-btn::after {
      background-color: #4CAF50;
    }
    
    &:not(.next-btn)::after {
      background-color: #FF5252;
    }
  }
}
</style>