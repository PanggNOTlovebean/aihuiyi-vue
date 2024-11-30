<template>
  <div class="blur-background">
    <!-- 顶部导航区域 -->
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="goBack" />
        <span>{{ currentIndex }}/{{ totalQuestions }}</span>
      </div>
      <div class="right">
        <van-icon name="star-o" />
        <van-icon name="delete-o" />
        <van-icon name="font-o" />
        <van-icon name="ellipsis" />
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 题干区域 -->
      <div class="question-section">
        <div class="question-text">{{ question }}</div>
        <div class="hint-text">先思考答案再选择，想不起来「看答案」</div>
      </div>

      <!-- 选项区域 -->
      <div class="options-section">
        <div 
          v-for="(option, index) in options" 
          :key="index"
          class="option-item"
          :class="{
            'selected': selectedOption.includes(index),
            'correct': index === correctAnswer && isCorrect,
            'incorrect': selectedOption.includes(index) && index !== correctAnswer
          }"
          @click="selectOption(index)"
        >
          <div class="option-content">
            <div class="part-of-speech">
              {{ option.type }}
              <span class="result-icon" v-if="selectedOption.includes(index) || (index === correctAnswer && isCorrect)">
                <img 
                  v-if="index === correctAnswer" 
                  src="@/assets/icon/right.svg" 
                  alt="正确"
                />
                <img 
                  v-if="selectedOption.includes(index) && index !== correctAnswer" 
                  src="@/assets/icon/wrong.svg" 
                  alt="错误"
                />
              </span>
            </div>
            <div class="definition">{{ option.content }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div 
      class="check-answer"
      @click="handleCheckAnswer"
    >
      <span>{{ isCorrect ? '下一题' : '看答案' }}</span>
      <div class="indicator"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentIndex = ref(0)
const totalQuestions = ref(20)
const selectedOption = ref<number[]>([])
const correctAnswer = ref(0)
const isCorrect = ref(false)

const question = ref('The teacher insisted _____ the homework on time.')
const options = ref([
  { type: 'adj.', content: '脆弱的；易碎的' },
  { type: 'vi.', content: '发出啪啪声；失败；草草收场' },
  { type: 'vi.', content: '不停摆弄；拉小提琴' },
  { type: 'adj.', content: '(人)善变的；(情况)变化无常的' }
])

const goBack = () => {
  router.push('/review')
}

const selectOption = (index: number) => {
  selectedOption.value.push(index)
  if (index === correctAnswer.value) {
    isCorrect.value = true
  }
}

const nextQuestion = () => {
  if (currentIndex.value < totalQuestions.value) {
    currentIndex.value++
    selectedOption.value = []
    isCorrect.value = false
  }
}

const handleCheckAnswer = () => {
  if (selectedOption.value.length > 0) {
    // 如果已经回答，点击进入下一题
    nextQuestion()
  } else {
    // 如果未回答，直接显示正确答案
    isCorrect.value = true
    selectedOption.value = [correctAnswer.value]
  }
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

.question-section {
  padding: 2em 1.25em;
  text-align: left;
  
  .question-text {
    font-size: 2em;
    font-weight: 500;
    margin-bottom: 1em;
    color: #000;
    text-align: left;
  }
  
  .hint-text {
    font-size: 0.9em;
    color: #333;
    text-align: left;
  }
}

.options-section {
  padding: 0 1em;
  
  .option-item {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    margin-bottom: 1em;
    padding: 1em;
    backdrop-filter: blur(10px);
    text-align: left;
    transition: all 0.3s ease;
    
    &.selected {
      background: rgba(255, 255, 255, 0.2);
    }
    
    &.correct {
      background: rgba(40, 167, 69, 0.15);  // 更深的绿色背景
      border: 1px solid rgba(40, 167, 69, 0.4);
    }
    
    &.incorrect {
      background: rgba(220, 53, 69, 0.15);  // 更深的红色背景
      border: 1px solid rgba(220, 53, 69, 0.4);
    }
    
    .option-content {
      .part-of-speech {
        color: #333;
        font-size: 0.9em;
        margin-bottom: 0.5em;
        display: flex;
        align-items: center;
        gap: 0.5em;

        .result-icon {
          display: inline-flex;
          align-items: center;
          
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
      
      .definition {
        color: #000;
        font-size: 1em;
        font-weight: 500;
      }
    }
  }
}

.check-answer {
  position: fixed;
  bottom: 2em;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  text-align: center;
  font-weight: 500;
  
  span {
    font-size: 1.2em;
    letter-spacing: 0.05em;
  }
  
  .indicator {
    width: 2em;
    height: 2px;
    background: #E07052;
    margin: 0.5em auto 0;
  }
}

// 复用 Word 组件的导航样式
.nav-header {
  height: 4em;
  display: flex;
  justify-content: space-between;
  padding: 0 1.2em;
  align-items: center;
  color: #000;
  
  .left, .right {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  
  .van-icon {
    font-size: 1.4em;
  }
}
</style>
