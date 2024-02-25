<!-- 文章详情页面 -->
<template>
  <div class="post-detail-container">
    <el-card style="margin: 8px">
      <!-- <el-image :src="postDetail.coverUrl" style="width: 300px;border-radius: 10px"
                    v-if="postDetail.coverUrl"></el-image>
                <div class="empty-cover" v-else>暂无封面</div> -->
      <div class="post-box">
        <h1 class="title">
          <span>{{ postDetail.title }}</span>
          <span class="back" @click="goBack">返回上一页</span>
        </h1>
        <div class="data-box">
          <span class="data-item">作者：{{ postDetail.author.username }}</span>
          <span class="data-item"
            >创建时间：{{ timeFormat(postDetail.create_time) }}</span
          >
          <span class="data-item">阅读量：{{ postDetail.readingCount }}</span>
          <span class="data-item">点赞量：{{ postDetail.likeCount }}</span>
          <span class="data-item">
            <span>标签：</span>
            <template v-if="postDetail.tags.length > 0">
              <span v-for="item in postDetail.tags" :key="item.id">{{
                `${item.name} / `
              }}</span>
            </template>
            <span v-else>无</span>
          </span>
        </div>
        <div class="content-box">
          {{ postDetail.content }}
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postDetail: "",
    };
  },
  created() {
    const { data: res } = this.$route.query;
    console.log(res);
    this.postDetail = res;
  },
  methods: {
    timeFormat(timeStr) {
      const date = new Date(timeStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedTime = `${year}-${month}-${day}`;
      return formattedTime;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style
  lang="less"
  src="../../assets/style/post/postDetail/index.less"
  scoped
></style>
