<template>
  <div class="about">
    <div class="card">
  <img src="../assets/banner.jpg" alt="pic" />
</div>

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
.card {
  position: relative;
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
}

/* 背后的“立体卡片” */
.card::after {
  content: "";
  position: absolute;
  top: 8px;    /* 下移一些 */
  left: 8px;   /* 右移一些 */
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.08); /* 灰色卡片感 */
  filter: blur(2px);               /* 稍微虚化一点 */
  z-index: -1;                     /* 放到图片后面 */
}

.card img {
  display: block;
  width: 100%;
  border-radius: 12px;
}


</style>
