const mongoose = require('mongoose');

const { Schema } = mongoose;

//---------------------------
// BASE INVENTORY TYPE SCHEMA
//---------------------------

// all schemas will inherit these properties
// all documents will live in buildingInventoryTypes collection

const invTypeBaseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
});

const invTypeBase = mongoose.model('invTypeBase', invTypeBaseSchema, 'buildingInventoryTypes');

//---------------------------
// MATERIAL TYPE
//---------------------------

// ex: sand, stone, brick, lumber

const materialType = invTypeBase.discriminator('material', new mongoose.Schema({
  category: { type: String, enum: ['Material'] },
  unit: { type: String, required: true }, // unit of measurement
}));

//---------------------------
// CONSUMABLE TYPE
//---------------------------

// ex: screws, nails, staples

const consumableType = invTypeBase.discriminator('consumable', new mongoose.Schema({
  category: { type: String, enum: ['Consumable'] },
  size: { type: String, required: true },
}));

//---------------------------
// REUSABLE TYPE
//---------------------------

// ex: gloves, brushes, hammers, screwdrivers

const reusableType = invTypeBase.discriminator('reusable', new mongoose.Schema({
  category: { type: String, enum: ['Reusable'] },
}));

//---------------------------
// TOOL TYPE
//---------------------------

// ex: shovels, wheelbarrows, power drills, jackhammers

const toolType = invTypeBase.discriminator('tool', new mongoose.Schema({
  category: { type: String, enum: ['Tool'] },
  isPowered: { type: Boolean, required: true },
  powerSource: { type: String, required: () => this.isPowered }, // required if isPowered = true (syntax?)
}));

//---------------------------
// EQUIPMENT TYPE
//---------------------------

// ex: tractors, excavators

const equipmentType = invTypeBase.discriminator('equipment', new mongoose.Schema({
  category: { type: String, enum: ['Equipment'] },
  fuelType: { type: String, required: true },
}));

module.exports = {
  materialType,
  consumableType,
  reusableType,
  toolType,
  equipmentType,
};
