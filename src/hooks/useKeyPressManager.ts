import { useEffect, useState } from "react";

import IKeyPressManager, { IKeyDownInfo, IKeyUpInfo } from "../interfaces/IKeyPressManager";

const initialKeyDownInfo: IKeyDownInfo = {
    count: 0,
    key: ""
}

export default function useKeyPressManager(): IKeyPressManager {
    const [keyDownInfo, setKeydownInfo] = useState<IKeyDownInfo>(initialKeyDownInfo);
    const [keyUpInfo, setKeyUpInfo] = useState<IKeyUpInfo>(initialKeyDownInfo);

    function handleKeyDown(e: React.KeyboardEvent<Element>) {
        setKeydownInfo(prev => {
            const newKeydownInfo = {
                count: prev.count + 1,
                key: e.key
            };

            return newKeydownInfo;
        });
    }
    
    function handleKeyUp(e: React.KeyboardEvent<Element>) {
        setKeyUpInfo(prev => {
            const newKeyUpInfo = {
                count: prev.count + 1,
                key: e.key
            };

            return newKeyUpInfo;
        });
    }

    return {
        keyDownInfo,
        handleKeyDown,
        keyUpInfo,
        handleKeyUp,
    }
}
