"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registre os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [luminosityData, setLuminosityData] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    // Simulação de dados (tempo, temperatura, luminosidade)
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      const temp = Math.random() * (30 - 20) + 20; // Temperatura entre 20 e 30 graus
      const luminosity = Math.random() * 100; // Luminosidade entre 0 e 100%

      setTime((prevTime) => [...prevTime, currentTime].slice(-10)); // Últimos 10 tempos
      setTemperatureData((prevData) => [...prevData, temp].slice(-10)); // Últimos 10 dados de temperatura
      setLuminosityData((prevData) => [...prevData, luminosity].slice(-10)); // Últimos 10 dados de luminosidade
    }, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  // Dados do gráfico de temperatura
  const temperatureChartData = {
    labels: time,
    datasets: [
      {
        label: "Temperatura (°C)",
        data: temperatureData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Dados do gráfico de luminosidade
  const luminosityChartData = {
    labels: time,
    datasets: [
      {
        label: "Luminosidade (%)",
        data: luminosityData,
        borderColor: "rgba(53, 162, 235, 1)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Gráficos de Temperatura e Luminosidade</h1>

        <div className="flex flex-col gap-16">
          {/* Gráfico de Temperatura */}
          <div className="w-full sm:w-[600px]">
            <h2>Temperatura</h2>
            <Line data={temperatureChartData} />
          </div>

          {/* Gráfico de Luminosidade */}
          <div className="w-full sm:w-[600px]">
            <h2>Luminosidade</h2>
            <Line data={luminosityChartData} />
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
      </footer>
    </div>
  );
}
