"use client";
import useGamepadEvents from "@beskar-labs/use-gamepad-events";
import { useState } from "react";
import { last_joy, send_color, send_joy } from "@/helper/rosbridge";
import { RgbaColorPicker } from "react-colorful";

const Home = () => {
  const [color, setColor] = useState({ r: 0, g: 255, b: 255, a: 0 });

  const gamepadEvents = useGamepadEvents({
    onConnect: () => console.log(`Gamepad connected`),
    onDisconnect: () => console.log("Gamepad disconnected"),
    onReady: (gamepad) => console.log("Gamepad ready"),
  });

  gamepadEvents.on("leftStick", (value) => {
    last_joy.axes[0] = value.x;
    last_joy.axes[1] = value.y;
    send_joy();
  });

  gamepadEvents.on("rightStick", (value) => {
    last_joy.axes[2] = value.x;
    last_joy.axes[3] = value.y;
    send_joy();
  });

  gamepadEvents.on("l2", (value) => {
    last_joy.axes[4] = value;
    send_joy();
  });

  gamepadEvents.on("r2", (value) => {
    last_joy.axes[5] = value;
    send_joy();
  });

  gamepadEvents.on("a", (value) => {
    last_joy.buttons[0] = Number(value);
    send_joy();
  });

  gamepadEvents.on("b", (value) => {
    last_joy.buttons[1] = Number(value);
    send_joy();
  });

  gamepadEvents.on("x", (value) => {
    last_joy.buttons[2] = Number(value);
    send_joy();
  });

  gamepadEvents.on("y", (value) => {
    last_joy.buttons[3] = Number(value);
    send_joy();
  });

  gamepadEvents.on("up", (value) => {
    last_joy.buttons[4] = Number(value);
    send_joy();
  });

  gamepadEvents.on("down", (value) => {
    last_joy.buttons[5] = Number(value);
    send_joy();
  });

  gamepadEvents.on("left", (value) => {
    last_joy.buttons[6] = Number(value);
    send_joy();
  });

  gamepadEvents.on("right", (value) => {
    last_joy.buttons[7] = Number(value);
    send_joy();
  });

  // a: 0
  // b: 1
  // x: 2
  // y: 3
  // l1: 4
  // r1: 5
  // share: 8
  // options: 9
  // l3: 10
  // r3: 11
  // up: 12
  // down: 13
  // left: 14
  // right: 15
  // back: 16

  return (
    <div className="p-2">
      <RgbaColorPicker
        color={(() => {
          return { ...color, ...{ a: 1 - color.a / 255 } };
        })()}
        onChange={(new_color) => {
          new_color.a = 255 - new_color.a * 255;
          setColor(new_color);
          send_color(color);
        }}
      />
      <div className="value">{JSON.stringify(color)}</div>
    </div>
  );
};

export default Home;
