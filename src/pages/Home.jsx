import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'

import Cafe from '../models/Cafe'
import Sky from '../models/Sky'

const Home = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);

  const adjustCafeForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.6, 0.9, 0];

    if(window.innerWidth < 769){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1, 0.5];
    } else {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -0.9, 0.5];
    }

    return [ screenScale, screenPosition, rotation ];
  }

  const [ cafeScale, cafePosition, cafeRotation ] = adjustCafeForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POPUP
      </div> */}

      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <Suspense fallback = {<Loader/>}>
          <directionalLight position={[6, 1, 1]} intensity={2}/>
          <ambientLight intensity={0.5} />
          <pointLight />
          <spotLight />
          <hemisphereLight skyColor = "#b1e1ff" groundColor="#000000" intensity={1}/>

          <Sky />
          <Cafe 
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={cafePosition}
            rotation={cafeRotation}
            scale={cafeScale}
          />
        </Suspense>

      </Canvas>

      

    </section>
  )
}

export default Home