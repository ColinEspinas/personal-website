<script type="ts">
  import { onDestroy, onMount } from "svelte";
  import { createClient } from "@liveblocks/client";
  import Cursor from "../atoms/Cursor.svelte";

  const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

  let client;
  let room;
  let roomId = "main";

  let lastCursorPosition;
  let others;

  onMount(() => {
    let scroll = {
      x: window.scrollX,
      y: window.scrollY,
    };

    try {
      client = createClient({
        publicApiKey: import.meta.env.PUBLIC_LIVEBLOCKS_KEY,
      });
      room = client.enter("main", { initialPresence: {} });
    } catch (err) {
      console.error(err);
    }

    others = room.getOthers();

    room.subscribe("others", (otherUsers) => {
      others = otherUsers;
      console.log(others);
    });

    document.addEventListener("pointermove", (event) => {
      event.preventDefault();
      if (room) {
        const cursorPosition = {
          x: Math.round(event.pageX),
          y: Math.round(event.pageY),
        };
        lastCursorPosition = cursorPosition;
        room.updatePresence({
          cursor: {
            x: cursorPosition.x / window.innerWidth,
            y: cursorPosition.y,
          },
        });
      }
    });

    document.addEventListener("pointerleave", () => {
      if (room) {
        lastCursorPosition = null;
        room.updatePresence({
          cursor: null,
        });
      }
    });

    document.addEventListener("scroll", () => {
      if (lastCursorPosition) {
        const offsetX = window.scrollX - scroll.x;
        const offsetY = window.scrollY - scroll.y;
        const position = {
          x: lastCursorPosition.x + offsetX,
          y: lastCursorPosition.y + offsetY,
        };
        lastCursorPosition = position;
        room.updatePresence({
          cursor: {
            x: position.x / window.innerWidth,
            y: position.y,
          },
        });
      }
      scroll.x = window.scrollX;
      scroll.y = window.scrollY;
    });
  });

  onDestroy(() => {
    if (client && room) {
      client.leave(roomId);
    }
  });
</script>

<div class="absolute top-0 left-0 h-full w-full overflow-hidden">
  {#if others}
    {#each [...others] as { connectionId, presence } (connectionId)}
      {#if presence?.cursor}
        <Cursor
          color={COLORS[connectionId % COLORS.length]}
          x={presence.cursor.x * window.innerWidth}
          y={presence.cursor.y}
        >
          <slot />
        </Cursor>
      {/if}
    {/each}
  {/if}
</div>

<style>
</style>
