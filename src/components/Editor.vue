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
          @onChange="editorChange"
        />
      </div>

      <div class="form">
        <div class="form-item flex-align">
          <span class="form-title">文章标签</span>
          <span class="key-point">*</span>
          <img class="question" src="@/assets/icon/question.svg" />
          <div
            class="choosed-sub-tag-list"
            v-for="(item, index) in choosedSubTagList"
            :key="index"
          >
            <span>{{ item.name }}</span>
            <img
              src="@/assets/icon/close_61A0DA.svg"
              @click="deleteSubTag(item)"
            />
          </div>
          <el-popover placement="bottom" trigger="click" width="560">
            <div class="tag-popover">
              <div class="tag-popover-tile">
                <span>标签</span>
              </div>
              <div class="search-tag">
                <el-autocomplete
                  class="inline-input"
                  v-model="state1"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入文字搜索,Enter键入可添加自定义标签"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                ></el-autocomplete>
              </div>
              <div class="tag-container">
                <div class="tag-sort">
                  <div
                    class="tag-title"
                    :class="{ 'tag-actice': activeTagIndex === index }"
                    v-for="(item, index) in tagList"
                    :key="index"
                    @click="chooseSupTag(index)"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div class="sub-tag-container">
                  <div class="add-tag">添加标签</div>
                  <div class="sub-tag">
                    <div
                      class="sub-tag-no-active"
                      :class="{
                        'sub-tag-active': choosedSubTagList.some(
                          (sub) => sub.id === item.id
                        ),
                      }"
                      v-for="(item, index) in tagList[activeTagIndex].subTag"
                      :key="index"
                      @click="chooseSubTag(item)"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tag-div" slot="reference">
              <img src="@/assets/icon/add.svg" alt="" />
              <span>添加文章标签</span>
            </div>
          </el-popover>
        </div>
        <div class="form-item flex">
          <div class="flex-align form-title-height">
            <span class="form-title">添加封面</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
          </div>

          <div class="upload" @click="triggerUpload">
            <img src="@/assets/icon/add_999999.svg" />
            <span>从本地上传</span>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              style="display: none"
              @change="handleFileChange"
            />
          </div>
          <div class="without-img" v-show="showImgList > 0">
            <span>暂无内容图片,请在正文中添加图片</span>
          </div>
          <div class="img-list">
            <div
              class="img-btn img-divider"
              :class="{ 'not-allow': isLeftMost }"
              @click="goLeft"
            >
              <img :src="isLeftMost ? isLeftMostIcon : noLeftMostICON" />
            </div>
            <div class="all-img">
              <div
                class="one-img"
                v-for="(item, index) in showImgList"
                :key="index"
              >
                <el-popover width="550px" trigger="hover" placement="bottom">
                  <div class="popover-img-div">
                    <img :src="item.url" alt="" />
                  </div>
                  <img :src="item.url" slot="reference" />
                </el-popover>
              </div>
            </div>

            <div
              class="img-btn"
              :class="{ 'not-allow': isRightMost }"
              @click="goRight"
            >
              <img :src="isRightMost ? isRightMostIcon : noRightMostICON" />
            </div>
          </div>
        </div>
        <div class="form-item flex">
          <div class="flex-align form-title-height">
            <span class="form-title">文章摘要</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
          </div>
          <div style="width: 630px">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="summary"
              rows="3"
              maxlength="256"
              show-word-limit
            >
            </el-input>
            <div class="AI-btn">
              <img src="@/assets/icon/magic_555666.svg" />
              <span>AI提取摘要</span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="flex-align">
            <span class="form-title">分类专栏</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <div class="tag-div">
              <img src="@/assets/icon/add.svg" alt="" />
              <span>新建分类专栏</span>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="flex-align">
            <span class="form-title">文章类型</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <el-radio v-model="type" label="1">原创</el-radio>
            <el-radio v-model="type" label="2">转载</el-radio>
            <el-radio v-model="type" label="3">翻译</el-radio>
          </div>
        </div>
        <div class="form-item">
          <div class="flex-align">
            <span class="form-title">可见范围</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <el-radio v-model="visibleRange" label="1">全部可见</el-radio>
            <el-radio v-model="visibleRange" label="2">仅我可见</el-radio>
            <el-radio v-model="visibleRange" label="3">粉丝可见</el-radio>
            <el-radio v-model="visibleRange" label="4">VIP可见</el-radio>
          </div>
        </div>
      </div>
      <div class="fixed-bottom">
        <div class="flex-align">
          <span class="word-count">共 0 字</span>
          <div class="flex-align top-or-type-btn" v-show="false">
            <span>回到顶部</span>
            <i class="el-icon-arrow-up"></i>
          </div>
          <div class="flex-align top-or-type-btn">
            <span>发文设置</span>
            <i class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="flex-align" style="margin-left: 450px">
          <div class="flex-align draft-btn">
            <span>保存草稿</span>
            <img src="@/assets/icon/arrow_down_1A1A1A.svg" />
          </div>
          <div class="scheduled-btn flex-align">
            <span>定时发布</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="publish-btn flex-align">
            <span>发布博客</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import Vue from "vue";
//import TocList from '@/components/TocList.vue'
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
      editorConfig: {
        placeholder: "请输入内容...",
        editorProps: {
          attributes: {
            style: "min-height: 600px;",
          },
        },
      },
      mode: "default", // or 'simple'

      title: "", // 绑定内容
      isLeftMost: true,
      isRightMost: false,
      isLeftMostIcon: require("@/assets/icon/left_A4A4A4.svg"),
      noLeftMostICON: require("@/assets/icon/left_202020.svg"),
      isRightMostIcon: require("@/assets/icon/right_A4A4A4.svg"),
      noRightMostICON: require("@/assets/icon/right_202020.svg"),
      imgList: [
        {
          name: "123",
          url: "https://img.17sucai.com/upload/534358/2016-06-13/ca269bfed13507fa8928f57bbff720c7.jpg?x-oss-process=style/lessen",
        },
        {
          name: "222",
          url: "https://pic.5tu.cn/uploads/allimg/2410/pic_5tu_big_6672913_670a23992dce1-thumb-650.jpg",
        },
        {
          name: "333",
          url: "https://pic.mksucai.com/00/39/79/309846d75026bef2.webp",
        },
        {
          name: "444",
          url: "https://imgs.699pic.com/images/500/465/562.jpg!list1x.v2",
        },
        {
          name: "555",
          url: "https://www.news.cn/photo/20250713/c6bc304be7174d67b02cafda133e9087/20250713c6bc304be7174d67b02cafda133e9087_20250713add9838394a14a3ea5900fd812d4227d.jpg",
        },
      ],
      currentPage: 1,
      itemsPerPage: 4,
      summary: "",
      type: "1",
      visibleRange: "1",
      restaurants: [],
      state1: "",
      tagList: [
        {
          id: 1,
          name: "主机游戏",
          subTag: [
            { id: 2, name: "PlayStation" },
            { id: 3, name: "Xbox" },
            { id: 4, name: "任天堂Switch" },
            { id: 5, name: "掌机" },
            { id: 6, name: "独占游戏" },
            { id: 7, name: "跨平台游戏" },
            { id: 8, name: "VR游戏" },
            { id: 9, name: "体感游戏" },
          ],
        },
        {
          id: 10,
          name: "PC游戏",
          subTag: [
            { id: 11, name: "Steam" },
            { id: 12, name: "Epic" },
            { id: 13, name: "战网" },
            { id: 14, name: "Origin" },
            { id: 15, name: "独立游戏" },
            { id: 16, name: "大型网游" },
            { id: 17, name: "Mod社区" },
          ],
        },
        {
          id: 18,
          name: "手机游戏",
          subTag: [
            { id: 19, name: "iOS游戏" },
            { id: 20, name: "安卓游戏" },
            { id: 21, name: "二次元游戏" },
            { id: 22, name: "卡牌游戏" },
            { id: 23, name: "塔防游戏" },
            { id: 24, name: "放置游戏" },
            { id: 25, name: "休闲小游戏" },
          ],
        },
        {
          id: 26,
          name: "动作游戏",
          subTag: [
            { id: 27, name: "格斗" },
            { id: 28, name: "射击" },
            { id: 29, name: "潜行" },
            { id: 30, name: "跑酷" },
            { id: 31, name: "开放世界" },
            { id: 32, name: "魂类" },
          ],
        },
        {
          id: 33,
          name: "角色扮演",
          subTag: [
            { id: 34, name: "日式RPG" },
            { id: 35, name: "美式RPG" },
            { id: 36, name: "开放世界RPG" },
            { id: 37, name: "策略RPG" },
            { id: 38, name: "回合制RPG" },
            { id: 39, name: "动作RPG" },
          ],
        },
        {
          id: 40,
          name: "策略游戏",
          subTag: [
            { id: 41, name: "即时战略" },
            { id: 42, name: "回合制" },
            { id: 43, name: "战争模拟" },
            { id: 44, name: "塔防" },
            { id: 45, name: "沙盒策略" },
          ],
        },
        {
          id: 46,
          name: "体育游戏",
          subTag: [
            { id: 47, name: "足球" },
            { id: 48, name: "篮球" },
            { id: 49, name: "赛车" },
            { id: 50, name: "滑雪" },
            { id: 51, name: "网球" },
            { id: 52, name: "高尔夫" },
          ],
        },
        {
          id: 53,
          name: "模拟游戏",
          subTag: [
            { id: 54, name: "模拟经营" },
            { id: 55, name: "模拟人生" },
            { id: 56, name: "农场模拟" },
            { id: 57, name: "建造模拟" },
            { id: 58, name: "飞行模拟" },
            { id: 59, name: "驾驶模拟" },
          ],
        },
        {
          id: 60,
          name: "射击游戏",
          subTag: [
            { id: 61, name: "第一人称射击" },
            { id: 62, name: "第三人称射击" },
            { id: 63, name: "战术射击" },
            { id: 64, name: "吃鸡游戏" },
            { id: 65, name: "僵尸射击" },
            { id: 66, name: "科幻射击" },
          ],
        },
        {
          id: 67,
          name: "冒险游戏",
          subTag: [
            { id: 68, name: "解谜冒险" },
            { id: 69, name: "剧情向冒险" },
            { id: 70, name: "恐怖冒险" },
            { id: 71, name: "像素冒险" },
            { id: 72, name: "探索类" },
          ],
        },
        {
          id: 73,
          name: "音乐游戏",
          subTag: [
            { id: 74, name: "节奏类" },
            { id: 75, name: "钢琴类" },
            { id: 76, name: "吉他类" },
            { id: 77, name: "舞蹈类" },
            { id: 78, name: "打击乐类" },
          ],
        },
        {
          id: 79,
          name: "格斗游戏",
          subTag: [
            { id: 80, name: "街机格斗" },
            { id: 81, name: "3D格斗" },
            { id: 82, name: "竞技场格斗" },
            { id: 83, name: "格斗大乱斗" },
          ],
        },
        {
          id: 84,
          name: "恐怖游戏",
          subTag: [
            { id: 85, name: "生存恐怖" },
            { id: 86, name: "心理恐怖" },
            { id: 87, name: "解谜恐怖" },
            { id: 88, name: "多人恐怖" },
            { id: 89, name: "像素恐怖" },
          ],
        },
        {
          id: 90,
          name: "沙盒游戏",
          subTag: [
            { id: 91, name: "Minecraft" },
            { id: 92, name: "Roblox" },
            { id: 93, name: "开放建造" },
            { id: 94, name: "模组创作" },
            { id: 95, name: "探索沙盒" },
          ],
        },
        {
          id: 96,
          name: "电子竞技",
          subTag: [
            { id: 97, name: "MOBA" },
            { id: 98, name: "FPS竞技" },
            { id: 99, name: "卡牌竞技" },
            { id: 100, name: "格斗竞技" },
            { id: 101, name: "即时战略竞技" },
          ],
        },
      ],
      activeTagIndex: 0,
      choosedSubTagList: [
        //被选择后的子标签
      ],
      tocList: [],
    };
  },
  computed: {
    // 计算总页数
    pageCount() {
      return Math.ceil(this.imgList.length / this.itemsPerPage);
    },
    // 计算当前页显示的图片
    showImgList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.imgList.slice(startIndex, startIndex + this.itemsPerPage);
    },
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      console.log("所有菜单 key：", editor.getAllMenuKeys());
    },
    editorChange() {
      this.generateToc();
      console.log(this.tocList);
    },
    generateToc() {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.html, "text/html");
      const headings = doc.querySelectorAll("h1,h2,h3,h4,h5");

      const stack = []; // 用来维护层级关系
      const toc = [];

      headings.forEach((node, index) => {
        if (!node.id) {
          node.id = `heading-${index}`;
        }

        const item = {
          id: node.id,
          text: node.textContent,
          level: Number(node.tagName.replace("H", "")),
          children: [],
        };

        // 如果没有父节点（即第一个元素 或者它是 H1）
        if (stack.length === 0 || item.level === 1) {
          toc.push(item);
          stack.length = 0; // 清空栈
          stack.push(item);
        } else {
          // 找到合适的父节点（栈顶层级必须比当前小）
          while (stack.length && stack[stack.length - 1].level >= item.level) {
            stack.pop();
          }

          if (stack.length) {
            stack[stack.length - 1].children.push(item);
          } else {
            toc.push(item);
          }

          stack.push(item);
        }
      });

      this.tocList = toc;
    },
    autoResize() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "35px"; // 重置高度
      textarea.style.height = textarea.scrollHeight + "px"; // 根据内容自适应高度
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      console.log(e);
    },
    goLeft() {
      if (this.currentPage - 1 === 1) {
        this.isLeftMost = true;
      }
      if (this.currentPage > 1) {
        this.currentPage--;
        this.isRightMost = false;
      }
    },
    goRight() {
      if (this.currentPage + 1 === this.pageCount) {
        this.isRightMost = true;
      }

      if (this.currentPage < this.pageCount) {
        this.currentPage++;
        this.isLeftMost = false;
      }
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号",
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113",
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101",
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号",
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号",
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F",
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层",
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺",
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819",
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306",
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元",
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺",
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6",
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号",
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号",
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室",
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部",
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室",
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号",
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位",
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼",
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13",
        },
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    //父标签点击事件
    chooseSupTag(index) {
      this.activeTagIndex = index;
      console.log(this.activeTagIndex);
    },
    //子标签点击时间
    chooseSubTag(item) {
      // 避免重复添加
      const exists = this.choosedSubTagList.some((sub) => sub.id === item.id);
      if (!exists && this.choosedSubTagList.length < 7) {
        this.choosedSubTagList.push(item);
      }
    },
    //删除被选中列表中的子标签
    deleteSubTag(item) {
      const index = this.choosedSubTagList.findIndex(
        (sub) => sub.id === item.id
      );
      if (index !== -1) {
        this.choosedSubTagList.splice(index, 1);
      }
    },
  },
  mounted() {
    this.autoResize();
    this.restaurants = this.loadAll();
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
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  z-index: 999;
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
.form {
  width: 816px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 24px;
  padding: 32px 24px 32px 36px;
  margin-bottom: 10px;
}
.form-item {
  margin-bottom: 30px;
  flex-wrap: wrap;
}
.flex-align {
  display: flex;
  align-items: center;
}
.flex {
  display: flex;
}
.form-title {
  color: #606266;
  font-size: 14px;
}
.form-title-height {
  height: 20px;
}
.question {
  width: 16px;
  height: 16px;
  display: block;
  object-fit: cover;
  margin-right: 12px;
}
.key-point {
  color: #e34d2c;
  font-size: 14px;
}
.no-key {
  margin-left: 2px;
  margin-right: 17px;
}
.tag-div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 5px 3px 1px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgb(232, 232, 238);
}
.tag-div:hover {
  background-color: #f4f8fc;
}
.tag-div:hover span {
  color: #3f88cd;
}
.tag-div:hover img {
  content: url("@/assets/icon/add-hover.svg");
}
.tag-div span {
  font-size: 14px;
  color: #555666;
}
.tag-popover {
  width: 100%;
  min-height: 400px;
}
.tag-popover-tile {
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e8e8ed;
  padding-bottom: 10px;
}
.tag-popover-tile span {
  font-size: 16px;
  color: #222226;
}
.search-tag {
  margin-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tag-container {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 8px;
}
.tag-sort {
  width: 120px;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
}
.tag-title {
  font-size: 16px;
  color: #777888;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  padding-left: 8px;
}
.tag-actice {
  color: #507499;
}

.sub-tag-container {
  width: 380px;
  height: 300px;
  margin-left: 18px;
  overflow-y: auto;
}
/* WebKit (Chrome、Edge、Safari) 定制 */
.sub-tag-container::-webkit-scrollbar,
.tag-sort::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
}

.sub-tag-container::-webkit-scrollbar-track,
.tag-sort::-webkit-scrollbar-track {
  background: #f0f0f0; /* 滚动条背景 */
  border-radius: 10px;
}

.sub-tag-container::-webkit-scrollbar-thumb,
.tag-sort::-webkit-scrollbar-thumb {
  background-color: #a0c4ff; /* 滑块颜色 */
  border-radius: 10px; /* 圆角 */
  border: 2px solid #f0f0f0; /* 增加边距感 */
}

.sub-tag-container::-webkit-scrollbar-thumb:hover,
.tag-sort::-webkit-scrollbar-thumb:hover {
  background-color: #6699ff; /* 鼠标悬停时更亮一些 */
}
.add-tag {
  font-size: 14px;
  color: #555666;
  margin-bottom: 4px;
}
.sub-tag {
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
}
.sub-tag-no-active {
  cursor: pointer;
  margin: 0 16px 10px 0;
  font-size: 13px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 0 8px;
  color: #507999;
  background-color: #ebf2f7;
}
.sub-tag-active {
  cursor: pointer;
  margin: 0 16px 10px 0;
  font-size: 13px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  padding: 0 8px;
  color: #fff;
  background-color: #507999;
}
.choosed-sub-tag-list {
  display: flex;
  align-items: center;
  height: 28px;
  background-color: #f4f8fc;
  border: 1px solid #80b7ff;
  border-radius: 4px;
  margin: 4px 8px 4px 0;
  padding: 0 8px;
}
.choosed-sub-tag-list span {
  font-size: 14px;
  margin-right: 6px;
  line-height: normal;
  color: #006fff;
}
.choosed-sub-tag-list img {
  cursor: pointer;
  width: 14px;
  height: 14px;
  object-fit: cover;
  display: block;
  border-radius: 50%;
}
.choosed-sub-tag-list img:hover {
  background-color: #267dcc;
  content: url("@/assets/icon/close_FFFFFF.svg");
}
.inline-input {
  width: 500px !important;
}
.upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 90px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 16px;
}
.upload img {
  width: 14px;
  height: 14px;
  object-fit: cover;
  display: block;
}
.upload span {
  font-size: 14px;
  color: #999999;
  margin-top: 12px;
}
.without-img {
  height: 90px;
  width: 480px;
  background-color: #f2f2f2;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.without-img span {
  font-size: 12px;
  color: #555666;
}
.img-list {
  height: 90px;
  width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-btn {
  height: 40px;
  width: 40px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.img-btn img {
  width: 14px;
  height: 14px;
  object-fit: cover;
  display: block;
}
.all-img {
  min-width: 344px;
  display: flex;
  align-items: center;
}
.one-img {
  width: 78px;
  height: 43px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
}
.one-img img {
  width: 78px;
  height: 43px;
  border-radius: 4px;
  object-fit: cover;
}
.img-divider {
  margin-right: 8px;
}
.not-allow {
  cursor: not-allowed;
}
.popover-img-div {
  max-width: 500px;
  max-height: 500px;
}
.popover-img-div img {
  max-width: 500px;
  max-height: 500px;
  object-fit: cover;
}
.AI-btn {
  width: 120px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  margin-top: 8px;
}
.AI-btn:hover {
  background-color: #e5e5e5;
  cursor: pointer;
}
.AI-btn img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
}
.AI-btn span {
  font-size: 14px;
  line-height: 32px;
  color: #555666;
}
.fixed-bottom {
  position: sticky; /* 固定定位 */
  bottom: 0; /* 距离视口底部0px */
  left: 0; /* 左边对齐 */
  width: 100%; /* 占满整个宽度 */
  height: 64px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.word-count {
  font-size: 16px;
  color: #1a1a1a;
  margin-right: 8px;
}
.top-or-type-btn {
  cursor: pointer;
}
.top-or-type-btn span {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: bold;
}
.draft-btn {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  height: 32px;
  padding: 0 0 0 12px;
  cursor: pointer;
  margin-right: 12px;
  transition: 0.3s;
}
.draft-btn:hover,
.scheduled-btn:hover {
  border: 1px solid #555666;
}
.draft-btn:hover span,
.scheduled-btn:hover span {
  color: #555666;
}
.draft-btn span {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
  line-height: 32px;
  font-family: "Arial";
}
.scheduled-btn {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  height: 32px;
  padding: 0 4px 0 10px;
  cursor: pointer;
  margin-right: 12px;
}
.scheduled-btn span {
  font-size: 14px;
  color: #1a1a1a;
  font-weight: 500;
  line-height: 32px;
  font-family: "Arial";
}
.publish-btn {
  background-color: #fc5531;
  border-radius: 4px;
  height: 32px;
  cursor: pointer;
  padding: 0 10px;
  transition: 0.3s;
}
.publish-btn span {
  line-height: 32px;
  color: #fff;
  font-family: "Arial";
  font-size: 14px;
}
.publish-btn:hover {
  background-color: #fc1944;
}
</style>
<style>
.w-e-toolbar {
  background-color: #f5f6f7 !important;
}
</style>