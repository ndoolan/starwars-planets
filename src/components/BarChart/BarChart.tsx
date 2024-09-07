/**
 * **************************************************
 *
 * @module BarChart
 *
 * @description
 * Renders a bar chart for passed down planet data
 * options currently limited to properties that can
 * be converted to numbers
 *
 * **************************************************
 */

import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef, useState } from 'react';
import { Planet } from '../../types/types';

interface ChartProps {
  [key: string]: any;
}

const BarChart = ({ planets }: ChartProps): JSX.Element => {
  console.log('inside bar', planets);
  // TODO fix this organization
  // Chart.register(ChartDataLabels);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [currentAttribute, setCurrentAttribute] =
    useState<string>('population');

  // TODO pagination in charts - we only see the first x num
  useEffect(() => {
    if (planets.length <= 0 || !chartRef.current) return;

    const context = chartRef.current.getContext('2d');
    if (!context) return;

    const chartData: ChartData<'bar'> = {
      labels: planets.map((item: Planet) => item.name),
      datasets: [
        {
          // TODO look into string conflict
          data: planets.map((planet: any) => Number(planet[currentAttribute])),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: `${currentAttribute}`,
          },
          datalabels: {
            color: '#000',
            anchor: 'end',
            align: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
      plugins: [ChartDataLabels],
    };

    chartInstance.current = new Chart(context, config);

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [planets, chartRef, currentAttribute]);

  return (
    <div>
      <div role="group" aria-label="Chart attribute selection">
        <button onClick={() => setCurrentAttribute('rotation_period')}>
          Rotation Period
        </button>
        <button onClick={() => setCurrentAttribute('orbital_period')}>
          Orbital Period
        </button>
        <button onClick={() => setCurrentAttribute('diameter')}>
          Diameter
        </button>
        <button onClick={() => setCurrentAttribute('surface_water')}>
          Surface Water
        </button>
        <button onClick={() => setCurrentAttribute('population')}>
          Population
        </button>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
