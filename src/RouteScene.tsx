import { Canvas, useFrame } from '@react-three/fiber'
import { Line, RoundedBox } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'
const route: [number,number,number][] = [[-4,.12,2],[-2,.12,2],[-2,.12,0],[0,.12,0],[0,.12,-2],[3,.12,-2],[3,.12,1],[4,.12,1]]
function Network({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null)
  const dot = useRef<THREE.Mesh>(null)
  useFrame(({ clock, pointer }, delta) => {
    if (!active) return
    if (group.current) { group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, pointer.x * .13, 2, delta) }
    if (dot.current) { const t = (clock.elapsedTime * .16) % 7; const i = Math.floor(t); dot.current.position.lerpVectors(new THREE.Vector3(...route[i]), new THREE.Vector3(...route[i+1]),t-i); dot.current.position.y = .25 }
  })
  return <group ref={group}>
    <RoundedBox args={[10,.24,8]} radius={.2} position={[0,-.25,0]}><meshStandardMaterial color="#171c1d" metalness={.65} roughness={.5}/></RoundedBox>
    {Array.from({length:9},(_,i)=><group key={i}><Line points={[[-4+i,.01,-3.5],[-4+i,.01,3.5]]} color="#303735" lineWidth={1}/><Line points={[[-4.5,.01,-3.5+i*.85],[4.5,.01,-3.5+i*.85]]} color="#303735" lineWidth={1}/></group>)}
    {[[-3,-2,1.2],[-1,-2,.8],[1,1,1.6],[3,2,.6],[-3,0,.5],[1,-.6,.65],[1,-3,.9],[-1,3,.5]].map(([x,z,h],i)=><RoundedBox key={i} args={[.75,h,.75]} radius={.05} position={[x,h/2,z]}><meshStandardMaterial color={i%3===0?'#3b4039':'#242c2b'} metalness={.5} roughness={.5}/></RoundedBox>)}
    <Line points={route} color="#d4a63a" lineWidth={4}/>
    {[route[0],route[3],route[7]].map(([x,,z],i)=><group key={i} position={[x,.1,z]}><mesh rotation={[-Math.PI/2,0,0]}><torusGeometry args={[.27,.025,8,40]}/><meshStandardMaterial color="#d4a63a" emissive="#d4a63a" emissiveIntensity={1}/></mesh><mesh position={[0,.28,0]}><octahedronGeometry args={[.16]}/><meshStandardMaterial color="#f6d47b" emissive="#d4a63a" emissiveIntensity={.7}/></mesh></group>)}
    <mesh ref={dot} position={route[0]}><sphereGeometry args={[.09,12,12]}/><meshBasicMaterial color="#fff0c5"/></mesh>
  </group>
}
export default function RouteScene({ active }: {active:boolean}) {
  return <Canvas frameloop={active?'always':'demand'} dpr={[1,1.5]} camera={{ position:[8,9,11], fov:40 }} gl={{ antialias:true, alpha:true }}><ambientLight intensity={1.5}/><directionalLight position={[0,8,3]} intensity={3} color="#ffe4a1"/><pointLight position={[-4,3,0]} intensity={16} color="#d4a63a"/><Network active={active}/></Canvas>
}
