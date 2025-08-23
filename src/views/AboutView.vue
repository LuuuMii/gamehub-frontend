<template>
  <div class="about">
    <ul class="col-tree">
      <li>
        <img class="thumb" src="../assets/banner.jpg" alt="" />
        <span>算法：基础</span>
      </li>
      <li>
        <img class="thumb" src="../assets/banner.jpg" alt="" />
        <span>MySQL</span>
      </li>
      <li>
        <img class="thumb" src="../assets/banner.jpg" alt="" />
        <span>MySQL实验</span>
      </li>
      <li>
        <img class="thumb" src="../assets/banner.jpg" alt="" />
        <span>计算机操作系统</span>
      </li>
    </ul>

    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <h1>This is an about page</h1>
    <router-link to="/">go home </router-link>
    <router-link to="/children">go home </router-link>
    <router-view />
  </div>
</template>

<style scoped>
.col-tree {
  /* 可调参数 */
  --rail-x: 16px; /* 左侧竖线的位置 */
  --link-len: 28px; /* 横向连线长度（到图片左侧） */
  --row-gap: 16px; /* 条目上下间距 */
  --dash: #d9d9d9;

  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
}

/* 竖向“主干”虚线 */
.col-tree::before {
  content: "";
  position: absolute;
  left: var(--rail-x);
  top: calc(var(--row-gap) / 2); /* 让主干从第一条横线中点开始 */
  bottom: calc(var(--row-gap) / 2); /* 到最后一条横线中点结束 */
  border-left: 1px dashed var(--dash);
}

/* 每个条目 */
.col-tree > li {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: var(--row-gap) 0;
  padding-left: calc(var(--rail-x) + var(--link-len)); /* 预留横线+主干的空间 */
}

/* 横向虚线（从主干到图片左侧） */
.col-tree > li::before {
  content: "";
  position: absolute;
  left: var(--rail-x);
  top: 50%;
  width: var(--link-len);
  border-top: 1px dashed var(--dash);
  transform: translateY(-50%);
}

.thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  display: block;
}
</style>
