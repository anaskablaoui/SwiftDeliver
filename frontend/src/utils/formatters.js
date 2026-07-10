export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('fr-FR');
};

export const formatTime = (time) => {
  return new Date(time).toLocaleTimeString('fr-FR');
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'DZD',
  }).format(price);
};

export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4 $5');
};
