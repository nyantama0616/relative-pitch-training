import { OrbitControls, Environment, Image, Text } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { Vector3 } from "three";
import ITrainRecorder from '../../interfaces/ITrainRecorder';
import ReactionTimeBar from './ReactionTimeBar';
import "./TrainingScene.css";
// import ITrainingManager from '../../interfaces/ITrainingManager';

interface TrainingSceneProps {
    trainRecorder: ITrainRecorder
}
export default function TrainingScene({ trainRecorder }: TrainingSceneProps) {
    return (
        <div className="training-scene">
            <Canvas>
                <OrbitControls />
                {/* <SushiMesh position={new Vector3(0, 0, 0)} /> */}
                <ReactionTimeBar duration={trainRecorder.record.duration} />
                <pointLight position={[10, 10, 10]} />
                <Environment preset="sunset" blur={0.7} background />
            </Canvas>
            {/* <div className='question'>
                <h1>{questionManager.question}</h1>
                <h3><span className="typed-keys">{questionManager.typedKeys}</span><span className="untyped-keys">{questionManager.unTypedKeys}</span></h3>
            </div> */}
        </div>
    );
}
