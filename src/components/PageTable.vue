<template>
  <el-container class="page-table-ctn">
    <el-table v-bind="$attrs" v-on="$listeners" :data="filterData" ref="pageTable">
      <slot></slot>
      <el-table-column width="40" v-if="dynamicColumnSetting">
        <template slot="header" :slot-scope="scope">
          <el-popover
            placement="bottom"
            min-width="80"
            trigger="click"
            popper-class="col-setting-popover"
          >
            <el-button
              slot="reference"
              size="small"
              type="text"
              icon="el-icon-setting"
              style="padding:0;"
            ></el-button>
            <div class="col-setting-title">表格字段定制</div>
            <el-checkbox-group v-model="visibleIndexs" :min="1" class="col-setting-group">
              <el-checkbox
                v-for="colInfo in columnInfos"
                :label="colInfo.index"
                :key="colInfo.index"
                :disabled="colInfo.disabled"
                v-show="!colInfo.disabled || showAlwaysShowColumnInCheckbox"
              >{{ colInfo.label }}</el-checkbox>
            </el-checkbox-group>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <el-footer class="footer" v-if="paging">
      <div class="size-info">
        <span v-if="totalSize > 1">显示第 {{start}} 条到第 {{end}} 条的数据，</span>
        共{{ totalSize }} 条数据
      </div>
      <el-pagination
        v-bind="$attrs"
        v-on="$listeners"
        :pager-count="5"
        :layout="layout"
        :page-sizes="pageSizes"
        :page-size="currPageSize"
        :current-page="currPage"
        :total="totalSize"
        style="float:right"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "page-table",
  props: {
    data: {
      type: Array,
      require: true,
      default: _ => []
    },

    // 是否分页，默认为true，即分页。（不分页时将每页条数设置最大。）
    paging: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: _ => [10, 30, 50, 100]
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next, jumper"
    },

    // 是否开启动态列设置
    dynamicColumnSetting: {
      type: Boolean,
      default: false
    },
    // 列可见性，初始需要设置全true。列下标从 0 开始
    columnVisibles: {
      type: Array,
      default: _ => []
    },
    // 初始隐藏的列的下标。列下标从 0 开始
    hidenColumnIndexs: {
      type: Array,
      default: _ => []
    },
    // 总是显示的列的下标（不可隐藏的列）。列下标从 0 开始
    alwaysShowColumnIndexs: {
      type: Array,
      default: _ => []
    },
    // 总是显示的列是否在checkbox中显示
    showAlwaysShowColumnInCheckbox: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      allData: this.data, // 全量表格数据(前端分页)
      filterData: [], // 表格展示数据
      start: 1,
      end: 1,
      totalSize: this.data.length,
      currPageSize: this.paging ? this.pageSize : Number.MAX_SAFE_INTEGER,
      currPage: this.currentPage,

      columnInfos: [], // 所有列的信息
      visibleIndexs: [] // 可见列的下标集合
    };
  },
  methods: {
    handleSizeChange(value) {
      this.currPage = 1;
      this.currPageSize = value;
      this.handleChange();
    },
    handleCurrentChange(value) {
      this.currPage = value;
      this.handleChange();
    },
    handleChange(reset) {
      // reset：是否重置页码
      if (reset) {
        this.currPage = 1;
      }
      this.renderTable();
    },
    renderTable() {
      if (this.totalSize > this.currPageSize) {
        // 总行数大于一页
        let startIndex = (this.currPage - 1) * this.currPageSize,
          endIndex = this.currPage * this.currPageSize;
        this.start = startIndex + 1;
        this.end = this.totalSize < endIndex ? this.totalSize : endIndex;
        this.filterData = this.allData.slice(startIndex, endIndex); //[start,end)
      } else if (this.totalSize > 0) {
        // 总行数小于等于一页
        this.currPage = 1;
        this.start = 1;
        this.end = this.totalSize;
        this.filterData = this.allData;
      } else {
        // 无数据
        this.currPage = 1;
        this.start = 0;
        this.end = 0;
        this.filterData = [];
      }
    },
    setData(value) {
      this.allData = value;
      this.totalSize = value.length;
      this.renderTable();
    },
    oprColumns(indexs, isShow) {
      let self = this;
      indexs.forEach(index => {
        self.$set(self.columnVisibles, index, isShow);
      });
    },

    //<el-table>自带的方法 start
    setCurrentRow(row) {
      this.$refs.pageTable.setCurrentRow(row);
    }
    //...
    //<el-table>自带的方法 end
  },
  watch: {
    data() {
      this.setData(this.data ? this.data : []);
    },
    visibleIndexs(newValue, oldValue) {
      let self = this;
      var willHideIndexs = [],
        willShowIndexs = [];

      willShowIndexs = newValue.filter(index => {
        return oldValue.indexOf(index) === -1;
      });

      willHideIndexs = oldValue.filter(index => {
        return newValue.indexOf(index) === -1;
      });

      self.oprColumns(willShowIndexs, true);
      self.oprColumns(willHideIndexs, false);
    }
  },
  mounted() {
    let self = this;
    if (self.$refs.pageTable.$slots.default && self.dynamicColumnSetting) {
      self.$refs.pageTable.$slots.default.forEach((columnIns, index) => {
        if (columnIns.componentOptions === undefined) {
          return;
        }
        let props = columnIns.componentOptions.propsData;
        if (
          props.label === undefined &&
          props.type !== "selection" &&
          props.type !== "index"
        ) {
          return;
        }
        // 保存所有列的信息
        let label =
            props.type === "selection"
              ? "多选框"
              : props.type === "index"
              ? "索引"
              : props.label,
          // 默认多选框和索引不可隐藏
          disabled =
            props.type === "selection" || props.type === "index" ? true : false;
        self.columnInfos.push({
          label: label,
          index: index,
          disabled: disabled
        });
        // 记录初始展示的列的下标
        if (self.hidenColumnIndexs.indexOf(index) === -1) {
          self.visibleIndexs.push(index);
        }
      });
      // 处理总是显示的列（不可隐藏的列）
      self.alwaysShowColumnIndexs.forEach(
        index => (self.columnInfos[index].disabled = true)
      );
      // 处理初始隐藏的列
      self.oprColumns(self.hidenColumnIndexs, false);
    }
  },
  beforeUpdate() {
    let self = this;
    self.$nextTick(_ => {
      self.$refs.pageTable.doLayout();
    });
  }
};
</script>

<style lang="less">
.page-table-ctn {
  > .el-table {
    width: auto;
    margin: 14px;
    border: 1px solid #ebeef5;
    border-bottom: unset;
  }
  > .footer {
    height: 40px !important;
    .size-info {
      display: inline;
      font-size: 12px;
      color: #666666;
    }
  }
}

.col-setting-popover {
  min-width: 100px;
  padding: 9px 16px;
  .col-setting-title {
    color: #7f8b93;
    font-size: 12px;
  }
  .col-setting-group {
    .el-checkbox {
      display: block;
      margin-top: 5px;
    }
  }
}
</style>
