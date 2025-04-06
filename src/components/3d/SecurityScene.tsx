"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import SecurityShield from "./SecurityShield";

const SecurityScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense fallback={null}>
          <Float
            speed={2} // Animation speed
            rotationIntensity={0.5} // Rotation intensity
            floatIntensity={0.5} // Float intensity
          >
            <SecurityShield position={[0, 0, 0]} />
          </Float>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default SecurityScene;
