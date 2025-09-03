<template>
  <div class="my-container">
    <Editor></Editor>
  </div>
</template>

<script>
import Editor from "@/components/Editor.vue";
export default {
  components: {
    Editor,

  },
  name: "EditorView",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.my-container {
  width: 100%;
  background-color: #f5f6f7;
}
</style>
