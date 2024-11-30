<template>
  <div class="blur-background">
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <div class="right">
        <van-icon name="ellipsis" />
      </div>
    </div>
    
    <div class="review-container">
      <div class="review-sections">
        <van-cell-group inset>
          <van-cell 
            title="单词强化" 
            :is-link="false"
            @click="goToSection('word')"
            class="review-cell" 
          />
          <van-cell 
            title="语法强化" 
            :is-link="false"
            @click="goToSection('grammar')"
            class="review-cell" 
          />
          <van-cell 
            title="回译记录" 
            :is-link="false"
            @click="goToSection('history')"
            class="review-cell" 
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { Cell, CellGroup, Icon } from 'vant';

const router = useRouter();

const goToSection = (section: string) => {
  router.push(`/review/${section}`);
};

const goBack = () => {
  router.push('/');
};
</script>

<style lang='less' scoped>
.review-container {
  height: 100vh;
  padding: 16px;
  
  .review-sections {
    margin-top: 20px;

    :deep(.van-cell-group) {
      background: transparent;
      
      &::after {
        display: none;
      }
    }

    :deep(.review-cell) {
      padding: 16px;
      margin-bottom: 20px;
      font-size: 16px;
      border-radius: 8px;
      background-color: #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &::after {
        display: none;
      }

      &:last-child {
        margin-bottom: 20px;
      }
    }
  }
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
  }
  
  .right {
    display: flex;
    gap: 1.4em;
    
    .van-icon {
      font-size: 1.4em;
    }
  }
}
</style>
