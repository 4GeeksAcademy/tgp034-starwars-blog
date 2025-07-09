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
  return fetchResource('/people');
}

export async function getPersonById(id) {
  return fetchResource(`/people/${id}`);
}

export async function searchPeople(name) {
  return fetchResource(`/people/?name=${encodeURIComponent(name)}`);
}

export async function getAllPlanets() {
  return fetchResource('/planets');
}

export async function getPlanetById(id) {
  return fetchResource(`/planets/${id}`);
}

export async function searchPlanets(name) {
  return fetchResource(`/planets/?name=${encodeURIComponent(name)}`);
}

export async function getAllVehicles() {
  return fetchResource('/vehicles');
}

export async function getVehicleById(id) {
  return fetchResource(`/vehicles/${id}`);
}

export async function searchVehicles(name) {
  return fetchResource(`/vehicles/?name=${encodeURIComponent(name)}`);
}
