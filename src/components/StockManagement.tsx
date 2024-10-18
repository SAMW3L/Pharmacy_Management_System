import React, { useState } from 'react';
import { Medicine } from '../types';

interface StockManagementProps {
  medicines: Medicine[];
  onUpdateStock: (medicineId: string, newStock: number) => void;
  onAddMedicine: (name: string, price: number, stock: number) => void;
  onUpdatePrice: (medicineId: string, newPrice: number) => void;
}

const StockManagement: React.FC<StockManagementProps> = ({ 
  medicines, 
  onUpdateStock, 
  onAddMedicine,
  onUpdatePrice
}) => {
  const [selectedMedicine, setSelectedMedicine] = useState<string>('');
  const [newStock, setNewStock] = useState<string>('');
  const [newPrice, setNewPrice] = useState<string>('');
  const [newMedicineName, setNewMedicineName] = useState<string>('');
  const [newMedicinePrice, setNewMedicinePrice] = useState<string>('');
  const [newMedicineStock, setNewMedicineStock] = useState<string>('');

  const handleUpdateStock = (e: React.FormEvent) => {
    e.preventDefault();
    const stockNumber = parseInt(newStock);
    if (selectedMedicine && !isNaN(stockNumber) && stockNumber >= 0) {
      onUpdateStock(selectedMedicine, stockNumber);
      setSelectedMedicine('');
      setNewStock('');
    }
  };

  const handleUpdatePrice = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNumber = parseFloat(newPrice);
    if (selectedMedicine && !isNaN(priceNumber) && priceNumber > 0) {
      onUpdatePrice(selectedMedicine, priceNumber);
      setSelectedMedicine('');
      setNewPrice('');
    }
  };

  const handleAddMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseFloat(newMedicinePrice);
    const stock = parseInt(newMedicineStock);
    if (newMedicineName && !isNaN(price) && price > 0 && !isNaN(stock) && stock >= 0) {
      onAddMedicine(newMedicineName, price, stock);
      setNewMedicineName('');
      setNewMedicinePrice('');
      setNewMedicineStock('');
    }
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <h3>Update Stock</h3>
      <form onSubmit={handleUpdateStock}>
        <select
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
          required
        >
          <option value="">Select Medicine</option>
          {medicines.map((medicine) => (
            <option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="New Stock"
          min="0"
          required
        />
        <button type="submit">Update Stock</button>
      </form>

      <h3>Update Price</h3>
      <form onSubmit={handleUpdatePrice}>
        <select
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
          required
        >
          <option value="">Select Medicine</option>
          {medicines.map((medicine) => (
            <option key={medicine.id} value={medicine.id}>
              {medicine.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          placeholder="New Price"
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Update Price</button>
      </form>

      <h3>Add New Medicine</h3>
      <form onSubmit={handleAddMedicine}>
        <input
          type="text"
          value={newMedicineName}
          onChange={(e) => setNewMedicineName(e.target.value)}
          placeholder="Medicine Name"
          required
        />
        <input
          type="number"
          value={newMedicinePrice}
          onChange={(e) => setNewMedicinePrice(e.target.value)}
          placeholder="Price"
          min="0.01"
          step="0.01"
          required
        />
        <input
          type="number"
          value={newMedicineStock}
          onChange={(e) => setNewMedicineStock(e.target.value)}
          placeholder="Initial Stock"
          min="0"
          required
        />
        <button type="submit">Add Medicine</button>
      </form>
    </div>
  );
};

export default StockManagement;