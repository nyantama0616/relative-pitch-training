import React, {useContext} from "react";
import IKeyPressManager from "./interfaces/IKeyPressManager";
import ITrainingManager from "./interfaces/ITrainingManager";
import ITrainRecorder from "./interfaces/ITrainRecorder";
import IMidiIO from "./interfaces/IMidiIO";
import IQuestionGenerator from "./interfaces/IQuestionGenerator";
import useRequestManager from "./hooks/useRequestManager";
import IRequestManager from "./interfaces/request/IRequestManager";
import useKeyPressManager from "./hooks/useKeyPressManager";
import useTrainingManager from "./hooks/useTrainingManager";
import useTrainRecorder from "./hooks/useTrainRecorder";
import useMidiIO from "./hooks/useMidiIO";
import QuestionGeneratorRandom from "./features/train/classes/QuestionGeneratorRandom";
import useTrainRecordSaver from "./hooks/useTrainRecordSaver";

interface DependencyContextType {
    keyPressManager: IKeyPressManager;
    trainManager: ITrainingManager;
    trainRecorder: ITrainRecorder;
    midiIO: IMidiIO;
    questionGenerator: IQuestionGenerator;
    useRequestManager: <Request, Response>() => IRequestManager<Request, Response>
}

const initialValue: DependencyContextType = {
    keyPressManager: null!,
    trainManager: null!,
    trainRecorder: null!,
    midiIO: null!,
    questionGenerator: null!,
    useRequestManager: null!,
};

const DependencyContext = React.createContext<DependencyContextType>(initialValue);

export function useDependency() {
    return useContext(DependencyContext);
}

interface DependencyProviderProps {
    children: React.ReactNode
}
export function DependencyProvider({ children }: DependencyProviderProps) {
    const midiIO = useMidiIO();
    const questionGenerator = new QuestionGeneratorRandom();
    const keyPressManager = useKeyPressManager();
    const trainManager = useTrainingManager(midiIO);
    const trainRecordSaver = useTrainRecordSaver(); //TODO: 消す
    const trainRecorder = useTrainRecorder(trainManager, trainRecordSaver);

    const value: DependencyContextType = {
        keyPressManager,
        trainManager,
        trainRecorder,
        midiIO,
        questionGenerator,
        useRequestManager: useRequestManager,
    };

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
