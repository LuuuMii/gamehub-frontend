<template>
  <div class="children">
    <div class="children-comment" v-for="index in 10" :key="index">
      <div class="comment-content">
        该文章对知识的洞察十分深入，对技术的解析很有价值。内容兼具专业性与可读性，为读者呈现了多元视角。期待博主后续带来更多前沿分享，继续在自己领域输出优质内容！——攻城狮7号
        该文章对知识的洞察十分深入，对技术的解析很有价值。内容兼具专业性与可读性，为读者呈现了多元视角。期待博主后续带来更多前沿分享，继续在自己领域输出优质内容！——攻城狮7号
      </div>
      <div class="comment-details">
        <span class="comment-date">2025.08.11</span>
        <div class="split-point">·</div>
        <span class="comment-title">【深度学习计算性能】03：自动并行</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostCommentView",
};
</script>


<style scoped>
.children {
  width: 100%;
  padding: 0 20px;
}
.children-comment {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8ed;
}
.comment-content {
  color: #222226;
  font-size: 16px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;

  display: -webkit-box;        
  -webkit-box-orient: vertical; 
  -webkit-line-clamp: 2;       
  overflow: hidden;             
  text-overflow: ellipsis;      
  line-height: 1.5em;      
  max-height: 3em;   
}
.comment-content:hover {
  cursor: pointer;
  color: #fc5531;
}
.comment-details {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.comment-date {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.comment-title {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.comment-title:hover {
  color: #222226;
  cursor: pointer;
}
.split-point {
  color: #555666;
  font-size: 14px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
  margin: 0 6px;
}
</style>
