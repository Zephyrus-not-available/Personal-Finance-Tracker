import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/dashboard/Dashboard';
import TransactionsPage from './components/transactions/TransactionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='categories' element={<div>Categories Page</div>} />
          <Route path='transactions' element={<TransactionsPage />} />
          <Route path='budgets' element={<div>Budgets Page</div>} />
          <Route path='recurring' element={<div>Recurring Operations Page</div>} />
          <Route path='reports' element={<div>Reports Page</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;