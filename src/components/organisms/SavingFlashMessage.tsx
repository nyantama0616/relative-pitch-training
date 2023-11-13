import BasicStatus from "../../interfaces/BasicStatus";
import ReactLoading from "react-loading";
import { useEffect, useMemo, useRef } from "react";
import { IconContext } from 'react-icons'
import { FaSkullCrossbones } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import "./SavingFlashMessage.css";

interface SavingFlashMessageProps {
    status: BasicStatus
    message: string
}

interface Memo {
    backgroundColor: string
    icon: JSX.Element | null,
}

export default function SavingFlashMessage({ status, message }: SavingFlashMessageProps) {
    const memo = useMemo(() => {
        switch (status) {
            case BasicStatus.Doing:
                return {
                    backgroundColor: "#dddddd",
                    icon: <ReactLoading type="spin" height={100} width={100} />
                }
            case BasicStatus.Success:
                return {
                    backgroundColor: "#77ff77",
                    icon: <BsCheckCircle />
                }
            case BasicStatus.Failed:
                return {
                    backgroundColor: "#ff5555",
                    icon: <FaSkullCrossbones />
                }
        }
    }, [status]);

    if (status === BasicStatus.None) return null;

    const style = {
        backgroundColor: memo?.backgroundColor
    }

    const iconStyle = {
        size: "100px",
    }

    return (
        <div className="saving-flash-message" style={style}>
            <IconContext.Provider value={iconStyle}>
                {memo?.icon}
            </IconContext.Provider>
            <div className="message">
                <h3>{message}</h3>
            </div>
        </div>
    )
}
