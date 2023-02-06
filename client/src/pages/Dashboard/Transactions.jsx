import React, { useState } from 'react'
import { useMemo } from 'react';
import Manage from '../../components/Transactions/Manage';
import TransactionOverview from '../../components/Transactions/Overview';
import TransactionList from '../../components/Transactions/TransactionList';
import withGaurd from '../../shared/hoc/withGaurd';

function Transactions() {
  const [expanded, setExpanded] = useState(false);
  const grid = useMemo(() => {
    return expanded ? '50px 1fr' : '450px 1fr';
  }, [expanded]);
  return (
    <div style={{ gridTemplateColumns: grid }} className="transaction-grid px-4 py-2 gap-4 h-[calc(100vh-50px)] overflow-hidden w-full transition-all duration-150" >
      <TransactionOverview expanded={expanded} />
      <TransactionList expanded={expanded} setExpanded={setExpanded} />
      <Manage expanded={expanded} />
    </div >
  )
}

export default withGaurd(Transactions)