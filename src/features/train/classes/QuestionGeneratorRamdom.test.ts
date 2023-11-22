import QuestionGeneratorRandom from "./QuestionGeneratorRandom";
import Note from "../../../Note";

const note1Candidates = [Note.D3, Note.E3, Note.F3, Note.G3, Note.A3, Note.B3, Note.D4, Note.E4, Note.F4, Note.G4, Note.A4, Note.B4];

describe("Test GenerateCounterRandom", () => {
    test("note0がC4かつnote1がD3~B4であること", () => {
        const generator = new QuestionGeneratorRandom();
        const question = generator.generate();

        for (let i = 0; i < 100; i++) {
            expect(question.note0).toBe(Note.C4);
            expect(note1Candidates).toContain(question.note1);
        }
    });
    
    test("ランダムに問題が生成されるか", async () => {
        const generator = new QuestionGeneratorRandom();
        
        let dict: { [key: number]: number } = {};
        for (let note of note1Candidates) {
            dict[note] = 0;
        }
        
        for (let i = 0; i < 1000; i++) {
            const question = generator.generate();
            dict[question.note1]++;
        }

        const diffMinMax = Math.max(...Object.values(dict)) - Math.min(...Object.values(dict));
        expect(diffMinMax).toBeLessThan(50); //TODO: こんな甘々でいいのか？
    });
});
