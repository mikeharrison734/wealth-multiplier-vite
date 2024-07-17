import { useContext, useEffect, useRef } from "react";
import { AccountContext } from "../store/account-context";
import {
  Chart as ChartJS,
  registerables
} from "chart.js/auto";

ChartJS.register(...registerables);

export default function LineChart() {
  const { accounts, currentAge, retirementAge } = useContext(AccountContext);
  const chartRef = useRef();

  let chartData;
  let options;

  let labels = [];
  let cash = [];
  let createChart = false;

  useEffect(() => {
    if (+retirementAge > +currentAge) {
      cash = new Array((retirementAge - currentAge) + 1).fill(0);
      accounts.forEach((account) => {
        for (let i = 0; i < cash.length; i++) {
          if (account.chartData[i]) {
            createChart = true;
            labels[i] = account.chartData[i].age;
            cash[i] += account.chartData[i].cash;
          }
        }
      });
      
      chartData = {
        labels: labels,
        datasets: [
          {
            label: "Cash",
            data: cash,
            backgroundColor: ["rgba(255, 255, 255, 1)"],
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      };

      options = {
        scales: {
          x: {
            ticks: {
              min: 0,
              max: 60,
              stepSize: 1,
            },
          },
        },
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: false,
          },
        },
      };
    }

    const chart = new ChartJS(document.getElementById("chart"), {
      type: "line",
      data: chartData,
      options: options,
    });

    return () => {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
      
      chart.destroy();
    }
  }, [accounts, retirementAge, currentAge]);

  return <canvas id="chart" ref={chartRef}/>;
}
