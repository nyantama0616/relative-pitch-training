import React, { useState, useEffect } from "react";
import ITrainingManager from "../../interfaces/ITrainingManager";
import "./TrainMain.css";

interface TrainMainProps {
    trainManager: ITrainingManager
}

interface Style {
    backgroundColor: string
}

export default function TrainMain({ trainManager }: TrainMainProps) {
    const initialStyle = {
        backgroundColor: "#000000"
    };
    const [style, setStyle] = useState(initialStyle);
    const [ansColor, setAnsColor] = useState("#ce2121"); //temp

    useEffect(() => {
        setStyle(prevStyle => {
            const newStyle = { ...prevStyle };

            if (trainManager.isRight) {
                newStyle.backgroundColor = "#52b450";    
            } else {
                newStyle.backgroundColor = "#000000";    
            }
            
            return newStyle;
        });
    }, [trainManager.isRight]);

    useEffect(() => {
        setAnsColor(prevColor => {
            return trainManager.isAnswerable ? "#2158ce" : "#ce2121";
        });
    }, [trainManager.isAnswerable]);
    
    return (
        <div className="train-main" style={style}>
            <div className="user-answerable" style={{backgroundColor: ansColor}}>

            </div>
        </div>
    )
}
