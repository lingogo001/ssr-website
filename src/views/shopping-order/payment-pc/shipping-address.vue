<template>
  <div class="box-adderss" >
    <el-form :model="editAddress" label-position="top" :rules="addressRules" ref="editAddress" label-width="100px" class="demo-ruleForm">
      <el-form-item label="First Name" prop="firstName">
        <el-input v-model="editAddress.firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last Name" prop="lastName">
        <el-input v-model="editAddress.lastName"></el-input>
      </el-form-item>
      <el-form-item label="Country" prop="countryId">
        <el-select v-model="editAddress.countryId" @change="selectCountry" no-data-text="No Data" placeholder="please choose" style="width: 100%;">
          <el-option v-for="item of countryList" :value="item.id" :label="item.countryName" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Notification Email" prop="notificationEmail">
        <el-input v-model="editAddress.notificationEmail" :disabled="emailLock"></el-input>
      </el-form-item>
      <el-form-item label="State/Province/Region" prop="regionId">
        <el-select v-model="editAddress.regionId" filterable no-data-text="No Data" placeholder="please choose" style="width: 100%;">
          <el-option v-for="item of regionData" :value="item.id" :label="item.regionName" :key="item.id" clearable></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="City/Town" prop="city">
        <el-input v-model="editAddress.city"></el-input>
      </el-form-item>
      <el-form-item label="Address line 1" prop="address1" style="width: 98.4%">
        <el-input v-model="editAddress.address1" ></el-input>
      </el-form-item>
      <el-form-item label="Address line 2" style="width: 98.4%">
        <el-input v-model="editAddress.address2"></el-input>
      </el-form-item>
      <el-form-item label="Zip/Post Code" prop="zipCode">
        <el-input v-model="editAddress.zipCode"></el-input>
      </el-form-item>
      <el-form-item label="Phone Number" prop="telephone">
        <el-input v-model="editAddress.telephone" ></el-input>
      </el-form-item>
    </el-form>
    <div style="width: 100%;" class="btn-add">
      <vava-button class="bg-gradient btn-cancel" v-if="isCancel" @click="cancelEdit" noActive>Cancel</vava-button>
      <vava-button class="bg-gradient btn-save" @click="saveAddress">Save</vava-button>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      defaultAddress: Object, // 回显地址对象
      isCancel: Boolean // 是否显示取消按钮
    },
    computed: {
      countryList () {
        return this.$store.state.saleCountry
      }
    },
    watch: {
      defaultAddress (val) { // 回显地址变化时 更新编辑区域地址
        this.editAddress = JSON.parse(JSON.stringify(val))
        // 移除校验结果
        if (this.$refs['editAddress'] && this.$refs['editAddress'].clearValidate) this.clearValidate()
      }
    },
    // 定义变量
    data () {
      let checkPhone = (rule, value, callback) => { // 电话号码校验函数
        if (!value) {
          return callback(new Error('Must be entered.'));
        }
        let patt1 = new RegExp(/[^a-zA-Z]+$/);
        if (!patt1.test(value)) {
          return callback(new Error('Phone format is incorrect'));
        } else {
         callback();
        }
      }
      return {
        regionData: [], // 区域数据
        editAddress: {}, // 地址编辑区域
        addressRules: { // 地址数据保存校验
          firstName: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          lastName: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          regionId: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          countryId: [{ required: true, message: 'You must enter your country .', trigger:'blur' }],
          postcode: [{ required: true, message: 'Must be entered.', trigger:'blur' }],
          city: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          zipCode: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          telephone: [{ required: true, message: 'Must be entered.', trigger: 'blur' }, { validator: checkPhone, trigger: 'blur' }],
          address1: [{ required: true, message: 'Must be entered.', trigger: 'blur' }],
          notificationEmail: [
            { required: true, message: 'Email address must be entered.', trigger: 'blur' },
            { type: 'email', message: 'Invalid email address.', trigger: ['blur', 'change'] }
          ]
        },
        emailLock: true, // 是否锁定邮箱禁止编辑
      }
    },
    mounted () {
      if (this.defaultAddress) {
        this.editAddress = JSON.parse(JSON.stringify(this.defaultAddress))
      }
      if (this.countryList.length === 0) this.selectShopCountryVo() // 如果国家列表为空则查询国家列表
      let accountName = ''
      if (typeof window !== 'undefined' && window && window.sessionStorage) {
        accountName = sessionStorage.getItem('accountName')
      }
      this.editAddress.notificationEmail = this.$route.query.email || (this.shoppingCart && this.shoppingCart.payEmail) || (this.$store.state.accountData && this.$store.state.accountData.emailAddress) || accountName || ''
    },
    // 方法
    methods: {
      selectShopCountryVo () { // 获取国家列表
        this.$store.dispatch('postFetch', {api: 'selectShopCountryVo'}).then(data => {
          this.$store.commit('setSaleCountry', data)
        }).catch(error => {
          let messageStr = error.code === 'ECONNABORTED' ? 'The system is busy. Please try to refresh it.' : error && error.message || 'The system is busy. Please try to refresh it.'
          this.$message.error(messageStr)
        })
      },
      selectCountry (val) { // 根据国家ID获取省份
        this.$store.dispatch('postByUrl', {api: 'getRegion', data: val}).then(data => {
          this.regionData = data
        }).catch(error => {
          this.$utils.showErrorMes(this, error)
        })
      },
      saveAddress () { // 编辑地址点击保存地址
        // this.$emit('newAddress', this.editAddress)
        this.$refs['editAddress'].validate((valid) => {
          if (valid) {
            this.verify()
          }
        })
      },
      verify () { // 校验城市地址邮编
        this.$store.dispatch('postFetch', {api: 'validationAddress', data: this.editAddress}).then(data => {
          this.editAddress.regionName = data.regionName
          this.editAddress.countryName = data.countryName
          this.$emit('newAddress', this.editAddress) // 校验通过
        }).catch(error => {
          this.$message(error.message) // 提示州市地址邮编不匹配提示
        })
      },
      clearValidate () { // 移除校验结果
        this.$refs['editAddress'].clearValidate()
      },
      cancelEdit () {
        this.$emit('cancelAddress')
      }
    }
  }
</script>
<style lang='less' >
  .box-adderss {
    background: #FFFFFF;
    padding: 20px;
    .el-form-item{
      width: 48%;
      margin-right: 15px;
      margin-bottom: 6px;
      display: inline-block;
      &:nth-child(2n){
        margin-right: 0px;
      }
    }
    .btn-add {
      width: 100%;
      text-align: center;
      margin-top: 20px;
      .btnWrap {
        padding: 1px;
        width: 180px;
        height: 40px;
        box-sizing: border-box;
        display: inline-block;
        border-radius: 24px;
        font-family: SFCompactDisplay-Regular;
        text-align: center;
        line-height: 36px;
        vertical-align: top;
        .btn-cancel {
          width: 100%;
          height: 38px;
          font-size: 16px;
          border-radius: 24px;
          border: 1px solid @base-color;
          color: @base-color;
          background-color: #fff;
        }
      }
      .btn-save, .btn-cancel {
        width: 180px;
        margin-left: 20px;
        border-radius: 24px;
        font-family: SFCompactDisplay-Regular;
        font-size: 16px;
        color: #FFFFFF;
        height: 40px;
        line-height: 20px;
        text-align: center;
      }
      .btn-cancel{
        color: @base-color;
      }
    }
  }
  .el-form--label-top .el-form-item__label {
    padding: 0px;
  }
</style>
