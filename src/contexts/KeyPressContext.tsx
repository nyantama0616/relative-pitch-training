import IKeyPressManager from "../interfaces/IKeyPressManager";
import { createContext, useContext } from 'react';

type KeyPressContextType = IKeyPressManager | null;

const KeyPressContext = createContext<KeyPressContextType>(null);

export function useKeyPress() {
    return useContext(KeyPressContext);
}

interface KeyPressProviderProps {
    keyPressManager: IKeyPressManager
    children: React.ReactNode
}

export function KeyPressProvider({ keyPressManager, children }: KeyPressProviderProps) {
    return (
        <KeyPressContext.Provider value={{ ...keyPressManager }}>
            {children}
        </KeyPressContext.Provider>
    )
}
