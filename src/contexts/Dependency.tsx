import React, {useContext} from "react";
import IKeyPressManager from "../interfaces/IKeyPressManager";
import ITrainingManager from "../interfaces/ITrainingManager";
import ITrainRecorder from "../interfaces/ITrainRecorder";
import IMidiIO from "../interfaces/IMidiIO";
import IQuestionGenerator from "../interfaces/IQuestionGenerator";
import useRequestManager from "../hooks/useRequestManager";
import IRequestManager from "../interfaces/request/IRequestManager";

interface DependencyContextType {
    // keyPressManager: IKeyPressManager;
    // trainManager: ITrainingManager;
    // trainRecorder: ITrainRecorder;
    // midiIO: IMidiIO;
    // questionGenerator: IQuestionGenerator;
    
    // useRequestManager: <Request, Response>() => ReturnType<typeof useRequestManager<Request, Response>>;
    useRequestManager: <Request, Response>() => IRequestManager<Request, Response>
}

const DependencyContext = React.createContext<DependencyContextType | null>(null);

export function useDependency() {
    return useContext(DependencyContext);
}


interface DependencyProviderProps {
    children: React.ReactNode
}
export function DependencyProvider({children}: DependencyProviderProps) {
    const value: DependencyContextType = {
        useRequestManager: useRequestManager,
    };

    return (
        <DependencyContext.Provider value={value}>
            {children}
        </DependencyContext.Provider>
    );
}
