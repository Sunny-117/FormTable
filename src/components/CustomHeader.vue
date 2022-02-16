<template>
  <div>
    <!-- eslint-disable  -->
    <template v-for="(index, name) in $scopedSlots">
      <!-- v-slot:[name]="data" -->
      <!-- 用vfor渲染slot -->
      <slot :name="name" v-bind="data" v-if="showColumn.includes(name)"></slot>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showColumn: [],
    };
  },
  mounted() {
    console.log(this.$scopedSlots);
  },
};
</script>

<style></style>
