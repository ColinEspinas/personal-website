<script>
  import WavyText from "../atoms/WavyText.svelte";

  let width;
</script>

<svelte:window bind:innerWidth={width} />

{#if width < 465}
  <WavyText>Colin</WavyText>
  <WavyText>Espinas</WavyText>
{:else}
  <WavyText>Colin Espinas</WavyText>
{/if}
