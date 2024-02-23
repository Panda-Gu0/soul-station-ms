<!-- 修改文章弹窗 -->
<template>
    <div class="update-post-container">
        <el-dialog title="修改文章" :visible.sync="dialogVisible" width="65%" :before-close="resetModal"
            :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model.trim="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="关联标签" prop="tags">
                    <el-select v-model="ruleForm.tags" multiple placeholder="请选择标签" style="width: 300px;">
                        <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- 文章封面上传 -->
                <el-form-item label="文章封面">
                    <el-upload class="cover-uploader" action="" :auto-upload="false" :show-file-list="false"
                        :on-change="uploadchange">
                        <img v-if="imgUrl" :src="imgUrl" class="cover" />
                        <div v-else class="empty">
                            <i class="el-icon-plus cover-uploader-icon"></i>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <el-input v-model="ruleForm.content" type="textarea" resize="none" placeholder="请输入文章内容" :autosize="{ minRows: 5, maxRows: 5}"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetModal">取 消</el-button>
                <el-button type="primary" @click="update">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import { getTagListApi, } from "@/api/tag";
import { updatePostApi, uploadCoverApi } from "@/api/post";
export default {
    data() {
        return {
            tagList: [],
            dialogVisible: false,
            imgUrl: "", // 真实文章封面地址
            previewUrl: "", // 本地图片预览地址
            files: [],
            ruleForm: {
                title: "",
                tags: [],
                content: ""
            },
            rules: {
                title: [
                    { required: true, message: "标题不能为空", trigger: "blur" }
                ],
                content: [
                    { required: true, message: "内容不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {

    },
    methods: {
        /** 弹窗初始化 */
        init(row) {
            this.dialogVisible = true;
            this.getTags();
            const { title, tags, content, id, coverUrl } = row;
            this.imgUrl = coverUrl;
            this.previewUrl = coverUrl;
            let filteredTags = tags.map(tag => tag.id)
            this.ruleForm = { id, title, tags: filteredTags, content };
            console.log("previewUrl", this.previewUrl);
            console.log("imgUrl", this.imgUrl);
        },
        /** 关闭弹窗清除内容 */
        resetModal() {
            this.$refs.ruleForm.resetFields();
            this.dialogVisible = false;
        },
        /** 获取所有标签 */
        async getTags() {
            const { data: res } = await getTagListApi({ pageSize: 9999999 });
            if (res.code != 200) {
                return this.$message.error(res.describe);
            }
            this.tagList = res.data.data;
        },
        /** 保存文章修改 */
        update() {
            this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    console.log("save", this.ruleForm);
                    const { data: res } = await updatePostApi(this.ruleForm);
                    // 进行图片上传操作
                    if (this.previewUrl === this.imgUrl) {
                        console.log("无需上传图片");
                    } else {
                        await this.submitupload();
                    }
                    if (res.success) {
                        this.$message.success(res.data.data);
                        this.$emit("refresh");
                        this.resetModal();
                    }
                }
            })
        },
        /** 文件格式大小判断处理  */
        uploadchange(file) {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/gif",
                "image/png",
            ];
            const isAllowedType = allowedTypes.includes(file.raw.type);
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            if (!isAllowedType) {
                this.$message.error("上传图片只能是 JPG、JPEG、GIF 或 PNG 格式!");
                return;
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 2MB!");
                return;
            }
            this.imgSaveToUrl(file);
            this.files = file.raw;
        },
        /* 提交按钮监听事件 */
        async submitupload() {
            // 判断是否存在预览图片信息,才执行post请求
            if (this.files.length !== 0) {
                let formData = new FormData();
                formData.append("file", this.files);
                return uploadCoverApi(this.ruleForm.id, formData)
                    .then((res) => {
                        console.log("成功");
                    })
                    .catch((error) => {
                        console.log("上传图片失败");
                        console.log(error);
                    });
            }
        },
        /** 图片本地预览  */
        imgSaveToUrl(file) {
            this.imgUrl = URL.createObjectURL(file.raw);
            this.files = file.raw;
        },
    },
};
</script>
  
<style lang="less" scoped>
/deep/.el-dialog {
    border-radius: 4px;
}

/deep/ .el-dialog__footer {
    height: 64px;
    border: 2px solid #0000000d;

    .el-button {
        margin-top: 5px;
        width: 72px;
        height: 32px;
        padding: 0;
    }
}

.cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.cover-uploader .el-upload:hover {
    border-color: #409eff;
}

.cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.cover {
    width: 300px;
    border-radius: 8px;
    display: block;
}

.empty {
    width: 300px;
    border: 1px dashed #ccc;
    border-radius: 8px;
}
</style>
  