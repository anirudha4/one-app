import React from 'react'
import Manage from '../../components/Transactions/Manage';
import TransactionOverview from '../../components/Transactions/Overview';
import TransactionList from '../../components/Transactions/TransactionList';
import withGaurd from '../../shared/hoc/withGaurd';

function Transactions() {
  return (
    <div className="transaction-grid px-4 py-2 gap-4 h-full">
      <TransactionOverview />
      <TransactionList />
      <Manage />
    </div>
  )
}

export default withGaurd(Transactions)