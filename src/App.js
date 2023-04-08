// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { CircleGeometry, MeshBasicMaterial, Mesh } from "three";

// function Circle() {
//   const radius = 4;
//   const segments = 64;
//   const geometry = new CircleGeometry(radius, segments);
//   const material = new MeshBasicMaterial({
//     color: 0xffffff,
//     // transparent: true, // włączenie przezroczystości
//     // opacity: 1, // ustawienie przezroczystości na 50%
//     // side: 2, // renderowanie odwróconych powierzchni
//     // wireframe: true, // włączenie krawędzi
//     // wireframeLinewidth: 20, // ustawienie grubości krawędzi na 5 pikseli
//   });
//   const meshRef = useRef(); // utworzenie referencji do Mesh

//   useFrame(() => {
//     // Aktualizacja pozycji Mesh w każdej klatce animacji
//     meshRef.current.position.z = -1;
//   });

//   return <mesh ref={meshRef} geometry={geometry} material={material} />;
// }

// export default function App() {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Canvas style={{ background: "black" }}>
//         <Circle />
//       </Canvas>
//     </div>
//   );
// }
