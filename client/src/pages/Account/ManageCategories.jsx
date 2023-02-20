import React from 'react'
import { Helmet } from 'react-helmet'
import Alert from '../../components/Alert'

function ManageCategories() {
  return (
    <div className="">
      <Helmet>
        <title>One App | Manage</title>
      </Helmet>
    <Alert message={'Manage Categories Section'} />
    </div>
  )
}

export default ManageCategories