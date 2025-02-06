<script setup lang="ts">
import VehicleCard from './components/VehicleCard.vue';
import BiddingDrawer from './components/BiddingDrawer.vue'

const brands = ['BMW', 'Tesla', 'Porsche', 'Lamborghini', 'Mercedes-Benz'];
const vehicles = [
  {
    "id": 1,
    "name": "I8",
    "details": {
      "currency": "USD",
      "price": "10000000",
      "color": "White",
      "brand": "BMW",
      "manufactureYear": "2020",
      "image": "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?cs=srgb&dl=pexels-mikebirdy-170811.jpg&fm=jpg",
      "description": "What makes both BMW i8 models unique is the exceptional lightweight concept called LifeDrive architecture..."
    }
  },
  {
    "id": 2,
    "name": "Model S",
    "details": {
      "currency": "USD",
      "price": "9000000",
      "color": "Black",
      "brand": "Tesla",
      "manufactureYear": "2022",
      "image": "https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg",
      "description": "The Tesla Model S offers an all-electric powertrain, cutting-edge autonomous driving features, and a luxurious interior."
    }
  },
  {
    "id": 3,
    "name": "911 Turbo S",
    "details": {
      "currency": "USD",
      "price": "15000000",
      "color": "Red",
      "brand": "Porsche",
      "manufactureYear": "2021",
      "image": "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
      "description": "The Porsche 911 Turbo S is a high-performance sports car with a twin-turbo engine, advanced aerodynamics, and superior handling."
    }
  },
  {
    "id": 4,
    "name": "Huracan EVO",
    "details": {
      "currency": "USD",
      "price": "20000000",
      "color": "Yellow",
      "brand": "Lamborghini",
      "manufactureYear": "2023",
      "image": "https://images.pexels.com/photos/462242/pexels-photo-462242.jpeg",
      "description": "The Lamborghini Huracan EVO delivers an exhilarating driving experience with its powerful V10 engine and aggressive design."
    }
  },
  {
    "id": 5,
    "name": "AMG GT",
    "details": {
      "currency": "USD",
      "price": "12000000",
      "color": "Blue",
      "brand": "Mercedes-Benz",
      "manufactureYear": "2021",
      "image": "https://images.pexels.com/photos/56720/pexels-photo-56720.jpeg",
      "description": "The Mercedes-AMG GT combines luxury and performance with a handcrafted V8 engine, striking aesthetics, and cutting-edge technology."
    }
  }
];
</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="title">Vehicle Bidding</h1>
      <button class="btn btn-primary" >View Biddings</button>
    </div>
  
  <div class="filter-section">
    <label class="filter-label">Filter by Brand:</label>
    <select class="brand-select">
      <option value="">All Brands</option>
      <option v-for="brand in brands">{{ brand }}</option>
    </select>
  </div>
<div class="grid">
  <VehicleCard
  v-for="vehicle in vehicles"
  :key="vehicle.id"
  :vehicle="vehicle"
  />
</div>
<BiddingDrawer/>
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
