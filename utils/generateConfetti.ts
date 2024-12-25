import confetti from "canvas-confetti";


export const handleConfetti = (): void => {
    const end = Date.now() + 3 * 1000;
    const colors = [
      "#a786ff", "#fd8bbc", "#eca184", "#f8deb1", "#ff6f61",
      "#ffe135", "#78c6a3", "#6ec5ff", "#ff9cee", "#ffcc33",
      "#ff7f50", "#b19cd9",
    ];
 
    const frame = () => {
      if (Date.now() > end) return;
 
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
 
      requestAnimationFrame(frame);
    };
 
    frame();
};