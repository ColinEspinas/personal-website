<script type="ts">
  import { onDestroy, onMount } from "svelte";
  import { createClient } from "@liveblocks/client";
  import Cursor from "../atoms/Cursor.svelte";

  const COLORS = ["#DC2626", "#D97706", "#059669", "#7C3AED", "#DB2777"];

  let client;
  let room;
  let roomId = "main";

  // let myPresence;
  let others;

  onMount(() => {
    // Create a Liveblocks client
    // Replace this key with your public key provided at
    // https://liveblocks.io/dashboard/projects/{projectId}/apikeys
    client = createClient({
      publicApiKey:
        "pk_dev_i5EKJHiYBrhx0MzytNZA-K9Dwj5QTAvvCGf71slWYZk5rFrmia3y9z10y9ZB5IDD",
    });

    try {
      room = client.enter("main", { initialPresence: {} });
    } catch (err) {
      console.log(err);
    }

    // myPresence = room.getPresence();
    others = room.getOthers();

    // Subscribe to further changes

    // room.subscribe("my-presence", (presence) => {
    //   myPresence = presence;
    // });

    room.subscribe("others", (otherUsers) => {
      others = otherUsers;
      console.log(others);
    });

    document.addEventListener("pointermove", (event) => {
      event.preventDefault();
      console.log("move");
      if (room) {
        const cursor = {
          x: Math.round(event.pageX),
          y: Math.round(event.pageY),
        };
        room.updatePresence({
          cursor,
        });
        console.log(cursor);
      }
    });

    document.addEventListener("pointerleave", () => {
      if (room)
        room.updatePresence({
          cursor: null,
        });
    });
  });

  // Unsubscribe when unmounting
  onDestroy(() => {
    if (client && room) {
      client.leave(roomId);
    }
  });
</script>

<div class="absolute top-0 left-0">
  {#if others}
    {#each [...others] as { connectionId, presence } (connectionId)}
      {#if presence?.cursor}
        <Cursor
          color={COLORS[connectionId % COLORS.length]}
          x={presence.cursor.x}
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
