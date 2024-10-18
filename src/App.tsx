import React, { useState } from 'react'
import './App.css'
import { Medicine, Sale, User } from './types'
import MedicineList from './components/MedicineList'
import StockManagement from './components/StockManagement'
import StoreReport from './components/StoreReport'
import Login from './components/Login'
import Register from './components/Register'

const initialMedicines: Medicine[] = [
  { id: '1', name: 'Aspirin', price: 1500, stock: 100 },
  { id: '2', name: 'Ibuprofen', price: 1000, stock: 80 },
  { id: '3', name: 'Paracetamol', price: 800, stock: 120 },
  { id: '4', name: 'Amoxicillin', price: 1200, stock: 50 },
  { id: '5', name: 'Lisinopril', price: 2000, stock: 60 },
  { id: '6', name: 'Metformin', price: 1800, stock: 70 },
  { id: '7', name: 'Simvastatin', price: 2500, stock: 90 },
  { id: '8', name: 'Omeprazole', price: 1700, stock: 110 },
  { id: '9', name: 'Levothyroxine', price: 2200, stock: 40 },
  { id: '10', name: 'Sertraline', price: 2600, stock: 30 },
  { id: '11', name: 'Amlodipine', price: 1600, stock: 80 },
  { id: '12', name: 'Ciprofloxacin', price: 1400, stock: 100 },
  { id: '13', name: 'Fluoxetine', price: 2400, stock: 55 },
  { id: '14', name: 'Clopidogrel', price: 2100, stock: 45 },
  { id: '15', name: 'Hydrochlorothiazide', price: 1250, stock: 75 },
  { id: '16', name: 'Gabapentin', price: 3000, stock: 50 },
  { id: '17', name: 'Prednisone', price: 2800, stock: 60 },
  { id: '18', name: 'Cetirizine', price: 950, stock: 130 },
  { id: '19', name: 'Dexamethasone', price: 3200, stock: 25 },
  { id: '20', name: 'Montelukast', price: 1850, stock: 85 },
  { id: '21', name: 'Ranitidine', price: 1100, stock: 70 },
  { id: '22', name: 'Lorazepam', price: 2750, stock: 40 },
  { id: '23', name: 'Atorvastatin', price: 2950, stock: 55 },
  { id: '24', name: 'Alprazolam', price: 2600, stock: 65 },
  { id: '25', name: 'Insulin', price: 4500, stock: 20 },
  { id: '26', name: 'Digoxin', price: 3700, stock: 35 },
  { id: '27', name: 'Zolpidem', price: 3200, stock: 30 },
  { id: '28', name: 'Atenolol', price: 1500, stock: 100 },
  { id: '29', name: 'Furosemide', price: 1000, stock: 90 },
  { id: '30', name: 'Pantoprazole', price: 1400, stock: 70 },
  { id: '31', name: 'Trazodone', price: 2800, stock: 35 },
  { id: '32', name: 'Mirtazapine', price: 1900, stock: 60 },
  { id: '33', name: 'Bupropion', price: 2600, stock: 50 },
  { id: '34', name: 'Carbamazepine', price: 3400, stock: 30},
  { id: '35', name: 'Loratadine', price: 1100, stock: 80 },  
]

function App() {
  const [medicines, setMedicines] = useState<Medicine[]>(initialMedicines)
  const [sales, setSales] = useState<Sale[]>([])
  const [activeTab, setActiveTab] = useState<'sell' | 'stock' | 'report'>('sell')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [users, setUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  const handleSell = (medicineId: string, quantity: number) => {
    const medicine = medicines.find((m) => m.id === medicineId)
    if (medicine && medicine.stock >= quantity) {
      const newSale: Sale = {
        id: Date.now().toString(),
        medicineId,
        quantity,
        totalPrice: medicine.price * quantity,
        date: new Date().toISOString(),
      }
      setSales([...sales, newSale])
      setMedicines(
        medicines.map((m) =>
          m.id === medicineId ? { ...m, stock: m.stock - quantity } : m
        )
      )
    } else {
      alert('Not enough stock available.')
    }
  }

  const handleUpdateStock = (medicineId: string, newStock: number) => {
    setMedicines(
      medicines.map((m) =>
        m.id === medicineId ? { ...m, stock: newStock } : m
      )
    )
  }

  const handleAddMedicine = (name: string, price: number, stock: number) => {
    const newMedicine: Medicine = {
      id: Date.now().toString(),
      name,
      price,
      stock,
    }
    setMedicines([...medicines, newMedicine])
  }

  const handleUpdatePrice = (medicineId: string, newPrice: number) => {
    setMedicines(
      medicines.map((m) =>
        m.id === medicineId ? { ...m, price: newPrice } : m
      )
    )
  }

  const handleLogin = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password)
    if (user) {
      setIsLoggedIn(true)
      setCurrentUser(username)
    } else {
      alert('Invalid username or password')
    }
  }

  const handleRegister = (username: string, password: string) => {
    if (users.some(u => u.username === username)) {
      alert('Username already exists')
    } else {
      setUsers([...users, { username, password }])
      setIsLoggedIn(true)
      setCurrentUser(username)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setActiveTab('sell')
  }

  if (!isLoggedIn) {
    return (
      <div className="App">
        <h1>Pharmacy Management System</h1>
        {showLogin ? (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setShowLogin(false)} />
          
        ) : (
          <Login onLogin={handleLogin} onSwitchToRegister={() => setShowLogin(true)} />
        )}
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Pharmacy Management System</h1>
      <p>Welcome, {currentUser}! </p>
        <p><button onClick={handleLogout}>Logout</button> </p>
      <div>
        <button onClick={() => setActiveTab('sell')}>Sell Medicine</button>
        <button onClick={() => setActiveTab('stock')}>Manage Stock</button>
        <button onClick={() => setActiveTab('report')}>View Report</button>
      </div>
      {activeTab === 'sell' && (
        <MedicineList medicines={medicines} onSell={handleSell} />
      )}
      {activeTab === 'stock' && (
        <StockManagement 
          medicines={medicines} 
          onUpdateStock={handleUpdateStock}
          onAddMedicine={handleAddMedicine}
          onUpdatePrice={handleUpdatePrice}
        />
      )}
      {activeTab === 'report' && (
        <StoreReport medicines={medicines} sales={sales} />
      )}
    </div>
  )
}

export default App