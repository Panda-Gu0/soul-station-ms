<!-- 修改文章弹窗 -->
<template>
    <div class="update-post-container">
        <el-dialog title="修改文章" :visible.sync="dialogVisible" width="85%" :before-close="resetModal"
            :close-on-click-modal="false">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model.trim="ruleForm.title"></el-input>
                </el-form-item>
            </el-form>
            <el-form :model="ruleForm" :rules="rules" ref="tag" label-width="80px">
                <el-form-item label="关联标签" prop="tags">
                    <el-select v-model="ruleForm.tags" multiple placeholder="请选择">
                        <el-option v-for="item in tagList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="resetModal">取 消</el-button>
                <el-button type="primary">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
  
<script>
import { getTagListApi } from "@/api/tag";
export default {
    data() {
        return {
            tagList: [],
            dialogVisible: false,
            ruleForm: {
                title: "",
                tags: []
            },
            rules: {
                title: [
                    { required: true, message: "标题不能为空", trigger: "blur" }
                ],
            },
        };
    },
    created() {
        this.getTags(); // 报错
    },
    methods: {
        /** 弹窗初始化 */
        init(row) {
            this.dialogVisible = true;
            
            const { title, tags } = row;
            this.ruleForm = { title, tags };
            console.log("row", row);
            console.log('this.ruleForm', this.ruleForm);
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
            console.log('this.tagList', this.tagList);
        }
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
</style>
  