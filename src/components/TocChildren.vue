<template>
  <ul>
    <li v-for="child in children" :key="child.id">
      <a :href="'#' + child.id">{{ child.text }}</a>
      <TocChildren v-if="child.children.length" :children="child.children" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "TocChildren",
  props: {
    children: Array
  }
};
</script>
