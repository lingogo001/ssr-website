<template>
  <div class="support-home-page">
    <img class="support-banner-img" src="/static/website-imgages/support/Support Service Banner.jpg">
    <div class="support-content">
      <div class="support-content-li" @click="routerLink('/support/warranty')"><img src="/static/website-imgages/support/Warranty Extension.jpg"><span>WARRANTY EXTENSION</span></div>
      <div class="support-content-li" @click="routerLink('/support/user-manual')"><img src="/static/website-imgages/support/User Manual.jpg"><span>USER MANUAL</span></div>
      <div class="support-content-li" @click="routerLink('/support/after-sales')"><img src="/static/website-imgages/support/After Sale.jpg"><span>AFTER-SALES</span></div>
      <div class="support-content-li" @click="routerLink('/support/influencer')"><img src="/static/website-imgages/support/Influencer.jpg"><span>INFLUENCER</span></div>
      <div class="support-content-li" @click="routerLink('/support/terms-conditions')"><img src="/static/website-imgages/support/Terms & Conditions.jpg"><span>TERMS & CONDITIONS</span></div>
      <div class="support-content-li" @click="routerLink('/support/private-policy')"><img src="/static/website-imgages/support/Private Policy.jpg"><span>PRIVATE POLICY</span></div>
    </div>
    <img @click="routerLink('/support/feedback')" class="support-footer-img" src="/static/website-imgages/support/User Feedback.jpg">
    <!-- <vava-subscribe></vava-subscribe> -->
  </div>
</template>

<script>
  export default {
    methods: {
      routerLink (path) { // 事件击穿 后续移动端单独处理
        this.$router.push(path)
      }
    }
  }
</script>
<style lang="less" scoped>
  .support-home-page{
    width: 100%;
    font-size: 0;
    .support-banner-img{
      width: 100%;
    }
    .support-content{
      width: 100%;
      padding: 9.375vw 0;
      font-size: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .support-content-li{
        position: relative;
        width: 25vw;
        margin: 1.04vw;
        cursor: pointer;
        img{width: 100%;}
        span{
          width: 100%;
          height: 100%;
          font-family: 'avenir-next-demi';
          font-size: 1.92vw;
          color: @base-font-color;
          position: absolute;
          left: 0;
          top: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(255, 255, 255, .8);
          opacity: 0;
          transition: opacity 0.3s ease-out;
          text-align: center;
          &:hover{
            opacity: 1;
          }
        }
      }
    }
    .support-footer-img{
      width: 100%;
      cursor: pointer;
    }
  }
  @media (max-width: 800px) {
    .support-home-page{
      .support-content{
        .support-content-li{
          span{
            background-color: rgba(0, 0, 0, 0.3);
            opacity: 1;
            color: #FFF;
            line-height: 1.5;
          }
        }
      }
    }
  }
</style>
