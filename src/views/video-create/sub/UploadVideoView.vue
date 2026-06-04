<template>
  <div class="sub-container">
    <template v-if="!hasUploaded">
      <div class="tab-row">
        <div class="tab active">视频投稿</div>
        <div class="tab">短剧投稿</div>
        <div class="tab">专栏投稿</div>
        <div class="tab">互动视频投稿</div>
        <div class="tab">音频投稿</div>
        <div class="tab">贴纸投稿</div>
        <div class="tab">视频素材投稿</div>
      </div>

      <div class="tips-row">
        <div class="tip-item" v-for="tip in uploadTips" :key="tip.title">
          <div class="tip-icon"></div>
          <div class="tip-main">
            <div class="tip-title">{{ tip.title }}</div>
            <div class="tip-desc">{{ tip.desc }}</div>
          </div>
        </div>
      </div>

      <div class="upload-panel">
        <div class="upload-cloud">☁</div>
        <div class="upload-text">点击上传或将视频拖拽到此区域</div>
        <input
          ref="videoFileInput"
          class="file-input"
          type="file"
          accept="video/*"
          @change="onFileChange"
        />
        <button class="upload-video-btn" @click="openFilePicker">
          上传视频
        </button>
      </div>
    </template>

    <template v-else>
      <div class="publish-header">
        <div class="publish-title">发布视频</div>
        <button class="batch-btn">批量操作</button>
      </div>

      <div class="uploaded-main">
        <div class="file-card-row">
          <div class="file-card active">
            <div class="file-index">{{ videoItem.name }}</div>
            <div class="file-status">
              {{ uploadPercentage === 100 ? "上传完成" : "上传中" }}
            </div>
          </div>

          <!-- <div class="file-card add">+ 添加视频</div> -->
        </div>

        <!-- <button class="split-btn">+ 添加分P</button> -->

        <div class="progress-row">
          <div class="progress-file">{{ videoItem.name }}</div>
          <div class="progress-text">
            <div class="video-name">1231212313</div>
            <div
              class="upload-statu"
              :class="{ 'upload-success-status': uploadPercentage === 100 }"
            >
              {{ uploadPercentage === 100 ? "上传完成" : "上传中" }}
            </div>
          </div>
          <div class="video-operation-btns">
            <div
              class="op-btn"
              v-if="!isPauseUpload"
              @click="pauseUploadHandler"
            >
              <i class="el-icon-video-pause"></i>
            </div>
            <div
              class="op-btn"
              v-if="isPauseUpload"
              @click="continueUploadHandler"
            >
              <i class="el-icon-video-play"></i>
            </div>
            <div class="op-btn"><i class="el-icon-refresh-right"></i></div>
          </div>
        </div>
        <div class="progress-track">
          <el-progress
            :percentage="uploadPercentage"
            :format="format"
          ></el-progress>
          <!-- <div class="progress-value"></div> -->
        </div>
      </div>

      <div class="form-area">
        <div class="section-title">基本设置</div>

        <div class="form-item">
          <label class="form-label">封面</label>
          <div class="cover-box">
            <img class="cover-img" :src="videoItem.coverImgUrl" alt="" />
            <div class="cover-mask" @click="chooseCover">封面设置</div>
          </div>
          <input
            ref="coverInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleCoverChange"
          />
        </div>

        <div class="form-item">
          <label class="form-label">标题</label>
          <input class="text-input" v-model="videoItem.name" maxlength="80" />
          <div class="count">{{ videoItem.name.length }}/80</div>
        </div>

        <div class="form-item">
          <label class="form-label">分区</label>
          <select class="select-input" v-model="category">
            <option>动画</option>
            <option>游戏</option>
            <option>音乐</option>
          </select>
        </div>

        <div class="form-item">
          <label class="form-label">标签</label>

          <div class="tag-wrap" @click="focusInput">
            <span class="tag-chip" v-for="(tag, index) in tags" :key="index">
              {{ tag }}
              <span class="close" @click.stop="removeTag(index)">×</span>
            </span>

            <!-- 输入框 -->
            <input
              ref="tagInput"
              v-model="inputValue"
              class="tag-input"
              placeholder="按回车键Enter创建标签"
              @keydown.enter.prevent="addTag"
            />
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">简介</label>
          <textarea
            class="desc-input"
            v-model="description"
            maxlength="2000"
          ></textarea>
          <div class="count">{{ description.length }}/2000</div>
        </div>

        <div class="bottom-actions">
          <button class="draft-btn">存草稿</button>
          <button class="submit-btn">立即投稿</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  initUpload,
  uploadChunk,
  completeUpload,
  uploadFile,
} from "@/api/oss.js";
export default {
  name: "UploadVideoView",
  data() {
    return {
      hasUploaded: false,
      videoTitle: "01",
      category: "动画",
      description: "",
      tags: ["经典电影", "影视剪辑", "电视剧"],
      inputValue: "",
      uploadTips: [
        { title: "视频大小", desc: "视频大小16G以内，时长10小时以内" },
        { title: "视频格式", desc: "推荐上传 MP4/MOV/MKV 格式，转码更快" },
        { title: "视频分辨率", desc: "推荐分辨率：1080P、4K、高分辨率" },
      ],
      chunkSize: 5 * 1024 * 1024,
      uploadPercentage: 0,
      videoItem: {
        name: "",
        objectName: "",
        uploadId: "",
        coverImgUrl: require("@/assets/avatar.jpg"),
      },
      isPauseUpload: false,
      uploadChunks: [],
      allChunks: [],
      pendingChunks: [],
      uploadedChunks: [],
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "已完成" : `${percentage}%`;
    },
    openFilePicker() {
      this.$refs.videoFileInput && this.$refs.videoFileInput.click();
    },

    async onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.hasUploaded = true;
      this.videoItem.name = file.name;

      // 制作视频封面
      const coverBase64 = await this.generateVideoCover(file);

      this.videoItem.coverImgUrl = coverBase64;
      // 上传文件分片
      this.uploadFileHandler(file);
    },
    generateVideoCover(file) {
      return new Promise((resolve, reject) => {
        // 创建 video
        const video = document.createElement("video");

        // 本地视频地址
        video.src = URL.createObjectURL(file);

        // 静音（某些浏览器要求）
        video.muted = true;

        // 预加载
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          // 如果视频不足1秒
          const targetTime = Math.min(1, video.duration / 2);

          // 跳转到指定时间
          video.currentTime = targetTime;
        };

        video.onseeked = () => {
          // 创建 canvas
          const canvas = document.createElement("canvas");

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const ctx = canvas.getContext("2d");

          // 绘制视频帧
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // 转成 base64
          const coverBase64 = canvas.toDataURL("image/jpeg", 0.8);

          // 释放内存
          URL.revokeObjectURL(video.src);

          resolve(coverBase64);
        };

        video.onerror = () => {
          reject(new Error("视频加载失败"));
        };
      });
    },
    createChunks(file) {
      const chunks = [];
      let index = 0;
      let partNumber = 1;

      while (index < file.size) {
        const end = Math.min(index + this.chunkSize, file.size);

        chunks.push({
          chunk: file.slice(index, end),
          partNumber,
          start: index,
          end,
        });

        index = end;
        partNumber++;
      }

      this.uploadChunks = chunks;
      this.allChunks = [...chunks];
      this.pendingChunks = [...chunks];

      return chunks;
    },
    async uploadFileHandler(file) {
      this.createChunks(file);
      const initRes = await initUpload(file.name);
      if (initRes.code === 200) {
        this.videoItem.uploadId = initRes.data.uploadId;
        this.videoItem.objectName = initRes.data.objectName;
        this.startUpload();
      }
    },
    async uploadChunkFile(file) {
      const chunks = this.createChunks(file);
      const initRes = await initUpload(file.name);
      if (initRes.code === 200) {
        console.log(initRes);
        const uploadId = initRes.data.uploadId;
        const objectName = initRes.data.objectName;
        this.videoItem.uploadId = uploadId;
        this.videoItem.objectName = objectName;
        let index = 0;
        for (let i = 0; i < chunks.length; i++) {
          if (this.isPauseUpload) {
            break;
          }
          // 循环上传
          const chunkRes = await uploadChunk(
            chunks[i].chunk,
            objectName,
            uploadId,
            chunks[i].partNumber,
            chunks.length
          );
          console.log(chunkRes);

          if (chunkRes.code !== 200) {
            // 上传失败 处理已上传的碎片
            break;
          }
          // 进度条
          this.uploadPercentage = Math.floor(
            (chunkRes.data.uploadChunks / chunkRes.data.totalChunks) * 100
          );
          index++;
        }
        if (index === chunks.length) {
          // 合并操作
          const completeRes = await completeUpload(objectName, uploadId);
          if (completeRes.code === 200) {
            console.log(completeRes);
          }
        }
      }
    },
    async startUpload() {
      while (this.pendingChunks.length > 0) {
        if (this.isPauseUpload) break;

        const chunk = this.pendingChunks.shift();

        const res = await uploadChunk(
          chunk.chunk,
          this.videoItem.objectName,
          this.videoItem.uploadId,
          chunk.partNumber,
          this.allChunks.length
        );

        if (res.code !== 200) {
          // 失败 → 放回队列头
          this.pendingChunks.unshift(chunk);
          break;
        }

        // 成功
        this.uploadedChunks.push(chunk);

        this.updateProgress();
      }

      this.checkComplete();
    },
    async checkComplete() {
      if (this.uploadedChunks.length === this.allChunks.length) {
        const res = await completeUpload(
          this.videoItem.objectName,
          this.videoItem.uploadId
        );
        if (res.code === 200) {
          console.log("合并完成");
          console.log(res);
        }
      }
    },
    updateProgress() {
      this.uploadPercentage = Math.floor(
        (this.uploadedChunks.length / this.allChunks.length) * 100
      );
    },
    pauseUploadHandler() {
      this.isPauseUpload = true;
    },
    async continueUploadHandler() {
      this.isPauseUpload = false;
      this.startUpload();
    },
    chooseCover() {
      this.$refs.coverInput.click();
    },
    async handleCoverChange(e) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error("封面图片不能超过2MB!");
        return;
      }
      console.log(file);
      const fileCategory = "COVER_IMG";
      const res = await uploadFile(file, fileCategory);
      if (res.code === 200) {
        this.videoItem.coverImgUrl = res.data.url;
        this.$message.success("更新封面成功!");
      }
    },
    addTag() {
      const value = this.inputValue.trim();

      if (!value) return;

      // 去重
      if (this.tags.includes(value)) {
        this.inputValue = "";
        return;
      }

      this.tags.push(value);
      this.inputValue = "";
    },

    removeTag(index) {
      this.tags.splice(index, 1);
    },

    focusInput() {
      this.$refs.tagInput.focus();
    },
  },
};
</script>

<style scoped>
.sub-container {
  width: 100%;
  background: #fff;
  border: 1px solid #eceef1;
}

.tab-row {
  display: flex;
  align-items: center;
  gap: 34px;
  height: 60px;
  padding: 0 24px;
  border-bottom: 1px solid #eceef1;
}

.tab {
  height: 60px;
  line-height: 60px;
  color: #61666d;
  font-size: 16px;
}

.tab.active {
  color: #00a1d6;
  border-bottom: 2px solid #00a1d6;
}

.tips-row {
  display: flex;
  gap: 14px;
  padding: 20px 40px;
}

.tip-item {
  flex: 1;
  display: flex;
  gap: 10px;
}

.tip-icon {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: linear-gradient(145deg, #d8ebfd, #badcf8);
}

.tip-title {
  font-size: 17px;
  color: #18191c;
  margin-bottom: 4px;
}

.tip-desc {
  font-size: 14px;
  color: #61666d;
}

.upload-panel {
  margin: 8px 40px 0;
  height: 480px;
  background: #f6f7f8;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-cloud {
  font-size: 74px;
  color: #d2d6db;
  line-height: 1;
}

.upload-text {
  margin-top: 8px;
  font-size: 16px;
  color: #9499a0;
}

.upload-video-btn {
  margin-top: 28px;
  width: 320px;
  height: 48px;
  border: none;
  border-radius: 6px;
  background: #00a1d6;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
}

.file-input {
  display: none;
}

.download-card {
  margin: 18px 40px 24px;
  border-radius: 6px;
  background: #f4fbff;
  border: 1px solid #dceffc;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.download-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.download-logo {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: #111;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.download-title {
  font-size: 24px;
  color: #18191c;
}

.download-desc {
  margin-top: 4px;
  color: #61666d;
}

.download-btn {
  width: 120px;
  height: 42px;
  border: 1px solid #4aa9e9;
  color: #00a1d6;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
}

.publish-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 28px;
  border-bottom: 1px solid #eceef1;
}

.publish-title {
  font-size: 32px;
  color: #18191c;
  font-weight: 600;
}

.batch-btn {
  height: 40px;
  border: 1px solid #d7dbe0;
  border-radius: 6px;
  padding: 0 16px;
  background: #fff;
  color: #61666d;
}

.uploaded-main {
  margin: 20px 28px 0;
  border-radius: 10px;
  background: #f6f7f8;
  padding: 18px;
}

.file-card-row {
  display: flex;
  gap: 10px;
}

.file-card {
  width: 220px;
  height: 62px;
  border-radius: 8px;
  background: #fff;
  padding: 12px;
  box-sizing: border-box;
  color: #61666d;
}

.file-card.active {
  background: #00a1d6;
  color: #fff;
}

.file-index {
  font-size: 26px;
  line-height: 1;
}

.file-status {
  margin-top: 6px;
  font-size: 12px;
}

.file-card.add {
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.split-btn {
  margin-top: 12px;
  border: none;
  border-radius: 4px;
  background: #00a1d6;
  color: #fff;
  height: 30px;
  padding: 0 12px;
}

.progress-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

.progress-file {
  font-size: 28px;
  color: #18191c;
}

.progress-text {
  color: #55b76f;
}

.video-name {
  color: #111;
  font-size: 14px;
}

.upload-statu {
  font-size: 12px;
  color: #9499a0;
}

.upload-success-status {
  color: #55b76f;
}

.video-operation-btns {
  margin-left: auto;
  margin-right: 30px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.op-btn {
  color: #757575;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e7e7e7;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.progress-value {
  width: 100%;
  height: 100%;
  background: #55b76f;
}

.form-area {
  padding: 24px 28px 30px;
}

.section-title {
  font-size: 30px;
  color: #18191c;
  margin-bottom: 18px;
}

.form-item {
  margin-bottom: 18px;
  position: relative;
}

.form-label {
  display: inline-block;
  width: 72px;
  color: #18191c;
  vertical-align: top;
  padding-top: 8px;
}

.cover-box {
  display: inline-block;
  width: 150px;
  height: 90px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-mask {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 24px;
  line-height: 24px;
  background: rgba(0, 0, 0, 0.45);
  color: #fff;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.text-input,
.select-input,
.desc-input {
  width: 720px;
  border: 1px solid #d8dde3;
  border-radius: 6px;
  font-size: 14px;
  color: #18191c;
}

.text-input,
.select-input {
  height: 38px;
  padding: 0 12px;
}

.desc-input {
  height: 150px;
  padding: 10px 12px;
  resize: none;
}

.tag-wrap {
  width: 720px;
  min-height: 44px;
  border: 1px solid #d8dde3;
  border-radius: 6px;
  padding: 6px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
}

/* tag */
.tag-chip {
  background: #00a1d6;
  color: #fff;
  border-radius: 4px;
  padding: 0 8px;
  height: 28px;
  display: flex;
  align-items: center;
  font-size: 13px;
}

/* 删除按钮 */
.tag-chip .close {
  margin-left: 6px;
  cursor: pointer;
}

/* 输入框 */
.tag-input {
  border: none;
  outline: none;
  flex: 1;
  min-width: 120px;
  height: 28px;
  font-size: 13px;
}

.count {
  width: 720px;
  text-align: right;
  color: #9499a0;
  font-size: 12px;
  margin-top: 4px;
  margin-left: 76px;
}

.bottom-actions {
  margin-top: 28px;
  padding-left: 76px;
  display: flex;
  gap: 12px;
}

.draft-btn,
.submit-btn {
  width: 132px;
  height: 42px;
  border-radius: 6px;
  cursor: pointer;
}

.draft-btn {
  border: 1px solid #d8dde3;
  background: #fff;
  color: #61666d;
}

.submit-btn {
  border: none;
  background: #00a1d6;
  color: #fff;
}
</style>
