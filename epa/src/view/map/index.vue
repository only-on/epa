<template>
  <div class="body">
    <Row :gutter="16" >
      <Col span="14">
      <div class="content" style="height: 60vh;margin-bottom: 2vh">

      </div>
      </Col>
      <Col span="10">
      <div class="content" style="height: 29vh;margin-bottom: 2vh">
        工单
      </div>
      <div class="content" style="height: 29vh;margin-bottom: 2vh">
        告警
      </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="7">
      <div class="content" style="height: 27vh;">
        告警
      </div>
      </Col>
      <Col span="7">
      <div class="content" style="height: 27vh;">
        油气浓度
      </div>
      </Col>
      <Col span="10">
      <div class="content" style="height: 27vh;">
        油气浓度
      </div>
      </Col>
    </Row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  @import '../../assets/styles/variable/variable.less';
</style>
