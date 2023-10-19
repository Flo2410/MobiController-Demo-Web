import { ColorRGBA, Joy } from "@/types/roslib.type";
import { Ros, Topic } from "roslib";

export const ros = new Ros({
  url: "ws://10.69.42.125:9090",
  // url: "ws://10.94.160.59:9090",
  // url: "ws://10.94.160.190:9090",
});

ros.on("connection", () => {
  console.log("Connected to websocket server.");
});

ros.on("error", (error) => {
  console.log("Error connecting to websocket server: ", error);
});

ros.on("close", () => {
  console.log("Connection to websocket server closed.");
});

export const on_lux = (cb: (msg: any) => void) => {
  const sub = new Topic({
    ros: ros,
    name: "mobictl/illuminance",
    messageType: "sensor_msgs/Illuminance",
  });

  sub.subscribe(cb);
};

// --------------------------------------------------------------------------------------



export let empty_joy: Joy = {
  header: {
    frame_id: "",
    stamp: new Date()
  },

  axes: [0, 0, 0, 0, 0, 0],
  buttons: [0, 0, 0, 0, 0, 0, 0, 0]
};

export let last_joy: Joy = Object(empty_joy);

export const send_joy = ()=> {
  const pub = new Topic({
    ros: ros,
    name: "web/joy",
    messageType: "sensor_msgs/Joy",
  });
  // last_joy = {...last_joy, ...msg};
  pub.publish(last_joy);
};


export const send_color = (color: ColorRGBA) => {
  const pub = new Topic({
    ros: ros,
    name: "web/color",
    messageType: "std_msgs/ColorRGBA",
  });
  // last_joy = {...last_joy, ...msg};
  pub.publish(color);
}