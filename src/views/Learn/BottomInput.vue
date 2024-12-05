<template>
  <!--  -->
  <div class="bottom-box">
    <div class="tab-group" v-if="show">
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
        @blur="
          () => {
            show = true;
          }
        "
        @focus="
          () => {
            show = false;
          }
        "
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
import { ref, defineProps, defineEmits, onMounted } from 'vue';
const inputValue = ref('');
const show = ref(true);
const props = defineProps(['activeTab', 'placeholder']);
const emits = defineEmits(['sendMsg', 'activeChange']);

function getClientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}

let origin = getClientHeight();

onMounted(() => {
  window.addEventListener('resize', () => {
    const resize = getClientHeight();
    if (origin > resize) {
      show.value = false;
    } else {
      show.value = true;
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
  // todo 影响布局
  padding: 8px 16px 8px;
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
