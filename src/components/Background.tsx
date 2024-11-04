import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const AnimatedSphere = animated(Sphere);

export function Background() {
  const group = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();
  
  const particles = Array.from({ length: 50 }, () => ({
    position: [
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * 20 - 10
    ] as [number, number, number],
    color: `hsl(${Math.random() * 360}, 50%, 75%)`,
    scale: Math.random() * 0.5 + 0.1
  }));

  useFrame((state) => {
    if (!group.current) return;
    
    // Smooth rotation based on mouse position
    const targetRotationX = (mouse.y * viewport.height) / 100;
    const targetRotationY = (mouse.x * viewport.width) / 100;
    
    group.current.rotation.x += (targetRotationX - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.05;
    
    // Gentle floating animation
    group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
  });

  return (
    <group ref={group}>
      {particles.map((particle, i) => (
        <AnimatedSphere
          key={i}
          position={particle.position}
          args={[particle.scale, 32, 32]}
        >
          <meshStandardMaterial
            color={particle.color}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </AnimatedSphere>
      ))}
    </group>
  );
}