import TrainResult from "../organisms/TrainResult";
import "./TopPage.css";

export default function TopPage() {
    const prevMissRates = [0.2, 0.3, 0.4, 0.5, 0.3, 0.1, 0.2, 0.3, 0.4, 1, 0.3, 0.4];
    const prevAverageReactionRates = [200, 300, 400, 500, 300, 100, 200, 300, 400, 500, 300, 500];
    const missRates = [0.1, 0.2, 0.3, 0.4, 0.5, 0.3, 0.1, 0.2, 0.3, 0.4, 0.5, 0.3];
    const averageReactionRates = [100, 200, 300, 400, 600, 300, 100, 200, 300, 400, 500, 300];

    const props = {
        prevMissRates: prevMissRates,
        prevAverageReactionRates: prevAverageReactionRates,
        missRates: missRates,
        averageReactionRates: averageReactionRates,
    };
    
    return (
        <div className="top-page">
            <TrainResult {...props} />
        </div>
    )
}
