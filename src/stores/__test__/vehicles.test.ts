import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia } from 'pinia';
import { setActivePinia } from 'pinia';
import { useVehicleStore } from '../vehicles';
import { fetchVehiclesAPI } from '../../api/vehicle_api';
import type { Vehicle, BidVehicle } from '../../types/vehicle';

// Mock the fetchVehiclesAPI function
vi.mock('../../api/vehicle_api', () => ({
  fetchVehiclesAPI: vi.fn(),
}));

describe('useVehicleStore', () => {
  let vehicleStore: ReturnType<typeof useVehicleStore>;

  beforeEach(() => {
    // Set up a new Pinia instance for each test
    setActivePinia(createPinia());
    vehicleStore = useVehicleStore();
  });

  it('should initialize with empty vehicles and biddedVehicles', () => {
    expect(vehicleStore.vehicles).toEqual([]);
    expect(vehicleStore.biddedVehicles).toEqual([]);
    expect(vehicleStore.selectedBrand).toBe('');
  });

  it('should fetch vehicles and populate vehicles array', async () => {
    // Mock the response of fetchVehiclesAPI
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

    // Mock the API call to return sample vehicles
    vi.mocked(fetchVehiclesAPI).mockResolvedValueOnce(sampleVehicles);

    // Call fetchVehicles method
    await vehicleStore.fetchVehicles();

    // Check if the vehicles state is updated correctly
    expect(vehicleStore.vehicles).toEqual(sampleVehicles);
  });

  it('should return filtered vehicles based on selected brand', async () => {
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

    vehicleStore.vehicles = sampleVehicles;

    // Set selected brand to 'Brand A'
    vehicleStore.setSelectedBrand('Brand A');

    // Filtered vehicles should only contain vehicles from 'Brand A'
    expect(vehicleStore.filteredVehicles).toEqual([
      sampleVehicles[0], // Only 'Vehicle 1' matches 'Brand A'
    ]);
  });

  it('should calculate total bid amount correctly', () => {
    const biddedVehicles: BidVehicle[] = [
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
        bidAmount: 12000,
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
        bidAmount: 18000,
      },
    ];

    vehicleStore.biddedVehicles = biddedVehicles;

    // The total bid amount should be 12000 + 18000 = 30000
    expect(vehicleStore.totalBidAmount).toBe(30000);
  });

  it('should add a bid if the bid amount is greater than the vehicle price', () => {
    const vehicle: Vehicle = {
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
    };

    vehicleStore.addBid(vehicle, 12000);

    expect(vehicleStore.biddedVehicles).toHaveLength(1);
    expect(vehicleStore.biddedVehicles[0].bidAmount).toBe(12000);
  });

  it('should not add a bid if the bid amount is less than or equal to the vehicle price', () => {
    const vehicle: Vehicle = {
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
    };

    vehicleStore.addBid(vehicle, 9000);

    // The bid should not be added because the amount is less than the price
    expect(vehicleStore.biddedVehicles).toHaveLength(0);
  });

  it('should update an existing bid if the same vehicle is added again with a higher bid amount', () => {
    const vehicle: Vehicle = {
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
    };

    vehicleStore.addBid(vehicle, 12000);
    vehicleStore.addBid(vehicle, 15000);

    // The bid amount should be updated to 15000
    expect(vehicleStore.biddedVehicles[0].bidAmount).toBe(15000);
  });
});
