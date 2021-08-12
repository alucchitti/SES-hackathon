import '../App.css';
import './Main.css';
import { Line } from 'react-chartjs-2';

const Main = () => {
    return (
        <div id='Main'>
            <div id='header'>
                <h1>Transaction Overview</h1>
            </div>
            <hr/>
            <Line data={{
            labels: ["h", "m", "n"],
            datasets: [
              {
                data: [6, 10, 11],
                label: "Activity",
                borderColor: "#3333ff",
                fill: true,
                backgroundColor: "#CAA6DB",
              },
            ],
          }}
        />
        </div>
    )
}

export default Main