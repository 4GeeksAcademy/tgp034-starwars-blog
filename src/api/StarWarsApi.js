const BASE_URL = 'https://www.swapi.tech/api';

async function fetchResource(path) {
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Failed to fetch ${path}:`, error);
    throw error;
  }
}

export async function getAllPeople() {
  const people = await fetchResource('/people');
  const details = await Promise.all(
    people.results.map(async person => {
      const detail = await fetch(person.url).then(r => r.json());
      const uid = person.uid;
      return {uid, ...detail.result.properties, id: detail.result._id };
    })
  );
  return details;
}

export async function getPersonById(id) {
  return fetchResource(`/people/${id}`);
}

export async function searchPeople(name) {
  return fetchResource(`/people/?name=${encodeURIComponent(name)}`);
}

export async function getAllPlanets() {
  const planets = await fetchResource('/planets');
  const details = await Promise.all(
    planets.results.map(async planet => {
      const detail = await fetch(planet.url).then(r => r.json());
      const uid = planet.uid
      return { uid, ...detail.result.properties, id: detail.result._id };
    })
  );
  return details;
}

export async function getPlanetById(id) {
  return fetchResource(`/planets/${id}`);
}

export async function searchPlanets(name) {
  return fetchResource(`/planets/?name=${encodeURIComponent(name)}`);
}

export async function getAllVehicles() {
  const vehicles = await fetchResource('/vehicles');
  const details = await Promise.all(
    vehicles.results.map(async vehicle => {
      const detail = await fetch(vehicle.url).then(r => r.json());
      const uid = vehicle.uid
      return { uid, ...detail.result.properties, id: detail.result._id };
    })
  );
  return details;
}

export async function getVehicleById(id) {
  return fetchResource(`/vehicles/${id}`);
}

export async function searchVehicles(name) {
  return fetchResource(`/vehicles/?name=${encodeURIComponent(name)}`);
}
