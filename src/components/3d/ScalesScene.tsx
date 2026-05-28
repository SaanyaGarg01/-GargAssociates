import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Scale Pan ───────────────────────────────────────────────────────────────
function ScalesPan({ position, rotationOffset = 0 }: { position: [number, number, number]; rotationOffset?: number }) {
  return (
    <group position={position}>
      {/* Pan disk */}
      <mesh rotation={[0, rotationOffset, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 32]} />
        <meshStandardMaterial color="#c9a84c" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Chain strings */}
      {[0, Math.PI * 2 / 3, (Math.PI * 4) / 3].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.45, 0.5, Math.sin(angle) * 0.45]}>
          <cylinderGeometry args={[0.01, 0.01, 1, 6]} />
          <meshStandardMaterial color="#e0b84a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Scales Model ────────────────────────────────────────────────────────────
function ScalesModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const leftPanRef = useRef<THREE.Group>(null!);
  const rightPanRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse-based rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.5,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.2,
        0.05
      );
      // Floating
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }

    // Oscillating pans
    if (leftPanRef.current && rightPanRef.current) {
      const swing = Math.sin(t * 0.7) * 0.2;
      leftPanRef.current.rotation.z = swing;
      leftPanRef.current.position.y = -1.2 + Math.sin(t * 0.7) * 0.12;
      rightPanRef.current.rotation.z = -swing;
      rightPanRef.current.position.y = -1.2 - Math.sin(t * 0.7) * 0.12;
    }
  });

  const goldMat = { color: '#c9a84c', metalness: 0.95, roughness: 0.05 };
  const darkGoldMat = { color: '#9a7a1e', metalness: 0.9, roughness: 0.1 };

  return (
    <group ref={groupRef}>
      {/* Base pillar */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.12, 0.2, 0.5, 16]} />
        <meshStandardMaterial {...darkGoldMat} />
      </mesh>

      {/* Central pole */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 3, 12]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Top sphere */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Horizontal beam */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[3, 0.06, 0.06]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Left chain */}
      <mesh position={[-1.4, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Right chain */}
      <mesh position={[1.4, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Left pan */}
      <group ref={leftPanRef} position={[-1.4, -1.2, 0]}>
        <ScalesPan position={[0, 0, 0]} />
      </group>

      {/* Right pan */}
      <group ref={rightPanRef} position={[1.4, -1.2, 0]}>
        <ScalesPan position={[0, 0, 0]} />
      </group>

      {/* Decorative rings at beam ends */}
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.1, 0.025, 16, 32]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Floating Ring ────────────────────────────────────────────────────────────
function FloatingRing({ position, scale = 1, speed = 1 }: { position: [number, number, number]; scale?: number; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[1, 0.03, 16, 64]} />
      <meshStandardMaterial color="#c9a84c" metalness={0.9} roughness={0.1} transparent opacity={0.4} />
    </mesh>
  );
}

// ─── Main Scene Export ────────────────────────────────────────────────────────
export default function ScalesScene({ compact = false }: { compact?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#fff8e7" castShadow />
      <pointLight position={[-5, 3, 3]} intensity={0.8} color="#c9a84c" />
      <pointLight position={[5, -3, -3]} intensity={0.5} color="#63a2ff" />
      <pointLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" />

      {/* Main scales */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <ScalesModel />
      </Float>

      {/* Decorative floating rings */}
      {!compact && (
        <>
          <FloatingRing position={[-4, 1, -2]} scale={1.2} speed={0.7} />
          <FloatingRing position={[4, -1, -3]} scale={0.8} speed={0.5} />
          <FloatingRing position={[0, 3, -4]} scale={1.5} speed={0.3} />
        </>
      )}
    </Canvas>
  );
}
