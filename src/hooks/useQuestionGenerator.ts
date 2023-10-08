import IQuestionGenerator from "../interfaces/IQuestionGenerator";
import Note from "../enums/Note";

export default function useQuestionGenerator(): IQuestionGenerator {
    function generate() {
        const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4]
        
        const note0 = Note.C4;
        const note1 = note1Candidates[_randInt(0, note1Candidates.length - 1)];
        
        return {
            note0, //C4
            note1 //D3 ~ B3 or D4 ~ B4
        }
    }

    function _randInt(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    return {
        generate
    }
}
