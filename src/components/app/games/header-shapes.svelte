<script lang="ts">
  import { onMount } from "svelte";
  import Two from "two.js";
  import {
    Engine,
    Bodies,
    Body,
    Mouse,
    MouseConstraint,
    Constraint,
    Composite,
    Runner,
  } from "matter-js";

  let parent: HTMLElement;

  const distance = (a, b) => {
    // console.log(a, b);
    return Math.abs(((b.x - a.x) ^ 2) + ((b.y - a.y) ^ 2));
  };

  onMount(() => {
    const two = new Two({
      type: Two.Types.svg,
      fitted: true,
    }).appendTo(parent);

    const engine = Engine.create();

    let shapes = [];
    let addTries = 0;

    while (shapes.length < 10) {
      const w = 50;
      const h = 50;
      const minP = {
        x: parent.clientWidth / 3 + w / 2,
        y: h / 2,
      };
      const maxP = {
        x: (parent.clientWidth / 3) * 2 - w / 2,
        y: 150 - h / 2,
      };
      const p = {
        x: Math.random() * (maxP.x - minP.x) + minP.x,
        y: Math.random() * (maxP.y - minP.y) + minP.y,
      };

      let overlaying = false;
      for (const shape of shapes) {
        if (distance(p, shape.body.position) < w + 20) {
          console.log(distance(p, shape.body.position));
          overlaying = true;
          break;
        }
        ++addTries;
      }
      if (addTries > 1000) break;
      if (overlaying) continue;

      if (Math.random() < 0.5) {
        let draw = two.makeRoundedRectangle(p.x, p.y, w, h, 10);
        draw.fill = "#E9E8F8";
        draw.rotation = Math.random() * 45;
        draw.noStroke();

        let body = Bodies.rectangle(p.x, p.y, w, h, {
          chamfer: { radius: 10 },
        });
        Body.setAngle(body, draw.rotation);

        let constraint = Constraint.create({
          pointA: { x: p.x, y: p.y },
          bodyB: body,
          length: 4,
          stiffness: 0.01,
          damping: 0.05,
        });

        shapes.push({ draw, body, constraint });
      } else {
        let draw = two.makeCircle(p.x, p.y, w / 2);
        draw.fill = "#E9E8F8";
        draw.noStroke();

        let body = Bodies.circle(p.x, p.y, w / 2);

        let constraint = Constraint.create({
          pointA: { x: p.x, y: p.y },
          bodyB: body,
          length: 0,
          stiffness: 0.01,
          damping: 0.05,
        });

        shapes.push({ draw, body, constraint });
      }
    }

    Composite.add(engine.world, [
      ...shapes.map((shape) => shape.body),
      ...shapes.map((shape) => shape.constraint),
    ]);

    const mouse = Mouse.create(parent),
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          // allow bodies on mouse to rotate
          angularStiffness: 0,
          render: {
            visible: false,
          },
        },
      });

    mouseConstraint.mouse.element.removeEventListener(
      "mousewheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );

    Composite.add(engine.world, mouseConstraint);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    const update = () => {
      for (const shape of shapes) {
        shape.draw.position.x = shape.body.position.x;
        shape.draw.position.y = shape.body.position.y;
        shape.draw.rotation = shape.body.angle;
      }
    };
    two.bind("update", update);
    two.play();
  });
</script>

<div class="header-shapes" bind:this={parent} />

<style>
  .header-shapes {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100vh;
    width: calc(100vw - 25px);
    margin-top: -150px;
    transform: translateX(-50%);
    z-index: -1;
    user-select: none;
  }
</style>
