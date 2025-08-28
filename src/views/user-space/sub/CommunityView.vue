<template>
  <div class="children">
    <div class="community" v-for="index in 5" :key="index">
      <img class="community-img" src="../../../assets/tiger.png" />
      <div class="community-details">
        <div class="community-name">猫头虎AI社区</div>
        <div class="community-data">
          <span class="community-num">20553 成员</span>
          <div class="split-point">·</div>
          <span class="community-num">3449 内容</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommunityView",
};
</script>


<style scoped>
.children {
  width: 100%;
  padding: 0 20px;
}
.community {
  width: 100%;
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #e8e8ed;
}
.community-img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.community-name {
  color: #222226;
  font-size: 16px;
  font-family: "PingFang SC", "Microsoft YaHei", "Helvetica Neue", Helvetica,
    Arial, sans-serif;
}
.community-name:hover {
  color: #fc5531;
  cursor: pointer;
}

.community-details {
  margin-left: 10px;
}
.community-data {
  display: flex;
  margin-top: 18px;
}
.community-num {
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
</style>
