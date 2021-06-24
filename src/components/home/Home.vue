<template>
<div style="height: auto">
  <el-row style="margin-left:100px;margin-right: 100px">
    <el-col :span="4">
      <navi-menu/>
    </el-col>
    <el-col :span="20">
      <router-view v-slot="{ Component }" >
        <keep-alive>
          <component :is="Component" v-bind:key="new Date().getTime()"/>
        </keep-alive>
      </router-view>
    </el-col>
  </el-row>
</div>
</template>

<script>
import NaviMenu from './NaviMenu'
export default {
  name: 'Home',
  components: {NaviMenu}
}
</script>

<style scoped>

</style>
