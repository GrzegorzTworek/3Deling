import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";

function Ball() {
  const ref = useRef();
  const { viewport } = useThree();
  const onCollisionEnter = () => (
    ref.current.setTranslation({ x: 0, y: 0, z: 0 }),
    ref.current.setLinvel({ x: 0, y: 0, z: 0 })
  );
  return (
    <>
      <RigidBody ref={ref} colliders="ball" mass={1}>
        {/* <RigidBody ref={ref} colliders="ball"> */}
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          {/* <circleGeometry args={[0.1, 16]} /> */}
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
        <CuboidCollider args={[30, 2, 30]} />
        {/* <CuboidCollider args={[-5, 5, -5]} /> */}
      </RigidBody>
    </>
  );
}
// const balls = Array.from({ length: 30 }, (_, index) => <Ball key={index} />);
const balls = Array.from({ length: 10 }, (_, index) => <Ball key={index} />);
const Project = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Canvas style={{ background: "black" }}>
      <Physics gravity={[0, -10, 0]}>
        <pointLight position={[0, 0, 10]} />
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

export default Project;
