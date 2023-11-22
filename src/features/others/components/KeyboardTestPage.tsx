import Keyboard from "./Keyboard";
import { useDependency } from "../../../Dependency";

export default function KeyboardTestPage() {
    const { midiIO } = useDependency();

    return (
        <div className="keyboard-test-page">
            <h1>Keyboard Test Page</h1>
            <Keyboard message={midiIO.inputMessage} />
        </div>
    )
}
