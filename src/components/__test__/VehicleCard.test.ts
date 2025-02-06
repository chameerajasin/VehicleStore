import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import VehicleCard from '../VehicleCard.vue';
import { useVehicleStore } from '../../stores/vehicles';
import { useToast } from 'vue-toastification';
import { Vehicle } from '../../types/vehicle';

// Mocking Pinia store and Vue Toastification
vi.mock('../../stores/vehicles');
vi.mock('vue-toastification');

// Sample vehicle data
const sampleVehicle = {
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

describe('VehicleCard.vue', () => {
  let store;
  let toast;

  beforeEach(() => {
    // Mock the store
    store = {
      addBid: vi.fn(),
    };

    // Mock the toast
    toast = {
      error: vi.fn(),
      success: vi.fn(),
    };

    // Mock `useVehicleStore` to return the mocked store
    useVehicleStore.mockReturnValue(store);

    // Mock `useToast` to return the mocked toast
    useToast.mockReturnValue(toast);
  });

  it('should disable the "Add to Biddings" button when is no bid', async () => {
    const wrapper = mount(VehicleCard, {
      props: {
        vehicle: sampleVehicle,
      },
    });

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    // Initially, button should be disabled
    expect(button.element.disabled).toBe(true);

    // Simulate typing a valid bid
    await input.setValue('12000');
    expect(button.element.disabled).toBe(false);
  });

  it('should show error toast if bid is less than or equal to vehicle price', async () => {
    const wrapper = mount(VehicleCard, {
      props: {
        vehicle: sampleVehicle,
      },
    });

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    // Simulate typing a bid less than the vehicle price
    await input.setValue('5000');
    await button.trigger('click');

    // Check if error toast is shown
    expect(toast.error).toHaveBeenCalledWith('Bid amount should be greater than the vehicle price');
  });

  it('should add bid and show success toast when valid bid is placed', async () => {
    const wrapper = mount(VehicleCard, {
      props: {
        vehicle: sampleVehicle,
      },
    });

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    // Simulate typing a valid bid
    await input.setValue('12000');
    await button.trigger('click');

    // Ensure that the bid was added using the store's addBid method
    expect(store.addBid).toHaveBeenCalledWith(sampleVehicle, 12000);

    // Check if success toast is shown
    expect(toast.success).toHaveBeenCalledWith('Vehicle added to biddings successfully!');
  });

  it('should clear the bid input after successful bid', async () => {
    const wrapper = mount(VehicleCard, {
      props: {
        vehicle: sampleVehicle,
      },
    });

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    // Simulate typing a valid bid
    await input.setValue('12000');
    await button.trigger('click');

    // After successful bid, input field should be cleared
    expect(input.element.value).toBe('');
  });
});
