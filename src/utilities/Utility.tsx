import Note from "../enums/Note";

interface IntervalDictionary {
    [id: number]: string
}
const dict: IntervalDictionary = {
    0: "P1",
    1: "m2",
    2: "M2",
    3: "m3",
    4: "M3",
    5: "P4",
    6: "A4",
    7: "P5",
    8: "m6",
    9: "M6",
    10: "m7",
    11: "M7"
}

export function notesToInterval(note0: Note, note1: Note) {
    const diff = Math.abs(note1 - note0);
    
    let interval = dict[diff] === undefined ? "UnKnown" : dict[diff]; //なんでパイプ使って記述できないの？
    let signal = diff == 0 ? 0 : (note1 - note0) / diff;
    
    return {
        interval,
        signal //-1 or 0 or 1
    }
}
