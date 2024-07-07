<script setup lang="ts">
import { defineComponent } from 'vue';

import NavigationMenu from './NavigationMenu.vue'
import NavigationMenuLink from './NavigationMenuLink.vue'

import { navMenuLinks } from './NavigationMenuLink'

defineComponent({
  name: 'Navigation',
});

</script>

<template>
  <header class="flex justify-center m-4">
    <nav
      class="max-w-xl my-2 py-2 bg-[#192831] dark:bg-[#192831] flex flex-1 items-center justify-center absolute z-10 rounded-full shadow-lg"
      aria-label="Global">
      <template v-for="navMenuLink in navMenuLinks()">
        <NavigationMenu>
          <NavigationMenuLink :data="navMenuLink" />
        </NavigationMenu>
      </template>
    </nav>
  </header>
</template>
