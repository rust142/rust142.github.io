<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import type { NavlinkMenuLink } from './NavigationMenuLink.composible';

defineComponent({
  name: 'NavigatioMenunLink',
});

const props = defineProps<{
  data: NavlinkMenuLink
}>()

const currentPath = ref(window.location.pathname)
</script>

<template>
  <a :href="props.data.url" :class="props.data.url === currentPath ? 'bg-[#66667c] dark:bg-[#344551] text-white hover:text-white' : 'dark:bg-[#192831] hover:bg-[#494957] dark:hover:bg-[#353b41]'" class="px-3 py-2 text-[0.9rem] text-white dark:text-[#9FB9D0] font-semibold rounded-full">{{ props.data.name }}</a>
</template>
