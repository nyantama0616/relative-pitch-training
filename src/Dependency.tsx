import React, {useContext} from "react";
import IKeyPressManager from "./features/others/interfaces/IKeyPressManager";
import ITrainingManager from "./features/train/interfaces/ITrainingManager";
import ITrainRecorder from "./features/train/interfaces/ITrainRecorder";
import IMidiIO from "./features/others/interfaces/IMidiIO";
import IQuestionGenerator from "./features/train/interfaces/IQuestionGenerator";
import useRequestManager from "./features/others/hooks/useRequestManager";
import IRequestManager from "./features/others/interfaces/IRequestManager";
import useKeyPressManager from "./features/others/hooks/useKeyPressManager";
import useTrainingManager from "./features/train/hooks/useTrainingManager";
import useTrainRecorder from "./features/train/hooks/useTrainRecorder";
import useMidiIO from "./features/others/hooks/useMidiIO";
import QuestionGeneratorRandom from "./features/train/classes/QuestionGeneratorRandom";
import useTrainRecordSaver from "./features/train/hooks/useTrainRecordSaver";

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
