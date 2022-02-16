<template>
  <div>
    <Comp :tableSchema="tableSchema"></Comp>
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
      tableSchema: {
        // 列表字段设置配置项
        tableColumnSetting: {
          // 默认展示项
          defaultColumn: ["title", "name", "age"],
          disabledColumn: ["demo"], // 固定不变的column
        },
        // 自定义属性，会透传给el-table组件
        tableAttrs: {
          // ...
          tableData: [
            {
              date: "2016-05-03",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-02",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-04",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-08",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-06",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
            {
              date: "2016-05-07",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1518 弄",
            },
          ],
          defaultSort: {
            prop: "date",
            order: "descending",
          },
        },
        // 自定义事件，会透传给el-table组件
        tableListeners: {
          // ...
        },
        // 表格中某列配置，key为 el-table-column中prop字段
        columnDesc: [
          // 表格中某列配置，
          {
            // 自定义属性，会透传给 el-table-column 组件
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
            },
          },
          {
            attrs: {
              prop: "date",
              label: "日期",
            },
          },
          {
            attrs: {
              prop: "id",
              label: "id",
            },
          },
          {
            attrs: {
              prop: "address",
              label: "年龄",
            },
          },
        ],
      },
    };
  },
};
</script>

<style></style>
