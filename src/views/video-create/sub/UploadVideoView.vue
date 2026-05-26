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
            <div class="file-index">01</div>
            <div class="file-status">上传完成</div>
          </div>
          <div class="file-card add">+ 添加视频</div>
        </div>

        <button class="split-btn">+ 添加分P</button>

        <div class="progress-row">
          <div class="progress-file">01</div>
          <div class="progress-text">上传完成</div>
          <div class="replace-video">更换视频</div>
        </div>
        <div class="progress-track">
          <el-progress :percentage="100" :format="format"></el-progress>
          <!-- <div class="progress-value"></div> -->
        </div>
      </div>

      <div class="form-area">
        <div class="section-title">基本设置</div>

        <div class="form-item">
          <label class="form-label">封面</label>
          <div class="cover-box">
            <img class="cover-img" src="@/assets/avatar.jpg" alt="" />
            <div class="cover-mask">封面设置</div>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">标题</label>
          <input class="text-input" v-model="videoTitle" maxlength="80" />
          <div class="count">{{ videoTitle.length }}/80</div>
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
          <div class="tag-wrap">
            <span class="tag-chip" v-for="tag in tags" :key="tag"
              >{{ tag }} ×</span
            >
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
import { initUpload, uploadChunk, completeUpload } from "@/api/oss.js";
export default {
  name: "UploadVideoView",
  data() {
    return {
      hasUploaded: true,
      videoTitle: "01",
      category: "动画",
      description: "",
      tags: ["经典电影", "影视剪辑", "电视剧"],
      uploadTips: [
        { title: "视频大小", desc: "视频大小16G以内，时长10小时以内" },
        { title: "视频格式", desc: "推荐上传 MP4/MOV/MKV 格式，转码更快" },
        { title: "视频分辨率", desc: "推荐分辨率：1080P、4K、高分辨率" },
      ],
      chunkSize: 5 * 1024 * 1024,
    };
  },
  methods: {
    format(percentage) {
      return percentage === 100 ? "已完成" : `${percentage}%`;
    },
    openFilePicker() {
      this.$refs.videoFileInput && this.$refs.videoFileInput.click();
    },

    onFileChange(e) {
      const file = e.target.files[0];
      if (!file) return;
      this.hasUploaded = true;
      this.uploadChunkFile(file);
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

      return chunks;
    },
    async uploadChunkFile(file) {
      const chunks = this.createChunks(file);
      console.log(chunks);
      const initRes = await initUpload(file.name);
      if (initRes.code === 200) {
        console.log(initRes);
        const uploadId = initRes.data.uploadId;
        const objectName = initRes.data.objectName;
        let index = 0;
        for (let i = 0; i < chunks.length; i++) {
          // 循环上传
          const chunkRes = await uploadChunk(
            chunks[i].chunk,
            objectName,
            uploadId,
            chunks[i].partNumber,
            chunks.length
          );
          if (chunkRes.code !== 200) {
            // 上传失败 处理已上传的碎片
            break;
          }
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

.replace-video {
  margin-left: auto;
  color: #00a1d6;
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
}

.tag-chip {
  background: #00a1d6;
  color: #fff;
  border-radius: 4px;
  padding: 0 8px;
  height: 28px;
  line-height: 28px;
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
