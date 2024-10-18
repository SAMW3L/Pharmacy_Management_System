import React, { useState } from 'react';
import { Medicine, Sale } from '../types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface StoreReportProps {
  medicines: Medicine[];
  sales: Sale[];
}

const StoreReport: React.FC<StoreReportProps> = ({ medicines, sales }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterMedicine, setFilterMedicine] = useState('');

  const calculateProfitLoss = (medicineId: string) => {
    const medicineSales = sales.filter(sale => sale.medicineId === medicineId);
    const totalRevenue = medicineSales.reduce((sum, sale) => sum + sale.totalPrice, 0);
    const medicine = medicines.find(m => m.id === medicineId);
    const costPrice = medicine ? medicine.price * 0.7 : 0; // Assuming cost price is 70% of selling price
    const totalCost = medicineSales.reduce((sum, sale) => sum + (sale.quantity * costPrice), 0);
    return totalRevenue - totalCost;
  };

  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    const start = startDate ? new Date(startDate) : new Date(0);
    const end = endDate ? new Date(endDate) : new Date();
    const medicineMatch = filterMedicine ? medicines.find(m => m.id === sale.medicineId)?.name.toLowerCase().includes(filterMedicine.toLowerCase()) : true;
    return saleDate >= start && saleDate <= end && medicineMatch;
  });

  const reportData = medicines.map(medicine => {
    const initialStock = medicine.stock + sales.filter(sale => sale.medicineId === medicine.id).reduce((sum, sale) => sum + sale.quantity, 0);
    const currentStock = medicine.stock;
    const profitLoss = calculateProfitLoss(medicine.id);
    return {
      name: medicine.name,
      initialBalance: initialStock,
      currentBalance: currentStock,
      profitLoss: profitLoss
    };
  });

  const handlePrintPDF = () => {
    const doc = new jsPDF();
    doc.text('Store Report', 14, 15); //title ya document
    doc.autoTable({
      head: [['Medicine Name', 'Initial Balance', 'Current Balance', 'Profit/Loss']],
      body: reportData.map(item => [
        item.name,
        item.initialBalance,
        item.currentBalance,
        `Tsh. ${item.profitLoss.toFixed(2)}`
      ]),
      startY: 20
    });
    doc.save('store-report.pdf'); //jina la document ukiwa unaisave
  };

  return (
    <div>
      <h2>Store Report</h2>
      <div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <input
          type="text"
          value={filterMedicine}
          onChange={(e) => setFilterMedicine(e.target.value)}
          placeholder="Filter by Medicine Name"
        />
      </div>
      <button onClick={handlePrintPDF}>Print PDF</button>
      <table>
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Initial Balance</th>
            <th>Current Balance</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.initialBalance}</td>
              <td>{item.currentBalance}</td>
              <td>Tsh. {item.profitLoss.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreReport;