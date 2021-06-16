<template>
  <el-scrollbar>
<div>
    <el-menu
      default-active="2"
      class="navi_style"
      @open="handleOpen"
      @close="handleClose"
      >
      <el-submenu v-for="(data,keyId) in brand_list" :key="keyId" :index="keyId+''">
        <template v-slot:title>
          <span><b>{{data.brand_name}}</b></span>
        </template>
        <el-menu-item v-for="(item, key) in data.type_list" :key="key" :index="keyId.toString() + '-' + key.toString()"
          @click="$router.push({path: '/detail', query: {brand_name: data.brand_name, type_name: item}})">
          {{ item }}
        </el-menu-item>
      </el-submenu>
    </el-menu>

</div>
  </el-scrollbar>
</template>

<script>
export default {
  name: 'NaviMenu',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  data () {
    return {
      brand_list: [
        {brand_name: '小米', type_list: ['11', '11 Pro']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']},
        {brand_name: '华为', type_list: ['Mate40E', 'Mate40Pro5G']}
      ]
    }
  }
}
</script>

<style scoped>
.el-row {
  width: 200px
}
.navi_style{
  height: calc(100vh - 30px);
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
