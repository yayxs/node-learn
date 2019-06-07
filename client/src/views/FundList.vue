<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data" :model="searchData">
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选">
          <el-date-picker v-model="searchData.start" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="searchData.end" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            v-if="user.identity == 'manager'"
            type="primary"
            size="small"
            icon="view"
            @click="handleAdd()"
          >添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        style="width: 100%"
        max-height="450"
        border
      >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>

        <el-table-column label="创建时间" width="250" prop="date" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="收支类型" width="150" prop="type" align="center"></el-table-column>
        <el-table-column label="收支描述" width="180" prop="describe" align="center"></el-table-column>
        <el-table-column label="收入" width="170" prop="income" align="center">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支出" width="170" prop="expend" align="center">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账户现金" width="170" prop="cash" align="center">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="220" prop="remark" align="center"></el-table-column>
        <el-table-column
          label="操作"
          prop="operation"
          align="center"
          width="180"
          v-if="user.identity == 'manager'"
        >
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              icon="delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <Log :dialog="dialog" :formData="formData" @updata="getProfiles"></Log>
  </div>
</template>
<script>
import Log from "../components/Log";
export default {
  name: "fundlist",

  data() {
    return {
      searchData: {
        start: "",
        end: ""
      },
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 5,
        page_sizes: [5, 10, 15, 20],
        layout: "total, sizes, prev, pager, next, jumper"
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      filterData: []
    };
  },
  created() {
    this.getProfiles();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    getProfiles() {
      this.$http
        .get("/api/profiles")
        .then(res => {
          console.log(res.data);
          this.allTableData = res.data;
          this.filterData = res.data;
          this.setPage();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$http.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfiles();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
      this.dialog.show = true;
    },
    setPage() {
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.page_size = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let nums = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      if (!this.searchData.start || !this.searchData.end) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfiles();
        return;
      }

      const stime = this.searchData.start.getTime();
      const etime = this.searchData.end.getTime();
      this.allTableData = this.filterData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      });
      // 分页数据
      this.setPage();
    }
  },
  components: {
    Log
  }
};
</script>
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
