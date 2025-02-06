<script setup lang="ts">
import { useVehicleStore } from '../stores/vehicles';

const store = useVehicleStore();
const props = defineProps<{
  isOpen: boolean;
}>();
const emit = defineEmits<{
  (e: 'close'): void;
}>();
</script>

<template>
  <div
    v-if="isOpen"
    class="drawer-overlay"
    @click="emit('close')"
  />
  <div
    v-if="isOpen"
    class="drawer"
  >
    <div class="drawer-header">
      <h2 class="drawer-title">Your Biddings</h2>
      <button @click="emit('close')" class="close-button">✕</button>
    </div>

    <div v-if="store.biddedVehicles.length === 0" style="text-align: center; color: var(--gray-500); padding: 2rem 0;">
      No vehicles in biddings yet
    </div>

    <div v-else>
      <div v-for="vehicle in store.biddedVehicles" :key="vehicle.id" class="bid-item">
        <img :src="vehicle.details.image" :alt="vehicle.name" class="bid-image">
        <div class="bid-details">
          <h3 class="bid-vehicle-title">{{ vehicle.name }} ({{ vehicle.details.manufactureYear }})</h3>
          <p class="vehicle-brand">{{ vehicle.details.brand }}</p>
          <p class="bid-amount">
            {{ vehicle.details.currency }} {{ vehicle.bidAmount.toLocaleString() }}
          </p>
        </div>
      </div>

      <div class="total-section">
        <div class="total-row">
          <span class="total-label">Total Bid Amount:</span>
          <span class="total-amount">USD {{ store.totalBidAmount.toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.drawer-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

.drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  width: 400px;
  background: white;
  box-shadow: var(--shadow-lg);
  z-index: 50;
  padding: 1rem;
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.drawer-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-500);
}

.close-button:hover {
  color: var(--gray-700);
}

.bid-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--gray-200);
}

.bid-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 0.375rem;
}

.bid-details {
  flex: 1;
}

.bid-vehicle-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.bid-amount {
  color: var(--primary-color);
  font-weight: 600;
  margin-top: 0.25rem;
}

.total-section {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-200);
}

.total-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total-label {
  font-size: 1.125rem;
  font-weight: bold;
}

.total-amount {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--primary-color);
}

</style>