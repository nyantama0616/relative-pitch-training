import React, {useContext} from "react";
import IKeyPressManager from "./features/others/interfaces/IKeyPressManager";
import ITrainingManager from "./features/train/interfaces/ITrainingManager";
import ITrainRecorder from "./features/train/interfaces/ITrainRecorder";
import IMidiIO from "./features/others/interfaces/IMidiIO";
import IQuestionGenerator from "./features/train/interfaces/IQuestionGenerator";
import useKeyPressManager from "./features/others/hooks/useKeyPressManager";
import useTrainingManager from "./features/train/hooks/useTrainingManager";
import useTrainRecorder from "./features/train/hooks/useTrainRecorder";
import useMidiIO from "./features/others/hooks/useMidiIO";
import QuestionGeneratorRandom from "./features/train/classes/QuestionGeneratorRandom";
import useTrainRecordSaver from "./features/train/hooks/useTrainRecordSaver";
import ISoundPlayer from "./features/others/interfaces/ISoundPlayer";
import { useSoundPlayerWithTone } from "./features/others/hooks/useSoundPlayerWithTone";
import ITrainRecordSaver from "./features/train/interfaces/ITrainRecordSaver";
import IAuthManager from "./features/auth/interfaces/IAuthManager";
import useAuthManager from "./features/auth/hooks/useAuthManager";
import RequestManager, { TypeRequestManager } from "./features/others/classes/RequestManager";
import UserRequestManager from "./features/others/classes/UserRequestManager";
import useDeveloper from "./features/others/hooks/useDeveloper";
interface DependencyContextType {
    keyPressManager: IKeyPressManager;
    trainManager: ITrainingManager;
    trainRecorder: ITrainRecorder;
    trainRecordSaver: ITrainRecordSaver; //TODO: 消す
    midiIO: IMidiIO;
    soundPlayer: ISoundPlayer
    questionGenerator: IQuestionGenerator;
    RequestManager: TypeRequestManager;
    authManager: IAuthManager;
    userRequestManager: UserRequestManager;
}

const initialValue: DependencyContextType = {
    keyPressManager: null!,
    trainManager: null!,
    trainRecorder: null!,
    trainRecordSaver: null!, //TODO: 消す
    midiIO: null!,
    soundPlayer: null!,
    questionGenerator: null!,
    RequestManager: null!,
    authManager: null!,
    userRequestManager: null!,
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
    const soundPlayer = useSoundPlayerWithTone();
    const questionGenerator = new QuestionGeneratorRandom();
    const keyPressManager = useKeyPressManager();
    const trainManager = useTrainingManager({ midiIO, soundPlayer, questionGenerator });
    const trainRecordSaver = useTrainRecordSaver(); //TODO: 消す
    const trainRecorder = useTrainRecorder({ trainManager, trainRecordSaver });
    const authManager = useAuthManager(RequestManager);
    const userRequestManager = new UserRequestManager(RequestManager);

    const developer = useDeveloper({authManager}); //TODO: 開発が終わったら消す

    const value: DependencyContextType = {
        keyPressManager,
        trainManager,
        trainRecorder,
        midiIO,
        soundPlayer,
        questionGenerator,
        trainRecordSaver,
        RequestManager: RequestManager,
        authManager: authManager,
        userRequestManager: userRequestManager,
    };

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
