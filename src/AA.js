// import React, { useState, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import { World, RigidBody } from "@dimforge/rapier2d-compat";

// function Circle() {
//   return (
//     <mesh>
//       <circleGeometry args={[100, 32]} />
//       <meshBasicMaterial color="yellow" />
//     </mesh>
//   );
// }

// function Ball() {
//   return (
//     <mesh>
//       <sphereGeometry args={[10, 16, 16]} />
//       <meshBasicMaterial color="yellow" />
//     </mesh>
//   );
// }

// function BouncingBalls() {
//   const [balls, setBalls] = useState([]);
//   const worldRef = useRef(null);

//   const spawnBalls = () => {
//     const newBalls = [];
//     for (let i = 0; i < 30; i++) {
//       const ball = {
//         position: new THREE.Vector2(0, 0),
//         velocity: new THREE.Vector2(
//           Math.random() * 200 - 100,
//           Math.random() * 200 - 100
//         ),
//         body: null,
//       };
//       newBalls.push(ball);
//     }
//     setBalls(newBalls);
//   };

//   const updateBalls = (deltaTime) => {
//     worldRef.current.step(deltaTime);
//     const updatedBalls = balls.map((ball) => {
//       const { position, velocity, body } = ball;
//       position.x = body.translation().x;
//       position.y = body.translation().y;
//       velocity.x = body.linvel().x;
//       velocity.y = body.linvel().y;
//       return ball;
//     });
//     setBalls(updatedBalls);
//   };

//   useFrame(({ delta }) => {
//     updateBalls(delta);
//   });

//   const handleBallCollision = (event) => {
//     const body1 = event.body1;
//     const body2 = event.body2;

//     const ball1 = balls.find((ball) => ball.body == body1);
//     const ball2 = balls.find((ball) => ball.body == body2);

//     if (ball1 && ball2) {
//       const normal = event.normal;
//       const relativeVelocity = ball2.velocity.clone().sub(ball1.velocity);
//       const impulse = normal
//         .clone()
//         .multiplyScalar(relativeVelocity.dot(normal))
//         .multiplyScalar(2);

//       ball1.body.applyImpulse(impulse.clone().negate(), true);
//       ball2.body.applyImpulse(impulse, true);
//     }
//   };

//   const handleBoundaryCollision = (event) => {
//     const body = event.body;
//     const ball = balls.find((ball) => ball.body == body);

//     if (ball) {
//       const normal = event.normal;
//       const velocity = ball.velocity.clone();
//       const impulse = normal
//         .clone()
//         .multiplyScalar(velocity.dot(normal))
//         .multiplyScalar(-2);

//       ball.body.applyImpulse(impulse, true);
//     }
//   };

//   const initWorld = () => {
//     const gravity = new THREE.Vector2(0, -300);
//     const world = new World(gravity);

//     const boundaryShape = new THREE.CircleBufferGeometry(100, 32);
//     const boundaryBody = new RigidBody(
//       RigidBody.setStatic(),
//       RigidBody.collidersFromMesh(boundaryShape, 0.0)
//     );
//     world.addRigidBody(boundaryBody);

//     const ballShape = new THREE.Sphere

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";
import { Sphere } from "@react-three/drei";

function Circle() {
  const radius = 4;
  const segments = 64;
  const geometry = new CircleGeometry(radius, segments);
  const material = new MeshBasicMaterial({
    color: 0xffffff,
    // transparent: true, // włączenie przezroczystości
    // opacity: 1, // ustawienie przezroczystości na 50%
    // side: 2, // renderowanie odwróconych powierzchni
    // wireframe: true, // włączenie krawędzi
    // wireframeLinewidth: 20, // ustawienie grubości krawędzi na 5 pikseli
  });
  const meshRef = useRef(); // utworzenie referencji do Mesh

  useFrame(() => {
    // Aktualizacja pozycji Mesh w każdej klatce animacji
    meshRef.current.position.z = -1;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

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
        // position={[0, 0, 0]}
        restitution={2.1}
        onCollisionEnter={onCollisionEnter}
      >
        <CuboidCollider args={[30, 2, 30]} />
      </RigidBody>
    </>
  );
}
// const balls = Array(30).fill(null);
const balls = Array(2).fill(null);
const App = () => (
  // const balls = Array(30).fill(null);

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Canvas style={{ background: "black" }}>
      <Physics gravity={[0, -30, 0]}>
        <pointLight position={[0, 0, 10]} />
        <RigidBody
          colliders="trimesh"
          // colliders="ball"
          type="fixed"
          restitution={2.1}
        >
          <mesh>
            {/* <ringGeometry args={[2.9, 3, 64]} />
        <meshBasicMaterial color="red" /> */}

            <ringGeometry args={[2.9, 3, 64]} attach="geometry" />
            <meshBasicMaterial color="red" attach="material" />
            {/* <meshBasicMaterial color="red" attach="material" wireframe /> */}
          </mesh>
        </RigidBody>

        {/* <Ball /> */}
        {balls.map((_, index) => (
          <Ball key={index} />
        ))}
      </Physics>
    </Canvas>
  </div>
);

export default App;
