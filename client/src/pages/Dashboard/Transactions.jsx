import React from 'react'
import { useMemo } from 'react';
import Manage from '../../components/Transactions/Manage';
import TransactionOverview from '../../components/Transactions/Overview';
import TransactionList from '../../components/Transactions/TransactionList';
import withGaurd from '../../shared/hoc/withGaurd';

function Transactions() {
  const grid = useMemo(() => '450px 1fr', []);
  return (
    <div style={{ gridTemplateColumns: grid }} className="transaction-grid px-4 py-2 gap-4 h-[calc(100vh-50px)] overflow-hidden w-full" >
      <TransactionOverview />
      <TransactionList />
      <Manage />
    </div >
  )
}

export default withGaurd(Transactions)