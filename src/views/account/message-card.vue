<template>
  <div class="message-card">
    <li class="message-card-add" @click="editCard('add')">
      <div class="icon icon-close"></div><p>{{type===1?'ADD ADDRESS':'ADD PAYMENT METHOD'}}</p>
    </li>
    <template v-if="type===1">
      <li v-for="(item, index) of cardData" :key="index">
        <div class="address-card-content">
          <p class="card-title">{{item.firstName}} {{item.lastName}} {{item.isPrimary?'(DEFAULT)':''}}</p>
          <p>{{item.address1+item.address2}}</p>
          <p>{{`${item.city}, ${item.regionName} ${item.zipCode}`}}</p>
          <p>{{item.countryName}}</p>
          <p>{{item.telephone}}</p>
        </div>
        <p class="card-options"><span @click="editCard('edit', item)">Edit</span> | <span @click="deleteCard(item)">Delete</span><em v-if="!item.isPrimary">|<span @click="setDefalut(item)">Set as Default</span></em></p>
      </li>
    </template>
    <template v-else>
      <li>
        <div class="address-card-content">
          <p class="card-title">OLIVER JAMES (DEFAULT)</p>
          <p>305 W 50TH ST, NEW YORK, NY 10019, USA</p>
          <p>NEWYORK, NY 10019</p>
          <p>UNITED STATES</p>
          <p>+1 212-489-9808</p>
        </div>
        <p class="card-options"><span>Edit</span>|<span>Delete</span></p>
      </li>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      cardData: Array,
      type: Number
    },
    methods: {
      editCard (type, item) { // type 操作类型 'add' 添加 'edit' 编辑
        this.$emit('editCard', type, item)
      },
      deleteCard (item) {
        this.$emit('deleteCard', item)
      },
      setDefalut (item) {
        this.$emit('setDefalut', item)
      }
    }
  }
</script>
<style lang="less" scoped>
  .message-card{
    width: 100%;
    padding: 5.2vw 3.5vw;
    background: rgba(98, 68, 187, 0.2);
    display: flex;
    flex-wrap: wrap;
    li{
      position: relative;
      width: 20.8vw;
      height: 20.8vw;
      min-width: 250px;
      min-height: 250px;
      border-radius: 1.5vw;
      border: 0.1562vw solid @base-button-back;
      margin: 0 1vw;
      margin-bottom: 2vw;
      display: flex;
      flex-direction: column;
      padding: 3vw 2vw;
      justify-content: space-between;
      p{
        font-size: 0.78125vw;
        color: @base-color;
        font-family: 'avenir-next-demi';
        text-align: left;
      }
      .address-card-content{
        p.card-title{
          margin-bottom: 2vw;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      p.card-options{
        display: flex;
        align-items: center;
        text-decoration: underline;
        span{margin: 0 5px;cursor: pointer;}
      }
    }
    li.message-card-add{
      border-color: rgba(98, 68, 187, 0);
      background-image: url('data:image/png;base64,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');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      justify-content: center;
      align-items: center;
      padding-bottom: 0;
      cursor: pointer;
      .icon{
        font-size: 3.5vw;
        color: @base-button-back;
        transform: rotate(45deg);
        margin-bottom: 2vw;
      }
      p{
        font-size: 1.3vw;
        color: @base-button-back;
      }
    }
  }
  @media (max-width: 1200px) {
    .message-card{
      padding: 20px 15px;
      li{
        border-radius: 15px;
        margin-bottom: 15px;
        p{font-size: 9.5px;}
      }
      li.message-card-add{
        .icon{font-size: 40px;}
        p{font-size: 15px;}
      }
    }
  }
  @media (max-width: 840px) {
    .message-card{
      padding: 20px 15px;
      li{
        min-width: 100%;
        min-height: 120px;
        height: 120px;
        border-radius: 15px;
        margin: 0;
        margin-bottom: 15px;
        padding: 10px 15px;
        border-style: dashed;
        border-width: 1px;
        .address-card-content{
          p.card-title{margin-bottom: 5px;}
        }
        p.card-options{
          justify-content: flex-end;
        }
        p{font-size: 9.5px;}
      }
      li.message-card-add{
        height: 36px;
        min-height: 36px;
        border: 1px solid @base-button-back;
        background-image: none;
        flex-direction: row;
        padding: 0;
        line-height: 36px;
        .icon{font-size: 12px;margin-right: 8px;margin-bottom: 0;}
        p{font-size: 13px;line-height: 36px;padding-top: 3px;}
      }
    }
  }
</style>
