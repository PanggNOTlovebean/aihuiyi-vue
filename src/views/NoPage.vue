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
    <div class="content">
      <i class="iconfont icon-construction"></i>
      
      <h2>功能开发中...</h2>
      <br>
      <p>该功能没来得及开发，敬请期待！！！</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style lang="less" scoped>
.under-construction {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0;
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

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: 20px;

  i {
    font-size: 48px;
    color: #909399;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 32px;
    margin-bottom: 12px;
    color: #333;
    letter-spacing: 0.02em;
    font-weight: 700;
  }

  p {
    font-size: 20px;
    color: #ff0000;
    opacity: 0.8;
    text-align: center;
  }
}
</style> 