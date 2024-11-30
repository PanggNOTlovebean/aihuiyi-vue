<template>
  <div class="blur-background">
    <!-- 顶部用户头像区域 -->
    <div class="user-avatar">
      <van-badge :content="6">
        <img src="@/assets/icon/avatar.svg" width="40" height="40" />
      </van-badge>
    </div>

    <!-- 中间内容区域 -->
    <div class="content">
      <h1 class="title">爱回译 🎉</h1>
    </div>

    <!-- 按钮区域 -->
    <div class="button-group">
      <div class="action-button" @click="goLearn">
        <div class="button-content">
          <span>Learn </span>
          <span class="number">317</span>
        </div>
      </div>
      <div class="action-button" @click="goReview">
        <div class="button-content">
          <span>Review</span>
          <span class="number">233</span>
        </div>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <div class="bottom-nav">
      <van-icon name="award" size="24" />
      <van-icon name="notes-o" size="24" />
      <van-icon name="chart-trending-o" size="24" />
    </div>
  </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const onClickLeft = () => {
  history.back();
}
const goLearn = () => {
  router.push({name: 'learn'})
};
const goReview = () => {
  router.push({name: 'review'})
};
</script>

<style lang='less' scoped>
.user-avatar {
  position: absolute;
  top: 20px;
  left: 20px;
  
  background: rgba(0, 0, 0, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  padding: 8px;
  backdrop-filter: blur(8px);
  
  img {
    border-radius: 50%;
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30vh;
}

.title {
  color: #333;
  font-size: 36px;
  margin-bottom: 40px;
  font-weight: 600;
}

.button-group {
  position: fixed;
  bottom: 100px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  padding: 0 20px;
}

.action-button {
  flex: 1;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  padding: 20px 30px;
  border-radius: 12px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: white;
  font-size: 18px;
}

.number {
  color: #C18B61;
  font-size: 20px;
  font-weight: 500;
  // text-shadow: 0 1px 2px rgba(0, 0, 0,);
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 20px 40px;
  
  .van-icon {
    font-size: 32px;
    color: white;
  }
}

.button-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;

  span:first-child {
    color: #333;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
