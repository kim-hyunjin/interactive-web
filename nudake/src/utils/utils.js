export function getDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.sqrt(dx * dx + dy * dy);
}

export function getAngle(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;

  return Math.atan2(dy, dx);
}

export function getErasedPercentage(canvas) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const gap = 32;
  const total = data.length / gap;
  let erased = 0;

  for (let i = 0; i < data.length - 3; i += gap) {
    if (data[i + 3] === 0) {
      erased++;
    }
  }

  return Math.round((erased / total) * 100);
}
