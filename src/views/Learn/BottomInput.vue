<template>
  <!--  -->
  <!-- :style="{height: showKeyBoard ? '160px' : '90px'}" -->
  <div class="bottom-box" >
    <div class="tab-group">
      <div
        :class="['tab-item', props.activeTab === 'practice' ? 'active' : '']"
        @click="activeChange('practice')"
      >
        <span class="tab-icon">👨‍🎓</span>
        训练模式
      </div>
      <div
        :class="['tab-item', props.activeTab === 'ai' ? 'active' : '']"
        @click="activeChange('ai')"
      >
        <span class="tab-icon">🤖</span>
        AI指导
      </div>
    </div>
    <div class="input-area">
      <textarea
        v-model="inputValue"
        class="message-input"
        @blur="onBlur"
        @focus="onFocus"
        :placeholder="props.placeholder"
        rows="3"
      ></textarea>

      <div class="send-btn" @click="sendMsg">
        <img src="@/assets/icon/send.svg" alt="send" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, onMounted, nextTick } from 'vue';
const inputValue = ref('');
const showKeyBoard = ref(false);
const props = defineProps(['activeTab', 'placeholder']);
const emits = defineEmits(['sendMsg', 'activeChange', 'scrollToTop']);

function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
let origin = getClientHeight();
const onBlur = () => {
  showKeyBoard.value = false
  // isIOS && (document.querySelector('.talk-area').style.flexDirection = `column`);
}
const onFocus = () => {
  showKeyBoard.value = true
  setTimeout(() => {
    // isIOS && (document.querySelector('.talk-area').style.flexDirection = `column-reverse`);
  }, 0);
  // emits('scrollToTop');
}
// 初始设置
onMounted(() => {
  window.addEventListener('resize', () => {
    const resize = getClientHeight();
    if (origin > resize) {
      showKeyBoard.value = false;
    } else {
      showKeyBoard.value = true;
    }
    origin = resize;
  });
});
const sendMsg = () => {
  const answer = inputValue.value;
  inputValue.value = '';
  answer && emits('sendMsg', answer);
};
const activeChange = (val) => {
  emits('activeChange', val);
};
</script>

<style lang="less" scoped>
.bottom-box {
  padding: 8px 16px;
  // height: 170px;
  // position: absolute;
  // bottom: 0;
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
    display: flex;;
    .message-input {
      width: calc(100% - 40px);
      min-height: 80px;
      position: relative;
      left: 0;
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      resize: none;
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
