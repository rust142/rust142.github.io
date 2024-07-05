<script setup lang="ts">
import { defineComponent } from 'vue';

defineComponent({
  name: 'Footer',
});
</script>

<template>
  <div class="p-6 w-full fixed bottom-0 flex justify-center gap-6 text-white text-sm border-transparent bg-transparent">
    <a href="/email"><span>email</span></a>
    <a href="/twitter"><span>twitter</span></a>
    <a href="/github"><span>github</span></a>
    <a href="/linkedin"><span>linkedin</span></a>
    <a href="/instagram"><span>instagram</span></a>
    <a href="/facebook"><span>facebook</span></a>
    <a href="/thread"><span>thread</span></a>
  </div>
</template>
