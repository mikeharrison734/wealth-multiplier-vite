import { useContext, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { AccountContext } from "../store/account-context";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

      console.log(cash);

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
