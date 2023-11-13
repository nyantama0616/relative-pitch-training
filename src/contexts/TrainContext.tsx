import { createContext, useContext } from 'react';
import ITrainingManager from '../interfaces/ITrainingManager';
import ITrainRecorder from '../interfaces/ITrainRecorder';
import useTrainingManager from '../hooks/useTrainingManager';
import useTrainRecordSaver from '../hooks/useTrainRecordSaver';
import useTrainRecorder from '../hooks/useTrainRecorder';
import { useMidiIO } from '../hooks/useMidiIO';
import { useMidiIOMock } from '../hooks/mocks/useMidiIOMock';
import {useKeyPress} from './KeyPressContext';

type TrainContextType = {
    trainManager: ITrainingManager | null
    trainRecorder: ITrainRecorder | null
}

const TrainContext = createContext<TrainContextType>({
    trainManager: null,
    trainRecorder: null
});

export function useTrain() {
    return useContext(TrainContext);
}

export function TrainProvider({ children }: { children: React.ReactNode }) {
    const keyPressManager = useKeyPress();
    const midiIO = useMidiIOMock(keyPressManager!);
    const trainManager = useTrainingManager(midiIO);
    const trainRecordSaver = useTrainRecordSaver();
    const trainRecorder = useTrainRecorder(trainManager, trainRecordSaver);

    return (
        <TrainContext.Provider value={{ trainManager, trainRecorder }}>
            { children }
        </TrainContext.Provider>
    )
}
