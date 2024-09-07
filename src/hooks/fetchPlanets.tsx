/**
 * **************************************************
 *
 * @name fetchPlanets
 *
 * @description
 * fetches all planet data from SWAPI, planets currently limited
 * to 60, but has functionality build in to get more planets based
 * on next page URL
 *
 * **************************************************
 */

import { Planet } from '../types/types';

export const fetchPlanets = async (): Promise<Planet[]> => {
  const allPlanets: Planet[] = [];
  let url: string | null = 'https://swapi.dev/api/planets/';

  try {
    while (url) {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      allPlanets.push(...data.results);
      // update url string for other planets
      url = data.next;
    }
  } catch (error) {
    console.error('Error fetching planets', error);
  }

  // optimize sort
  const collator = new Intl.Collator('en');
  allPlanets.sort((a: Planet, b: Planet) => collator.compare(a.name, b.name));

  return allPlanets;
};
