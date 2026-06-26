// Singleton registry so ParticleScrollFlow can reach individual word canvases
// without prop-drilling. Runs client-side only.

export interface ParticleHandle {
  /** Home positions + current live positions (canvas-local px) */
  getParticles(): {
    count: number;
    homeX: Float32Array;
    homeY: Float32Array;
    size:  Float32Array;
    phase: Float32Array;
  } | null;
  /** Bounding rect of the canvas in the viewport at this moment */
  getCanvasRect(): DOMRect | null;
  /** 0 = invisible, 1 = fully visible (canvas + fallback) */
  setAlpha(v: number): void;
}

const _reg = new Map<string, ParticleHandle>();

export const registerParticle   = (id: string, h: ParticleHandle) => _reg.set(id, h);
export const unregisterParticle = (id: string)                     => _reg.delete(id);
export const getParticle        = (id: string): ParticleHandle | null => _reg.get(id) ?? null;
