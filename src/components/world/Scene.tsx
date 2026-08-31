import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import { CameraRig } from "./CameraRig";
import { getTextures, makeBookTexture, makePlaqueTexture } from "@/lib/textures";
import { BOOKS, type BookId } from "@/lib/portfolio-data";
import { useWorld } from "@/lib/store";
import { play } from "@/lib/audio";

const HW = 3.55;
const HD = 2.72;
const H = 2.7;
const WIN_W = 2.56;
const WIN_H = 1.78;
const WIN_Y = 1.52;

export function Scene() {
  const t = useMemo(() => getTextures(), []);
  const mats = useMemo(() => {
    const m = {
      floor: new THREE.MeshStandardMaterial({ map: t.floor, roughness: 0.38, metalness: 0.04 }),
      wood: new THREE.MeshStandardMaterial({ map: t.furniture, roughness: 0.5 }),
      wall: new THREE.MeshStandardMaterial({ color: "#e8dcc8", roughness: 0.92 }),
      ceiling: new THREE.MeshStandardMaterial({ color: "#d8cbb6", roughness: 1 }),
      blanket: new THREE.MeshStandardMaterial({ map: t.blanket, roughness: 0.8 }),
      throwM: new THREE.MeshStandardMaterial({ color: "#2f4a38", roughness: 0.82 }),
      pillow: new THREE.MeshStandardMaterial({ color: "#e8dcc8", roughness: 0.8 }),
      rug: new THREE.MeshStandardMaterial({ color: "#6a3d2a", roughness: 0.9 }),
      curtain: new THREE.MeshStandardMaterial({ color: "#efe6d4", roughness: 0.85, side: THREE.DoubleSide }),
      leather: new THREE.MeshStandardMaterial({ color: "#3a2418", roughness: 0.7 }),
      door: new THREE.MeshStandardMaterial({
        color: "#6b4423",
        roughness: 0.48,
        emissive: "#4a3018",
        emissiveIntensity: 0.28,
      }),
      plaster: new THREE.MeshStandardMaterial({ color: "#d8c4a4", roughness: 0.85 }),
      dark: new THREE.MeshStandardMaterial({ color: "#1a1612", roughness: 0.4 }),
      leaf: new THREE.MeshStandardMaterial({ color: "#2f4a38", roughness: 0.7 }),
      pot: new THREE.MeshStandardMaterial({ color: "#6b3a24", roughness: 0.8 }),
      metal: new THREE.MeshStandardMaterial({ color: "#c9a36a", metalness: 0.7, roughness: 0.25 }),
      cream: new THREE.MeshStandardMaterial({ color: "#f2ead8", roughness: 0.72 }),
      bark: new THREE.MeshStandardMaterial({ color: "#4a2a18", roughness: 0.85 }),
      canopy: new THREE.MeshStandardMaterial({ color: "#2f5a32", roughness: 0.78 }),
      grass: new THREE.MeshStandardMaterial({ color: "#5a7a38", roughness: 0.9 }),
    };
    return m;
  }, [t]);

  return (
    <>
      <CameraRig />
      <Atmosphere />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={mats.floor}>
        <planeGeometry args={[HW * 2 + 0.4, HD * 2 + 0.4]} />
      </mesh>
      <BackWall mats={mats} />
      <mesh position={[-HW, H / 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={mats.wall}>
        <boxGeometry args={[HD * 2, H, 0.12]} />
      </mesh>
      <mesh position={[HW, H / 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={mats.wall}>
        <boxGeometry args={[HD * 2, H, 0.12]} />
      </mesh>
      <mesh position={[0, H, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.ceiling}>
        <planeGeometry args={[HW * 2, HD * 2]} />
      </mesh>
      <CeilingLamp mats={mats} />
      <Door mats={mats} />
      <WindowWall mats={mats} />
      <Nature t={t} mats={mats} />
      <Bed mats={mats} />
      <Bookshelf mats={mats} />
      <Desk mats={mats} t={t} />
      <Plants mats={mats} />
      <mesh position={[0.15, 0.02, 0.15]} receiveShadow material={mats.rug}>
        <boxGeometry args={[2.6, 0.03, 1.7]} />
      </mesh>
      <Posters t={t} />
    </>
  );
}

function BackWall({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  const leftW = HW - WIN_W / 2;
  const leftX = -HW + leftW / 2;
  const rightX = HW - leftW / 2;
  const topH = H - (WIN_Y + WIN_H / 2);
  const topY = WIN_Y + WIN_H / 2 + topH / 2;
  const botH = WIN_Y - WIN_H / 2;
  const botY = botH / 2;
  return (
    <group>
      <mesh position={[leftX, H / 2, -HD]} receiveShadow material={mats.wall}>
        <boxGeometry args={[leftW, H, 0.12]} />
      </mesh>
      <mesh position={[rightX, H / 2, -HD]} receiveShadow material={mats.wall}>
        <boxGeometry args={[leftW, H, 0.12]} />
      </mesh>
      <mesh position={[0, topY, -HD]} receiveShadow material={mats.wall}>
        <boxGeometry args={[WIN_W, topH, 0.12]} />
      </mesh>
      <mesh position={[0, botY, -HD]} receiveShadow material={mats.wall}>
        <boxGeometry args={[WIN_W, botH, 0.12]} />
      </mesh>
    </group>
  );
}

function Atmosphere() {
  const mood = useWorld((s) => s.mood);
  const lampOn = useWorld((s) => s.lampOn);
  const rain = useWorld((s) => s.rain);
  const curtainsOpen = useWorld((s) => s.curtainsOpen);
  const night = mood === "night";
  const storm = mood === "storm" || rain;
  const sun = (night ? 0.22 : storm ? 0.85 : 3.5) * (curtainsOpen ? 1 : 0.55);
  const fog = night ? "#07080d" : storm ? "#161820" : "#1c140f";

  return (
    <>
      <color attach="background" args={[fog]} />
      <fog attach="fog" args={[fog, 14, 32]} />
      <hemisphereLight args={[night ? "#1a2238" : "#f0d2a0", "#3a2418", night ? 0.25 : 0.65]} />
      <ambientLight intensity={night ? 0.28 : 0.55} color={night ? "#6a7aaa" : "#ffd8a8"} />
      <directionalLight
        position={[1.2, 2.5, -6.2]}
        intensity={sun}
        color={storm ? "#9aa4b8" : "#ffd19a"}
        castShadow={useWorld.getState().quality === "high"}
      />
      <pointLight position={[0, 1.55, 4.15]} intensity={2.2} color="#f0c98a" distance={6} decay={2} />
      <pointLight position={[0, 1.8, 0.3]} intensity={0.7} color="#f0d2a0" distance={6} decay={2} />
      <pointLight position={[-2.15, 1.18, -1.42]} intensity={lampOn ? (night ? 2.2 : 0.9) : 0} color="#ffb060" distance={4.2} decay={2} />
      <pointLight position={[2.7, 1.15, -1.1]} intensity={night ? 1.0 : 0.4} color="#6ec8ff" distance={3} decay={2} />
      <pointLight position={[0, 2.45, 0]} intensity={0.55} color="#ffe6c0" distance={5} decay={2} />
      {!night && curtainsOpen && (
        <pointLight position={[0.4, 1.8, -3.6]} intensity={1.6} color="#ffd19a" distance={8} decay={2} />
      )}
      {!night && curtainsOpen && <GodRays storm={storm} />}
    </>
  );
}

function GodRays({ storm }: { storm: boolean }) {
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: storm ? "#c5d0e0" : "#ffd7a0",
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
    [storm],
  );
  return (
    <group position={[0.15, 1.55, -2.15]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0.18, (i - 1) * 0.1, 0]} position={[0, -0.1, 0.7 + i * 0.25]} material={mat}>
          <planeGeometry args={[1.3 + i * 0.15, 2.4]} />
        </mesh>
      ))}
    </group>
  );
}

function CeilingLamp({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  return (
    <group position={[0.1, H - 0.02, 0.1]}>
      <mesh material={mats.metal}>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.16, 0.22, 0.12, 16]} />
        <meshStandardMaterial color="#f4ead8" emissive="#ffd19a" emissiveIntensity={0.45} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Door({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  const group = useRef<THREE.Group>(null);
  const handle = useRef<THREE.Group>(null);
  const phase = useWorld((s) => s.phase);
  const doorOpen = useWorld((s) => s.doorOpen);
  const hovered = useWorld((s) => s.hovered) === "door";
  useCursor(hovered && phase === "door");

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, doorOpen ? -1.18 : 0, 1.4, d);
    if (handle.current) {
      handle.current.rotation.z = THREE.MathUtils.damp(handle.current.rotation.z, doorOpen ? -1.1 : 0, 3.2, d);
    }
  });

  const onDoor = () => {
    if (useWorld.getState().phase !== "door") return;
    play("creak", { rate: 0.9 });
    play("whoosh");
    useWorld.getState().openTheDoor();
  };

  return (
    <group position={[0, 0, HD - 0.06]}>
      <mesh position={[-1.2, 1.35, 1.15]} material={mats.wood}>
        <boxGeometry args={[0.1, 2.7, 2.3]} />
      </mesh>
      <mesh position={[1.2, 1.35, 1.15]} material={mats.wood}>
        <boxGeometry args={[0.1, 2.7, 2.3]} />
      </mesh>
      <mesh position={[0, 2.64, 1.15]} material={mats.ceiling}>
        <boxGeometry args={[2.5, 0.08, 2.3]} />
      </mesh>
      <mesh position={[0, 0.01, 1.15]} rotation={[-Math.PI / 2, 0, 0]} material={mats.wood}>
        <planeGeometry args={[2.4, 2.3]} />
      </mesh>
      <mesh position={[-1.55, H / 2, 0]} receiveShadow material={mats.plaster}>
        <boxGeometry args={[2.4, H, 0.12]} />
      </mesh>
      <mesh position={[1.55, H / 2, 0]} receiveShadow material={mats.plaster}>
        <boxGeometry args={[2.4, H, 0.12]} />
      </mesh>
      <mesh position={[0, 2.48, 0]} material={mats.plaster}>
        <boxGeometry args={[1.18, 0.44, 0.12]} />
      </mesh>
      <group ref={group} position={[-0.52, 0, 0.04]}>
        <mesh
          position={[0.52, 1.1, 0]}
          castShadow
          material={mats.door}
          onClick={(e) => {
            e.stopPropagation();
            onDoor();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            useWorld.getState().setHovered("door", "Open the door");
          }}
          onPointerOut={() => useWorld.getState().setHovered(null)}
        >
          <boxGeometry args={[1.04, 2.18, 0.07]} />
        </mesh>
        <group ref={handle} position={[0.92, 1.05, 0.06]}>
          <mesh
            material={mats.metal}
            onClick={(e) => {
              e.stopPropagation();
              onDoor();
            }}
          >
            <cylinderGeometry args={[0.025, 0.025, 0.08, 10]} />
          </mesh>
          <mesh position={[0.07, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={mats.metal}>
            <cylinderGeometry args={[0.016, 0.016, 0.14, 8]} />
          </mesh>
        </group>
      </group>
      {[-0.54, 0.54].map((x) => (
        <mesh key={x} position={[x, 1.1, 0.01]}>
          <boxGeometry args={[0.02, 2.16, 0.01]} />
          <meshBasicMaterial color="#ffd19a" transparent opacity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

function onWindowClick() {
  play("whoosh");
  const s = useWorld.getState();
  s.setFocus("window");
  s.toggleCurtains();
}

function WindowWall({
  mats,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
}) {
  const hovered = useWorld((s) => s.hovered) === "window";
  const open = useWorld((s) => s.curtainsOpen);
  useCursor(hovered);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const d = Math.min(delta, 0.1);
    if (left.current) {
      left.current.position.x = THREE.MathUtils.damp(left.current.position.x, open ? -1.52 : -0.66, 2.8, d);
      left.current.scale.x = THREE.MathUtils.damp(left.current.scale.x, open ? 0.26 : 1, 2.8, d);
    }
    if (right.current) {
      right.current.position.x = THREE.MathUtils.damp(right.current.position.x, open ? 1.52 : 0.66, 2.8, d);
      right.current.scale.x = THREE.MathUtils.damp(right.current.scale.x, open ? 0.26 : 1, 2.8, d);
    }
  });

  return (
    <group position={[0, 0, -HD + 0.06]}>
      <WindowFrame mats={mats} />
      <mesh
        position={[0, WIN_Y, 0.05]}
        onClick={(e) => {
          e.stopPropagation();
          onWindowClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          useWorld.getState().setHovered("window", open ? "Close the curtains" : "Open the curtains · look outside");
        }}
        onPointerOut={() => useWorld.getState().setHovered(null)}
      >
        <planeGeometry args={[WIN_W - 0.14, WIN_H - 0.14]} />
        <meshBasicMaterial color="#cfe6ff" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[0, WIN_Y, 0.07]} material={mats.cream}>
        <boxGeometry args={[0.045, WIN_H - 0.14, 0.03]} />
      </mesh>
      <mesh position={[0, WIN_Y - WIN_H / 2 + 0.04, 0.14]} material={mats.wood} castShadow>
        <boxGeometry args={[WIN_W + 0.34, 0.1, 0.28]} />
      </mesh>
      <mesh position={[0, WIN_Y + WIN_H / 2 + 0.06, 0.1]} material={mats.metal} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, WIN_W + 0.2, 8]} />
      </mesh>
      <group ref={left} position={[open ? -1.52 : -0.66, WIN_Y, 0.16]} scale={[open ? 0.26 : 1, 1, 1]}>
        <CurtainPanel mats={mats} />
      </group>
      <group ref={right} position={[open ? 1.52 : 0.66, WIN_Y, 0.16]} scale={[open ? 0.26 : 1, 1, 1]}>
        <CurtainPanel mats={mats} />
      </group>
      {!open && (
        <>
          <mesh position={[-1.28, WIN_Y, 0.05]}>
            <boxGeometry args={[0.03, WIN_H, 0.02]} />
            <meshBasicMaterial color="#ffd19a" transparent opacity={0.55} />
          </mesh>
          <mesh position={[1.28, WIN_Y, 0.05]}>
            <boxGeometry args={[0.03, WIN_H, 0.02]} />
            <meshBasicMaterial color="#ffd19a" transparent opacity={0.55} />
          </mesh>
        </>
      )}
      <SillPlants mats={mats} />
    </group>
  );
}

function WindowFrame({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  const outerW = WIN_W + 0.18;
  const outerH = WIN_H + 0.18;
  const bar = 0.09;
  return (
    <group position={[0, WIN_Y, 0.02]}>
      <mesh position={[-(outerW - bar) / 2, 0, 0]} material={mats.cream} castShadow>
        <boxGeometry args={[bar, outerH, 0.08]} />
      </mesh>
      <mesh position={[(outerW - bar) / 2, 0, 0]} material={mats.cream} castShadow>
        <boxGeometry args={[bar, outerH, 0.08]} />
      </mesh>
      <mesh position={[0, (outerH - bar) / 2, 0]} material={mats.cream} castShadow>
        <boxGeometry args={[outerW - bar * 2, bar, 0.08]} />
      </mesh>
      <mesh position={[0, -(outerH - bar) / 2, 0]} material={mats.cream} castShadow>
        <boxGeometry args={[outerW - bar * 2, bar, 0.08]} />
      </mesh>
    </group>
  );
}

function CurtainPanel({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        onWindowClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        const open = useWorld.getState().curtainsOpen;
        useWorld.getState().setHovered("window", open ? "Close the curtains" : "Open the curtains · look outside");
      }}
      onPointerOut={() => useWorld.getState().setHovered(null)}
    >
      <mesh material={mats.curtain} castShadow>
        <planeGeometry args={[1.38, WIN_H + 0.3]} />
      </mesh>
      <mesh position={[-0.28, 0, 0.012]} material={mats.curtain} castShadow>
        <planeGeometry args={[0.42, WIN_H + 0.32]} />
      </mesh>
      <mesh position={[0.28, 0, 0.012]} material={mats.curtain} castShadow>
        <planeGeometry args={[0.42, WIN_H + 0.32]} />
      </mesh>
    </group>
  );
}

function SillPlants({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  return (
    <group position={[0, WIN_Y - WIN_H / 2 + 0.12, 0.22]}>
      <Plant mats={mats} position={[-1.05, 0, 0]} scale={0.85} />
      <Plant mats={mats} position={[1.08, 0, 0]} scale={0.7} />
      <Plant mats={mats} position={[0.55, 0.02, 0.02]} scale={0.45} />
    </group>
  );
}

function Nature({
  t,
  mats,
}: {
  t: ReturnType<typeof getTextures>;
  mats: Record<string, THREE.MeshStandardMaterial>;
}) {
  const mood = useWorld((s) => s.mood);
  const rain = useWorld((s) => s.rain);
  const map = mood === "night" ? t.landNight : rain || mood === "storm" ? t.landStorm : t.landDay;
  const night = mood === "night";

  return (
    <group position={[0, 0, -HD - 0.2]}>
      <mesh position={[0, 1.55, -4.6]}>
        <planeGeometry args={[16, 9]} />
        <meshBasicMaterial map={map} toneMapped={false} fog={false} />
      </mesh>
      <mesh position={[0, -0.4, -2.8]} rotation={[-Math.PI / 2, 0, 0]} material={mats.grass}>
        <planeGeometry args={[12, 8]} />
      </mesh>
      <Tree mats={mats} position={[-2.15, 0, -1.55]} scale={1.2} />
      <Tree mats={mats} position={[2.25, 0, -1.7]} scale={1.4} />
      <Tree mats={mats} position={[-2.8, 0, -2.6]} scale={0.9} />
      <Tree mats={mats} position={[2.9, 0, -2.8]} scale={1.1} />
      <Tree mats={mats} position={[-1.7, 0, -3.4]} scale={0.65} />
      <Tree mats={mats} position={[1.85, 0, -3.6]} scale={0.7} />
      {!night && !rain && (
        <mesh position={[2.4, 2.55, -4.2]}>
          <sphereGeometry args={[0.28, 12, 10]} />
          <meshBasicMaterial color="#ffe7a8" fog={false} />
        </mesh>
      )}
      {night && (
        <mesh position={[2.6, 2.7, -4.2]}>
          <sphereGeometry args={[0.18, 12, 10]} />
          <meshBasicMaterial color="#f4ead8" />
        </mesh>
      )}
    </group>
  );
}

function Tree({
  mats,
  position,
  scale,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
  position: [number, number, number];
  scale: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.45, 0]} material={mats.bark} castShadow>
        <cylinderGeometry args={[0.06, 0.09, 0.9, 8]} />
      </mesh>
      <mesh position={[0, 1.05, 0]} material={mats.canopy} castShadow>
        <sphereGeometry args={[0.42, 10, 8]} />
      </mesh>
      <mesh position={[-0.22, 0.92, 0.08]} material={mats.leaf} castShadow>
        <sphereGeometry args={[0.28, 8, 6]} />
      </mesh>
      <mesh position={[0.2, 0.88, -0.06]} material={mats.leaf} castShadow>
        <sphereGeometry args={[0.24, 8, 6]} />
      </mesh>
    </group>
  );
}

function Bed({
  mats,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
}) {
  const hovered = useWorld((s) => s.hovered) === "bed";
  useCursor(hovered);
  const lampOn = useWorld((s) => s.lampOn);
  return (
    <group
      position={[-2.05, 0, 0.35]}
      onClick={(e) => {
        e.stopPropagation();
        useWorld.getState().setFocus("bed");
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        useWorld.getState().setHovered("bed", "A place to rest ideas");
      }}
      onPointerOut={() => useWorld.getState().setHovered(null)}
    >
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow material={mats.wood}>
        <boxGeometry args={[1.55, 0.28, 2.15]} />
      </mesh>
      <mesh position={[0, 0.48, 0]} castShadow material={mats.pillow}>
        <boxGeometry args={[1.48, 0.22, 2.05]} />
      </mesh>
      <mesh position={[0.02, 0.6, 0.12]} rotation={[0.04, 0.02, 0.01]} castShadow material={mats.blanket}>
        <boxGeometry args={[1.42, 0.1, 1.55]} />
      </mesh>
      <mesh position={[-0.28, 0.66, 0.05]} rotation={[0.08, -0.2, 0.04]} material={mats.throwM}>
        <boxGeometry args={[0.7, 0.08, 0.9]} />
      </mesh>
      <mesh position={[-0.32, 0.66, -0.78]} rotation={[0.2, 0.1, 0]} material={mats.pillow}>
        <boxGeometry args={[0.42, 0.16, 0.38]} />
      </mesh>
      <mesh position={[0.18, 0.64, -0.82]} rotation={[0.15, -0.2, 0.05]} material={mats.pillow}>
        <boxGeometry args={[0.36, 0.14, 0.32]} />
      </mesh>
      <group
        position={[0.95, 0, -1.55]}
        onClick={(e) => {
          e.stopPropagation();
          play("click");
          useWorld.getState().toggleLamp();
        }}
      >
        <mesh position={[0, 0.42, 0]} material={mats.wood}>
          <boxGeometry args={[0.42, 0.08, 0.42]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={mats.wood}>
          <boxGeometry args={[0.38, 0.36, 0.38]} />
        </mesh>
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.22, 12]} />
          <meshStandardMaterial color="#f0d2a0" emissive="#ffb060" emissiveIntensity={lampOn ? 0.85 : 0.05} />
        </mesh>
      </group>
    </group>
  );
}

function Bookshelf({
  mats,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
}) {
  const hovered = useWorld((s) => s.hovered) === "shelf";
  useCursor(hovered);
  const inst = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const palette = useMemo(
    () => ["#6b3a24", "#1f4a4a", "#24344d", "#8a3b22", "#2d4a2a", "#5c2438"].map((c) => new THREE.Color(c)),
    [],
  );

  useLayoutEffect(() => {
    const mesh = inst.current;
    if (!mesh) return;
    let n = 0;
    // Fill only the shelves that are not the labeled portfolio rows (1 and 2).
    for (const shelf of [0, 3, 4]) {
      let x = -0.34;
      for (let i = 0; i < 8; i++) {
        const w = 0.05 + ((shelf + i) % 4) * 0.008;
        const h = 0.16 + (i % 4) * 0.018;
        dummy.position.set(x, 0.28 + shelf * 0.42 + h / 2, 0);
        dummy.scale.set(w, h, 0.18);
        dummy.updateMatrix();
        mesh.setMatrixAt(n, dummy.matrix);
        mesh.setColorAt(n, palette[(i + shelf) % palette.length]);
        x += w + 0.012;
        n++;
        if (x > 0.36) break;
      }
    }
    mesh.count = n;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [dummy, palette]);

  return (
    <group
      position={[-3.28, 0, -1.15]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        useWorld.getState().setFocus("bookshelf");
      }}
      onPointerOver={(e) => {
        if (useWorld.getState().hovered) return;
        e.stopPropagation();
        useWorld.getState().setHovered("shelf", "The stories live here");
      }}
      onPointerOut={() => {
        if (useWorld.getState().hovered === "shelf") useWorld.getState().setHovered(null);
      }}
    >
      <mesh position={[0, 1.16, -0.14]} castShadow receiveShadow material={mats.wood}>
        <boxGeometry args={[0.92, 2.28, 0.04]} />
      </mesh>
      <mesh position={[-0.44, 1.16, 0]} material={mats.wood} castShadow>
        <boxGeometry args={[0.04, 2.28, 0.32]} />
      </mesh>
      <mesh position={[0.44, 1.16, 0]} material={mats.wood} castShadow>
        <boxGeometry args={[0.04, 2.28, 0.32]} />
      </mesh>
      <mesh position={[0, 2.28, 0]} material={mats.wood}>
        <boxGeometry args={[0.92, 0.04, 0.32]} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0.18 + i * 0.42, 0.02]} material={mats.wood}>
          <boxGeometry args={[0.86, 0.03, 0.28]} />
        </mesh>
      ))}
      <instancedMesh ref={inst} args={[undefined, undefined, 24]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.62} vertexColors />
      </instancedMesh>
      {BOOKS.map((book) => (
        <StoryBook key={book.id} id={book.id} shelf={book.shelf} slot={book.slot} color={book.color} accent={book.accent} title={book.title} />
      ))}
      <Globe />
      <FairyLights />
      <mesh position={[0.12, 1.95, 0.02]} rotation={[0.4, 0.2, 0.1]} material={mats.wood} castShadow>
        <boxGeometry args={[0.16, 0.02, 0.12]} />
      </mesh>
      <mesh position={[0.12, 1.97, 0.02]} rotation={[-0.2, 0.1, 0]} material={mats.cream}>
        <boxGeometry args={[0.12, 0.09, 0.01]} />
      </mesh>
      <Plant mats={mats} position={[-0.22, 2.12, 0.02]} scale={0.42} />
    </group>
  );
}

function FairyLights() {
  const pts = useMemo(() => {
    const a: [number, number, number][] = [];
    for (let i = 0; i < 10; i++) {
      const t = i / 9;
      a.push([-0.36 + t * 0.72, 2.22 + Math.sin(t * Math.PI * 3) * 0.04, 0.12]);
    }
    return a;
  }, []);
  return (
    <group>
      {pts.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#ffe7a8" : "#ffb060"} />
        </mesh>
      ))}
    </group>
  );
}

function StoryBook({
  id,
  shelf,
  slot,
  color,
  accent,
  title,
}: {
  id: BookId;
  shelf: number;
  slot: number;
  color: string;
  accent: string;
  title: string;
}) {
  const tex = useMemo(() => makeBookTexture(title, color, accent), [title, color, accent]);
  const plate = useMemo(() => makePlaqueTexture(title, accent), [title, accent]);
  const hovered = useWorld((s) => s.hovered) === id;
  const enchanted = useWorld((s) => s.booksEnchanted);
  useCursor(hovered);
  const ref = useRef<THREE.Group>(null);
  const x = -0.33 + slot * 0.22;
  const y = 0.4 + shelf * 0.42;
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z = THREE.MathUtils.damp(ref.current.position.z, hovered ? 0.1 : 0.04, 6, Math.min(delta, 0.1));
  });
  return (
    <group
      ref={ref}
      position={[x, y, 0.04]}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        play("page");
        play("whoosh");
        useWorld.getState().setBook(id);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        play("hover");
        useWorld.getState().setHovered(id, `Open · ${title}`);
      }}
      onPointerOut={() => useWorld.getState().setHovered(null)}
    >
      <mesh castShadow>
        <boxGeometry args={[0.05, 0.34, 0.18]} />
        <meshStandardMaterial
          color={color}
          roughness={0.45}
          emissive={hovered || enchanted ? accent : "#000"}
          emissiveIntensity={hovered ? 0.45 : enchanted ? 0.22 : 0}
        />
      </mesh>
      <mesh position={[0.028, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.18, 0.34]} />
        <meshStandardMaterial map={tex} roughness={0.5} />
      </mesh>
      <mesh position={[0.06, -0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.2, 0.045]} />
        <meshBasicMaterial map={plate} />
      </mesh>
    </group>
  );
}

function Globe() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.1) * 0.15;
  });
  return (
    <group
      position={[0.22, 2.12, 0.02]}
      onClick={(e) => {
        e.stopPropagation();
        play("click");
        useWorld.getState().tapGlobe();
      }}
    >
      <mesh ref={ref}>
        <sphereGeometry args={[0.1, 16, 12]} />
        <meshStandardMaterial color="#1c3a4a" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.04, 0.06, 0.04, 8]} />
        <meshStandardMaterial color="#c9a36a" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Desk({
  mats,
  t,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
  t: ReturnType<typeof getTextures>;
}) {
  const hovered = useWorld((s) => s.hovered) === "desk";
  const monitorsOn = useWorld((s) => s.monitorsOn);
  const phase = useWorld((s) => s.phase);
  useCursor(hovered);
  const on = monitorsOn || phase === "room";

  const power = () => {
    play("boot");
    play("whoosh");
    useWorld.getState().setDesktop(true, "home");
  };

  return (
    <group position={[2.85, 0, -1.05]}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow material={mats.wood}>
        <boxGeometry args={[1.55, 0.08, 0.72]} />
      </mesh>
      {[-0.62, 0.62].map((x) => (
        <mesh key={x} position={[x, 0.37, 0]} material={mats.wood} castShadow>
          <boxGeometry args={[0.08, 0.74, 0.68]} />
        </mesh>
      ))}
      <Monitor x={-0.28} z={-0.12} on={on} rot={0.18} mats={mats} t={t} />
      <Monitor x={0.38} z={-0.08} on={on} rot={-0.28} mats={mats} t={t} />
      <mesh position={[-0.02, 0.795, 0.16]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.42, 0.02, 0.14]} />
        <meshStandardMaterial map={t.keys} roughness={0.45} />
      </mesh>
      <mesh position={[0.28, 0.79, 0.2]}>
        <boxGeometry args={[0.05, 0.02, 0.08]} />
        <meshStandardMaterial color="#1a1612" roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.92, -0.05]}>
        <cylinderGeometry args={[0.015, 0.02, 0.28, 8]} />
        <meshStandardMaterial color="#c9a36a" metalness={0.5} roughness={0.35} />
      </mesh>
      <mesh position={[0.55, 1.08, -0.05]}>
        <sphereGeometry args={[0.05, 10, 8]} />
        <meshStandardMaterial color="#f0d2a0" emissive="#ffb060" emissiveIntensity={0.5} />
      </mesh>
      <Plant mats={mats} position={[0.62, 0.78, 0.18]} scale={0.38} />
      <mesh position={[-0.55, 0.79, 0.18]} rotation={[-0.4, 0.2, 0.1]} material={mats.cream}>
        <boxGeometry args={[0.1, 0.08, 0.01]} />
      </mesh>
      <mesh position={[-0.85, 0.52, 0.35]} rotation={[0, 0.5, 0]} material={mats.leather} castShadow>
        <boxGeometry args={[0.42, 0.07, 0.42]} />
      </mesh>
      <mesh position={[-0.85, 0.82, 0.17]} rotation={[0, 0.5, 0]} material={mats.leather} castShadow>
        <boxGeometry args={[0.42, 0.48, 0.08]} />
      </mesh>
      <mesh
        position={[0, 0.9, 0.1]}
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          power();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          useWorld.getState().setHovered("desk", "Wake the machine");
        }}
        onPointerOut={() => useWorld.getState().setHovered(null)}
      >
        <boxGeometry args={[1.6, 1.2, 0.9]} />
      </mesh>
    </group>
  );
}

function Monitor({
  x,
  z,
  on,
  rot,
  mats,
  t,
}: {
  x: number;
  z: number;
  on: boolean;
  rot: number;
  mats: Record<string, THREE.MeshStandardMaterial>;
  t: ReturnType<typeof getTextures>;
}) {
  return (
    <group position={[x, 1.12, z]} rotation={[0, rot, 0]}>
      <mesh material={mats.dark} castShadow>
        <boxGeometry args={[0.62, 0.4, 0.04]} />
      </mesh>
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.56, 0.34]} />
        {on ? <meshBasicMaterial map={t.screen0} toneMapped={false} /> : <meshStandardMaterial color="#0a0c10" />}
      </mesh>
    </group>
  );
}

function Plant({
  mats,
  position,
  scale = 1,
}: {
  mats: Record<string, THREE.MeshStandardMaterial>;
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh material={mats.pot}>
        <cylinderGeometry args={[0.09, 0.07, 0.12, 8]} />
      </mesh>
      <mesh position={[0, 0.14, 0]} material={mats.leaf}>
        <sphereGeometry args={[0.12, 8, 6]} />
      </mesh>
      <mesh position={[0.06, 0.16, 0.04]} material={mats.canopy}>
        <sphereGeometry args={[0.08, 8, 6]} />
      </mesh>
    </group>
  );
}

function Plants({ mats }: { mats: Record<string, THREE.MeshStandardMaterial> }) {
  const spots: Array<[number, number, number, number]> = [
    [-1.15, 0.12, -2.35, 1],
    [0.55, 0.12, -2.32, 0.85],
    [1.15, 0.82, -2.42, 0.55],
    [2.2, 0.12, 0.85, 0.9],
  ];
  return (
    <>
      {spots.map((s, i) => (
        <Plant key={i} mats={mats} position={[s[0], s[1], s[2]]} scale={s[3]} />
      ))}
    </>
  );
}

function Posters({ t }: { t: ReturnType<typeof getTextures> }) {
  const items = [
    { map: t.posterPeak, pos: [-2.55, 1.85, -2.58] as [number, number, number] },
    { map: t.posterForest, pos: [-1.95, 1.72, -2.58] as [number, number, number] },
    { map: t.posterDusk, pos: [2.55, 1.95, -2.58] as [number, number, number] },
  ];
  return (
    <>
      {items.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <planeGeometry args={[0.42, 0.58]} />
          <meshStandardMaterial map={p.map} roughness={0.7} />
        </mesh>
      ))}
    </>
  );
}
