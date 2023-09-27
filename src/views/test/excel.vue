<template>
  <div class="excel-display-box">
    <vue-excel-editor
      v-model="jsonData"
      :localized-label="myLabels"
      autocomplete
      readonly
    >
      <vue-excel-column
        field="user"
        label="用户ID"
        type="string"
        autoFillWidth
        key-field
        readonly
      />
      <vue-excel-column
        field="name"
        label="用户名"
        type="string"
        autoFillWidth
      />
      <vue-excel-column
        field="phone"
        label="联系方式"
        type="string"
        autoFillWidth
      />
      <vue-excel-column
        field="gender"
        label="性别"
        type="select"
        autoFillWidth
      />
      <vue-excel-column field="age" label="年龄" type="number" autoFillWidth />
      <vue-excel-column
        field="birth"
        label="出生日期"
        type="date"
        autoFillWidth
      />
    </vue-excel-editor>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const jsonData = reactive([
  {
    user: "hc",
    name: "Harry Cole",
    phone: "1-415-2345678",
    gender: "M",
    age: 25,
    birth: "1997-07-01"
  },
  {
    user: "sm",
    name: "Simon Minolta",
    phone: "1-123-7675682",
    gender: "M",
    age: 20,
    birth: "1999-11-12"
  },
  {
    user: "ra",
    name: "Raymond Atom",
    phone: "1-456-9981212",
    gender: "M",
    age: 19,
    birth: "2000-06-11"
  },
  {
    user: "ag",
    name: "Mary George",
    phone: "1-556-1245684",
    gender: "F",
    age: 22,
    birth: "2002-08-01"
  },
  {
    user: "kl",
    name: "Kenny Linus",
    phone: "1-891-2345685",
    gender: "M",
    age: 29,
    birth: "1990-09-01"
  },
  {
    user: "hc",
    name: "Harry Cole",
    phone: "1-415-2345678",
    gender: "M",
    age: 25,
    birth: "1997-07-01"
  },
  {
    user: "sm",
    name: "Simon Minolta",
    phone: "1-123-7675682",
    gender: "M",
    age: 20,
    birth: "1999-11-12"
  },
  {
    user: "ra",
    name: "Raymond Atom",
    phone: "1-456-9981212",
    gender: "M",
    age: 19,
    birth: "2000-06-11"
  },
  {
    user: "ag",
    name: "Mary George",
    phone: "1-556-1245684",
    gender: "F",
    age: 22,
    birth: "2002-08-01"
  },
  {
    user: "kl",
    name: "Kenny Linus",
    phone: "1-891-2345685",
    gender: "M",
    age: 29,
    birth: "1990-09-01"
  },
  {
    user: "hc",
    name: "Harry Cole",
    phone: "1-415-2345678",
    gender: "M",
    age: 25,
    birth: "1997-07-01"
  },
  {
    user: "sm",
    name: "Simon Minolta",
    phone: "1-123-7675682",
    gender: "M",
    age: 20,
    birth: "1999-11-12"
  },
  {
    user: "ra",
    name: "Raymond Atom",
    phone: "1-456-9981212",
    gender: "M",
    age: 19,
    birth: "2000-06-11"
  },
  {
    user: "ag",
    name: "Mary George",
    phone: "1-556-1245684",
    gender: "F",
    age: 22,
    birth: "2002-08-01"
  },
  {
    user: "kl",
    name: "Kenny Linus",
    phone: "1-891-2345685",
    gender: "M",
    age: 29,
    birth: "1990-09-01"
  },
  {
    user: "hc",
    name: "Harry Cole",
    phone: "1-415-2345678",
    gender: "M",
    age: 25,
    birth: "1997-07-01"
  },
  {
    user: "sm",
    name: "Simon Minolta",
    phone: "1-123-7675682",
    gender: "M",
    age: 20,
    birth: "1999-11-12"
  },
  {
    user: "ra",
    name: "Raymond Atom",
    phone: "1-456-9981212",
    gender: "M",
    age: 19,
    birth: "2000-06-11"
  },
  {
    user: "ag",
    name: "Mary George",
    phone: "1-556-1245684",
    gender: "F",
    age: 22,
    birth: "2002-08-01"
  },
  {
    user: "kl",
    name: "Kenny Linus",
    phone: "1-891-2345685",
    gender: "M",
    age: 29,
    birth: "1990-09-01"
  },
  {
    user: "hc",
    name: "Harry Cole",
    phone: "1-415-2345678",
    gender: "M",
    age: 25,
    birth: "1997-07-01"
  },
  {
    user: "sm",
    name: "Simon Minolta",
    phone: "1-123-7675682",
    gender: "M",
    age: 20,
    birth: "1999-11-12"
  },
  {
    user: "ra",
    name: "Raymond Atom",
    phone: "1-456-9981212",
    gender: "M",
    age: 19,
    birth: "2000-06-11"
  },
  {
    user: "ag",
    name: "Mary George",
    phone: "1-556-1245684",
    gender: "F",
    age: 22,
    birth: "2002-08-01"
  },
  {
    user: "kl",
    name: "Kenny Linus",
    phone: "1-891-2345685",
    gender: "M",
    age: 29,
    birth: "1990-09-01"
  }
]);

const myLabels = reactive({
  footerLeft: (top, bottom) => `条目 ${top} 至 ${bottom}`,
  first: "头页",
  previous: "上一页",
  next: "下一页",
  last: "尾页",
  footerRight: {
    selected: "选择：",
    filtered: "过滤：",
    loaded: "载入："
  },
  processing: "工作中",
  tableSetting: "表格设定",
  exportExcel: "汇出 Excel",
  importExcel: "汇入 Excel",
  back: "关",
  reset: "预设",
  sortingAndFiltering: "排序及过滤",
  sortAscending: "小至大排序",
  sortDescending: "大至小排序",
  near: "≒ 接近",
  exactMatch: "= 等于",
  notMatch: "≠ 不等于",
  greaterThan: "&gt; 大于",
  greaterThanOrEqualTo: "≥ 大于或等于",
  lessThan: "&lt; 少于",
  lessThanOrEqualTo: "≤ 少于或等于",
  regularExpression: "~ 正规表示式",
  customFilter: "过滤内容",
  listFirstNValuesOnly: n => `只列出 ${n} 项`,
  apply: "应用",
  noRecordIsRead: "没有条目被读取",
  readonlyColumnDetected: "不可更新只读条目",
  columnHasValidationError: (name, err) =>
    `条目栏位 ${name} 发生校验错误: ${err}`,
  noMatchedColumnName: "没有能配对的栏位",
  invalidInputValue: "输入错误内容",
  missingKeyColumn: "找不到关键栏位",
  noRecordIndicator: "沒有条目"
});
</script>

<style scoped>
.excel-display-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 20px auto;
  text-align: center;
}
</style>
