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
  { id: '3', name: 'Paracetamol', price: 50, stock: 120 },
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
          <Login onLogin={handleLogin} onSwitchToRegister={() => setShowLogin(false)} />
        ) : (
          <Register onRegister={handleRegister} onSwitchToLogin={() => setShowLogin(true)} />
        )}
      </div>
    )
  }

  return (
    <div className="App">
      <h1>Pharmacy Management System</h1>
      <p>Welcome, {currentUser}! <button onClick={handleLogout}>Logout</button></p>
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