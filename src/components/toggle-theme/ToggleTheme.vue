<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import { MoonIcon, SunIcon } from '@/components/icon'

defineComponent({
  name: 'ToggleTheme',
});

onMounted(() => {
  const html = document.querySelector('html');
  const isLightOrAuto = localStorage.getItem('theme') === 'light' || (localStorage.getItem('theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
  const isDarkOrAuto = localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  setHtmlClass(html, isLightOrAuto, isDarkOrAuto);
})

const isDropdownOpen = ref(false);

function setHtmlClass(html: HTMLHtmlElement | null, isLightOrAuto: boolean, isDarkOrAuto: boolean) {
  if (html && isLightOrAuto && html.classList.contains('dark')) {
    html.classList.remove('dark');
    html.classList.add('light')
  }

  if (html && isDarkOrAuto && html.classList.contains('light')) {
    html.classList.remove('light');
    html.classList.add('dark')
  }
}

function setTheme(theme: string) {
  localStorage.setItem('theme', theme);
  const html = document.querySelector('html');
  const isLightOrAuto = theme === 'light' || theme === 'auto';
  const isDarkOrAuto = theme === 'dark' || theme === 'auto';

  setHtmlClass(html, isLightOrAuto, isDarkOrAuto);

  isDropdownOpen.value = false;
}
</script>

<template>
  <div class="fixed top-6 right-9 mt-1">
    <button type="button" @click="isDropdownOpen = !isDropdownOpen"
      class="group px-1.5 py-1.5 hover:bg-[#898997] dark:hover:bg-[#192831] flex items-center text-gray-600 font-medium dark:text-neutral-400 hover:text-white hover:dark:text-yellow-600 rounded-full cursor-pointer">
      <MoonIcon />
      <SunIcon />
    </button>

    <div id="selectThemeDropdown" :class="{ 'hidden': !isDropdownOpen }"
      class="absolute -left-28 mt-2 z-10 transition-[margin,opacity] duration-300 mb-2 origin-bottom-left bg-white shadow-md rounded-lg p-2 space-y-1 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
      <button type="button" @click="setTheme('dark')"
        class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
        Default (Dark)
      </button>
      <button type="button" @click="setTheme('light')"
        class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
        Light
      </button>
      <button type="button" @click="setTheme('auto')"
        class="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300">
        Auto (System)
      </button>
    </div>
  </div>
</template>
