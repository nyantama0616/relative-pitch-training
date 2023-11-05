import { OrbitControls, Environment, Image, Text, Box } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';

interface ReactionTimeBarProps {
    duration: number
}

export default function ReactionTimeBar({duration}: ReactionTimeBarProps) {
    return (
        <mesh>
            <Box position={[0, 0, 0]} />
        </mesh>
    );
}
