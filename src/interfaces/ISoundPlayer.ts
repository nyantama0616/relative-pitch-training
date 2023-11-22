import Note from "../Note"
import { IMidiMessage } from "./IMidiMessage"
export default interface ISoundPlayer {
    playNote(note: Note, duration: number): void
    sendMessage(message: IMidiMessage): void
}
