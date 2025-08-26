<template>
  <div class="sub-container">
    <div class="download" v-for="index in 15" :key="index">
      <div class="download-title">HTML5实现好看的创意T恤打印店网站源码.zip</div>
      <div class="download-data">
        <span class="one-data">发布资源 2025.08.18</span>
        <div class="split-point">·</div>
        <span class="one-data">zip</span>
      </div>
    </div>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadView",
};
</script>


<style scoped>
.sub-container {
  width: 100%;
  padding: 0 20px;
}
.download {
  width: 100%;
  cursor: pointer;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8ed;
}
.download-title {
  font-size: 18px;
  color: #222226;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.download-title:hover {
  color: #fc5531;
}
.download-data {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.one-data {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.split-point {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin: 0 6px;
}
.pagination {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
}
</style>
