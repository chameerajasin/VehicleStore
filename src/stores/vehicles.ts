import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Vehicle, BidVehicle } from '../types/vehicle';
import  { fetchVehiclesAPI } from '../api/vehicle_api';

export const useVehicleStore = defineStore('vehicles', () => {
  const vehicles = ref<Vehicle[]>([]);
  const biddedVehicles = ref<BidVehicle[]>([]);
  const selectedBrand = ref<string>('');

  async function fetchVehicles() {  
    vehicles.value = await fetchVehiclesAPI();
  }

  const filteredVehicles = computed(() => {
    if (!selectedBrand.value) return vehicles.value;
    return vehicles.value.filter(vehicle => vehicle.details.brand === selectedBrand.value);
  });

  const totalBidAmount = computed(() => {
    return biddedVehicles.value.reduce((total, vehicle) => total + vehicle.bidAmount, 0);
  });

  function addBid(vehicle: Vehicle, bidAmount: number) {
    if(bidAmount<= Number(vehicle.details.price)) return;

    const existingBid = biddedVehicles.value.find(v => v.id === vehicle.id);
    if(!existingBid ){
      biddedVehicles.value.push({ ...vehicle, bidAmount })
    } else{
      existingBid.bidAmount = bidAmount;

      biddedVehicles.value = [...biddedVehicles.value];
    }
  }

  function setSelectedBrand(brand: string) {
    selectedBrand.value = brand;
  }

  return {
    vehicles,
    biddedVehicles,
    selectedBrand,
    filteredVehicles,
    totalBidAmount,
    fetchVehicles,
    addBid,
    setSelectedBrand,
  };
});