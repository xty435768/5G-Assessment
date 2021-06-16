<template>
  <link href="../assets/css/iconfont/iconfont.css" rel="stylesheet">
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
      <el-carousel style="margin-left: 75px;margin-top: 30px;margin-right: 75px" type="card">
        <el-carousel-item v-for="item in images" :key="item">
          <img :src="item" @click="handleImageClick(item)"/>
        </el-carousel-item>
      </el-carousel>
      <el-tabs v-model="activeName" style="margin-left: 75px;margin-top: 20px;margin-right: 75px" type="card"
               @tab-click="handleClick">
        <el-tab-pane label="手机详情" name="detail">
          <el-descriptions :column="3" border class="margin-top" title="基本参数">
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-cpu"></i>
                CPU
              </template>
              {{ mobile_detail_form.cpu }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <span class="iconfont icon-dianchibattery141"></span>
                电池型号
              </template>
              {{ mobile_detail_form.battery }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <span class="iconfont icon-IOTtubiao_huabanfuben"></span>
                移动网络
              </template>
              {{ mobile_detail_form.net }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <span class="iconfont icon-fenbianshuai"></span>
                屏幕分辨率
              </template>
              {{ mobile_detail_form.screen_resolution }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-mobile-phone"></i>
                屏幕大小
              </template>
              {{ mobile_detail_form.screen_size }}
            </el-descriptions-item>

            <el-descriptions-item>
              <template #label>
                <i class="el-icon-camera"></i>
                前置摄像头
              </template>
              {{ mobile_detail_form.front_pixel }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-camera-solid"></i>
                后置摄像头
              </template>
              {{ mobile_detail_form.back_pixel }}
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
        <el-tab-pane label="口碑点评" name="comment">
          <el-card shadow="hover">
            <el-row :gutter="26">
              <el-col :span="4">
                <h2 style="color: #409EFF;font-size: 30pt;margin-bottom: 5px">{{ total_score * 2 }}</h2>
                <el-rate
                    v-model="total_score"
                    disabled
                    score-template="{total_score}"
                >
                </el-rate>
                <p style="margin-top: 5px"><span style="color: red; ">{{ comment_number }}</span>条评论</p>
              </el-col>
              <el-col v-for="(item,index) in sub_option_rates.sub_option_names" v-bind:key="index" :span="4">
                <el-progress :percentage="sub_option_rates.sub_option_values[index]" :stroke-width="9" :width="105"
                             type="circle">
                  <!--                  {{ sub_option_rates.sub_option_values[index] / 10 }}-->
                  <template #default="{ percentage }">
                    <span style="font-size: 14pt">{{ percentage / 10 }}</span>
                  </template>
                </el-progress>
                <p>{{ item }}</p>
              </el-col>
            </el-row>
          </el-card>
          <el-row style="margin-top: 20px">
            <el-col :span="3">
              大家都在说：
            </el-col>
            <el-col :span="21" style="text-align: left">
              <el-check-tag v-for="(item,index) in positive_comment_tag" v-bind:key="index"
                            :checked="positive_comment_choose[index]"
                            class="positive_tag" @change="onPositiveTagChange($event,index)">
                {{ item }}
              </el-check-tag>
              <p>
                <el-check-tag v-for="(item,index) in negative_comment_tag" v-bind:key="index"
                              :checked="negative_comment_choose[index]"
                              class="negative_tag" @change="onNegativeTagChange($event,index)">
                  {{ item }}
                </el-check-tag>
              </p>
            </el-col>
          </el-row>
          <div v-for="(item,index) in comment_list" v-bind:key="index">
            <el-row style="margin-top: 20px">
              <el-col :span="4" style="text-align: center">
                <el-avatar icon="el-icon-user-solid"></el-avatar>
                <p>{{ item.user_nick }}</p>
              </el-col>
              <el-col :span="20" style="text-align: left">
                <p style="line-height:30px;margin-top: 0px;margin-bottom: 5px">{{ item.content }}</p>
                <el-image v-for="url in item.img" v-bind:key="url"
                      fit="cover"
                      :src="'http://'+url"
                      style="width: 100px; height: 100px; margin-right: 5px; cursor:pointer;" @click="handleImageClick('http://'+url)"/>
                <p>
                <el-tag v-for="(tag_item,tag_index) in item.tags" v-bind:key="tag_index" style="margin-right: 5px">
                  {{ tag_item }}
                </el-tag>
                </p>
                <p class="comment_info">购买型号：{{ item.sku }}</p>
                <p class="comment_info">评论来源：{{ item.source }}</p>
                <p class="comment_info">评论时间：{{ item.rate_date }}</p>
              </el-col>
            </el-row>

          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :modal-append-to-body="false"
                 v-model="isEnlargeImage"
                 title=""
                 top="8%"
                 width="60%">
        <img :src="enlargeImage" style="width:100%;" @click="isEnlargeImage = false">
      </el-dialog>
    </div>
  </el-scrollbar>
</template>

<script>
// import DescriptionList from './Description.vue'
export default {
  name: 'Detail',
  // components: {DescriptionList},
  data() {
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
      activeName: 'detail',
      total_score: 7.5 / 2,
      sub_option_rates: {
        sub_option_names: ['性价比', '外观', '性能', '续航', '拍照'],
        sub_option_values: [70, 50, 55, 20, 90]
      },
      comment_number: 28,
      positive_comment_tag: [
        '续航出色(2)',
        '手感舒适(2)',
        '运行流畅(1)',
        '外观圆润(1)',
        '性能好(1)',
        '电池容量大(1)',
        '机身内存大(1)'],
      negative_comment_tag: [
        '续航一般(1)'
      ],
      checked: false,
      positive_comment_choose: null,
      negative_comment_choose: null,
      mobile_detail_form: {
        cpu: '海思 麒麟 990 5G',
        front_pixel: '3200万像素+800万像素',
        battery: '4000mAh',
        back_pixel: '4000万像素超感光镜头+1600万像素超广角镜头+800万像素长焦镜头',
        net: '全网通/5G版',
        screen_resolution: '2340x1080像素',
        screen_size: '6.57英寸'
      },
      comment_list: [
        {
          content: '麒麟990 5g 第一款集成5g基带的芯片，性能杠杠的。magic ui很流畅，基本没遇到明显的bug。' +
              '多屏协同，流畅度和功能完整性都很好，行业标杆。最重要的是手机颜值很高，拍照效果非常好。' +
              '非常满意的产品，也希望荣耀越来越好，重回巅峰！',
          phone_type: 'Honor_30Pro',
          rate_date: '2021-06-06 21:37:27',
          sku: '网络类型:SA\\NSA双模(5G);机身颜色:幻夜黑;套餐类型:官方标配;存储容量:8+256GB（荣耀30 Pro+）',
          source: '天猫',
          user_nick: '淡***g',
          img: [
            'img.alicdn.com/bao/uploaded/i4/O1CN01nQ1DzH1Cl0CwdPZsm_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i3/O1CN01hmiGY71Cl0D17ddjC_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i4/O1CN01d1feB71Cl0D27Pnb2_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i1/O1CN01qxLCCa1Cl0D47TzuR_!!0-rate.jpg'
          ],
          tags: [
              '性能不错','功能不错','手机不错','拍照效果好','效果好'
          ]
        },
        {
          content: '麒麟990 5g 第一款集成5g基带的芯片，性能杠杠的。magic ui很流畅，基本没遇到明显的bug。' +
              '多屏协同，流畅度和功能完整性都很好，行业标杆。最重要的是手机颜值很高，拍照效果非常好。' +
              '非常满意的产品，也希望荣耀越来越好，重回巅峰！',
          phone_type: 'Honor_30Pro',
          rate_date: '2021-06-06 21:37:27',
          sku: '网络类型:SA\\NSA双模(5G);机身颜色:幻夜黑;套餐类型:官方标配;存储容量:8+256GB（荣耀30 Pro+）',
          source: '天猫',
          user_nick: '淡***g',
          img: [
            'img.alicdn.com/bao/uploaded/i4/O1CN01nQ1DzH1Cl0CwdPZsm_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i3/O1CN01hmiGY71Cl0D17ddjC_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i4/O1CN01d1feB71Cl0D27Pnb2_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i1/O1CN01qxLCCa1Cl0D47TzuR_!!0-rate.jpg'
          ],
          tags: [
            '性能不错','功能不错','手机不错','拍照效果好','效果好'
          ]
        },
        {
          content: '麒麟990 5g 第一款集成5g基带的芯片，性能杠杠的。magic ui很流畅，基本没遇到明显的bug。' +
              '多屏协同，流畅度和功能完整性都很好，行业标杆。最重要的是手机颜值很高，拍照效果非常好。' +
              '非常满意的产品，也希望荣耀越来越好，重回巅峰！',
          phone_type: 'Honor_30Pro',
          rate_date: '2021-06-06 21:37:27',
          sku: '网络类型:SA\\NSA双模(5G);机身颜色:幻夜黑;套餐类型:官方标配;存储容量:8+256GB（荣耀30 Pro+）',
          source: '天猫',
          user_nick: '淡***g',
          img: [
            'img.alicdn.com/bao/uploaded/i4/O1CN01nQ1DzH1Cl0CwdPZsm_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i3/O1CN01hmiGY71Cl0D17ddjC_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i4/O1CN01d1feB71Cl0D27Pnb2_!!0-rate.jpg',
            'img.alicdn.com/bao/uploaded/i1/O1CN01qxLCCa1Cl0D47TzuR_!!0-rate.jpg'
          ],
          tags: [
            '性能不错','功能不错','手机不错','拍照效果好','效果好'
          ]
        }
      ]

    }
  },
  methods: {
    getParams() {
      this.brand_name = this.$route.query.brand_name
      this.type_name = this.$route.query.type_name
      console.log(this.brand_name)
      console.log(this.type_name)
    },
    handleImageClick(dir) {
      if (dir) {

        this.enlargeImage = dir
        this.isEnlargeImage = !this.isEnlargeImage
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    onNegativeTagChange(event, index) {
      console.log(index, this.negative_comment_tag[index])
      this.negative_comment_choose[index] = !this.negative_comment_choose[index]
      for (let i = 0; i < this.positive_comment_choose.length; i++)
        this.positive_comment_choose[i] = false
      for (let i = 0; i < this.negative_comment_choose.length; i++) {
        if (i === index) continue
        this.negative_comment_choose[i] = false
      }
    },
    onPositiveTagChange(event, index) {
      console.log(index, this.positive_comment_tag[index])
      this.positive_comment_choose[index] = !this.positive_comment_choose[index]
      for (let i = 0; i < this.positive_comment_choose.length; i++) {
        if (i === index) continue
        this.positive_comment_choose[i] = false
      }
      for (let i = 0; i < this.negative_comment_choose.length; i++)
        this.negative_comment_choose[i] = false
    },
  },
  created() {
    this.getParams()
    this.positive_comment_choose = Array(this.positive_comment_tag.length)
    for (let i = 0; i < this.positive_comment_choose.length; i++)
      this.positive_comment_choose[i] = false;
    this.negative_comment_choose = Array(this.negative_comment_tag.length)
    for (let i = 0; i < this.negative_comment_choose.length; i++)
      this.negative_comment_choose[i] = false;
  },
  watch() {
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

.font_red {
  color: #ff4c4c;
}

.positive_tag {
  /*background-color: rgb(217, 236, 255);*/
  margin-right: 10px;
  margin-bottom: 10px;
}
.negative_tag {
  /*background-color: rgb(76, 127, 63);*/
  margin-right: 10px;
  margin-bottom: 10px;
  :hov
}
.negative_tag:hover {
  /*background-color: #67c23a91;*/
}

.negative_tag.is-checked {
  background-color: rgba(103, 194, 58, 0.25);
  color: #67C23A;
}
.negative_tag.is-checked:hover {

}

.comment_info {
  font: 12px Microsoft YaHei;
  color: #999999;
  margin-top: 5px;
  margin-bottom: 5px
}
</style>
