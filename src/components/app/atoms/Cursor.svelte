<script>
  import { spring } from "svelte/motion";

  export let x = 0;
  export let y = 0;

  // Spring animation for cursor
  const coords = spring(
    { x, y },
    {
      stiffness: 0.04,
      damping: 1,
    }
  );

  // Update spring when x and y change
  $: coords.set({ x, y });
</script>

<div
  class="cursor"
  style={`transform: translateX(${$coords.x}px) translateY(${$coords.y}px)`}
>
  <slot />
</div>

<style>
  .cursor {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
