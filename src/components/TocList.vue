<template>
  <ul>
    <li v-for="item in tocList" :key="item.id">
      <a :href="'#' + item.id">{{ item.text }}</a>
      <TocChildren v-if="item.children.length" :children="item.children" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "TocList",
  props: {
    tocList: Array
  }
};
</script>
