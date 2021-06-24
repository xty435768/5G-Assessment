<template>
  <link href="../assets/css/iconfont/iconfont.css" rel="stylesheet">
  <el-scrollbar>
    <div style="height: 400px">
      <h2>
        {{ brand_name }}  {{ type_name }}
      </h2>
      <p>
        {{ description }}
      </p>
      <el-carousel ref="nop" v-loading="images_loading"
                   indicator-position="outside" style="margin-left: 150px;margin-top: 30px;margin-right: 150px"
                   type="card" @change="onSlideChange($event)">
        <el-carousel-item v-for="item in images" :key="item" :label="item.color">
          <img :src="item.url" style="cursor: pointer;" @click="handleImageClick(item.url)"/>
        </el-carousel-item>
      </el-carousel>
      <el-tabs v-model="activeName" style="margin-left: 75px;margin-top: 20px;margin-right: 75px" type="card"
               @tab-click="handleClick">
        <el-tab-pane v-loading="detail_loading" label="手机详情" name="detail">
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
          <p style="font-size: 16px;font-weight: 700;text-align: left">
            型号报价
          </p>
          <el-table :data="priceData">
            <el-table-column label="型号" prop="storage"></el-table-column>
            <el-table-column label="价格 (元)" prop="price"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="口碑点评" name="comment">
          <div v-if="comment_number !== 0">
          <el-card shadow="hover">
            <el-row :gutter="26">
              <el-col :span="4">
                <h2 style="color: #409EFF;font-size: 30pt;margin-bottom: 5px">{{ total_score.toFixed(1) * 2 }}</h2>
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
                             type="circle" :status="(sub_option_rates.sub_option_values[index]<pos_neg_bound*10)?'success':''">
                  <!--                  {{ sub_option_rates.sub_option_values[index] / 10 }}-->
                  <template #default="{ percentage }">
                    <span style="font-size: 14pt">{{ (percentage / 10).toFixed(1) }}</span>
                  </template>
                </el-progress>
                <p>{{ item }}</p>
              </el-col>
            </el-row>
          </el-card>
            <div v-loading="comment_loading">
            <el-row style="margin-top: 20px">
              <el-col :span="3">
                大家都在说：
              </el-col>
              <el-col :span="21" style="text-align: left">
                <el-check-tag v-for="(item,index) in positive_comment_tag" v-bind:key="index"
                              :checked="positive_comment_choose[index]"
                              class="positive_tag" @change="onPositiveTagChange($event,index)">
                  {{ item.prop + item.adj + ' ('  + item.prior + ')' }}
                </el-check-tag>
                <p>
                  <el-check-tag v-for="(item,index) in negative_comment_tag" v-bind:key="index"
                                :checked="negative_comment_choose[index]"
                                class="negative_tag" @change="onNegativeTagChange($event,index)">
                    {{ item.prop + item.adj + ' ('  + item.prior + ')' }}
                  </el-check-tag>
                </p>
              </el-col>
            </el-row>
              <p style="text-align: right">
                <el-switch v-model="current_is_sort" active-text="按时间排序" @change="onSortStatusChange($event)">
                </el-switch>
              </p>
            <div v-for="(item,index) in comment_list" v-bind:key="index">
              <el-row style="margin-top: 20px">
                <el-col :span="4" style="text-align: center">
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                  <p>{{ item.user_nick }}</p>
                </el-col>
                <el-col :span="20" style="text-align: left">
                  <p style="line-height:30px;margin-top: 0px;margin-bottom: 5px">{{ item.content }}</p>
                  <el-image v-for="url in item.img" v-bind:key="url"
                            :src="url"
                            fit="cover"
                            style="width: 100px; height: 100px; margin-right: 5px; cursor:pointer;"
                            @click="handleImageClick(url)"/>
                  <p>
                    <el-tag v-for="(tag_item,tag_index) in item.tags" v-bind:key="tag_index" style="margin-right: 5px"
                            :type="tag_item.sentiment===0?'success':(tag_item.sentiment===1?'info':'')">
                      {{ tag_item.text }}
                    </el-tag>
                  </p>
                  <p class="comment_info">购买型号：{{ item.sku }}</p>
                  <p class="comment_info">评论来源：{{ item.source }}</p>
                  <p class="comment_info">评论时间：{{ item.rate_date }}</p>
                </el-col>
              </el-row>
            </div>

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :currentPage="pagination_config.currentPage"
                :page-sizes="pagination_config.pageSizes"
                :page-size="pagination_config.pageSize"
                :total="current_comment_number"
                layout="sizes, prev, pager, next"
            style="margin-top: 20px">
            </el-pagination>
            </div>
          </div>
          <div v-else>
            <el-empty description="评论是空的"></el-empty>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-dialog :modal-append-to-body="false"
                 v-model="isEnlargeImage"
                 title=""
                 top="8%"
                 width="50%">
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
      description: '',
      images: [],
      priceData: [],
      images_loading: true,
      detail_loading: true,
      comment_loading: true,
      pagination_config: {
        currentPage: 1,
        pageSizes: [10,15,20],
        pageSize: 10
      },
      activeName: 'detail',
      total_score: 7.5 / 2,
      sub_option_rates: {
        sub_option_names: [],
        sub_option_values: []
      },
      current_selected_tag: null,
      current_is_sort: false,
      current_selected_tag_sentiment: null,
      comment_number: -1,
      current_comment_number: -1,
      positive_comment_tag: [],
      negative_comment_tag: [],
      pos_neg_bound: 8,
      checked: false,
      positive_comment_choose: null,
      negative_comment_choose: null,
      mobile_detail_form: {},
      comment_list: [],
    }
  },
  methods: {
    onSortStatusChange(event){
      this.loadComment(this.current_is_sort,this.current_selected_tag,this.current_selected_tag_sentiment)
    },
    handleSizeChange(val) {
      this.pagination_config.pageSize = val
      this.pagination_config.currentPage = 1
      this.loadComment(this.current_is_sort,this.current_selected_tag,this.current_selected_tag_sentiment)
    },
    handleCurrentChange(val) {
      this.pagination_config.currentPage = val
      this.loadComment(this.current_is_sort,this.current_selected_tag,this.current_selected_tag_sentiment)
    },
    loadComment(isSort=false, tag_prop=null, tag_sentiment=null){
      this.comment_loading = true
      var request_url = ''
      if (tag_prop === null) {
        request_url = '/comment/get_comments'
        if (this.current_comment_number === -1){
          this.$axios.post('/comment/count_by_name',
              {name: this.brand_name + '_' + this.type_name}).then((response) => {
            this.current_comment_number = parseInt(response.data)
          })
        }
      }
      else{
        request_url = '/comment/get_comments_by_prop'
      }
      this.$axios.post(request_url,{
        name: this.brand_name + '_' + this.type_name,
        show_count: this.pagination_config.pageSize,
        current_page: this.pagination_config.currentPage - 1,
        sort_by_time: isSort,
        prop: tag_prop,
        sentiment: tag_sentiment
      }).then((response)=>{
        this.comment_list = []
        var result = eval(response.data);
        for (const dataKey in result) {
          var img_list = []
          var tag_list = []

          this.comment_list.push({
            content: result[dataKey].content,
            phone_type: result[dataKey].phoneType,
            rate_date: result[dataKey].rateDate,
            sku: result[dataKey].sku,
            source: result[dataKey].source,
            user_nick: result[dataKey].userNick,
            // img: img_list,
            // tags: tag_list
            img: [],
            tags: []
          })

          for (const picturesKey in result[dataKey].pictures) {
            this.comment_list[this.comment_list.length - 1].img.push("https://"+result[dataKey].pictures[picturesKey].url)
          }
          for (const evaluationsKey in result[dataKey].evaluations) {
            this.comment_list[this.comment_list.length - 1].tags.push({
              text: result[dataKey].evaluations[evaluationsKey].prop + result[dataKey].evaluations[evaluationsKey].adj,
              sentiment: result[dataKey].evaluations[evaluationsKey].sentiment
            })
          }
        }
      }).finally(()=>{
        console.log('done!')
        this.comment_loading = false
      })

    },
    getParams() {
      this.brand_name = this.$route.query.brand_name
      this.type_name = this.$route.query.type_name
    },
    handleImageClick(dir) {
      if (dir) {

        this.enlargeImage = dir
        this.isEnlargeImage = !this.isEnlargeImage
      }
    },
    handleClick(tab, event) {
      if (tab.props.label === '口碑点评') {
        this.$axios.post('/comment/count_by_name',
            {name: this.brand_name + '_' + this.type_name}).then((response) => {
          this.comment_number = parseInt(response.data)
        })
        this.loadComment(this.current_is_sort,this.current_selected_tag,this.current_selected_tag_sentiment)
      }
    },
    onNegativeTagChange(event, index) {
      //console.log(index, this.negative_comment_tag[index])
      this.pagination_config.currentPage = 1
      this.negative_comment_choose[index] = !this.negative_comment_choose[index]
      for (let i = 0; i < this.positive_comment_choose.length; i++)
        this.positive_comment_choose[i] = false
      for (let i = 0; i < this.negative_comment_choose.length; i++) {
        if (i === index) continue
        this.negative_comment_choose[i] = false
      }
      this.doFilterComment()
    },
    onPositiveTagChange(event, index) {
      //console.log(index, this.positive_comment_tag[index])
      this.pagination_config.currentPage = 1
      this.positive_comment_choose[index] = !this.positive_comment_choose[index]
      for (let i = 0; i < this.positive_comment_choose.length; i++) {
        if (i === index) continue
        this.positive_comment_choose[i] = false
      }
      for (let i = 0; i < this.negative_comment_choose.length; i++)
        this.negative_comment_choose[i] = false
      this.doFilterComment()
    },
    doFilterComment(){
      var prop = null
      var com_num = -1
      var sentiment = -1
      for (const negativeCommentChooseKey in this.negative_comment_choose) {
        if (this.negative_comment_choose[negativeCommentChooseKey]){
          prop = this.negative_comment_tag[negativeCommentChooseKey].prop
          com_num = this.negative_comment_tag[negativeCommentChooseKey].prior
          sentiment = this.negative_comment_tag[negativeCommentChooseKey].sentiment
          break
        }
      }
      if (prop === null){
        for (const positiveCommentChooseKey in this.positive_comment_choose) {
          if (this.positive_comment_choose[positiveCommentChooseKey]) {
            prop = this.positive_comment_tag[positiveCommentChooseKey].prop
            com_num = this.positive_comment_tag[positiveCommentChooseKey].prior
            sentiment = this.positive_comment_tag[positiveCommentChooseKey].sentiment
            break
          }
        }
      }
      if (prop === null){
        this.current_comment_number = this.comment_number
      }else{
        this.current_comment_number = com_num
      }
      this.current_selected_tag = prop
      this.current_selected_tag_sentiment = (sentiment > this.pos_neg_bound?2:0);
      this.loadComment(this.current_is_sort,prop,this.current_selected_tag_sentiment)
    },
    onSlideChange(event) {
      // console.log('slide changed!',this.images[event])
      return event
    },
    loadDetail() {
      this.$axios.post('/overview/get_detail', {name: this.brand_name + '_' + this.type_name}).then((response => {
        var res_data = eval(response.data)
        this.mobile_detail_form.battery = res_data.battery
        this.mobile_detail_form.back_pixel = res_data.backPixel
        this.mobile_detail_form.front_pixel = res_data.frontPixel
        this.mobile_detail_form.screen_size = res_data.screenSize
        this.mobile_detail_form.screen_resolution = res_data.screenResolution
        this.mobile_detail_form.cpu = res_data.cpu
        this.mobile_detail_form.net = res_data.net
        this.description = res_data.description
        this.tags = res_data.tags
        this.images = []
        for (const phonePicturesKey in res_data.phonePictures) {
          this.images.push({
            url: res_data.phonePictures[phonePicturesKey].url,
            color: res_data.phonePictures[phonePicturesKey].color
          })
        }
        this.$refs.nop.next()
        this.images_loading = false
        for (const storagesKey in res_data.storages) {
          this.priceData.push({
            price: res_data.storages[storagesKey].price,
            storage: res_data.storages[storagesKey].storage
          })
        }
        this.negative_comment_tag = []
        this.positive_comment_tag = []
        for (const tagsKey in res_data.tags) {
          if (res_data.tags[tagsKey].sentiment > this.pos_neg_bound){
            this.positive_comment_tag.push({
              adj: res_data.tags[tagsKey].adj,
              prior: res_data.tags[tagsKey].prior,
              prop: res_data.tags[tagsKey].prop,
              sentiment: res_data.tags[tagsKey].sentiment
            })
          }
          else{
            this.negative_comment_tag.push({
              adj: res_data.tags[tagsKey].adj,
              prior: res_data.tags[tagsKey].prior,
              prop: res_data.tags[tagsKey].prop,
              sentiment: res_data.tags[tagsKey].sentiment
            })
          }
        }
        this.initializeTagStatus()
        this.calculateTotalScore(res_data.tags)
        this.detail_loading = false
        console.log(res_data)
      }))
    },
    calculateTotalScore(tags){
      var sum = 0
      for (const tagKey in tags) {
        sum += tags[tagKey].sentiment
        console.log('tags',tags[tagKey].sentiment,sum,tags.length)
      }
      this.total_score = sum / tags.length / 2
      this.sub_option_rates.sub_option_values = []
      this.sub_option_rates.sub_option_names = []
      for (let i = 0; i < tags.length / 2; i++){
        this.sub_option_rates.sub_option_values.push((tags[i].sentiment * 10).toFixed(1))
        this.sub_option_rates.sub_option_names.push(tags[i].prop)
      }
    },
    initializeTagStatus(){
      this.positive_comment_choose = Array(this.positive_comment_tag.length)
      for (let i = 0; i < this.positive_comment_choose.length; i++)
        this.positive_comment_choose[i] = false;
      this.negative_comment_choose = Array(this.negative_comment_tag.length)
      for (let i = 0; i < this.negative_comment_choose.length; i++)
        this.negative_comment_choose[i] = false;
    }
  },
  created() {
    this.getParams()
    this.loadDetail()

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
