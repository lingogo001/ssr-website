<template>
  <div class="page-footer">
    <div class="footer-pc">
      <div class="page-footer-left">
        <div class="left-footer-column">
          <h5>PRODUCTS</h5>
          <li v-for="(item, index) of categoryList" :key="index" @click="routerLink('/c/' + item.id)">{{item.categoryName | characterCase}}</li>
        </div>
        <div class="left-footer-column">
          <h5>SUPPORT</h5>
          <li @click="routerLink('/support/warranty')">Warranty</li>
          <li @click="routerLink('/support/user-manual')">User Manual</li>
          <li @click="routerLink('/support/influeucer')">Influencer</li>
          <li @click="routerLink('/support/after-sales')">After-Sales</li>
          <li @click="routerLink('/support/terms-conditions')">Terms & Conditions</li>
          <li @click="routerLink('/support/private-policy')">Privacy Policy</li>
          <li @click="routerLink('/support/refund-exchange')">Refund & Exchange</li>
        </div>
        <div class="left-footer-column">
          <h5>OTHERS</h5>
          <li @click="routerLink('/about.html')">About Us</li>
          <li @click="routerLink('/support/intellectual-property-rights')">Intellectual Property Rights</li>
          <!-- <li>Subscribe</li> -->
        </div>
        <div class="left-footer-column">
          <h5>COMMUNITY</h5>
          <li @click="routerLink('/blog')">Blog</li>
        </div>
      </div>
      <div class="footer-conter-line"></div>
      <div class="page-footer-right">
        <h5>SUBSCRIBE</h5>
        <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" @click="enterEmail" v-model="subscribeParam.sendToEmail" maxlength="200"></vava-email-input>
        <h5 class="footer-right-media-h5">SOCIAL MEDIA</h5>
        <div class="footer-right-media">
          <i @click="openMedia('https://www.facebook.com/letsvava')" class="icon icon-facebook"></i>
          <i @click="openMedia('https://twitter.com/letsvava')" class="icon icon-twitter"></i>
          <i @click="openMedia('https://www.instagram.com/letsvava')" class="icon icon-instagram"></i>
          <i @click="openMedia('https://www.youtube.com/channel/UCQHsAs7QINSKNqOS5DtrcXQ')" class="icon icon-youtube"></i>
        </div>
      </div>
    </div>
    <div class="footer-phone">
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">PRODUCTS</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li v-for="(item, index) of categoryList" :key="index" @click="routerLink('/c/' + item.id)">{{item.categoryName | characterCase}}</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SUPPORT</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/support/warranty')">Warranty</li>
        <li @click="routerLink('/support/user-manual')">User Manual</li>
        <li @click="routerLink('/support/influeucer')">Influencer</li>
        <li @click="routerLink('/support/after-sales')">After-Sales</li>
        <li @click="routerLink('/support/terms-conditions')">Terms & Conditions</li>
        <li @click="routerLink('/support/private-policy')">Privacy Policy</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">OTHERS</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/about.html')">About Us</li>
        <li @click="routerLink('/support/intellectual-property-rights')">Intellectual Property Rights</li>
        <!-- <li>Subscribe</li> -->
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">COMMUNITY</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li @click="routerLink('/blog')">Blog</li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SUBSCRIBE</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li>
          <vava-email-input class="subscribe-input" placeholder="Enter your e-mail" @click="enterEmail" v-model="subscribeParam.sendToEmail" maxlength="200"></vava-email-input>
        </li>
      </vava-collapse-item>
      <vava-collapse-item>
        <span slot="titleContent" class="footer-collapse-title">SOCIAL MEDIA</span>
        <span slot="rightIcon" class="icon icon-right-slide"></span>
        <li class="phone-media-icon">
          <i @click="openMedia('https://www.facebook.com/letsvava')" class="icon icon-facebook"></i>
          <i @click="openMedia('https://twitter.com/letsvava')" class="icon icon-twitter"></i>
          <i @click="openMedia('https://www.instagram.com/letsvava')" class="icon icon-instagram"></i>
          <i @click="openMedia('https://www.youtube.com/channel/UCQHsAs7QINSKNqOS5DtrcXQ')" class="icon icon-youtube"></i>
        </li>
      </vava-collapse-item>
    </div>
    <div class="desc-card-img"><img src="/static/website-imgages/support//card-img.png" alt=""></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        subscribeParam: {
          sendToEmail: '',
          type: 3,
          sourceCode: this.$route.meta.sourceCode || 'SUB_OTHER_SOURCE'
        }
      }
    },
    computed: {
      categoryList () {
        return this.$store.state.categoryList
      }
    },
    methods: {
      enterEmail () {
        if (!this.$utils.trim(this.subscribeParam.sendToEmail)) {
          this.$utils.message('Please enter your Email address.')
          return
        }
        if (!this.$utils.validateEmail(this.subscribeParam.sendToEmail)) {
          this.$utils.message('This email address is incorrect.')
          return
        }
        this.$store.dispatch('emailSubscribe', this.subscribeParam).then(data => {
          this.$utils.message('Subscribe Success.')
          this.subscribeParam.sendToEmail = ''
        }).catch(error => {
          this.$utils.message(error.message)
        })
      },
      routerLink (path) {
        this.$router.push(path)
      },
      openMedia (path) {
        window.open(path)
      }
    }
  }
</script>
<style lang='less' scoped>
  .page-footer .footer-phone{ display: none; }
  .page-footer .footer-pc{
    position: relative;
    width: 100vw;
    background-color: @base-back-color;
    display: flex;
    padding-top: 3.5%;
    .page-footer-left{
      height: 100%;
      width: 61.5%;
      display: flex;
      justify-content: space-around;
      padding: 0 6%;
      .left-footer-column{
        h5{font-size: 0.99vw; color: #FFF;margin-bottom: 0.5vw;}
        li{
          font-size: 0.885vw;
          color: #e2e2e2cc;
          line-height: 2.187vw;
          cursor: pointer;
        }
        li:hover{text-decoration: underline;}
      }
    }
    .footer-conter-line{
      height: 12.6vw;
      width: 0.1vw;
      background-image: linear-gradient(to right , #9590ac, #9691ad);
    }
    .page-footer-right{
      width: 38.4%;
      padding-left: 7.2%;
      h5{font-size: 0.99vw; color: #FFF;margin-bottom: 1.56vw;}
      .footer-right-media-h5{margin: 2.34vw 0 1.25vw 0;}
      .subscribe-input{width: 20.31vw;height: 2.91vw;font-size: 1.04vw;}
      .footer-right-media{
        display: flex;
        flex-wrap: nowrap;
        i{font-size: 1.5vw;color: #FFF;margin: 0 1vw;cursor: pointer;color: #FFF;}
        i.icon-facebook{margin-left: -0.1vw;}
        i:hover{color: @base-button-back;}
      }
    }
  }
  .page-footer .desc-card-img{
      padding: 0.52vw 9%;
      background-color: #2E1F5C;
      height: 30px;
      img{
        height: 30px;
      }
  }
  @media (max-width: 1660px) {.page-footer .desc-card-img{padding: 10px 8%;}}
  @media (max-width: 800px) {.page-footer .desc-card-img{padding: 0 20px 20px 20px;}}
  @media (max-width: 1617px) {
    .page-footer .footer-pc{
      .footer-conter-line{width: 1px;}
      .page-footer-right{
        h5{margin-bottom: 25px;}
        .footer-right-media-h5{margin: 35px 0 20px 0;}
        .subscribe-input{width: 325px;height: 45px;font-size: 17px;}
        .footer-right-media i{font-size: 25px;}
      }
    }
  }
  @media (max-width: 1450px) {
    .page-footer .footer-pc{
      .page-footer-left{
        .left-footer-column{
          h5{font-size: 14.3px;margin-bottom: 12px;}
          li{font-size: 13px;line-height: 31px;}
        }
      }
      .page-footer-right{
        h5{font-size: 14.3px;margin-bottom: 25px;}
      }
    }
  }
  @media (max-width: 1200px) {
    .page-footer .footer-pc{
      height: 265px;
      .footer-conter-line{height: 180px;}
      .page-footer-right{
        padding-left: 4.5%;
        .subscribe-input{width: 280px;height: 18%;font-size: 16px;}
        h5{margin-bottom: 20px;}
        .footer-right-media-h5{margin: 35px 0 24px 0;}
        .footer-right-media{i{font-size: 23px;}}
      }
    }
  }
  @media (max-width: 920px) {
    .page-footer .footer-pc{
      height: auto;
      flex-direction: column-reverse;
      .page-footer-left{
        width: 100%;
        padding: 8% 3% 5% 3%;
      }
      .footer-conter-line{display: none;}
      .page-footer-right{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        .subscribe-input{width: 300px;height: 45px;font-size: 16px;}
        .footer-right-media{i{font-size: 26px;margin: 0 1.5vw;}}
      }
    }
  }
  @media (max-width: 800px) {
    .page-footer .footer-pc{ display: none; }
    .page-footer .footer-phone{
      display: block;
    	position: relative;
    	width: 100%;
    	background-color: @base-back-color;
      padding: 20px 20px 0 20px;
      .footer-collapse-title{
        margin-left: 20px;
        font-size: 15px;
      }
      .subscribe-input{
        width: 100%;
        min-width: 100%;
        height: 45px;
        margin-top: 9px!important;
        margin-bottom: 20px!important;
      }
      .phone-media-icon{
        margin-top: -3px!important;
        padding-top: 5px;
        i{font-size: 28px;margin-right: 12%;color: #FFF;}
      }
    }
  }
</style>