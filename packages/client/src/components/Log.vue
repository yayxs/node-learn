<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          label-width="120px"
          style="margin:10px;width:auto"
          :rules="form_rules"
        >
          <el-form-item label="收支类型">
            <el-select v-model="formData.type" placeholder="类型">
              <el-option
                v-for="(formtype,index) in list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" prop="describe">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入:">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>

          <el-form-item prop="expend" label="支出:">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>

          <el-form-item prop="cash" label="账户现金:">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>

          <el-form-item label="备注:">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>

          <el-form-item class="text_right">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "log",
  data() {
    return {
      list: ["运动", "交通", "话费"],
      form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
    };
  },
  props: ["dialog", "formData"],
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          const url =
            this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          this.$http.post(`/api/profiles/${url}`, this.formData).then(res => {
            // 操作成功
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.dialog.show = false;
            this.$emit("update");
          });
        }
      });
    }
  }
};
</script>
