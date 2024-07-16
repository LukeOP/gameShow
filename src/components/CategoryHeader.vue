<template>
  <div class="category-header">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.category-header {
  background-color: rgb(19, 25, 89);
  color: white;
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  min-height: 102px;
}
</style>
