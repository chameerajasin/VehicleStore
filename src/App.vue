<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useVehicleStore } from './stores/vehicles';
import VehicleCard from './components/VehicleCard.vue';
import BiddingDrawer from './components/BiddingDrawer.vue';

const store = useVehicleStore();
const isDrawerOpen = ref(false);
const brands = ['BMW', 'Tesla', 'Porsche', 'Lamborghini', 'Mercedes-Benz'];

onMounted(() => {
  store.fetchVehicles();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Vehicle Bidding</h1>
      <button class="btn btn-primary" @click="isDrawerOpen = true">
        View Biddings
      </button>
    </div>

    <div class="filter-section">
      <label class="filter-label">Filter by Brand:</label>
      <select v-model="store.selectedBrand" class="brand-select">
        <option value="">All Brands</option>
        <option v-for="brand in brands" :key="brand" :value="brand">
          {{ brand }}
        </option>
      </select>
    </div>
    <div class="grid">
      <VehicleCard
        v-for="vehicle in store.filteredVehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
      />
    </div>

    <BiddingDrawer
      :is-open="isDrawerOpen"
      @close="isDrawerOpen = false"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
header {
  line-height: 1.5;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: var(--gray-800);
}
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
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }


}
</style>
