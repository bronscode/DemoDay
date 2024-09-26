export interface Vector2D {
	x: number;
	y: number;
}

export function randomVec() {
	return fromAngle(Math.random() * Math.PI * 2)
}

export function scalarMult(vec: Vector2D, scalar: number) {
	return {
		x: vec.x * scalar,
		y: vec.y * scalar
	}
}

export function scalarDiv(vec: Vector2D, scalar: number) {
	return {
		x: vec.x / scalar,
		y: vec.y / scalar
	}
}

export function add(vec1: Vector2D, vec2: Vector2D) {
	return  {
    x: vec1.x + vec2.x,
    y: vec1.y + vec2.y
	}
}

export function addDir(vec1: Vector2D, vec2: Vector2D) {
	return normalize(add(vec1, vec2));
}

export function subtract(vec1: Vector2D, vec2: Vector2D) {
	return  {
    x: vec1.x - vec2.x,
    y: vec1.y - vec2.y
	}
}

export function normalize(vec: Vector2D) {
	const norm = distance({x: 0, y: 0}, vec);
	return scalarDiv(vec, norm);
}

export function distance(vec1: Vector2D, vec2: Vector2D): number {
  return Math.sqrt((vec1.x - vec2.x) ** 2 + (vec1.y - vec2.y) ** 2);
}

export function fromAngle(angle: number) {
	const x = Math.cos(angle * Math.PI * 2);
  const y = Math.sin(angle * Math.PI * 2);

  return {
    x,
    y,
  };
}

export function magnitude(vec: Vector2D) {
	return Math.sqrt(vec.x ** 2 + vec.y ** 2);
}