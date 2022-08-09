<script lang="ts">
  import { onMount } from "svelte";

  let stickerElement;
  let bounds;

  const rotateToMouse = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2,
    };
    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    const mx = center.x * 2 + bounds.width / 2;
    const my = center.y * 2 + bounds.height / 2;

    stickerElement.style.transform = `
      scale3d(1.5, 1.5, 1.5)
      rotate3d(
        ${center.y / 100},
        ${-center.x / 100},
        0,
        ${Math.log(distance) * 2 * 2}deg
      )
      translateZ(0)
    `;

    stickerElement.style.setProperty("--mx", `${mx}px`);
    stickerElement.style.setProperty("--my", `${my}px`);
  };

  onMount(() => {
    stickerElement.addEventListener("mouseenter", () => {
      bounds = stickerElement.getBoundingClientRect();
      document.addEventListener("mousemove", rotateToMouse);
    });

    stickerElement.addEventListener("mouseleave", () => {
      document.removeEventListener("mousemove", rotateToMouse);
      stickerElement.style.transform = "";
      stickerElement.style.background = "";
    });
  });
</script>

<button class="sticker" bind:this={stickerElement}>
  <img src="/images/stickers/sticker_2/sticker_2.png" alt="" />
  <div class="holo" />
  <div class="glow" />
</button>

<style>
  .sticker {
    font-weight: bold;
    text-align: right;
    color: #181a1a;

    width: 100px;
    height: 100px;

    position: relative;
    transition: all 300ms ease;
    transform: rotate3d(0) translateZ(0);
    will-change: transform;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }

  .sticker > img {
    transition: all 300ms ease;
  }

  .sticker:hover > img {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  }

  .sticker:hover {
    transition-duration: 150ms;
  }

  .sticker .glow {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    mix-blend-mode: overlay;
    background-image: radial-gradient(
      circle at var(--mx, 50%) var(--my, -20%),
      #ffffff50,
      #0000006f
    );
    mask: url(/images/stickers/sticker_2/sticker_2.png);
    mask-size: cover;
    opacity: 0;
    transition: all 300ms ease;
  }

  .sticker:hover .glow {
    opacity: 1;
  }

  .sticker .holo {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    mix-blend-mode: color-dodge;
    background-image: url(/images/stickers/textures/sparkles.gif);
    background-size: 200%;
    background-position: calc(var(--mx) / 10) calc(var(--my) / 10);
    background-blend-mode: difference;
    mask: url(/images/stickers/sticker_2/sticker_2_mask_holo.png);
    mask-size: cover;
    opacity: 0;
    transition: all 300ms ease;
  }

  .sticker:hover .holo {
    opacity: 1;
  }
</style>
