<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'NavigationMenu',
});
</script>

<template>
  <div class="px-3 py-2">
    <slot />
  </div>
</template>
