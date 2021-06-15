<template>
  <el-scrollbar>
    <div style="height: 400px">
      <h2>
        {{ brand_name }}  {{ type_name }}
      </h2>
      <p>
        description
      </p>
      <!--  <el-main class="el-main" v-if="idIsValid">-->
      <!--    <div style=" margin-top: 30px;">-->
      <!--      <div style="margin-left: 200px; float: left;">-->
      <!--        <div class="col-left" @click="handleEnlarge(itemMsg.cover)">-->
      <!--          <img :src="itemMsg.cover" class="img-title" style="width: 300px;" />-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="col-main">-->
      <!--        <div class="div-msg" style="width:300px">-->
      <!--          商品名：<span style="color: #d6524a;">{{ itemMsg.name }}</span>-->
      <!--        </div>-->
      <!--        <div class="div-msg" style="width:300px">-->
      <!--          价格：<span style="color: #ff4400;font-size:26px">{{ itemMsg.price }}</span>-->
      <!--        </div>-->
      <!--        <div class="div-msg" style="width:300px">发布者：{{ itemMsg.stuName }}</div>-->
      <!--        <div class="div-msg" style="width:300px">联系方式（QQ号）：{{ itemMsg.qq }}</div>-->

      <!--        <div class=" div-msg">-->
      <!--          <el-button type="primary" style="width: 150px;height: 50px;" @click="addToCart">添加到购物车</el-button>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </el-main>-->
      <el-carousel style="margin-left: 75px;margin-top: 30px">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item" @click="handleImageClick(item)"/>
        </el-carousel-item>
      </el-carousel>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card" style="margin-left: 75px;margin-top: 20px">
        <el-tab-pane label="手机详情" name="detail">
          dd
        </el-tab-pane>
        <el-tab-pane label="口碑点评" name="comment">
          口碑点评
        </el-tab-pane>
      </el-tabs>
      <el-dialog :modal-append-to-body="false"
                 v-model:visible="isEnlargeImage"
                 title=""
                 top="8%"
                 width="60%">
        <img :src="enlargeImage" style="width:100%;" @click="isEnlargeImage = false">
      </el-dialog>
      <div v-for="item in 10" :key="item">
        <h3>
          {{ brand_name }}
        </h3>
        <h3>
          {{ type_name }}
        </h3>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
// import DescriptionList from './Description.vue'
export default {
  name: 'Detail',
  // components: {DescriptionList},
  data () {
    return {
      brand_name: 'null',
      type_name: 'null',
      isEnlargeImage: false,
      enlargeImage: '',
      images: [
        'https://2f.zol-img.com.cn/product/211/493/ceHQd41yKzC4Q.jpg',
        'https://2c.zol-img.com.cn/product/211/496/cekkkwJUA9yQ.jpg',
        'https://2d.zol-img.com.cn/product/211/497/cesXrDk51ajA.jpg'
      ],
      activeName: 'detail'

    }
  },
  methods: {
    getParams () {
      this.brand_name = this.$route.query.brand_name
      this.type_name = this.$route.query.type_name
      console.log(this.brand_name)
      console.log(this.type_name)
    },
    handleImageClick (dir) {
      if (dir) {
        this.enlargeImage = dir
        this.isEnlargeImage = !this.isEnlargeImage
      }
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {
    this.getParams()
  },
  watch () {
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 700px;
  margin: 0;
}

img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
