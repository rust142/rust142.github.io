<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';

import { MoonIcon, SunIcon } from '@/components/icon'

defineComponent({
  name: 'ToggleTheme',
});

onMounted(() => {
  const html = document.querySelector('html');
  const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  if (html && isLightOrAuto && html.classList.contains('dark')) html.classList.remove('dark');
  else if (html && isDarkOrAuto && html.classList.contains('light')) html.classList.remove('light');
  else if (html && isDarkOrAuto && !html.classList.contains('dark')) html.classList.add('dark');
  else if (html && isLightOrAuto && !html.classList.contains('light')) html.classList.add('light');
})

</script>

<template>
  <div class="hs-dropdown fixed top-6 right-9 mt-1">
    <button type="button" class="hs-dropdown-toggle hs-dark-mode group px-1.5 py-1.5 hover:bg-[#898997] dark:hover:bg-[#192831] flex items-center text-gray-600 font-medium dark:text-neutral-400 hover:text-white hover:dark:text-yellow-600 rounded-full cursor-pointer">
      <MoonIcon/>
      <SunIcon/>
    </button>

    <div id="selectThemeDropdown" class="hs-dropdown-menu hs-dropdown-open:opacity-100 mt-2 hidden z-10 transition-[margin,opacity] opacity-0 duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-2 space-y-1 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
      <button type="button" class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" data-hs-theme-click-value="dark">
        Default (Dark)
      </button>
      <button type="button" class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" data-hs-theme-click-value="light">
        Light
      </button>
      <button type="button" class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300" data-hs-theme-click-value="auto">
        Auto (System)
      </button>
    </div>
  </div>
</template>
