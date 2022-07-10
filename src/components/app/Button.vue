<script lang="ts" setup>
defineProps<{
  to: string,
  type?: 'primary' | 'secondary',
  size?: 'default' | 'big',
}>();
</script>

<template>
  <a
    :href="to"
    class="bg-primary px-3 py-2 rounded text-light font-bold"
  >
    <slot />
  </a>
</template>

<style module>

</style>