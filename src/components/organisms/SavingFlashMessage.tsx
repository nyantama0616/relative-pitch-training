import { BasicStatus } from "../../interfaces/ITrainRecordSaver";
import ReactLoading from "react-loading";
import { useEffect, useRef } from "react";
import { IconContext } from 'react-icons'
import { FaSkullCrossbones } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import "./SavingFlashMessage.css";

interface SavingFlashMessageProps {
    status: BasicStatus
    message: string
}

export default function SavingFlashMessage({ status, message }: SavingFlashMessageProps) {
    const iconRef = useRef<JSX.Element | null>(null);
    const backgroundColorRef = useRef("");

    useEffect(() => {
        switch (status) {
            case BasicStatus.Doing:
                backgroundColorRef.current = "#dddddd";
                iconRef.current = <ReactLoading type="spin" height={100} width={100} />
                break;
            case BasicStatus.Success:
                backgroundColorRef.current = "#55ff55";
                iconRef.current = <BsCheckCircle />
                break;
            case BasicStatus.Failed:
                backgroundColorRef.current = "#ff5555";
                iconRef.current = <FaSkullCrossbones />
                break;
        }
    }, [status]);

    if (status === BasicStatus.None) return null;

    const style = {
        backgroundColor: backgroundColorRef.current
    }

    const iconStyle = {
        size: "100px",
    }

    return (
        <div className="saving-flash-message" style={style}>
            <IconContext.Provider value={iconStyle}>
                {iconRef.current}
            </IconContext.Provider>
            <div className="message">
                <h3>{message}</h3>
            </div>
        </div>
    )
}
