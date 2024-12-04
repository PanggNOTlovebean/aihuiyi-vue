<template>
  <div class="blur-background">
    <div class="nav-header">
      <div class="left">
        <van-icon name="arrow-left" @click="goBack" />
      </div>
      <div class="title">请选择复习项目</div>
      <div class="right">
        <van-icon name="ellipsis" />
      </div>
    </div>
    <div class="review-container">
      <div class="review-cards">
        <div class="card pink" @click="goToSection('word')">
          <div class="card-content">
            <van-icon name="bookmark-o" class="card-icon"/>
            <div class="text-content">
              <p class="tip">单词强化</p>
              <p class="second-text">Review vocabulary</p>
            </div>
          </div>
        </div>
        <div class="card blue" @click="goToSection('grammar')">
          <div class="card-content">
            <van-icon name="notes-o" class="card-icon"/>
            <div class="text-content">
              <p class="tip">语法强化</p>
              <p class="second-text">Practice grammar</p>
            </div>
          </div>
        </div>
        <div class="card green" @click="goToSection('history')">
          <div class="card-content">
            <van-icon name="clock-o" class="card-icon"/>
            <div class="text-content">
              <p class="tip">回译记录</p>
              <p class="second-text">Translation history</p>
            </div>
          </div>
        </div>
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
  
  .review-cards {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .card {
      height: 100px;
      width: 100%;
      border-radius: 10px;
      color: white;
      cursor: pointer;

      &.pink {
        background-color: #FF4B4B;
        
        .text-content {
          .tip, .second-text {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
        }
      }

      &.blue {
        background-color: #4B7BFF;
        
        .text-content {
          .tip, .second-text {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
        }
      }

      &.green {
        background-color: #dd9504;
        
        .text-content {
          .tip, .second-text {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }
        }
      }

      .card-content {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;
        gap: 16px;

        .card-icon {
          font-size: 32px;
        }

        .text-content {
          flex: 1;
          text-align: left;

          .tip {
            font-size: 1.5em;
            letter-spacing: 0.02em;
            font-weight: 700;
            margin: 0;
          }

          .second-text {
            font-size: 1em;
            opacity: 1;
            margin: 0;
          }
        }
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

.page-title {
  text-align: center;
  font-size: 1.2em;
  font-weight: 500;
  margin: 0.8em 0;
  color: #555;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.5em;
}
</style>
