const express = require('express');
const router = express.Router();

let properties = []; 
let propertyIdCounter = 1;

function validatePropertyData(property) {
  if (!property.name || !property.description || property.price < 0 || 
      !property.location || property.rooms < 0 || property.area < 0) {
    return false;
  }
  return true;
}


router.get('/', (req, res) => {
  res.json(properties);
});


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const property = properties.find(p => p.id === id);
  if (!property) return res.status(404).json({ message: 'Property not found' });
  res.json(property);
});


router.post('/', (req, res) => {
  const property = { id: propertyIdCounter++, ...req.body };

  if (!validatePropertyData(property)) {
    return res.status(400).json({ message: 'Invalid property data' });
  }

  properties.push(property);
  res.status(201).json(property);
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const propertyIndex = properties.findIndex(p => p.id === id);

  if (propertyIndex === -1) return res.status(404).json({ message: 'Property not found' });

  const updatedProperty = { id, ...req.body };
  if (!validatePropertyData(updatedProperty)) {
    return res.status(400).json({ message: 'Invalid property data' });
  }

  properties[propertyIndex] = updatedProperty;
  res.json(updatedProperty);
});


router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const property = properties.find(p => p.id === id);

  if (!property) return res.status(404).json({ message: 'Property not found' });

  Object.assign(property, req.body);
  if (!validatePropertyData(property)) {
    return res.status(400).json({ message: 'Invalid property data' });
  }

  res.json(property);
});


router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const propertyIndex = properties.findIndex(p => p.id === id);

  if (propertyIndex === -1) return res.status(404).json({ message: 'Property not found' });

  properties.splice(propertyIndex, 1);
  res.status(204).end();
});

module.exports = router;
