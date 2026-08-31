import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, Noise } from "@react-three/postprocessing";
import { useEffect } from "react";
import * as THREE from "three";
import { Scene } from "./Scene";
import { useWorld } from "@/lib/store";

function RendererGuard() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const ctx = gl.getContext();
    const info = String(ctx.getParameter(ctx.RENDERER) || "");
    const software = /swiftshader|llvmpipe|software|microsoft basic/i.test(info);
    const mobile = useWorld.getState().isMobile;
    if (!software && !mobile) {
      useWorld.setState({ quality: "high" });
      gl.shadowMap.enabled = true;
    } else {
      useWorld.setState({ quality: "low" });
      gl.shadowMap.enabled = false;
    }
  }, [gl]);
  return null;
}

export function World() {
  const quality = useWorld((s) => s.quality);
  const phase = useWorld((s) => s.phase);

  return (
    <Canvas
      className="absolute inset-0 z-0"
      shadows={quality === "high"}
      dpr={quality === "low" ? 1 : [1, 1.5]}
      frameloop="always"
      gl={{
        antialias: quality === "high",
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        failIfMajorPerformanceCaveat: false,
      }}
      camera={{ fov: 38, near: 0.08, far: 40, position: [0, 1.5, 4.72] }}
      style={{ touchAction: "none", background: "#140e0b", zIndex: 0 }}
    >
      <RendererGuard />
      <Scene />
      {quality === "high" && phase !== "boot" && (
        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom intensity={0.42} luminanceThreshold={0.78} mipmapBlur />
          <Vignette darkness={0.45} offset={0.28} />
          <Noise opacity={0.02} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
