const express = require('express');
const router = express.Router();

let offers = []; 
let offerIdCounter = 1;


router.post('/', (req, res) => {
  const { propertyId, buyerFirstName, buyerLastName, offeredPrice, buyerPhone } = req.body;
  

  if (!propertyId || !buyerFirstName || !buyerLastName || offeredPrice < 0 || !buyerPhone) {
    return res.status(400).json({ message: 'Invalid offer data' });
  }

 
  const propertyExists = properties.some(p => p.id === propertyId);
  if (!propertyExists) {
    return res.status(404).json({ message: 'Property not found' });
  }

  const offer = {
    id: offerIdCounter++,
    propertyId,
    buyerFirstName,
    buyerLastName,
    offeredPrice,
    buyerPhone
  };

  offers.push(offer);
  res.status(201).json(offer);
});


router.get('/property/:propertyId', (req, res) => {
  const propertyId = parseInt(req.params.propertyId);
  const propertyOffers = offers.filter(offer => offer.propertyId === propertyId);

  if (propertyOffers.length === 0) return res.status(404).json({ message: 'No offers found for this property' });

  res.json(propertyOffers);
});

module.exports = router;
