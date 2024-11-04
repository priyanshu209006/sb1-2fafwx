import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { Content } from './components/Content';
import { Suspense } from 'react';

function App() {
  return (
    <main className="relative w-full h-screen bg-gradient-to-b from-black to-blue-900">
      <Canvas
        className="absolute inset-0"
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 75 }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      <Content />
    </main>
  );
}

export default App;