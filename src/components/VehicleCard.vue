<script setup lang="ts">
import type { Vehicle } from '../types/vehicle';

// Define props correctly
const props = defineProps<{ vehicle: Vehicle }>();
</script>

<template>
  <div class="vehicle-card">
    <img
    :src="vehicle.details.image"
    :alt="vehicle.name" 
    class="vehicle-image"
    >
    <div class="vehicle-details">
      <h3 class="vehicle-title">{{ vehicle.name }} ({{ vehicle.details.manufactureYear }})</h3>
      <p class="vehicle-brand">{{ vehicle.details.brand }}</p>
      <p class="vehicle-color">Color: {{ vehicle.details.color }}</p>
      <p class="price">
        {{ vehicle.details.currency }} {{ Number(vehicle.details.price).toLocaleString() }}
      </p>
      
      <div>
        <input
          type="number"
          class="input"
          :placeholder="`Enter bid amount in ${vehicle.details.currency}`"
          min="0"
        >
        <button
          class="btn btn-primary"
          style="width: 100%"
        >
          Add to Biddings
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-primary:disabled {
  background-color: var(--gray-400);
  cursor: not-allowed;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: 0.5rem;
}

.brand-select {
  width: 200px;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  background-color: white;
  outline: none;
}

.brand-select:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.vehicle-card {
  background: white;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  transition: transform 0.2s, box-shadow 0.2s;
  overflow: hidden;
}

.vehicle-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.vehicle-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.vehicle-details {
  padding: 1rem;
}

.vehicle-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.vehicle-brand,
.vehicle-color {
  color: var(--gray-600);
  margin-bottom: 0.25rem;
}

.price {
  font-family: monospace;
  font-weight: 600;
  font-size: 1.125rem;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--gray-300);
  border-radius: 0.375rem;
  margin: 0.5rem 0;
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

</style>
