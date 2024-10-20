import React, { useState } from 'react';
import { Medicine } from '../types';

interface MedicineListProps {
  medicines: Medicine[];
  onSell: (medicineId: string, quantity: number) => void;
}

const MedicineList: React.FC<MedicineListProps> = ({ medicines, onSell }) => {
  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSell = (e: React.FormEvent) => {
    e.preventDefault();
    const medicine = medicines.find(m => m.name.toLowerCase() === medicineName.toLowerCase());
    if (medicine) {
      const quantityNum = parseInt(quantity);
      if (!isNaN(quantityNum) && quantityNum > 0) {
        onSell(medicine.id, quantityNum);
        setMedicineName('');
        setQuantity('');
      } else {
        alert('Please enter a valid quantity.');
      }
    } else {
      alert('Medicine not found.');
    }
  };
// to return data in table format
  return (
    <div>
      <h2>Sell Medicine</h2>
      <form onSubmit={handleSell}>
        <input
          type="text"
          placeholder="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="1"
          required
        />
        <button type="submit">Sell</button>
      </form>

      <h2>Available Medicine</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.name}</td>
              <td>Tsh. {medicine.price}</td>
              <td>{medicine.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


//TUMIA HII KURETURN DATA IN LIST Format

  // return (
  //   <div>
  //     <h3>Available Medicines</h3>
  //     <ul>
  //       {medicines.map((medicine) => (
  //         <li key={medicine.id}>
  //           {medicine.name} - Tsh. {medicine.price.toFixed(2)} (Stock: {medicine.stock})
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
//};

export default MedicineList;