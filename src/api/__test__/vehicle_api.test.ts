import { describe, it, expect, vi } from 'vitest';
import { fetchVehiclesAPI } from '../vehicle_api'; // adjust path as needed
import type { Vehicle } from '../../types/vehicle';

// Mock the global fetch function
global.fetch = vi.fn();

// Sample vehicle data
const sampleVehicles: Vehicle[] = [
  {
    id: 1,
    name: 'Vehicle 1',
    details: {
      currency: 'USD',
      price: '10000',
      color: 'Red',
      brand: 'Brand A',
      manufactureYear: '2020',
      image: 'image-url',
      description: 'Description of Vehicle 1',
    },
  },
  {
    id: 2,
    name: 'Vehicle 2',
    details: {
      currency: 'USD',
      price: '15000',
      color: 'Blue',
      brand: 'Brand B',
      manufactureYear: '2021',
      image: 'image-url-2',
      description: 'Description of Vehicle 2',
    },
  },
];

describe('fetchVehiclesAPI', () => {
  it('should fetch and return vehicles data successfully', async () => {
    //Arrange
    // Mock successful response
    vi.mocked(fetch).mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(sampleVehicles),
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      redirected: false,
    } as unknown as Response);

    //Act
    const vehicles = await fetchVehiclesAPI();
    
    //Assert
    expect(vehicles).toEqual(sampleVehicles);
    expect(fetch).toHaveBeenCalled();
  });

  it('should handle fetch error and return an empty array', async () => {
    //Arrange
    // Mock fetch to throw an error
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Failed to fetch'));

    //Act
    const vehicles = await fetchVehiclesAPI();

    //Assert
    expect(vehicles).toEqual([]); // Should return an empty array on error
    expect(fetch).toHaveBeenCalled();
  });
});
