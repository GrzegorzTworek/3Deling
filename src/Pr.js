// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { CircleGeometry, MeshBasicMaterial, Vector3 } from "three";
// import { World, Collider, RigidBody } from "@react-three/cannon";

// const Circle = () => {
//   const circleRef = useRef();

//   return (
//     <mesh ref={circleRef}>
//       <circleGeometry args={[100, 64]} />
//       <meshBasicMaterial color="yellow" />
//     </mesh>
//   );
// };

// const Ball = ({ position }) => {
//   const ballRef = useRef();
//   return (
//     <Collider>
//       <RigidBody mass={1} position={position}>
//         <mesh ref={ballRef}>
//           <sphereGeometry args={[10, 32, 32]} />
//           <meshBasicMaterial color="yellow" />
//         </mesh>
//       </RigidBody>
//     </Collider>
//   );
// };

// const BouncingBalls = () => {
//   const worldRef = useRef();

//   const spawnBall = (position) => {
//     const velocity = new Vector3(
//       Math.random() * 10 - 5,
//       Math.random() * 10 - 5,
//       0
//     );
//     worldRef.current.addBody({
//       type: "sphere",
//       position,
//       args: [10],
//       velocity: [velocity.x, velocity.y, velocity.z],
//     });
//   };

//   const handleCollisions = (e) => {
//     const contact = e.contact;
//     const impactVelocity = contact.getImpactVelocityAlongNormal();
//     const ballA = contact.bi;
//     const ballB = contact.bj;

//     if (ballA) {
//       const ballARef = ballA.mesh;
//       ballA.velocity.set(
//         ballA.velocity.x - impactVelocity * contact.ni.x,
//         ballA.velocity.y - impactVelocity * contact.ni.y,
//         ballA.velocity.z - impactVelocity * contact.ni.z
//       );
//     }

//     if (ballB) {
//       const ballBRef = ballB.mesh;
//       ballB.velocity.set(
//         ballB.velocity.x + impactVelocity * contact.ni.x,
//         ballB.velocity.y + impactVelocity * contact.ni.y,
//         ballB.velocity.z + impactVelocity * contact.ni.z
//       );
//     }
//   };

//   useFrame(({ delta }) => {
//     worldRef.current.step(delta);
//   });

//   return (
//     <World
//       ref={worldRef}
//       onCollide={handleCollisions}
//       gravity={[0, -9.81, 0]}
//       allowSleep={false}
//     >
//       {[...Array(30)].map((_, i) => (
//         <Ball key={i} position={[0, 0, 0]} />
//       ))}
//     </World>
//   );
// };

// const Pr = () => {
//   return (
//     <Canvas>
//       <Circle />
//       <BouncingBalls />
//     </Canvas>
//   );
// };

// export default Pr;

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";
import { CircleGeometry, SphereGeometry, MeshBasicMaterial, Mesh } from "three";
import * as THREE from "three";

const Circle = ({ radius, edgeThickness }) => {
  const meshRef = useRef();
  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[radius, 64]} />
      <meshBasicMaterial color="yellow" side={THREE.DoubleSide} />
    </mesh>
  );
};

const Ball = ({ position, velocity }) => {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    velocity,
    args: 10,
    restitution: 1,
  }));

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
};

const BouncingBalls = () => {
  const [circleRef] = useBox(() => ({
    position: [0, 0, 0],
    args: [210, 210, 0],
    type: "Static",
  }));

  const balls = [];
  for (let i = 0; i < 30; i++) {
    const x = (Math.random() - 0.5) * 180;
    const y = (Math.random() - 0.5) * 180;
    const position = [x, y, 0];
    const velocity = [(Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 0];
    balls.push(<Ball key={i} position={position} velocity={velocity} />);
  }

  const handleCollide = (e) => {
    console.log("collision!", e);
  };

  return (
    <Physics>
      <Circle radius={100} edgeThickness={10} />
      <mesh ref={circleRef}>
        <boxGeometry args={[210, 210, 0]} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
        <meshBasicMaterial color="white" opacity={0} transparent={true} />
      </mesh>
      {balls}
    </Physics>
  );
};

const App = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <BouncingBalls />
      </Canvas>
    </div>
  );
};

export default App;
