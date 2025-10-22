<template>
  <div>
    <div class="ccccccc" style="border: 1px solid #ccc">
      <!-- 编辑工具栏 -->
      <div class="toolbar-div">
        <Toolbar :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
      </div>

      <!-- 编辑区域 -->
      <div class="editor-div">
        <!-- 草稿编辑box -->
        <div class="draft-box" v-show="!articleId && isShowDraft && latestDraft">
          <div class="draft-type-box">草稿</div>
          <div class="draft-title-box">
            {{ latestDraft?.title || '<<待定标题>>' }}
          </div>
          <div class="continue-draft-btn" @click="continueWrtieDraft">继续编辑</div>
          <div class="more-draft-btn">更多草稿</div>
          <img
            @click="closeDraftBoxBtnHandler"
            class="close-draft-box-icon"
            src="@/assets/icon/closeBt.png"
            alt=""
          />
        </div>
        <div class="textarea-div" ref="titleRef">
          <textarea
            v-model="title"
            maxlength="100"
            class="plain-textarea"
            placeholder="请输入文章标题（5~100个字）"
            @input="autoResize"
            ref="textarea"
          ></textarea>
          <div class="title-limit" v-if="title.length >= 5">
            {{ title.length }}/100
          </div>
          <div class="title-limit" v-if="title.length < 5">
            还需输入{{ 5 - title.length }}个字
          </div>
        </div>
        <Editor
          ref="contentRef"
          style="min-height: 600px; "
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
          @onChange="editorChange"
        />
      </div>

      <!-- 表单 文章的一些属性 -->
      <div class="form">
        <!-- 所属类别 -->
        <div class="form-item flex" ref="categoryRef">
          <div class="flex-align form-title-height">
            <span class="form-title">所属类别</span>
            <span class="key-point">*</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
          </div>
          <div
            class="article-category-selected-box"
            v-if="articleCategoryName !== null && articleCategoryName !== ''"
          >
            {{ articleCategoryName }}
          </div>
          <el-popover
            ref="categoryPopoverRef"
            placement="bottom"
            trigger="click"
            width="560"
            @show="openCategoryPopover"
          >
            <div class="category-box">
              <div class="category-top-box">文章分类</div>
              <div class="category-middle-box">
                <div class="category-type">首字母分类</div>
                <div
                  class="category-select"
                  :class="{
                    'category-selected': activeArcleCategoryIndex === index,
                  }"
                  v-for="(item, index) in letterList"
                  :key="index"
                  @click="categoryType(item, index)"
                >
                  {{ item }}
                </div>
              </div>
              <div class="divider-line"></div>
              <div class="category-bottom-box">
                <div
                  class="category-name"
                  @click="selectCategory(item)"
                  v-for="(item, index) in showArticleCategoryList"
                  :key="index"
                >
                  {{ item.name }}
                </div>
              </div>
            </div>
            <div class="tag-div" slot="reference">
              <img src="@/assets/icon/add.svg" alt="" />
              <span>选择文章类别</span>
            </div>
          </el-popover>
        </div>
        <!-- 添加文章标签 -->
        <div class="form-item flex-align" ref="tagNames">
          <span class="form-title">文章标签</span>
          <span class="key-point">*</span>
          <img class="question no-key" src="@/assets/icon/question.svg" />
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
          <el-popover
            ref="tagPopover"
            placement="bottom"
            trigger="click"
            width="560"
            @show="tagPopoverShow"
          >
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
                  @keyup.enter.native="handleEnter"
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
                      v-for="(item, index) in (tagList[activeTagIndex] && tagList[activeTagIndex].articleTagList) || []" 
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
        <!-- 添加封面 -->
        <div class="form-item flex">
          <div class="flex-align form-title-height">
            <span class="form-title">添加封面</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
          </div>

          <div
            class="upload"
            v-if="coverImgUrl === '' || coverImgUrl === null"
            @click="triggerUpload"
          >
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
          <!-- 有封面图的样式 -->
          <div
            v-if="coverImgUrl !== '' && coverImgUrl !== null"
            class="cover-img-box"
          >
            <img class="cover-img" :src="coverImgUrl" />
            <img
              class="delete-cover-img-btn"
              src="@/assets/icon/close_btn_FFF.svg"
              @click="deleteCoverImg"
            />
          </div>
          <!-- 裁剪弹窗 -->
          <div v-if="showCropper" class="cropper-box">
            <div class="cropper-top">
              <span>图片编辑</span>
              <img
                src="@/assets/icon/closeBt.png"
                @click="closeCropper"
                alt="关闭"
              />
            </div>
            <div class="cropper-middle">
              <div class="cropper-component-box">
                <vue-cropper
                  ref="cropper"
                  :img="previewUrl"
                  :output-size="1"
                  :output-type="'png'"
                  :fixed-box="true"
                  :auto-crop="true"
                  @real-time="updatePreview"
                />
              </div>
              <div class="preview-box">
                <div class="preview-img-box">
                  <img :src="croppedPreview" alt="" />
                </div>
                <div class="preview-words">封面图预览</div>
              </div>
            </div>
            <div class="img-size-btns">
              <div class="img-size-btn" @click="zoomIn">
                <img src="@/assets/icon/add_999999.svg" />
              </div>
              <div class="img-size-btn" @click="zoomOut">
                <img src="@/assets/icon/minus_999999.svg" />
              </div>
            </div>
            <div class="cropper-btns-box">
              <div class="upload-cropper-img-btn" @click="confirmCrop">
                确认上传
              </div>
            </div>
          </div>

          <div class="without-img" v-if="previewImgList.length <= 0">
            <span>暂无内容图片,请在正文中添加图片</span>
          </div>
          <div class="img-list" v-if="previewImgList.length > 0">
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
        <!-- 文章摘要 -->
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
        <!-- 分类专栏 -->
        <div class="form-item">
          <div class="flex-align flex-wrap">
            <span class="form-title">分类专栏</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <div
              class="column-choosed-box"
              v-for="(item, index) in choosedColumnList"
              :key="index"
            >
              <div class="column-choosed-name">{{ item.name }}</div>
              <div class="close-column-box-btn" @click="deleteColumn(item)">
                <img
                  class="column-btn-hover"
                  src="@/assets/icon/close_btn_FFF.svg"
                  alt=""
                />
                <img
                  class="column-btn-base"
                  src="@/assets/icon/close_61A0DA.svg"
                  alt=""
                />
              </div>
            </div>
            <!-- 添加分类专栏 -->
            <div class="add-column-box" v-if="isAddingColumnName">
              <input
                type="text"
                maxlength="50"
                v-model="newColunnName"
                ref="columnInputRef"
                @input="autoResizeColumnInput"
                @blur="ColumnInputFinish"
              />
              <div class="close-column-box-btn">
                <img
                  class="column-btn-hover"
                  src="@/assets/icon/close_btn_FFF.svg"
                  alt=""
                />
                <img
                  class="column-btn-base"
                  src="@/assets/icon/close_61A0DA.svg"
                  alt=""
                />
              </div>
            </div>
            <el-popover
              trigger="click"
              ref="columnPopover"
              placement="bottom"
              width="650"
            >
              <div>
                <div class="column-popover-top">
                  <div class="column-popover-top-left">最多选择3个分类专栏</div>
                  <div class="column-popover-top-right">
                    <img src="@/assets/icon/closeBt.png" />
                  </div>
                </div>
                <div class="vetical-divider"></div>
                <div class="column-box">
                  <div
                    class="one-column-div"
                    v-for="(item, index) in columnList"
                    :key="index"
                    @click="chooseColumnHandler(item)"
                  >
                    <div class="column-choose-btns">
                      <div
                        class="unchoosed-column-btn"
                        v-if="!item.isSelected"
                      ></div>
                      <div class="choosed-column-btn" v-if="item.isSelected">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#fff"
                        >
                          <path
                            d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="column-name">{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div
                class="tag-div"
                @click="addColumnHandler"
                v-show="choosedColumnList.length < 3"
                slot="reference"
              >
                <img src="@/assets/icon/add.svg" alt="" />
                <span>新建分类专栏</span>
              </div>
            </el-popover>
          </div>
        </div>
        <!-- 文章类型 -->
        <div class="form-item">
          <div class="flex-align">
            <span class="form-title">文章类型</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <el-radio v-model="type" label="0">原创</el-radio>
            <el-radio v-model="type" label="1">转载</el-radio>
            <el-radio v-model="type" label="2">翻译</el-radio>
          </div>
        </div>
        <!-- 可见范围 -->
        <div class="form-item">
          <div class="flex-align">
            <span class="form-title">可见范围</span>
            <img class="question no-key" src="@/assets/icon/question.svg" />
            <el-radio v-model="visibleRange" label="0">全部可见</el-radio>
            <el-radio v-model="visibleRange" label="1">仅我可见</el-radio>
            <el-radio v-model="visibleRange" label="2">粉丝可见</el-radio>
            <el-radio v-model="visibleRange" label="3">VIP可见</el-radio>
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
          <div class="flex-align draft-btn" @click="saveDraftHandler" v-show="isShowSaveDraftBtn">
            <span>保存草稿</span>
            <img src="@/assets/icon/arrow_down_1A1A1A.svg" />
          </div>
          <div
            class="scheduled-btn flex-align"
            @click="openScheduledDialog"
            v-show="isShowScheduledBtn"
          >
            <span>定时发布</span>
            <i class="el-icon-arrow-right"></i>
          </div>
          <div class="publish-btn flex-align" @click="publishArticleHandler">
            <span>发布博客</span>
          </div>
        </div>
      </div>
      <div class="scheduled-show-box" :class="{ active: isShowScheduledDialog }">
        <div class="scheduled-show-top">
          <div>定时发布</div>
          <img @click="closeScheduledDialog" src="@/assets/icon/closeBt.png" >
        </div>
        <div class="scheduled-show-body">
          <div class="scheduled-tips">请选择当前时间后4 小时 至 7天 进行定时发布</div>
          <div class="flex" style="margin-top: 16px;">
            <el-date-picker
              v-model="articlePushlishDate"
              style="width: 155px;"
              size="small"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              :picker-options="datePickerOptions"
              @change="handleDateChange">
            </el-date-picker>
            <el-time-select
              v-model="articlePushlishTime"
              style="width: 155px;margin-left: 10px"
              size="small"
              width="100"
              :disabled="articlePushlishDate===null"
              :picker-options="timePickerOptions"
              placeholder="选择时间"
              >
            </el-time-select>

          </div>
          <div class="scheduled-time-tips" v-show="articlePushlishDate!==null && articlePushlishTime!==null">本文将于北京时间 <span>{{ articlePushlishDate }} {{ articlePushlishTime }}</span> 发布</div>
        </div>
        <div class="scheduled-show-bottom">
          <div class="scheduled-cancel-btn" @click="closeScheduledDialog"><span>取&nbsp;消</span></div>
          <div class="scheduled-publish-btn" @click="scheduledPublishHandler"><span>定时发布</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
//import TocList from '@/components/TocList.vue'
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { eventBus } from "@/mitt/eventBus";
import {
  uploadCoverImg,
  uploadArticleImg,
  uploadImgByUrl,
  deleteFiles,
} from "@/api/oss.js";
import { getAllArticleCategory } from "@/api/articleCategory.js";
import { getAllUserColumnsByUsername } from "@/api/userColumn.js";
import { getAllArticleTag, getArticleTagByES } from "@/api/articleTag.js";
import {
  addDraftArticle,
  updateDraftArticle,
  getArticleById,
  publishArticle,
  getAllDraftByUsername,
  scheduledReleaseArticle
} from "@/api/article.js";
import { Message } from "element-ui";
import Pinyin from "tiny-pinyin";

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
        autoFocus: false,
        scroll: false,
        editorProps: {
          attributes: {
            style: "min-height: 600px;",
          },
        },
        MENU_CONF: {
          uploadImage: {
            customUpload: async (file, insertFn) => {
              if (!file.type.startsWith("image/")) {
                Message.error("请选择图片文件!");
                return;
              }
              const formData = new FormData();
              formData.append("file", file);
              try {
                const res = await uploadArticleImg(formData);
                if (res.code === 200) {
                  const alt = "";
                  insertFn(res.data, alt, res.data);
                }
              } catch (err) {
                Message.error("上传异常!");
              }
            },
          },
          insertImage: {
            // 自定义插入逻辑
            onInsertedImage(imageNode) {
              imageNode;
            },
            checkImage(src) {
              if (!src) {
                return;
              }
              if (src.indexOf("http") !== 0) {
                Message.error("图片网址必须以 http/https 开头");
                return "图片网址必须以 http/https 开头";
              }
              return true;
            },
            parseImageSrc: async (src) => {
              if (
                src.startsWith("https://cmc-blog.oss-cn-hangzhou.aliyuncs.com")
              ) {
                return src;
              }
              if (src.indexOf("http") !== 0) {
                return `http://${src}`;
              }
              try {
                const imageDto = {
                  name: "sbzd",
                  url: src,
                };
                const res = await uploadImgByUrl(imageDto);

                if (res.code === 200) {
                  return res.data;
                } else {
                  Message.error("上传失败!");
                  return src;
                }
              } catch (err) {
                Message.error("上传异常");
                return src;
              }
            },
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
      imgList: [],
      currentPage: 1,
      itemsPerPage: 4,
      summary: "",
      type: "0",
      visibleRange: "0",
      restaurants: [],
      state1: "",
      tagList: [],
      activeTagIndex: 0,
      choosedSubTagList: [
        //被选择后的子标签
      ],
      tocList: [],
      articleId: null,
      draftId: null,
      isShowDraft: true,
      showCropper: false,
      croppedPreview: "",
      previewUrl: "",
      coverImgUrl: "",
      previewImgList: [],
      letterList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      articleCategoryList: [],
      showArticleCategoryList: [],
      activeArcleCategoryIndex: null,
      articleCategoryName: "",
      judgePopoverList: [],
      newColunnName: "",
      isAddingColumnName: false,
      choosedColumnList: [],
      columnList: [],
      isSavingDraftFlag:false,
      isPublishArticleFlag:false,
      latestDraft:null,
      isShowScheduledDialog:false,
      articlePushlishDate:null,
      articlePushlishTime:null,
      timePickerOptions: {
        start: '00:00',
        step: '00:15',
        end: '23:45'
      },
      datePickerOptions: {
        disabledDate(time) {
          const today = new Date();
          const sevenDaysLater = new Date();
          sevenDaysLater.setDate(today.getDate() + 7);
          // 禁用今天之前的日期 或 超出7天的日期
          return time.getTime() < today.setHours(0, 0, 0, 0) ||
                 time.getTime() > sevenDaysLater.setHours(23, 59, 59, 999);
        }
      },
      isShowSaveDraftBtn:true,
      isShowScheduledBtn:true,
    };
  },
  created() {
    this.articleId = this.$route.params.articleId;
    if (this.articleId) {
      //获取文章内容
      getArticleById(this.articleId).then((res) => {
        // 判断是是否作者是否是同一人
        if(res.code !== 200){
          this.$router.push("/");
          return;
        }
        if (res.data.createBy === this.$store.state.user.username) {
          // 填充数据
          this.title = res.data.title;
          this.html = res.data.content;
          this.articleCategoryName = res.data.category;
          this.choosedSubTagList = JSON.parse(res.data.tags);
          this.coverImgUrl = res.data.coverImg;
          this.summary = res.data.summary;
          this.choosedColumnList = JSON.parse(res.data.columns);
          this.type = res.data.type;
          this.visibleRange = res.data.visibleRange;

          //查看文章状态 如果是 已经发布过的 则没有保存草稿和 定时发布按钮
          if(res.data.status==="0"){
            this.isShowSaveDraftBtn = false;
            this.isShowScheduledBtn = false;
          }

        } else {
          // 跳转到
          this.$router.push("/");
          return;
        }
      });
    }else{
      // 没有 articleId  新建页面
      // 查询 用户最近的草稿
      getAllDraftByUsername(this.$store.state.user.username).then((res)=> {
        if(res.data[0]){
          this.latestDraft = res.data[0];
          console.log(this.latestDraft)
        }
      })
    }
    this.initData();

    eventBus.on("closeScheduledDialog", () => {
      this.isShowScheduledDialog = false;
    });

  },
  mounted() {
    this.$nextTick(() => {
      this.autoResize();
      this.autoResizeColumnInput();

      //预加载图片
      const preloadImg = new Image();
      preloadImg.src = require("@/assets/icon/add-hover.svg");

    })
    
    this.restaurants = this.loadAll();
    
    
    
  },
  computed: {
    // 计算总页数
    pageCount() {
      return Math.ceil(this.imgList.length / this.itemsPerPage);
    },
    // 计算当前页显示的图片
    showImgList() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.showPreviewImgList.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    },
    // 展示的图片
    showPreviewImgList() {
      const seen = new Set();
      return this.previewImgList.filter((item) => {
        if (seen.has(item.url)) {
          return false;
        }
        seen.add(item.url);
        return true;
      });
    },
  },
  methods: {
    //重置数据
    initData() {
      //获取文章类型
      getAllArticleCategory().then((res) => {
        this.articleCategoryList = res.data;
        this.articleCategoryList.forEach((item) => {
          if (item.name && item.name.length > 0) {
            const firstChar = item.name[0];

            if (/^[a-zA-Z]$/.test(firstChar)) {
              // 英文字母直接大写
              item.letter = firstChar.toUpperCase();
            } else if (
              Pinyin.isSupported() &&
              Pinyin.convertToPinyin(firstChar).length > 0
            ) {
              // 中文转拼音首字母
              const py = Pinyin.convertToPinyin(firstChar);
              item.letter = py[0].toUpperCase();
            } else {
              item.letter = "#";
            }
          } else {
            item.letter = "#";
          }
        });
        this.showArticleCategoryList = this.articleCategoryList;
      });

      //获取文章标签
      getAllArticleTag().then((res) => {
        this.tagList = res.data;
      });

      //获取用户的专栏
      const username = this.$store.state.user.username;
      if (username !== null && username !== "") {
        getAllUserColumnsByUsername(username).then((res) => {
          this.columnList = res.data;
        });
      }
    },
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    editorChange() {
      this.generateToc();
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
      const file = e.target.files[0];
      if (!file) return;

      // 1. 判断是否为图片
      if (!file.type.startsWith("image/")) {
        alert("请选择图片文件！");
        return;
      }

      // 2. 检查图片尺寸
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 300 || height < 200) {
          this.$message.error(
            `图片尺寸太小，至少需要 300x200px，当前是 ${width}x${height}px`
          );
          return;
        }

        // 尺寸合格，设置预览图
        this.previewUrl = img.src;
        this.openCropper();
        this.croppedPreview = "";
      };
    },
    //打开Cropper
    openCropper() {
      this.showCropper = true;
      //打开遮罩层
      eventBus.emit("openMask");
    },
    // 关闭弹窗
    closeCropper() {
      this.showCropper = false;
      this.previewUrl = "";
      this.croppedPreview = "";
      eventBus.emit("closeMask");
    },
    // 实时裁剪预览
    updatePreview() {
      this.$refs.cropper.getCropBlob((blob) => {
        // blob 转 URL
        this.croppedPreview = URL.createObjectURL(blob);
      });
    },
    // 确认裁剪
    confirmCrop() {
      this.$refs.cropper.getCropBlob((data) => {
        console.log(data);
        // Blog数据 转换 File
        const file = new File([data], "coverImg.png", { type: "image/png" });

        //构造FormData
        const formData = new FormData();
        formData.append("file", file);

        //3.上传给后台
        uploadCoverImg(formData).then((res) => {
          if (res.code === 200) {
            this.coverImgUrl = res.data;
            this.$message.success("封面更换成功!");
          } else {
            this.$message.error(res.message);
          }
        });
      });

      this.closeCropper();
    },
    //放大
    zoomIn() {
      this.$refs.cropper.changeScale(0.2);
    },
    //缩小
    zoomOut() {
      this.$refs.cropper.changeScale(-0.2);
    },
    //删除封面图
    deleteCoverImg() {
      deleteFiles([this.coverImgUrl]).then((res) => {
        if (res.code === 200) {
          this.coverImgUrl = "";
        }
      });
    },

    // 可选：base64 → Blob
    dataURLtoBlob(dataurl) {
      const arr = dataurl.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
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
      getArticleTagByES(queryString).then((res) => {
        const newData = res.data.map((item) => {
          return {
            ...item,
            value: item.name,
          };
        });
        this.judgePopoverList = newData;
        cb(newData);
      });
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
      ];
    },
    handleSelect(item) {
      this.choosedSubTagList.push(item);
      this.$refs.tagPopover.doClose();
    },
    handleEnter() {
      //判断当前的数据 在数组中是否拥有  有就不添加  没有就添加
      const exists = this.choosedSubTagList.some(
        (item) => item.name === this.state1
      );
      if (exists) {
        return;
      }
      //没有直接返回 则  添加tag的名称去数据库中

      //就是 回车 不管数据库中有没有 后端去判断有没有这个数据 如果没有 直接添加到后端
      const newData = { name: this.state1 };
      this.choosedSubTagList.push(newData);

      //用户添加操作

      this.$refs.tagPopover.doClose();
    },
    tagPopoverShow() {
      this.state1 = "";
    },
    //父标签点击事件
    chooseSupTag(index) {
      this.activeTagIndex = index;
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
    // 分类标签选择后的点击时间
    selectCategory(item) {
      this.articleCategoryName = item.name;
      this.$refs.categoryPopoverRef.doClose();
    },

    //分类标签点击时间 A-Z
    categoryType(item, index) {
      this.activeArcleCategoryIndex = index;
      this.showArticleCategoryList = this.articleCategoryList.filter((obj) => {
        // obj.letter 已经是大写字母或 #
        return obj.letter === item;
      });
    },
    openCategoryPopover() {
      this.activeArcleCategoryIndex = null;
      this.showArticleCategoryList = this.articleCategoryList;
    },
    //新增专栏自动宽度变化
    autoResizeColumnInput() {
      const el = this.$refs.columnInputRef;
      if (!el) return;

      // 创建隐藏 span 来测量文字宽度
      const span = document.createElement("span");
      span.style.visibility = "hidden";
      span.style.position = "absolute";
      span.style.whiteSpace = "pre";
      span.style.font = getComputedStyle(el).font;
      span.textContent = el.value || " "; // 避免空值时为0宽
      document.body.appendChild(span);

      const width = Math.min(span.offsetWidth + 10, 200); // +10内边距，最大200px
      el.style.width = width + "px";
      span.remove();
    },
    //新增 专栏点击事件
    addColumnHandler() {
      this.isAddingColumnName = true;
      this.$nextTick(() => {
        this.$refs.columnInputRef.focus();
      });
    },
    //失去焦点后
    ColumnInputFinish() {
      this.isAddingColumnName = false;
      if (this.newColunnName !== null && this.newColunnName !== "") {
        const newColumn = {
          name: this.newColunnName,
          isNewAdd: 1,
          createBy: this.$store.state.user.username
        };

        this.choosedColumnList.push(newColumn);
        this.$refs.columnPopover.doClose();
        this.newColunnName = "";
      }
    },
    deleteColumn(item) {
      const index = this.choosedColumnList.findIndex(
        (column) => column.name === item.name
      );
      if (index !== -1) {
        this.choosedColumnList.splice(index, 1);
      }
      //如果是从popover中的数据 同时也要修改popover中的 isSelected
      if (item.isNewAdd === 0) {
        const newAddIndex = this.columnList.findIndex(
          (column) => column.id === item.id
        );

        this.columnList[newAddIndex].isSelected = false;
      }
    },
    //选择专栏点击事件
    chooseColumnHandler(item) {
      //判断是否已经是三个了
      if (this.choosedColumnList.length >= 3) {
        this.$message.error("最多只能选择3个哦~");
        return;
      }
      if (!item.isSelected) {
        const newItem = {
          ...item,
          isNewAdd: 0,
        };
        this.choosedColumnList.push(newItem);
      } else {
        //删除掉数组中这个数据
        const index = this.choosedColumnList.findIndex(
          (column) => column.name === item.name
        );
        if (index !== -1) {
          this.choosedColumnList.splice(index, 1);
        }
      }
      item.isSelected = !item.isSelected;
    },
    // 提交文章表单前的验证操作
    verifyArticleData(){
      if(this.title=== null || this.title === ""){
        this.$message.info({
          message: "请输入标题~",
          offset: 80
        });
        this.scrollToField("titleRef");
        return false;
      }
      if(this.title.length< 5){
        this.$message.info({
          message: "标题长度过短~",
          offset: 80
        });
        this.scrollToField("titleRef");
        return false;
      }
      if(this.html=== null || this.html === ""){
        this.$message.info({
          message: "请输入内容~",
          offset: 80
        });
        this.scrollToField("contentRef");
        return false;
      }
      if(this.articleCategoryName === null || this.articleCategoryName===""){
        this.$message.info({
          message: "请选择分类~",
          offset: 80
        });
        this.scrollToField("categoryRef");
        return false;
      }
      if(this.choosedSubTagList===null || this.choosedSubTagList.length <= 0){
        this.$message.info({
          message: "请选择标签~",
          offset: 80
        });
        this.scrollToField("tagRef");
        return false;
      }
      return true;
    },
    scrollToField(refName) {
      const el = this.$refs[refName];
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // 可选：自动聚焦
        const input = el.querySelector('input, textarea');
        if (input) input.focus();
      }
    },
    // 保存草稿按钮点击事件
    async saveDraftHandler() {
      if(!this.verifyArticleData()){
        return;
      }
      //判断是否还在处理 防止过多操作
      if(this.isSavingDraftFlag){
        this.$message.info({
          message:"正在保存中,请勿过多操作~",
          offset:80
        })
        return;
      }
      this.isSavingDraftFlag = true;
      try {
        //获取数据
        const tagNames = JSON.stringify(this.choosedSubTagList);
        const columnNames = JSON.stringify(this.choosedColumnList);
        const article = {
          title: this.title,
          content: this.html,
          category: this.articleCategoryName,
          tags: tagNames,
          coverImg: this.coverImgUrl,
          summary: this.summary,
          columns: columnNames,
          type: this.type,
          visibleRange: this.visibleRange,
          createBy: this.$store.state.user.username,
        };
        let res;
        if (this.articleId) {
          article.id = this.articleId;
          res = await updateDraftArticle(article);
          if(res.code === 200){
              this.$message.success({
                message:"草稿保存成功!",
                offset:80
              })
            }else{
              this.$message.error({
                message:"草稿保存失败,请稍后再试!",
                offset:80
              })
            }
        } else {
          //如果没有draftId 则是添加草稿
          if (!this.draftId) {
            res = await addDraftArticle(article);
            if (res.code === 200) {
                this.draftId = res.data.id;
                this.$message.success({
                  message: "草稿保存成功!",
                  offset: 80,
                });
              } else {
                this.$message.error({
                  message: "草稿保存失败,请稍后尝试!",
                  offset: 80,
                });
              }
          } else {
            //有 draftId  修改当前草稿的内容
            article.id = this.draftId;
            res = await updateDraftArticle(article);
            if (res.code === 200) {
                this.draftId = res.data.id;
                this.$message.success({
                  message: "草稿保存成功!",
                  offset: 80,
                });
              } else {
                this.$message.error({
                  message: "草稿保存失败,请稍后尝试!",
                  offset: 80,
                });
              }
          }
        }
      } catch (e) {
        this.$message.error({
          message: "操作失败!",
          offset: 80,
        });
      } finally {
        this.isSavingDraftFlag = false;
      }

    },
    // 打开定时发布对话框
    openScheduledDialog(){
      console.log(this.verifyArticleData())
      if(!this.verifyArticleData()){
        
        return;
      }
      this.isShowScheduledDialog = true;
      eventBus.emit("openMask");
    },
    handleDateChange(selectedDate) {
      const today = new Date();
      const selected = new Date(selectedDate);

      // 判断是否选中今天
      const isToday =
        selected.getFullYear() === today.getFullYear() &&
        selected.getMonth() === today.getMonth() &&
        selected.getDate() === today.getDate();

      if (isToday) {
        // 当前时间 +4小时，作为起始时间
        const now = new Date();
        now.setHours(now.getHours() + 4);
        const startHours = now.getHours();
        const startMinutes = now.getMinutes();

        // 格式化时间为 "HH:mm"
        const pad = (num) => num.toString().padStart(2, "0");
        const startTime = `${pad(startHours)}:${pad(
          Math.ceil(startMinutes / 15) * 15
        )}`;

        this.timePickerOptions = {
          start: startTime,
          step: "00:15",
          end: "23:45"
        };
      } else {
        // 非今天，允许全天选择
        this.timePickerOptions = {
          start: "00:00",
          step: "00:15",
          end: "23:45"
        };
      }

      // 清空上一次选中的时间（防止选中的时间不在新范围内）
      this.articlePushlishTime = null;
    },
    // 关闭定时发布对话框
    closeScheduledDialog(){
      this.isShowScheduledDialog = false;
      eventBus.emit("closeMask");
    },
    // 定时发布按钮点击事件
    scheduledPublishHandler() {
      // 表单数据验证
      if(!this.verifyArticleData()){
        return;
      }
      // 判断时间是否填写了
      if(!this.articlePushlishDate || !this.articlePushlishTime){
        this.$message.info({
          message: "请正确填写时间~",
          offset: 80
        })
        return;
      }
      const fullDateTime = `${this.articlePushlishDate} ${this.articlePushlishTime}:00`;

      const tagNames = JSON.stringify(this.choosedSubTagList);
      const columnNames = JSON.stringify(this.choosedColumnList);
      const article = {
        title: this.title,
        content: this.html,
        category: this.articleCategoryName,
        tags: tagNames,
        coverImg: this.coverImgUrl,
        summary: this.summary,
        columns: columnNames,
        type: this.type,
        visibleRange: this.visibleRange,
        createBy: this.$store.state.user.username,
        publishTime: fullDateTime
      };
      scheduledReleaseArticle(article).then((res) => {
        if(res.code === 200){
          this.$message.success({
            message: "已成功定时发布文章~",
            offset: 80
          })
          // 关闭 dialog  和 遮罩层
          this.closeScheduledDialog();
          this.$router.push("/create/success");
        }
      })
    },
    // 发布文章点击事件
    async publishArticleHandler(){
      // 表单数据验证
      if(!this.verifyArticleData()){
        return;
      }
      //判断是否在执行中
      if(this.isPublishArticleFlag){
        this.$message.info({
          message:"正在操作中,请稍后尝试~",
          offset:80
        })
        return;
      }
      // 修改flag
      this.isPublishArticleFlag = true;

      try {
        //获取数据
        const tagNames = JSON.stringify(this.choosedSubTagList);
        const columnNames = JSON.stringify(this.choosedColumnList);
        const article = {
          title: this.title,
          content: this.html,
          category: this.articleCategoryName,
          tags: tagNames,
          coverImg: this.coverImgUrl,
          summary: this.summary,
          columns: columnNames,
          type: this.type,
          visibleRange: this.visibleRange,
          createBy: this.$store.state.user.username,
        };
        let res;
        if(this.$route.params.articleId){
          article.id =  this.$route.params.articleId;
          // 发布接口
          res = await publishArticle(article);
          if(res.code === 200){
            this.$message.success({
              message:"发布成功",
              offset:80
            })
            this.$router.push("/create/success");
          }
        }else{
          // 发布接口
          res = await publishArticle(article);
          if(res.code === 200){
            this.$message.success({
              message:"发布成功",
              offset:80
            })
            this.$router.push("/create/success");
          }
          
        }
        
      } catch (e) {
        this.$message.error({
          message:"操作失败,请稍后尝试~",
          offset:80
        })
      } finally{
        this.isPublishArticleFlag = false;
      }

    },
    // 继续编辑点击事件
    continueWrtieDraft(){
      const url = "/create/editor/" + this.latestDraft.id;
      window.location.href = url;
    },
    // 草稿box 关闭点击事件
    closeDraftBoxBtnHandler(){
      this.isShowDraft = false;
    }
  },
  watch: {
    articleId(newId) {
      if (newId) {
        console.log("切换到草稿模式，加载草稿ID =", newId);
      } else {
        console.log("切换到新建模式");
      }
    },
    html(newVal) {
      const ossPrefix = "https://cmc-blog.oss-cn-hangzhou.aliyuncs.com";

      const parser = new DOMParser();
      const doc = parser.parseFromString(newVal, "text/html");
      const imgs = Array.from(doc.querySelectorAll("img"));

      const newList = imgs.map((img) => ({ url: img.getAttribute("src") }));

      // 找出被删除的图片（老的有，新的没有）
      const deleted = this.previewImgList.filter(
        (oldItem) => !newList.some((newItem) => newItem.url === oldItem.url)
      );

      // 调 OSS 删除接口（加安全判断）
      deleted.forEach((item) => {
        if (item.url.startsWith(ossPrefix)) {
          // 判断 item.url 在 deleted 中是否唯一
          const count = deleted.filter((d) => d.url === item.url).length;
          if (count === 1) {
            deleteFiles([item.url]).then((res) => {
              res;
            });
          }
        }
      });

      // 更新 list
      this.previewImgList = newList;
    },
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
.ccccccc {
  position: relative;
}
.toolbar-div {
  position: sticky;
  top: 65px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  z-index: 1;
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
.cover-img-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 90px;
  cursor: pointer;
  border-radius: 8px;
  margin-right: 16px;
}
.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
}
.delete-cover-img-btn {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
}
.delete-cover-img-btn:hover {
  background-color: red;
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
  z-index: 199;
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
.draft-box {
  width: 100%;
  height: 54px;
  background-color: #f5f6f7;
  display: flex;
  align-items: center;
  padding: 16px 24px;
  margin: 0 0 24px;
}
.draft-type-box,
.continue-draft-btn {
  font-size: 14px;
  color: #555666;
  font-family: "SF Pro Display";
  background-color: #fff;
  border: 1px solid #ced0e2;
  padding: 2px 5px;
  margin-right: 16px;
  cursor: pointer;
}
.continue-draft-btn:hover{
  background: linear-gradient(145deg, #eef1f7, #ffffff);
  border-color: #b8bcd1;
  color: #2a2b38;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
.draft-title-box {
  font-size: 16px;
  color: #222226;
  font-family: "SF Pro Display";
  font-weight: 500;
  width: 380px;
  margin-right: 16px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.more-draft-btn {
  font-size: 14px;
  color: #555666;
  font-family: "SF Pro Display";
  margin-right: 16px;
  cursor: pointer;
}
.more-draft-btn:hover {
  background-color: #e8f1ff;
  color: #3f6cff;            
}
.close-draft-box-icon {
  width: 12px;
  height: 12px;
  object-fit: cover;
  display: flex;
  cursor: pointer;
}
.cropper-box {
  z-index: 201;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 360px;
  position: fixed;
  border-radius: 16px;
  background-color: #fff;
  padding: 24px;
}
.cropper-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.cropper-top span {
  font-size: 18px;
  color: #1a1a1a;
  font-family: "SF Pro Display";
  font-weight: 500;
}
.cropper-top img {
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.cropper-middle {
  display: flex;
  margin-top: 20px;
}
.cropper-component-box {
  width: 240px;
  height: 160px;
}
.preview-box {
  margin-left: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview-img-box {
  width: 188px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f2f2f2;
}
.preview-img-box img {
  width: 178px;
  height: 100px;
  object-fit: cover;
  display: block;
}
.preview-words {
  margin-top: 8px;
  font-size: 14px;
  color: #bbbbbb;
  font-family: "SF Pro Display";
}
.img-size-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  margin-top: 10px;
}
.img-size-btn {
  width: 32px;
  height: 32px;

  color: #999;
  border: 1px solid #999;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 8px;

  cursor: pointer;
}
.img-size-btn img {
  width: 20px;
  height: 20px;
  object-fit: cover;
  display: block;
}
.cropper-btns-box {
  display: flex;
  justify-content: right;
  width: 100%;
}
.upload-cropper-img-btn {
  margin: 12px 8px 0 0;
  color: #fff;
  font-size: 14px;
  font-family: "SF Pro Display";
  line-height: 32px;
  text-align: center;
  width: 88px;
  height: 32px;
  background-color: #fc5531;
  border-radius: 4px;
  padding: 0 16px;
  cursor: pointer;
}
/* 分类popover */
.category-box {
  min-height: 400px;
  width: 100%;
}
.category-top-box {
  width: 100%;

  text-align: center;
  color: #222226;
  font-size: 16px;
}
.category-middle-box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
}
.category-type {
  font-size: 14px;
  color: #666666;
  margin: 5px 12px 0 0;
}
.category-select {
  font-size: 14px;
  color: #666666;
  margin: 5px 8px 0 0;
  padding: 0 10px;
  border-radius: 2px;
  border: 1px solid #fff;
  cursor: pointer;
}
.category-select:hover {
  color: #ff6600;
  background-color: #fff7ee;
  border: 1px solid #b4b4b4;
}
.category-selected {
  color: #ff6600;
  background-color: #fff7ee;
  border: 1px solid #ff6600;
}
.category-bottom-box {
  margin: 6px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  max-height: 240px;
}
.category-name {
  font-size: 16px;
  color: #fff;
  padding: 2px 10px;
  margin: 5px 8px 0 0;
  border-radius: 4px;
  background-color: #84b4eb;
  transition: background-color 0.3s ease;
  cursor: pointer;
}
.category-name:hover {
  background-color: #5fa8f0;
}
.divider-line {
  width: 100%;
  border-top: 1px solid #e8e8ed;
  margin: 10px 0;
}
.article-category-selected-box {
  font-size: 14px;
  color: #fff;
  background-color: #00a1d6;
  text-align: center;
  height: 26px;
  line-height: 26px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
}

.column-popover-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.column-popover-top-left {
  color: #555666;
  font-family: "PingFang SC";
  font-size: 14px;
}
.column-popover-top-right {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}
.column-popover-top-right:hover {
  background-color: #f4f8fc;
}
.column-popover-top-right img {
  width: 8px;
  height: 8px;
  display: block;
  object-fit: cover;
}
.vetical-divider {
  width: 100%;
  border-top: 1px solid #e8e8ee;
  margin: 12px 0;
}
.add-column-box {
  display: flex;
  align-items: center;
  height: 26.6px;
  background-color: #f4f8fc;
  border: 1px solid #80b7ff;
  border-radius: 4px;
  padding: 0px 4px 0 8px;
  margin-right: 8px;
}
.add-column-box input {
  color: #006fff;
  border: none;
  outline: none;
  background: transparent;
  font-size: 12px;
  font-family: "SF Pro Display";
  width: 20px;
  max-width: 200px;
  transition: width 0.15s ease;
}
.add-column-box input:focus {
  caret-color: #409eff; /* 聚焦时变成主题色 */
}
.close-column-box-btn {
  position: relative;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 4px;
}
.close-column-box-btn:hover {
  background-color: #267dcc;
}
.close-column-box-btn img {
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  height: 14px;
  transition: opacity 0.1s ease;
}
.close-column-box-btn .column-btn-hover {
  opacity: 0;
}
.close-column-box-btn:hover .column-btn-hover {
  opacity: 1;
}
.close-column-box-btn:hover .column-btn-base {
  opacity: 0;
}
.column-choosed-box {
  background-color: #f4f8fc;
  border: 1px solid #80b7ff;
  border-radius: 4px;
  padding: 0px 4px 0 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  height: 26.6px;
  margin-top: 2px;
  margin-bottom: 2px;
}
.column-choosed-name {
  color: #006fff;
  font-size: 12px;
  font-family: "SF Pro Display";
  line-height: 26.6px;
}
.flex-wrap {
  flex-wrap: wrap;
}
.column-box {
  display: flex;

  flex-wrap: wrap;
}
.one-column-div {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-right: 16px;
}
.column-choose-btns {
  position: relative;
}
.unchoosed-column-btn::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #e8e8ed;
  border-radius: 4px;
}
.unchoosed-column-btn {
  width: 14px;
  height: 14px;
}
.choosed-column-btn {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background-color: #3399ea;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choosed-column-btn svg {
  width: 14px;
  height: 14px;
  object-fit: cover;
  display: block;
}
.column-name {
  margin-left: 6px;
  color: #606266;
  font-size: 14px;
  font-family: "PingFang SC";
}
.scheduled-show-box{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-60%);

  width: 366px;
  height: 223px;
  padding: 24px;
  background-color: #fff;
  border-radius: 16px;

  opacity: 0;
  pointer-events: none; /* 默认不可点 */
  transition: all 0.35s ease;

  z-index:  201;

}

.scheduled-show-box.active {
  transform: translate(-50%, -70%);
  opacity: 1;
  pointer-events: auto;
}

.scheduled-show-top{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.scheduled-show-top div{
  font-size: 18px;
  color: #303133;
  font-family: "PingFang SC";
}
.scheduled-show-top img{
  width: 16px;
  height: 16px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}
.scheduled-show-body{
  display: flex;
  flex-direction: column;
  margin-top: 12px;
}
.scheduled-tips{
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC";
}
.scheduled-time-tips{
  font-size: 14px;
  color: #999AAA;
  font-family: "PingFang SC";
  margin-top: 12px;
}
.scheduled-time-tips span{
  font-size: 14px;
  color: #222226;
  font-family: "PingFang SC";
}
.scheduled-show-bottom{
  display: flex;
  align-items: center;
  justify-content: right;
  margin: 20px 0;

}
.scheduled-cancel-btn{
  padding: 0 20px;
  height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;

  display: flex;
  align-items: center;

  transition: all 0.35s ease;

  cursor: pointer;
}
.scheduled-cancel-btn:hover{
  border: 1px solid #555666;

}
.scheduled-cancel-btn span{
  font-size: 14px;
  color: #666666;
  font-family: "Arial";
}
.scheduled-publish-btn{
  padding: 0 20px;
  height: 32px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;

  background-color: #fc5531;

  display: flex;
  align-items: center;

  transition: all 0.35s ease;

  cursor: pointer;
  margin-left: 8px;
}
.scheduled-publish-btn:hover{
  background-color: #fc1944;
}
.scheduled-publish-btn span{
  font-size: 14px;
  color: #fff;
  font-family: "Arial";
  font-weight: 500;
}

</style>
<style>
.w-e-toolbar {
  background-color: #f5f6f7 !important;
}
</style>