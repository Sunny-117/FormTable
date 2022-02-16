<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableSchema.tableAttrs.tableData"
      style="width: 100%"
      :row-class-name="rowStyle"
      @row-click="rowHandler"
      border
      v-on="tableSchema.tableListeners"
      v-bind="tableSchema.tableAttrs"
    >
      <!-- el-table-column是ele插槽，把tableSchema列渲染出来 -->
      <el-table-column
        v-for="(item, index) in tableSchema.columnDesc"
        :key="index"
        v-bind="item.attrs"
        v-on="item.listeners"
      >
      </el-table-column>
      <!-- ele只能在这里插el-table-column -->
      <!-- 自定义表头插槽位置 -->
      <template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
        <!-- 用vfor渲染slot -->
        <slot
          :name="name"
          v-bind="data"
          v-if="showColumn.includes(name)"
        ></slot>
      </template>
      <!-- <CustomHeader>
        <template v-slot:table-title="{}"> 123 </template>
        <template #table-age> 234 </template>
      </CustomHeader> -->
    </el-table>
    <!--  
    需要传递schema,可以陷Page代码，所以要用作用域插槽-->
    <Pagination>
      <template v-slot:pagination="{ pagination }">
        {{ pagination }}
      </template>
    </Pagination>
  </div>
</template>

<script>
import Pagination from "./Pagination.vue";
// import CustomHeader from "./CustomHeader.vue";
export default {
  components: {
    Pagination,
    // CustomHeader,
  },
  data() {
    return {
      multipleSelection: [], //专门用来存储选中项的下标，方便使用。
      defaultColumn: [],
      showColumn: [],
    };
  },
  props: {
    tableSchema: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    const len = this.$props.tableSchema.tableAttrs.tableData.length;
    for (let i = 0; i < len; i++) {
      this.$props.tableSchema.tableAttrs.tableData[i].id = i;
    }
  },
  methods: {
    rowStyle({ row, rowIndex }) {
      let arr = this.multipleSelection;
      for (let i = 0; i < arr.length; i++) {
        //   lodash find优化
        if (rowIndex === arr[i]) {
          return "rowStyle";
        }
      }
    },
    rowHandler(e) {
    this.$refs.multipleTable.toggleRowSelection(e);
      if (this.multipleSelection.includes(e.id)) {
        this.multipleSelection = this.multipleSelection.filter((ele) => {
          return ele !== e.id;
        });
      } else {
        this.multipleSelection.push(e.id);
      }
      // console.log(e.id);
      // 多选的情况
      //   this.$refs.multipleTable.toggleRowSelection(
      //     this.tableSchema.tableAttrs.tableData[e],
      //     this.multipleSelection.includes(e.id)
      //   );
    },
  },
};
</script>
<style>
.rowStyle {
  background-color: #fdf4d1 !important;
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
