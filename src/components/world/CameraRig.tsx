import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";
import { useWorld, type Focus, type Phase } from "@/lib/store";

const POSES: Record<Focus | "door", { pos: [number, number, number]; look: [number, number, number] }> = {
  door: { pos: [0, 1.5, 4.72], look: [0, 1.28, 2.55] },
  overview: { pos: [0.12, 1.62, 2.18], look: [0.04, 1.08, -1.45] },
  // Straight-on, facing the left-wall shelf so every labeled book is readable.
  bookshelf: { pos: [0.05, 1.26, -1.14], look: [-3.28, 1.24, -1.14] },
  desk: { pos: [0.55, 1.38, 0.75], look: [2.65, 1.12, -0.95] },
  window: { pos: [0.0, 1.48, -0.15], look: [0.0, 1.55, -7.4] },
  bed: { pos: [0.15, 1.28, 1.45], look: [-2.0, 0.72, 0.15] },
};

function poseFor(phase: Phase, focus: Focus) {
  if (phase === "boot" || phase === "door") return POSES.door;
  return POSES[focus];
}

export function CameraRig() {
  const { camera } = useThree();
  const focus = useWorld((s) => s.focus);
  const phase = useWorld((s) => s.phase);
  const reduceMotion = useWorld((s) => s.reduceMotion);
  const look = useRef(new THREE.Vector3(0, 1.28, 2.55));
  const base = useRef(new THREE.Vector3(0, 1.5, 4.72));
  const tweening = useRef(false);

  useEffect(() => {
    const pose = poseFor(phase, focus);
    const duration = reduceMotion ? 0.25 : phase === "entering" ? 3.4 : 2.15;
    tweening.current = true;
    useWorld.getState().setTransitioning(true);
    const tl = gsap.timeline({
      onComplete: () => {
        tweening.current = false;
        base.current.set(pose.pos[0], pose.pos[1], pose.pos[2]);
        useWorld.getState().setTransitioning(false);
        if (phase === "entering") {
          useWorld.getState().setPhase("room");
          window.setTimeout(() => useWorld.getState().setIntroTitle(false), 2800);
        }
      },
    });
    tl.to(camera.position, { x: pose.pos[0], y: pose.pos[1], z: pose.pos[2], duration, ease: "power3.inOut" }, 0);
    tl.to(look.current, { x: pose.look[0], y: pose.look[1], z: pose.look[2], duration, ease: "power3.inOut" }, 0);
    return () => {
      tl.kill();
    };
  }, [camera, focus, phase, reduceMotion]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.1);
    camera.lookAt(look.current);
    if (tweening.current) return;
    if (useWorld.getState().openBook || useWorld.getState().desktopOpen) return;
    const px = state.pointer.x * 0.1;
    const py = state.pointer.y * 0.05;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, base.current.x + px, 1.6, d);
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      base.current.y + py + Math.sin(state.clock.elapsedTime * 0.4) * 0.012,
      1.6,
      d,
    );
  });

  return null;
}
