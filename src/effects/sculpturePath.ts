/** Simplified classical bust silhouette — vector path only, no raster. */
export const BUST_VIEWBOX = { w: 400, h: 520 };

export const BUST_PATH =
  'M 200 58 ' +
  'C 268 58 318 98 328 162 ' +
  'C 336 210 328 252 312 288 ' +
  'C 338 302 358 334 352 372 ' +
  'C 346 402 322 424 292 438 ' +
  'C 318 452 342 478 358 510 ' +
  'L 42 510 ' +
  'C 58 478 82 452 108 438 ' +
  'C 78 424 54 402 48 372 ' +
  'C 42 334 62 302 88 288 ' +
  'C 72 252 64 210 72 162 ' +
  'C 82 98 132 58 200 58 Z';

/** Inner contour guides — hairline wireframe detail */
export const BUST_WIREFRAME_LINES = [
  'M 200 90 C 240 92 268 120 272 158',
  'M 200 90 C 160 92 132 120 128 158',
  'M 200 130 C 230 132 248 158 246 188',
  'M 200 130 C 170 132 152 158 154 188',
  'M 200 200 L 200 268',
  'M 168 248 C 184 262 216 262 232 248',
  'M 148 310 C 172 328 228 328 252 310',
  'M 120 380 C 160 400 240 400 280 380',
];
