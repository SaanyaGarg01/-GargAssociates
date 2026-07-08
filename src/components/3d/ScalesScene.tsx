import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
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

// ─── Scales Model (Compact Version) ──────────────────────────────────────────
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

// ─── Lady Justice Model (Detailed Full Version) ──────────────────────────────
function LadyJusticeModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const beamRef = useRef<THREE.Group>(null!);
  const leftPanRef = useRef<THREE.Group>(null!);
  const rightPanRef = useRef<THREE.Group>(null!);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (groupRef.current) {
      // Mouse-based parallax rotation for the entire statue
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.4,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.y * 0.15,
        0.05
      );
      // Floating/breathing motion
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    }

    // Dynamic scale physics
    if (beamRef.current && leftPanRef.current && rightPanRef.current) {
      // Beam tilts slowly
      const beamAngle = Math.sin(t * 0.6) * 0.08;
      beamRef.current.rotation.z = beamAngle;

      // Independent pan swing (dampened)
      const panSwing = Math.sin(t * 1.1) * 0.03;

      // Rotate pans back to counteract beam tilt (gravity) + add slight sway
      leftPanRef.current.rotation.z = -beamAngle + panSwing;
      rightPanRef.current.rotation.z = -beamAngle - panSwing;
    }
  });

  const goldMat = { color: '#c9a84c', metalness: 0.95, roughness: 0.05 };
  const darkGoldMat = { color: '#9a7a1e', metalness: 0.9, roughness: 0.15 };
  const marbleMat = { color: '#f0efe9', metalness: 0.1, roughness: 0.4 };
  const steelMat = { color: '#b5b8ba', metalness: 0.95, roughness: 0.05 };

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* ─── PEDESTAL ─── */}
      {/* Lower Ring */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.9, 1.0, 0.15, 32]} />
        <meshStandardMaterial {...darkGoldMat} />
      </mesh>
      {/* Upper Pedestal */}
      <mesh position={[0, -2.3, 0]}>
        <cylinderGeometry args={[0.8, 0.9, 0.35, 32]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* ─── LADY JUSTICE STATUE BODY ─── */}
      {/* Flowing gown/skirt */}
      <mesh position={[0, -1.0, 0]}>
        <cylinderGeometry args={[0.2, 0.55, 2.2, 24]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.65, 16]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* Shoulder Wrap */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.24]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.92, 0]}>
        <sphereGeometry args={[0.14, 32, 32]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* Hair Bun */}
      <mesh position={[0, 1.04, -0.05]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Golden Blindfold */}
      <mesh position={[0, 0.92, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.145, 0.145, 0.06, 24]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* ─── ARMS & SYMBOLS ─── */}

      {/* RIGHT ARM (Sword side) */}
      {/* Upper Arm */}
      <mesh position={[0.22, 0.7, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.045, 0.4, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>
      {/* Forearm (raising sword) */}
      <mesh position={[0.42, 0.95, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.045, 0.04, 0.4, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>
      {/* Hand */}
      <mesh position={[0.52, 1.15, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* SWORD OF JUSTICE */}
      {/* Handle / Grip */}
      <mesh position={[0.52, 1.1, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.18, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Crossguard */}
      <mesh position={[0.52, 1.2, 0]}>
        <boxGeometry args={[0.22, 0.03, 0.04]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>
      {/* Blade (pointing up) */}
      <mesh position={[0.52, 1.6, 0]}>
        <boxGeometry args={[0.035, 0.75, 0.012]} />
        <meshStandardMaterial {...steelMat} />
      </mesh>

      {/* LEFT ARM (Scales side) */}
      {/* Upper Arm (extended out) */}
      <mesh position={[-0.22, 0.6, 0]} rotation={[0, 0, Math.PI / 2.2]}>
        <cylinderGeometry args={[0.05, 0.045, 0.45, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>
      {/* Forearm */}
      <mesh position={[-0.62, 0.62, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.04, 0.45, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>
      {/* Hand */}
      <mesh position={[-0.85, 0.62, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial {...marbleMat} />
      </mesh>

      {/* ─── HANGING SCALES (TARAJU) ─── */}
      {/* Hanging string/chain from hand */}
      <mesh position={[-0.85, 0.45, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.34, 8]} />
        <meshStandardMaterial {...goldMat} />
      </mesh>

      {/* Scales Pivot Group */}
      <group ref={beamRef} position={[-0.85, 0.28, 0]}>
        {/* Horizontal Beam */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.0, 0.04, 0.04]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        
        {/* Decorative Rings at beam ends */}
        {[-1.0, 1.0].map((x, i) => (
          <mesh key={i} position={[x, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.08, 0.018, 12, 24]} />
            <meshStandardMaterial {...goldMat} />
          </mesh>
        ))}

        {/* Hanging chain left */}
        <mesh position={[-1.0, -0.5, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.0, 6]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>
        {/* Hanging chain right */}
        <mesh position={[1.0, -0.5, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 1.0, 6]} />
          <meshStandardMaterial {...goldMat} />
        </mesh>

        {/* Left Pan group */}
        <group ref={leftPanRef} position={[-1.0, -1.0, 0]}>
          <ScalesPan position={[0, 0, 0]} />
        </group>

        {/* Right Pan group */}
        <group ref={rightPanRef} position={[1.0, -1.0, 0]}>
          <ScalesPan position={[0, 0, 0]} />
        </group>
      </group>
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

      {/* Main scales / Lady Justice model */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        {compact ? <ScalesModel /> : <LadyJusticeModel />}
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
