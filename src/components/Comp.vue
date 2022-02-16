<template>
  <div class="form-table-table">
    <el-table
      v-loading="tableLoading"
      ref="multipleTable"
      :data="tableData"
      style="width: 100%"
      tooltip-effect="dark"
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @row-click="rowClick"
      border
      v-on="tableSchema.tableListeners"
      v-bind="tableSchema.tableAttrs"
      empty-text="暂无数据"
    >
      <el-table-column
        v-for="(item, index) in columnDescHandled"
        :key="index"
        v-bind="item.attrs"
        v-on="item.listeners"
      >
      </el-table-column>
      <!-- 自定义表头插槽位置 vfor渲染slot-->

      <!-- 用户怎么用》？？？？ -->

      <!-- <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <slot
          :name="name"
          v-bind="data"
          v-if="showColumn.includes(name)"
        ></slot>
      </template> -->
    </el-table>
    <!-- 思考：表头是怎么控制显隐的,先渲染一个多选框 -->
    <el-checkbox-group v-model="showColumn">
      <el-checkbox
        v-for="(item, index) in defaultColumn"
        :key="index"
        :label="item"
      >{{item}}</el-checkbox>
        <el-checkbox
        v-for="(item, index) in disabledColumn"
        :key="index"
        :label="item"
        disabled
      >{{item}}</el-checkbox>
    </el-checkbox-group>
    <!-- formSchema.columnDesc数组有哪几项，就展示哪几项 -->

    <el-pagination
      v-bind="tableSchema.paginationAttrs"
      v-on="tableSchema.paginationListeners"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>

<script>
import _ from "lodash-es";
export default {
  data() {
    return {
      multipleSelection: [],
      showColumn:[],
      defaultColumn: [],
      disabledColumn:[],
      columnDescHandled: []
    };
  },
  props: {
    tableSchema: {
      type: Object,
      default: () => ({}),
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
    /**
     * 切换分页函数，默认分页组件切换时会调用，返回值会赋值给tableData
     */
    changePage: {
      type: Function,
      default: () => {},
    },
  },
  mounted() {
    this.defaultColumn = this.tableSchema.tableColumnSetting.defaultColumn;
    this.disabledColumn = this.tableSchema.tableColumnSetting.disabledColumn;
    this.showColumn = [...this.defaultColumn, ...this.disabledColumn]
    this.columnDescHandled = this.tableSchema.columnDesc;
  },
  watch: {
    showColumn() {
        this.columnDescHandled= this.tableSchema.columnDesc.filter((ele)=>{
          return this.showColumn.includes(ele.attrs.prop)
      })
    },
  },

  methods: {
    tableRowClassName({ row }) {
      return _.find(this.multipleSelection, (item) => item.name === row.name)
        ? "heighlight"
        : "";
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style>
.el-table .heighlight {
  background: oldlace;
}
.el-table .el-table__cell {
  padding: 2px 0 !important;
  font-size: 10px;
}
.el-table .cell {
  white-space: nowrap !important;
  text-align: center;
}
.el-table th.el-table__cell > .cell {
  text-align: center;
}
</style>
