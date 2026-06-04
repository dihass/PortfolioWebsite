"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060912, 0.07);

    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Cool digital lights
    const cyanLight = new THREE.PointLight(0x00c8ff, 2.5, 25);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);
    const purpleLight = new THREE.PointLight(0xa855f7, 1.5, 20);
    purpleLight.position.set(-5, -3, -5);
    scene.add(purpleLight);
    scene.add(new THREE.AmbientLight(0x0a1428, 0.8));

    // Digital grid floor
    const grid1 = new THREE.GridHelper(40, 40, 0x001428, 0x001428);
    grid1.position.y = -3.5;
    scene.add(grid1);
    const grid2 = new THREE.GridHelper(60, 12, 0x000c1e, 0x000c1e);
    grid2.position.y = -3.5;
    scene.add(grid2);

    // Wireframe digital geometry
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00c8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const dimMat = new THREE.MeshBasicMaterial({
      color: 0x0a1e3a,
      wireframe: false,
    });

    const geoIco = new THREE.IcosahedronGeometry(1, 1);
    const geoOct = new THREE.OctahedronGeometry(1, 0);

    const shapes = [
      { geo: geoIco, pos: [4, 0.5, -2] as [number,number,number], scale: 1.3, speed: 0.25, wire: true },
      { geo: geoOct, pos: [-3.5, -1, -3] as [number,number,number], scale: 0.8, speed: 0.4, wire: true },
      { geo: geoIco, pos: [1.5, 2.5, -4] as [number,number,number], scale: 0.55, speed: 0.6, wire: true },
      { geo: geoIco, pos: [0, 0, -5.5] as [number,number,number], scale: 2.8, speed: 0.1, wire: false },
    ];

    const meshes = shapes.map(({ geo, pos, scale, wire }) => {
      const m = new THREE.Mesh(geo, wire ? wireMat : dimMat);
      m.position.set(...pos);
      m.scale.setScalar(scale);
      scene.add(m);
      return m;
    });

    // Data particles — mix of cyan and purple
    const count = 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      if (Math.random() > 0.75) {
        colors[i*3] = 0.66; colors[i*3+1] = 0.33; colors[i*3+2] = 0.97; // purple
      } else {
        colors[i*3] = 0;    colors[i*3+1] = 0.78; colors[i*3+2] = 1.0;  // cyan
      }
    }
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    ptGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const ptMat = new THREE.PointsMaterial({ vertexColors: true, size: 0.035, transparent: true, opacity: 0.35 });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMouseMove);

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

      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      meshes.forEach((m, i) => {
        const d = shapes[i];
        m.rotation.x = t * d.speed * 0.4;
        m.rotation.y = t * d.speed * 0.6;
        m.position.y = d.pos[1] + Math.sin(t * d.speed * 0.5) * 0.3;
        m.position.x = d.pos[0] + mouse.x;
        m.position.z = d.pos[2] + mouse.y * 0.5;
      });

      points.rotation.y = t * 0.018;
      points.rotation.x = t * 0.009;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geoIco.dispose(); geoOct.dispose(); ptGeo.dispose();
      wireMat.dispose(); dimMat.dispose(); ptMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
