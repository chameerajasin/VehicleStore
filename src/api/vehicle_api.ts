import type { Vehicle } from '../types/vehicle';

export async function fetchVehiclesAPI(): Promise<Vehicle[]> {
  try {
    const response = await fetch('/vehicles.json');
    const data = await response.json();
    return data as Vehicle[];
  } catch (error) {
    console.error("Error fetching vehicle data:", error);
    return []; // Return empty array in case of error
  }
}
