export const calculateDeliveryPrice = (distance, basePrice = 5) => {
  const costPerKm = 1.5;
  return basePrice + distance * costPerKm;
};

export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const applyDiscount = (price, discountPercent) => {
  return price * (1 - discountPercent / 100);
};
