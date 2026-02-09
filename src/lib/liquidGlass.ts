// Liquid Glass Surface Functions
// Based on https://kube.io/blog/liquid-glass-css-svg/

export type SurfaceType = "convex" | "squircle" | "concave" | "lip";

// Surface height functions
export const surfaceFunctions = {
  // Convex Circle: y = sqrt(1 - (1-x)^2)
  convex: (x: number): number => {
    return Math.sqrt(1 - Math.pow(1 - x, 2));
  },

  // Convex Squircle (Apple's preferred): y = (1 - (1-x)^4)^(1/4)
  squircle: (x: number): number => {
    return Math.pow(1 - Math.pow(1 - x, 4), 1 / 4);
  },

  // Concave: Complement of convex
  concave: (x: number): number => {
    return 1 - Math.sqrt(1 - Math.pow(1 - x, 2));
  },

  // Lip: Mix of convex and concave via smootherstep
  lip: (x: number): number => {
    const convex = Math.sqrt(1 - Math.pow(1 - x, 2));
    const concave = 1 - convex;
    const t = smootherstep(x);
    return convex * (1 - t) + concave * t;
  },
};

// Smootherstep function: 6x^5 - 15x^4 + 10x^3
function smootherstep(x: number): number {
  return x * x * x * (x * (x * 6 - 15) + 10);
}

// Calculate surface normal (derivative rotated -90 degrees)
export function calculateNormal(
  x: number,
  surfaceFn: (x: number) => number,
  delta: number = 0.001
): { x: number; y: number } {
  const y1 = surfaceFn(Math.max(0, x - delta));
  const y2 = surfaceFn(Math.min(1, x + delta));
  const derivative = (y2 - y1) / (2 * delta);
  // Normal is derivative rotated -90 degrees
  return {
    x: -derivative,
    y: 1,
  };
}

// Snell's Law: n1 * sin(theta1) = n2 * sin(theta2)
// Returns refracted angle
export function snellLaw(
  incidentAngle: number,
  n1: number = 1, // Air
  n2: number = 1.5 // Glass
): number {
  const sinTheta2 = (n1 / n2) * Math.sin(incidentAngle);
  // Check for total internal reflection
  if (Math.abs(sinTheta2) > 1) {
    return Math.PI - incidentAngle; // Reflect
  }
  return Math.asin(sinTheta2);
}

// Calculate displacement magnitude at a given distance from border
export function calculateDisplacement(
  distanceFromBorder: number,
  bezelWidth: number,
  glassThickness: number,
  surfaceFn: (x: number) => number
): number {
  if (distanceFromBorder >= bezelWidth) {
    return 0; // Flat surface, no displacement
  }

  // Normalize distance to [0, 1]
  const x = distanceFromBorder / bezelWidth;

  // Calculate normal
  const normal = calculateNormal(x, surfaceFn);
  
  // Calculate angle of incidence (angle between vertical ray and normal)
  const incidentAngle = Math.atan2(normal.x, normal.y);
  
  // Calculate refracted angle using Snell's law
  const refractedAngle = snellLaw(incidentAngle);
  
  // Calculate displacement
  // Light travels through glass, bends, then exits
  // For thin glass, displacement ≈ thickness * tan(refractedAngle)
  const displacement = glassThickness * Math.tan(refractedAngle);
  
  return displacement;
}

// Generate displacement map data for a circular object
export function generateDisplacementMap(
  size: number,
  bezelWidth: number,
  glassThickness: number,
  surfaceType: SurfaceType = "squircle"
): { 
  displacementMap: Uint8ClampedArray; 
  maxDisplacement: number;
  width: number;
  height: number;
} {
  const surfaceFn = surfaceFunctions[surfaceType];
  const samples = size;
  const center = size / 2;
  const maxRadius = size / 2;
  
  // Pre-calculate displacement magnitudes along one radius
  const displacementMagnitudes: number[] = [];
  
  for (let i = 0; i <= samples; i++) {
    const distFromBorder = (i / samples) * bezelWidth;
    const displacement = calculateDisplacement(
      distFromBorder,
      bezelWidth,
      glassThickness,
      surfaceFn
    );
    displacementMagnitudes.push(displacement);
  }
  
  // Find maximum displacement for normalization
  const maxDisplacement = Math.max(...displacementMagnitudes.map(Math.abs));
  
  // Create displacement map image data (RGBA)
  // R = X displacement (normalized to 0-255, 128 = center)
  // G = Y displacement (normalized to 0-255, 128 = center)
  // B = unused (set to 128)
  // A = unused (set to 255)
  const displacementMap = new Uint8ClampedArray(size * size * 4);
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      
      // Calculate distance from center
      const dx = x - center;
      const dy = y - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate distance from border (edge of circle)
      const distFromBorder = maxRadius - distance;
      
      if (distFromBorder > bezelWidth || distFromBorder < 0) {
        // Outside glass or in flat area - no displacement
        displacementMap[idx] = 128;     // R: neutral
        displacementMap[idx + 1] = 128; // G: neutral
        displacementMap[idx + 2] = 128; // B: neutral
        displacementMap[idx + 3] = 255; // A: opaque
        continue;
      }
      
      // Calculate displacement magnitude
      const normalizedDist = Math.max(0, Math.min(1, distFromBorder / bezelWidth));
      const displacementIdx = Math.floor(normalizedDist * samples);
      const displacement = displacementMagnitudes[displacementIdx] || 0;
      
      // Normalize displacement to [-1, 1] range
      const normalizedDisplacement = maxDisplacement > 0 
        ? displacement / maxDisplacement 
        : 0;
      
      // Calculate displacement direction (normal to border)
      // For a circle, direction is from center to point
      const angle = Math.atan2(dy, dx);
      
      // Convert to Cartesian
      const dispX = Math.cos(angle) * normalizedDisplacement;
      const dispY = Math.sin(angle) * normalizedDisplacement;
      
      // Convert to RGB (0-255, 128 = center/neutral)
      displacementMap[idx] = Math.round(128 + dispX * 127);     // R
      displacementMap[idx + 1] = Math.round(128 + dispY * 127); // G
      displacementMap[idx + 2] = 128;                          // B
      displacementMap[idx + 3] = 255;                          // A
    }
  }
  
  return {
    displacementMap,
    maxDisplacement,
    width: size,
    height: size,
  };
}

// Convert displacement map to data URL for SVG feImage
export function displacementMapToDataURL(
  displacementMap: Uint8ClampedArray,
  width: number,
  height: number
): string {
  // Create canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get canvas context");
  }

  // Put image data
  // Create ImageData from the typed array
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(displacementMap);
  ctx.putImageData(imageData, 0, 0);

  // Convert to data URL
  return canvas.toDataURL("image/png");
}

// Generate specular highlight map
export function generateSpecularMap(
  size: number,
  bezelWidth: number,
  surfaceType: SurfaceType = "squircle",
  lightAngle: number = -Math.PI / 3 // -60 degrees
): Uint8ClampedArray {
  const surfaceFn = surfaceFunctions[surfaceType];
  const center = size / 2;
  const maxRadius = size / 2;
  
  const specularMap = new Uint8ClampedArray(size * size * 4);
  
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      
      const dx = x - center;
      const dy = y - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const distFromBorder = maxRadius - distance;
      
      if (distFromBorder > bezelWidth || distFromBorder < 0) {
        // No specular in flat area or outside
        specularMap[idx] = 0;
        specularMap[idx + 1] = 0;
        specularMap[idx + 2] = 0;
        specularMap[idx + 3] = 0;
        continue;
      }
      
      // Calculate normal at this point
      const normalizedDist = distFromBorder / bezelWidth;
      const normal = calculateNormal(normalizedDist, surfaceFn);
      
      // Normalize normal
      const normalLen = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
      const nx = normal.x / normalLen;
      const ny = normal.y / normalLen;
      
      // Light direction (from light angle)
      const lx = Math.cos(lightAngle);
      const ly = Math.sin(lightAngle);
      
      // Calculate specular intensity (dot product)
      const intensity = Math.max(0, -(nx * lx + ny * ly));
      
      // Apply power for sharper highlight
      const specular = Math.pow(intensity, 4) * 255;
      
      specularMap[idx] = Math.round(specular);
      specularMap[idx + 1] = Math.round(specular);
      specularMap[idx + 2] = Math.round(specular);
      specularMap[idx + 3] = Math.round(specular * 0.5); // Semi-transparent
    }
  }
  
  return specularMap;
}
