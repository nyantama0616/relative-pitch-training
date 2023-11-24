import IQuestionGenerator, { IQuestion } from "../interfaces/IQuestionGenerator";
import Note from "../../../Note";

const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4];

export default class QuestionGeneratorRandom implements IQuestionGenerator {
    public generate(): IQuestion {
        const note0 = Note.C4;
        const note1 = note1Candidates[this._randInt(0, note1Candidates.length - 1)];

        return {
            note0, //C4
            note1 //D3 ~ B3 or D4 ~ B4
        }
    }
    
    private _randInt(min: number, max: number): number {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
}