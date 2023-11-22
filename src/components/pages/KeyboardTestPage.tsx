import Keyboard from "../organisms/Keyboard";
import { useDependency } from "../../contexts/Dependency";

export default function KeyboardTestPage() {
    const { midiIO } = useDependency();

    return (
        <div className="keyboard-test-page">
            <h1>Keyboard Test Page</h1>
            <Keyboard message={midiIO.inputMessage} />
        </div>
    )
}
