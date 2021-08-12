import '../App.css';
import './Main.css';
/* Chartjs Examples: https://reactchartjs.github.io/react-chartjs-2/#/ */
import LineChart from '../line/Line.js';
import PieChart from '../pie/Pie.js';

const Main = () => {
    return (
        <div id='Main'>
            <div id='header'>
                <h1>Budget Overview</h1>
            </div>
            <hr/>
            <div className="center-wrapper">
                <div className="center">
                    <LineChart/>
                </div>
            </div>
            <div className="center-wrapper">
                <div className="center">
                    <PieChart/>
                </div>
            </div>
        </div>
    )
}

export default Main