import Note from "../enums/Note"
export default interface ISoundPlayer {
    playNote(note: Note, duration: number): void
}
