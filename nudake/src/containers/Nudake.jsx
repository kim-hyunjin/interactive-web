import { useEffect } from "react";
import "../styles/containers/Nudake.css";
import { useRef } from "react";

const Nudake = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasParent = canvas.parentNode;
    const ctx = canvas.getContext("2d");

    let canvasWidh, canvasHeight;

    function resize() {
      canvasWidh = canvasParent.clientWidth;
      canvasHeight = canvasParent.clientHeight;

      canvas.style.width = canvasWidh + "px";
      canvas.style.height = canvasHeight + "px";

      canvas.width = canvasWidh;
      canvas.height = canvasHeight;
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
