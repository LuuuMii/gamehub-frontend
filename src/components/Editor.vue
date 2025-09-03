<template>
  <div>
    <div style="border: 1px solid #ccc">
      <div class="toolbar-div">
        <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      </div>

      <div class="editor-div">
        <div class="textarea-div">
          <textarea
            v-model="title"
            maxlength="100"
            class="plain-textarea"
            placeholder="请输入内容…"
            @input="autoResize"
            ref="textarea"
          ></textarea>
          <div class="title-limit">{{ title.length }}/100</div>
        </div>
        <Editor
          style="min-height: 600px; overflow-y: hidden"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>

      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  placeholder="选择时间"
                  v-model="ruleForm.date2"
                  style="width: 100%"
                ></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="即时配送" prop="delivery">
            <el-switch v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="活动性质" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default Vue.extend({
  name: "EditorComponent",
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: [
          "redo",
          "undo",
          "|",
          "headerSelect",
          "bold",
          "underline",
          "color",
          "bgColor",
          {
            key: "group-more-more",
            title: "更多",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555666"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>`,
            menuKeys: ["italic", "through", "sub", "sup"],
          },
          "|",
          {
            key: "group-more-list",
            title: "对齐",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555666"><path d="M680-40v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v353q-18-11-38-18t-42-11v-324H200v560h280q0 21 3 41t10 39H200Zm120-160q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 160h240v-80H440v80Zm0-160h240v-80H440v80Zm0 320h54q8-23 20-43t28-37H440v80Z"/></svg>`,
            menuKeys: ["bulletedList", "numberedList"],
          },
          "insertTable",
          "code",
          "clearStyle",
          "|",
          "fontSize",
          "fontFamily",
          {
            key: "group-more-align",
            title: "对齐",
            iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555666"><path d="M120-120v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Zm0-160v-80h720v80H120Z"/></svg>`,
            menuKeys: [
              "justifyLeft",
              "justifyRight",
              "justifyCenter",
              "justifyJustify",
            ],
          },
          "indent",
          "delIndent",
          "lineHeight",
          "|",
          "insertImage",
          "divider",
          "emotion",
          "insertLink",
          "codeBlock",
          "blockquote",
          "uploadImage",
        ],
      },
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'

      title: "", // 绑定内容
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      console.log("所有菜单 key：", editor.getAllMenuKeys());
    },
    autoResize() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "35px"; // 重置高度
      textarea.style.height = textarea.scrollHeight + "px"; // 根据内容自适应高度
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  mounted() {
    this.autoResize();
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
});
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>  
<style scoped>
.toolbar-div {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
}
.editor-div {
  width: 816px;
  margin: 0 auto;
  background-color: #fff;
  padding: 32px 64px 0;
  margin-top: 24px;
  border-radius: 10px;

}
.textarea-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e8e8ed;
  padding: 0 0 4px;
}
.title-limit {
  font-size: 12px;
}
.plain-textarea {
  all: unset;
  width: 600px;

  line-height: 32px;
  font-size: 23px;
  font-weight: 600;
  padding: 0 0 4px;

  white-space: pre-wrap; /* 保留空格并换行 */
  word-break: break-word; /* 必要时换行 */
  overflow: hidden; /* 隐藏滚动条 */

  resize: none; /* 禁止拖拽改变大小 */
}
.form{
  width: 816px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 24px;
  padding: 32px 24px 32px;
}
</style>
<style>
.w-e-toolbar {
  background-color: #f5f6f7 !important;
}
</style>