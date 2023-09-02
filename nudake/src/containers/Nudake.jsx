import { useEffect } from "react";
import "../styles/containers/Nudake.css";
import { useRef } from "react";

import image1 from "../assets/nudake-1.jpg";
import image2 from "../assets/nudake-2.jpg";
import image3 from "../assets/nudake-3.jpg";

const Nudake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    const imageSrcs = [image1, image2, image3];
    let currentIndex = 0;

    let canvasWidh, canvasHeight;

    function resize() {
      canvasWidh = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;

      canvas.style.width = canvasWidh + "px";
      canvas.style.height = canvasHeight + "px";

      canvas.width = canvasWidh;
      canvas.height = canvasHeight;

      drawImage();
    }

    function drawImage() {
      ctx.clearRect(0, 0, canvasWidh, canvasHeight);
      const image = new Image();
      image.src = imageSrcs[currentIndex];
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvasWidh, canvasHeight);
      };
    }

    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="nudake">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default Nudake;
