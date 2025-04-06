"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SecurityShieldProps = {
  position?: [number, number, number];
  [key: string]: any;
};

function SecurityShield(props: SecurityShieldProps) {
  const { position = [0, 0, 0], ...otherProps } = props;
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  // Create a simple shield model
  const shield = useRef<THREE.Mesh>(null);
  const lock = useRef<THREE.Group>(null);

  // Rotate the shield
  useFrame((state, delta) => {
    if (shield.current) {
      shield.current.rotation.y += delta * 0.2;
    }
    if (lock.current) {
      lock.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={active ? 1.2 : 1}
    >
      {/* Shield */}
      <mesh
        ref={shield}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial
          color={hovered ? "#6366f1" : "#4f46e5"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Shield Emblem */}
      <mesh
        position={[0, 0, 0.15]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial
          color="#1e1b4b"
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Lock */}
      <group ref={lock} position={[0, 0, 0.3]}>
        <mesh
          position={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.8, 1, 0.3]} />
          <meshStandardMaterial
            color="#d1d5db"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Lock Keyhole */}
        <mesh
          position={[0, -0.2, 0.2]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
          <meshStandardMaterial
            color="#1f2937"
            metalness={0.5}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Light */}
      <pointLight position={[0, 0, 3]} intensity={1} color="#ffffff" />
    </group>
  );
}

export default SecurityShield;
