import { Suspense } from 'react';
import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Background } from './Background';
import { LoadingScreen } from './LoadingScreen';

export function Scene() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <Background />
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
    </Suspense>
  );
}