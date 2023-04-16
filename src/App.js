import { useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

function Ball() {
  const ref = useRef();
  const { viewport } = useThree();
  const onCollisionEnter = () => (
    ref.current.setTranslation({ x: 0, y: 0, z: 0 }),
    ref.current.setLinvel({ x: 10, y: 10, z: 0 })
    // ref.current.setTranslation({ x: 0, y: 0, z: 0 }),
    // ref.current.setLinvel({ x: 0, y: 0, z: 0 })
  );
  return (
    <>
      <RigidBody ref={ref} colliders="ball" mass={1}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />

          <meshStandardMaterial />
        </mesh>
      </RigidBody>
      <RigidBody
        type="fixed"
        colliders={false}
        position={[0, -viewport.height, 0]}
        restitution={2.1}
        onCollisionEnter={onCollisionEnter}
      >
        <CuboidCollider args={[-5, 5, 0]} />
      </RigidBody>
    </>
  );
}

const balls = Array.from({ length: 20 }, (_, index) => <Ball key={index} />);

const App = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Canvas style={{ background: "black" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} />
      <Physics gravity={[0, -5, 0]}>
        <RigidBody colliders="trimesh" type="fixed" restitution={2.1}>
          <mesh>
            <ringGeometry args={[2.9, 3, 64]} attach="geometry" />
            <meshBasicMaterial color="red" attach="material" />
          </mesh>
        </RigidBody>

        {balls}
      </Physics>
    </Canvas>
  </div>
);

export default App;
