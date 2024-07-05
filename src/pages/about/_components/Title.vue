<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'Title',
});
</script>

<template>
  <h1 class="text-[2.9rem] font-bold text-[#192831] dark:text-[#717175]">
    <slot />
  </h1>
</template>
