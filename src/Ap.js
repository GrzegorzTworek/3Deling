// import * as THREE from "three";
// import React, { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";

// function Circle(props) {
//   const meshRef = useRef();
//   const { radius, color } = props;

//   // Tworzenie geometrii okręgu
//   const geometry = new THREE.CircleGeometry(radius, 30);

//   // Ustawianie pozycji kulek na środku okręgu
//   geometry.vertices.forEach((vertex) => {
//     const angle = Math.atan2(vertex.y, vertex.x);
//     vertex.x = radius * Math.cos(angle);
//     vertex.y = radius * Math.sin(angle);
//   });

//   // Tworzenie materiału okręgu
//   const material = new THREE.MeshBasicMaterial({
//     color: "white",
//     side: THREE.BackSide,
//   });

//   return (
//     <mesh ref={meshRef}>
//       <meshBasicMaterial attach="material" color={color} />
//       <bufferGeometry attach="geometry" {...geometry} />
//     </mesh>
//   );
// }

// function Ball(props) {
//   const meshRef = useRef();
//   const { radius, color } = props;
//   const velocity = useRef(
//     new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, 0)
//   );
//   const position = useRef(new THREE.Vector3());

//   useFrame(({ delta }) => {
//     const mesh = meshRef.current;

//     // Aktualizacja pozycji kulki na podstawie jej prędkości
//     position.current.add(velocity.current.clone().multiplyScalar(delta));

//     // Odbijanie kulek od ścian okręgu
//     if (position.current.x < -90 || position.current.x > 90) {
//       velocity.current.x = -velocity.current.x;
//       position.current.x = position.current.x < -90 ? -90 : 90;
//     }
//     if (position.current.y < -90 || position.current.y > 90) {
//       velocity.current.y = -velocity.current.y;
//       position.current.y = position.current.y < -90 ? -90 : 90;
//     }

//     // Aktualizacja pozycji meshu
//     mesh.position.set(
//       position.current.x,
//       position.current.y,
//       position.current.z
//     );
//   });

//   return (
//     <mesh ref={meshRef} position={[0, 0, 0]}>
//       <sphereBufferGeometry attach="geometry" args={[radius, 32, 32]} />
//       <meshBasicMaterial attach="material" color={color} />
//     </mesh>
//   );
// }

// function Ap() {
//   return (
//     <div style={{ height: "100vh", background: "green" }}>
//       <Canvas>
//         <Circle radius={100} color="yellow" />
//         {Array.from({ length: 30 }).map((_, i) => (
//           <Ball key={i} radius={10} color="yellow" />
//         ))}
//       </Canvas>
//     </div>
//   );
// }

// export default Ap;

// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";

// function Circle() {
//   const segments = 128; // Liczba segmentów okręgu (im większa, tym okrąg będzie bardziej dokładny)
//   const radius = 100; // Promień okręgu
//   const thickness = 5; // Grubość krawędzi
//   const color = new THREE.Color("green"); // Kolor okręgu

//   // Funkcja generująca punkty okręgu
//   const generatePoints = () => {
//     const points = [];
//     for (let i = 0; i < segments; i++) {
//       const angle = (i / segments) * Math.PI * 2;
//       points.push(
//         new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius)
//       );
//     }
//     return points;
//   };

//   // Tworzenie geometrii i materiału okręgu
//   const geometry = new THREE.BufferGeometry().setFromPoints(generatePoints());
//   const material = new THREE.LineBasicMaterial({ color, linewidth: thickness });

//   // Renderowanie okręgu
//   return <line geometry={geometry} material={material} />;
// }

// function App() {
//   return (
//     <Canvas style={{ background: "darkblue" }}>
//       <Circle />
//     </Canvas>
//   );
// }

// export default App;

// import React from "react";
// import { Canvas } from "@react-three/fiber";

// const Ball = ({ x, y, color, size }) => {
//   return (
//     <mesh position={[x, y, 0]}>
//       <circleGeometry args={[size / 2, 32]} />
//       <meshBasicMaterial color={color} />
//     </mesh>
//   );
// };

// const App = () => {
//   const canvasRef = React.useRef();
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const centerX = width / 2;
//   const centerY = height / 2;
//   const radius = 400;

//   return (
//     <Canvas
//       ref={canvasRef}
//       style={{ position: "absolute", top: 0, left: 0 }}
//       camera={{ position: [0, 0, 1000], fov: 75 }}
//       onCreated={({ gl }) => {
//         gl.setSize(width, height);
//       }}
//     >
//       <circleGeometry
//         args={[radius, 64, 0, 2 * Math.PI, false]}
//         attach="geometry"
//       />
//       <meshBasicMaterial color="green" attach="material" />
//       <Ball x={centerX} y={centerY} color="blue" size={20} />
//     </Canvas>
//   );
// };

// export default App;

// import React from "react";
// import { Canvas } from "@react-three/fiber";

// const Circle = () => {
//   return (
//     <mesh>
//       <circleGeometry args={[400, 64]} />
//       <meshBasicMaterial color="green" />
//     </mesh>
//   );
// };

// const App = () => {
//   return (
//     <Canvas>
//       <Circle />
//     </Canvas>
//   );
// };

// export default App;

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";

const App = () => {
  return (
    <Canvas>
      <Sphere args={[400, 32, 32]} position={[0, 0, 0]} color="green">
        <meshBasicMaterial attach="material" color="#003300" wireframe />
      </Sphere>
    </Canvas>
  );
};

export default App;
