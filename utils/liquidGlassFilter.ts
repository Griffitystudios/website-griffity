// utils/liquidGlassFilter.ts
export function generateLiquidGlassMap(
  width: number,
  height: number,
  borderRadius: number,
  edgeThickness: number, // how many px inward the effect fades
  scale: number          // displacement strength
): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Distance to nearest edge (approximate SDF for rounded rect)
      const dx = Math.max(borderRadius - x, x - (width - borderRadius), 0);
      const dy = Math.max(borderRadius - y, y - (height - borderRadius), 0);
      
      // Distance from nearest border
      const distToCornerCenter = Math.sqrt(dx * dx + dy * dy);
      const distToEdge = Math.min(
        x,
        y,
        width - x,
        height - y,
        // corner contribution
        dx > 0 && dy > 0 ? borderRadius - distToCornerCenter : Infinity
      );

      // Normalized 0..1 where 0=at border, 1=beyond edgeThickness (center)
      const t = Math.min(distToEdge / edgeThickness, 1);
      // Smooth falloff (ease-in so edge is sharp, center neutral)
      const falloff = 1 - (t * t * (3 - 2 * t));

      
      // Direction: outward normal from nearest border point
      let nx = 0, ny = 0;
      if (dx > 0 && dy > 0) {
        // Corner: normal points diagonally outward
        const len = distToCornerCenter || 1;
        nx = dx / len;
        ny = dy / len;
      } else {
        // Flat sides: normal is axis-aligned
        const dists = [x, width - x, y, height - y];
        const min = Math.min(...dists);
        if (min === x)          nx = -1;
        else if (min === width - x) nx = 1;
        else if (min === y)     ny = -1;
        else                    ny = 1;
      }

      // Map to color: 128 = neutral, push outward = toward 0 or 255
      const r = Math.round(128 + nx * falloff * 127); // x displacement
      const g = Math.round(128 + ny * falloff * 127); // y displacement
      const idx = (y * width + x) * 4;
      img.data[idx]     = r;
      img.data[idx + 1] = g;
      img.data[idx + 2] = 128;
      img.data[idx + 3] = 255;
    }
  }

ctx.putImageData(img, 0, 0);

// Blur the displacement map slightly to soften transitions
const tempCanvas = document.createElement("canvas");
tempCanvas.width = width;
tempCanvas.height = height;
const tCtx = tempCanvas.getContext("2d")!;
tCtx.filter = `blur(${Math.round(edgeThickness * 0.18)}px)`;
tCtx.drawImage(canvas, 0, 0);

return tempCanvas.toDataURL("image/png");
}