<template>
  <div>
    <div class="header">
      <div>西安市流动污染监管平台</div>
      <div>
        <span>周强强</span>
        <Icon type="md-arrow-dropdown" size="25"/>
        <Icon type="md-contact" size="30" style="margin-right: 10px"/>
        <Icon type="ios-exit-outline" size="30"/>
        <span>退出</span>
      </div>
    </div>
    <nav class="slider">
      <Menu :active-name="activeName"  width="140" @on-select="clickMenuItems">
        <MenuItem name="map_index">
          <Icon type="ios-home-outline" size="30" style="margin-bottom:2px"/><br>
          <span>首页</span>
        </MenuItem>
        <MenuItem name="1-2" @mouseenter.native="enter" @mouseleave.native="leave">
          <icon :name="iconName" :w="32" :h="32" style="margin-bottom:2px"></icon><br>
          <span>智能预防</span>
        </MenuItem>
        <MenuItem name="1-3">
          <Icon type="ios-pie-outline" size="30" style="margin-bottom:2px"/><br>
          <span>数据分析</span>
        </MenuItem>
        <MenuItem name="1-4">
          <Icon type="ios-paper-outline" size="30" style="margin-bottom:2px"/><br>
          <span>原始数据</span>
        </MenuItem>
        <MenuItem name="1-5">
          <Icon type="ios-copy-outline" size="34" style="margin-bottom:2px"/><br>
          <span>工单管理</span>
        </MenuItem>
      </Menu>
    </nav>
  </div>
</template>

<script>
    export default {
      name: "slideMenu.vue",
      data () {
        return {
          isSelect: false,
          iconName: 'protect',
          activeName: ''
        }
      },
      methods:{
        enter () {
          this.iconName = 'protect_checked'
        },
        leave () {
          if (this.isSelect === false) {
            this.iconName = 'protect'
          }
        },
        getCurrentMenu () {
          let path = this.$route.path
          path = path.indexOf('/') === 0 ? path.substr(1) : path
          this.clickMenuItems(path)
          return path
        },
        clickMenuItems (key) {
          if (key === '1-2') {
            this.isSelect = true
            this.iconName = 'protect_checked'
          } else {
            this.isSelect = false
            this.iconName = 'protect'
          }
          key = key.indexOf('/') === 0 ? key : '/' + key
          this.$router.push({ path: key })
        },
      },
      created(){
        this.activeName = this.getCurrentMenu()
      }
    }
</script>

<style lang='less' scoped>
  @import "../../assets/styles/variable/variable.less";
.header{
  height: 60px;
  background:@layout-header-background;
  color: #fff;
  padding: 0 40px;
}
.header>div:first-child{
  float: left;
  font-size: 18px;
  line-height: 60px;
}
.header>div:last-child{
  float: right;
  font-size: 14px;
  line-height: 60px;
  cursor: pointer;
}
.slider{
  width: 140px;
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  background: @layout-background;
  overflow: auto;
}
</style>
