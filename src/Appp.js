// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// function Circle({ radius, thickness }) {
//   const meshRef = useRef();

//   useFrame(() => {
//     const mesh = meshRef.current;
//     const time = performance.now() / 1000;
//     const speed = 0.5;

//     for (let i = 0; i < mesh.children.length; i++) {
//       const ball = mesh.children[i];
//       const ballPos = ball.position;

//       // bounce off walls
//       if (
//         ballPos.x < -radius + thickness / 2 ||
//         ballPos.x > radius - thickness / 2
//       ) {
//         ball.userData.velocity.x = -ball.userData.velocity.x;
//       }
//       if (
//         ballPos.y < -radius + thickness / 2 ||
//         ballPos.y > radius - thickness / 2
//       ) {
//         ball.userData.velocity.y = -ball.userData.velocity.y;
//       }

//       // attract/repel balls to each other
//       for (let j = i + 1; j < mesh.children.length; j++) {
//         const otherBall = mesh.children[j];
//         const distance = ballPos.distanceTo(otherBall.position);

//         if (distance < thickness * 2) {
//           const direction = new THREE.Vector3().subVectors(
//             ballPos,
//             otherBall.position
//           );
//           const force = (thickness * 2 - distance) * 0.005;

//           ball.userData.velocity.add(direction.multiplyScalar(force));
//           otherBall.userData.velocity.sub(direction.multiplyScalar(force));
//         }
//       }

//       // update ball positions
//       ballPos.add(ball.userData.velocity);
//     }
//   });

//   <group></group>
//   const numBalls = 30;

//   const balls = [...Array(numBalls)].map((_, i) => {
//     const ballGeom = new THREE.SphereGeometry(2, 16, 16);
//     const ballMat = new THREE.MeshStandardMaterial({
//       color: "#f0f",
//       roughness: 0.5,
//       metalness: 0.5,
//     });
//     const ball = new THREE.Mesh(ballGeom, ballMat);
//     ball.position.set(
//       Math.random() * radius * 2 - radius,
//       Math.random() * radius * 2 - radius,
//       0
//     );
//     ball.userData.velocity = new THREE.Vector3(
//       (Math.random() - 0.5) * 2,
//       (Math.random() - 0.5) * 2,
//       0
//     );
//     return ball;
//   });

//   return (
//     <group ref={meshRef}>
//       {balls}
//       <mesh>
//         <circleGeometry args={[radius, 128]} />
//         <meshBasicMaterial
//           color="#fff"
//           wireframe
//           wireframeLinewidth={thickness}
//         />
//       </mesh>
//     </group>
//   );
// }

// function Appp() {
//   return (
//     <Canvas style={{ background: "#000" }}>
//       <Circle radius={100} thickness={10} />
//     </Canvas>
//   );
// }

// export default Appp;

// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// function Circle({ radius, thickness }) {
//   const meshRef = useRef();

//   useFrame(() => {
//     const mesh = meshRef.current;
//     const speed = 0.02;
//     const time = Date.now() * speed;

//     mesh.position.y = Math.sin(time) * 10;
//     mesh.rotation.x = time / 2000;
//     mesh.rotation.z = time / 1000;
//   });

//   return (
//     <mesh ref={meshRef}>
//       <ringGeometry args={[radius - thickness, radius, 32]} />
//       <meshBasicMaterial color="#ffffff" side={THREE.BackSide} />
//       <meshBasicMaterial color="#000000" side={THREE.FrontSide} />
//     </mesh>
//   );
// }

// function Ball({ position }) {
//   const meshRef = useRef();

//   useFrame(() => {
//     const mesh = meshRef.current;
//     const speed = 0.02;
//     const time = Date.now() * speed;

//     mesh.position.y -= Math.sin(time * 2) * 0.1;

//     if (mesh.position.y < -8) {
//       mesh.position.y = -8;
//       mesh.velocity = Math.random() * 0.01 + 0.015;
//     }

//     mesh.position.x += mesh.velocity * Math.cos(time);
//     mesh.position.z += mesh.velocity * Math.sin(time);

//     mesh.rotation.x = time / 2000;
//     mesh.rotation.z = time / 1000;
//   });

//   return (
//     <mesh ref={meshRef} position={position}>
//       <sphereGeometry args={[0.2, 16, 16]} />
//       <meshBasicMaterial color="#ffffff" />
//     </mesh>
//   );
// }

// function Appp() {
//   return (
//     <div style={{ background: "#000000", width: "100vw", height: "100vh" }}>
//       <Canvas>
//         <Circle radius={100} thickness={10} />
//         {Array.from({ length: 30 }, (_, i) => (
//           <Ball
//             key={i}
//             position={[Math.random() * 80 - 40, 50, Math.random() * 80 - 40]}
//           />
//         ))}
//       </Canvas>
//     </div>
//   );
// }

// export default Appp;

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Circle({ radius, lineWidth, color }) {
  const meshRef = useRef();
  const segments = 128;
  const angle = (Math.PI * 2) / segments;

  // Calculate the circle's vertices
  //   let geometry = new THREE.Geometry();
  const geometry = new THREE.BufferGeometry();
  for (let i = 0; i <= segments; i++) {
    const x = Math.cos(angle * i) * radius;
    const y = Math.sin(angle * i) * radius;
    // geometry.vertices.push(new THREE.Vector3(x, y, 0));
    geometry.attributes.position.array(new THREE.Vector3(x, y, 0));
  }

  // Create the circle's line segments
  let material = new THREE.LineBasicMaterial({ color, linewidth: lineWidth });
  let line = new THREE.LineLoop(geometry, material);

  // Set the circle's position
  line.position.set(0, 0, 0);

  return (
    <group ref={meshRef}>
      <primitive object={line} />
    </group>
  );
}

function Ball({ position, color }) {
  const meshRef = useRef();
  const velocityRef = useRef(new THREE.Vector3(0, -0.1, 0));

  useFrame(({ delta }) => {
    const mesh = meshRef.current;
    const velocity = velocityRef.current;
    const position = mesh.position;

    // Bounce off walls
    if (position.x < -90 || position.x > 90) velocity.x = -velocity.x;
    if (position.y < -90 || position.y > 90) velocity.y = -velocity.y;

    // Bounce off other balls
    for (const otherMesh of mesh.parent.children) {
      if (otherMesh !== mesh && otherMesh.type === "Mesh") {
        const otherPosition = otherMesh.position;
        const distance = position.distanceTo(otherPosition);
        if (distance < 20) {
          const direction = new THREE.Vector3();
          direction.subVectors(otherPosition, position).normalize();
          const dot = velocity.dot(direction);
          if (dot > 0) {
            velocity.sub(direction.multiplyScalar(2 * dot));
          }
        }
      }
    }

    // Apply velocity
    position.addScaledVector(velocity, delta);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereBufferGeometry args={[5, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function Appp() {
  return (
    <Canvas style={{ background: "green" }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Circle radius={100} lineWidth={10} color={0xffffff} />
      {Array.from({ length: 30 }).map((_, index) => {
        const position = new THREE.Vector3(
          Math.random() * 180 - 90,
          Math.random() * 180 - 90,
          0
        );
        return <Ball key={index} position={position} color={0xffff00} />;
      })}
    </Canvas>
  );
}

export default Appp;
