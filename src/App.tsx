import { useEffect, useState } from 'react';
import './App.css';
import BarChart from './components/BarChart/BarChart';
import Table from './components/Table/Table';
import { fetchPlanets } from './hooks/fetchPlanets';
import { Planet } from './types/types';

function App() {
  const [planets, setPlanets] = useState<[] | Planet[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const planets = await fetchPlanets();
        setPlanets(planets);
      } catch (error) {
        console.error('Error Getting Planets', error);
      }
    };
    setLoading(true);
    getPlanets();
  }, []);

  if (!loading) return <h1> Loading </h1>;

  return (
    <>
      {planets && <Table planets={planets} />}
      {planets && <BarChart planets={planets} />}
    </>
  );
}

export default App;
