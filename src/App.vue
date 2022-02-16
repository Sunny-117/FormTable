<template>
  <div>
    <Comp
      :tableSchema="tableSchema"
      :tableData="tableData"
      :tableLoading="tableLoading"
      :changePage="changePage"
    ></Comp>
  </div>
</template>

<script>
import Comp from "./components/Comp.vue";
export default {
  components: {
    Comp,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎5",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎6",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎7",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      tableLoading: false,
      tableSchema: {
        tableColumnSetting: {
          // 默认展示项
          defaultColumn: ["date", "name"],
          disabledColumn: ["address"], // 固定不变的column
        },
        paginationAttrs: {
          // ...
          pageCount: 5,
          pageSizes: [10, 20, 30, 40],
          currentPage: 2,
          total: 200,
          style: "float: right",
          layout: "total, sizes, prev, pager, next, jumper",
        },
        paginationListeners: {
          "current-change": () => {
            console.log("change page");
          },
          "size-change"() {
            console.log("size change");
          },
        },
        tableAttrs: {
          defaultSort: {
            prop: "date",
            order: "descending",
          },
        },
        tableListeners: {},
        columnDesc: [
          {
            attrs: {
              type: "selection",
            },
            listeners: {
              input(event) {
                console.log("ui input", event);
              },
            },
          },
          {
            // 自定义属性，会透传给 el-table-column 组件
            attrs: {
              prop: "name",
              label: "姓名",
              sortable: true,
            },
          },
          {
            attrs: {
              prop: "date",
              label: "日期",
              sortable: true,
            },
          },

          {
            attrs: {
              prop: "address",
              label: "地址",
              sortable: true,
            },
          },
        ],
      },
    };
  },
  methods: {
    changePage() {
      console.log("changePage");
    },
  },
};
</script>

<style></style>
