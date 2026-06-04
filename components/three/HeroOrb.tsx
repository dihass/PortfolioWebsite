"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

export default function HeroOrb() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = canvasRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 6;

    scene.add(new THREE.AmbientLight(0x060810, 1));
    const cyanPt = new THREE.PointLight(0x00c8ff, 4, 14);
    cyanPt.position.set(2, 1, 4);
    scene.add(cyanPt);
    const greenPt = new THREE.PointLight(0x00ff88, 2.5, 12);
    greenPt.position.set(-2, 2, 2);
    scene.add(greenPt);
    const goldPt = new THREE.PointLight(0xc8a94e, 3.5, 8);
    goldPt.position.set(0, 0, 3.5);
    scene.add(goldPt);

    const group = new THREE.Group();
    scene.add(group);

    // ── Inner glow: gold core → cyan halo ──
    const gc = document.createElement("canvas");
    gc.width = 256; gc.height = 256;
    const ctx = gc.getContext("2d")!;
    const radGrad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    radGrad.addColorStop(0,    "rgba(200,169,78,0.95)");
    radGrad.addColorStop(0.12, "rgba(200,169,78,0.5)");
    radGrad.addColorStop(0.3,  "rgba(0,200,255,0.2)");
    radGrad.addColorStop(0.65, "rgba(0,200,255,0.05)");
    radGrad.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.fillStyle = radGrad; ctx.fillRect(0, 0, 256, 256);
    const glowTex = new THREE.CanvasTexture(gc);
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex, transparent: true,
      blending: THREE.AdditiveBlending, opacity: 0.55,
    });
    const glowSprite = new THREE.Sprite(glowMat);
    glowSprite.scale.set(4.5, 4.5, 1);
    group.add(glowSprite);

    // ── Outer neon green data-stream glow ──
    const gc2 = document.createElement("canvas");
    gc2.width = 256; gc2.height = 256;
    const ctx2 = gc2.getContext("2d")!;
    const radGrad2 = ctx2.createRadialGradient(128, 128, 0, 128, 128, 128);
    radGrad2.addColorStop(0,   "rgba(0,255,136,0.0)");
    radGrad2.addColorStop(0.5, "rgba(0,255,136,0.06)");
    radGrad2.addColorStop(0.8, "rgba(0,255,136,0.10)");
    radGrad2.addColorStop(1,   "rgba(0,0,0,0)");
    ctx2.fillStyle = radGrad2; ctx2.fillRect(0, 0, 256, 256);
    const glowTex2 = new THREE.CanvasTexture(gc2);
    const glowMat2 = new THREE.SpriteMaterial({
      map: glowTex2, transparent: true,
      blending: THREE.AdditiveBlending, opacity: 0.35,
    });
    const glowSprite2 = new THREE.Sprite(glowMat2);
    glowSprite2.scale.set(8, 8, 1);
    group.add(glowSprite2);

    // ── Neural network sphere ──
    const N = 85;
    const SPHERE_R = 1.85;
    const CONNECT_DIST = 0.88;

    const nodePts: THREE.Vector3[] = [];
    for (let i = 0; i < N; i++) {
      const yNorm = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - yNorm * yNorm));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      nodePts.push(new THREE.Vector3(
        Math.cos(theta) * r * SPHERE_R,
        yNorm * SPHERE_R,
        Math.sin(theta) * r * SPHERE_R
      ));
    }

    // 0 = cyan (network), 1 = green (code), 2 = gold (consciousness)
    const nodeTypes = new Uint8Array(N);
    const goldSet = new Set([0, 10, 21, 32, 42, 52, 63, 74]);
    for (let i = 0; i < N; i++) {
      if (goldSet.has(i)) nodeTypes[i] = 2;
      else if (i % 5 === 2 || i % 11 === 3) nodeTypes[i] = 1;
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        if (nodePts[i].distanceTo(nodePts[j]) < CONNECT_DIST) {
          edges.push([i, j]);
        }
      }
    }

    // Pre-compute edge type from connected node types
    const edgeTypes = new Uint8Array(edges.length);
    edges.forEach(([a, b], idx) => {
      if (nodeTypes[a] === 2 || nodeTypes[b] === 2) edgeTypes[idx] = 2;
      else if (nodeTypes[a] === 1 || nodeTypes[b] === 1) edgeTypes[idx] = 1;
    });

    // Node geometry
    const nodePos = new Float32Array(N * 3);
    const nodeColBuf = new Float32Array(N * 3);
    nodePts.forEach((p, i) => {
      nodePos[i*3] = p.x; nodePos[i*3+1] = p.y; nodePos[i*3+2] = p.z;
      if (nodeTypes[i] === 2) {
        nodeColBuf[i*3] = 0.22; nodeColBuf[i*3+1] = 0.16; nodeColBuf[i*3+2] = 0.02;
      } else if (nodeTypes[i] === 1) {
        nodeColBuf[i*3] = 0.0;  nodeColBuf[i*3+1] = 0.24; nodeColBuf[i*3+2] = 0.12;
      } else {
        nodeColBuf[i*3] = 0.0;  nodeColBuf[i*3+1] = 0.20; nodeColBuf[i*3+2] = 0.52;
      }
    });
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePos, 3));
    const nodeColorAttr = new THREE.BufferAttribute(nodeColBuf, 3);
    nodeGeo.setAttribute("color", nodeColorAttr);
    const nodesMesh = new THREE.Points(nodeGeo, new THREE.PointsMaterial({
      vertexColors: true, size: 0.08, sizeAttenuation: true,
    }));
    group.add(nodesMesh);

    // Edge geometry
    const edgePosBuf = new Float32Array(edges.length * 6);
    const edgeColBuf = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], idx) => {
      edgePosBuf[idx*6]   = nodePts[a].x; edgePosBuf[idx*6+1] = nodePts[a].y; edgePosBuf[idx*6+2] = nodePts[a].z;
      edgePosBuf[idx*6+3] = nodePts[b].x; edgePosBuf[idx*6+4] = nodePts[b].y; edgePosBuf[idx*6+5] = nodePts[b].z;
      if (edgeTypes[idx] === 2) {
        edgeColBuf[idx*6] = edgeColBuf[idx*6+3] = 0.14;
        edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.10;
        edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.01;
      } else if (edgeTypes[idx] === 1) {
        edgeColBuf[idx*6] = edgeColBuf[idx*6+3] = 0;
        edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.18;
        edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.08;
      } else {
        edgeColBuf[idx*6] = edgeColBuf[idx*6+3] = 0;
        edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.14;
        edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.38;
      }
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePosBuf, 3));
    const edgeColorAttr = new THREE.BufferAttribute(edgeColBuf, 3);
    edgeGeo.setAttribute("color", edgeColorAttr);
    const edgesMesh = new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, opacity: 0.9,
    }));
    group.add(edgesMesh);

    const energies = new Float32Array(N).fill(0);
    let lastFireTime = 0;

    // ── Gold consciousness core ──
    const coreGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xc8a94e, transparent: true, opacity: 0.35,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    group.add(new THREE.Mesh(coreGeo, coreMat));

    // Gold pulse ring
    const pulseGeo = new THREE.TorusGeometry(0.5, 0.006, 8, 80);
    const pulseMat = new THREE.MeshBasicMaterial({ color: 0xc8a94e, transparent: true, opacity: 0.7 });
    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.rotation.x = Math.PI / 2;
    group.add(pulseRing);

    // Cyan outer data orbit
    const orbitGeo = new THREE.TorusGeometry(2.3, 0.008, 8, 120);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x00c8ff, transparent: true, opacity: 0.14 });
    const orbitRing = new THREE.Mesh(orbitGeo, orbitMat);
    orbitRing.rotation.x = Math.PI / 4;
    group.add(orbitRing);

    // Green code orbit
    const orbit2Geo = new THREE.TorusGeometry(2.05, 0.006, 8, 100);
    const orbit2Mat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.20 });
    const orbitRing2 = new THREE.Mesh(orbit2Geo, orbit2Mat);
    orbitRing2.rotation.set(Math.PI / 3, Math.PI / 5, 0);
    group.add(orbitRing2);

    // Gold consciousness inner orbit
    const orbit3Geo = new THREE.TorusGeometry(1.72, 0.004, 8, 90);
    const orbit3Mat = new THREE.MeshBasicMaterial({ color: 0xc8a94e, transparent: true, opacity: 0.22 });
    const orbitRing3 = new THREE.Mesh(orbit3Geo, orbit3Mat);
    orbitRing3.rotation.set(-Math.PI / 4, Math.PI / 6, Math.PI / 3);
    group.add(orbitRing3);

    // Halo particles — mixed cyan/green
    const PTCOUNT = 300;
    const ptPos = new Float32Array(PTCOUNT * 3);
    const ptCol = new Float32Array(PTCOUNT * 3);
    for (let i = 0; i < PTCOUNT; i++) {
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      const r  = 2.0 + Math.random() * 1.6;
      ptPos[i*3]   = r * Math.sin(ph) * Math.cos(th);
      ptPos[i*3+1] = r * Math.sin(ph) * Math.sin(th);
      ptPos[i*3+2] = r * Math.cos(ph);
      if (i % 3 === 0) {
        ptCol[i*3] = 0; ptCol[i*3+1] = 0.55; ptCol[i*3+2] = 0.22;
      } else {
        ptCol[i*3] = 0; ptCol[i*3+1] = 0.45; ptCol[i*3+2] = 0.75;
      }
    }
    const halosGeo = new THREE.BufferGeometry();
    halosGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    halosGeo.setAttribute("color", new THREE.BufferAttribute(ptCol, 3));
    const halosMat = new THREE.PointsMaterial({ vertexColors: true, size: 0.025, transparent: true, opacity: 0.4 });
    const haloParticles = new THREE.Points(halosGeo, halosMat);
    group.add(haloParticles);

    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMM = (e: MouseEvent) => {
      tmx = (e.clientX / window.innerWidth  - 0.5) * 2;
      tmy = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMM);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      if (t - lastFireTime > 0.3 + Math.random() * 0.5) {
        lastFireTime = t;
        const burst = 2 + Math.floor(Math.random() * 3);
        for (let b = 0; b < burst; b++) {
          energies[Math.floor(Math.random() * N)] = 1.0;
        }
      }

      const next = new Float32Array(N);
      for (let i = 0; i < N; i++) next[i] = energies[i] * 0.9;
      edges.forEach(([a, b]) => {
        if (energies[a] > 0.35) next[b] = Math.max(next[b], energies[a] * 0.62);
        if (energies[b] > 0.35) next[a] = Math.max(next[a], energies[b] * 0.62);
      });
      energies.set(next);

      for (let i = 0; i < N; i++) {
        const e = energies[i];
        if (nodeTypes[i] === 2) {
          nodeColBuf[i*3]   = 0.22 + e * 0.78;
          nodeColBuf[i*3+1] = 0.16 + e * 0.54;
          nodeColBuf[i*3+2] = 0.02 + e * 0.08;
        } else if (nodeTypes[i] === 1) {
          nodeColBuf[i*3]   = 0.0  + e * 0.15;
          nodeColBuf[i*3+1] = 0.24 + e * 0.76;
          nodeColBuf[i*3+2] = 0.12 + e * 0.25;
        } else {
          nodeColBuf[i*3]   = 0.0  + e * 0.90;
          nodeColBuf[i*3+1] = 0.20 + e * 0.62;
          nodeColBuf[i*3+2] = 0.52 + e * 0.48;
        }
      }
      nodeColorAttr.needsUpdate = true;

      edges.forEach(([a, b], idx) => {
        const e = Math.max(energies[a], energies[b]);
        if (edgeTypes[idx] === 2) {
          edgeColBuf[idx*6]   = edgeColBuf[idx*6+3] = 0.14 + e * 0.75;
          edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.10 + e * 0.48;
          edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.01 + e * 0.06;
        } else if (edgeTypes[idx] === 1) {
          edgeColBuf[idx*6]   = edgeColBuf[idx*6+3] = 0.0  + e * 0.12;
          edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.18 + e * 0.82;
          edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.08 + e * 0.20;
        } else {
          edgeColBuf[idx*6]   = edgeColBuf[idx*6+3] = 0.0  + e * 0.70;
          edgeColBuf[idx*6+1] = edgeColBuf[idx*6+4] = 0.14 + e * 0.82;
          edgeColBuf[idx*6+2] = edgeColBuf[idx*6+5] = 0.38 + e * 0.52;
        }
      });
      edgeColorAttr.needsUpdate = true;

      const pulse = 0.5 + Math.sin(t * 2.2) * 0.5;
      coreMat.opacity = 0.22 + pulse * 0.28;
      pulseRing.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12);
      pulseMat.opacity = 0.5 + Math.sin(t * 2.2 + Math.PI) * 0.3;

      orbitRing.rotation.z  += 0.004;
      orbitRing2.rotation.z -= 0.005;
      orbitRing2.rotation.y += 0.003;
      orbitRing3.rotation.x += 0.006;
      orbitRing3.rotation.z -= 0.002;

      nodesMesh.rotation.y = t * 0.08;
      edgesMesh.rotation.y = t * 0.08;

      haloParticles.rotation.y = t * 0.04;
      haloParticles.rotation.x = t * 0.02;

      glowMat.opacity  = 0.42 + Math.sin(t * 1.3) * 0.12;
      glowMat2.opacity = 0.22 + Math.sin(t * 0.8 + 1) * 0.10;

      group.rotation.x += (my * 0.22 - group.rotation.x) * 0.04;
      group.rotation.y += (mx * 0.26 - group.rotation.y) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("resize", onResize);
      nodeGeo.dispose(); edgeGeo.dispose(); coreGeo.dispose();
      pulseGeo.dispose(); orbitGeo.dispose(); orbit2Geo.dispose(); orbit3Geo.dispose(); halosGeo.dispose();
      coreMat.dispose(); pulseMat.dispose(); orbitMat.dispose(); orbit2Mat.dispose(); orbit3Mat.dispose(); halosMat.dispose();
      glowTex.dispose(); glowMat.dispose(); glowTex2.dispose(); glowMat2.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:block relative w-[420px] h-[500px] flex-shrink-0"
    >
      <div ref={canvasRef} className="absolute inset-0" />

      {/* HUD chrome overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top corners gold — consciousness / uploaded state */}
        <div className="absolute top-3 left-3 w-7 h-7 border-t border-l border-[#c8a94e]/40" />
        <div className="absolute top-3 right-3 w-7 h-7 border-t border-r border-[#c8a94e]/40" />
        {/* Bottom corners cyan — network/data layer */}
        <div className="absolute bottom-3 left-3 w-7 h-7 border-b border-l border-[#00c8ff]/35" />
        <div className="absolute bottom-3 right-3 w-7 h-7 border-b border-r border-[#00c8ff]/35" />

        {/* Top label — gold for uploaded identity */}
        <div className="absolute top-5 left-0 right-0 flex justify-center">
          <span className="font-mono text-[9px] text-[#c8a94e]/55 tracking-[0.28em] uppercase">
            UID // DS_∞
          </span>
        </div>

        {/* Scanning line — neon green for active data processing */}
        <motion.div
          className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#00ff88]/22 to-transparent"
          animate={{ top: ["8%", "92%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
        />

        {/* Bottom status — green for system active */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-3">
          <div className="flex gap-[3px] items-end">
            {[6,8,5,9,7,8,6,4].map((h, i) => (
              <div key={i} className="w-[3px] bg-[#00ff88]/35" style={{ height: `${h}px` }} />
            ))}
          </div>
          <span className="font-mono text-[8px] text-[#00ff88]/40 tracking-[0.22em]">
            SIGNAL STABLE
          </span>
        </div>
      </div>
    </motion.div>
  );
}
