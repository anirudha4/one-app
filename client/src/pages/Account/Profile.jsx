import React from 'react'
import { Helmet } from 'react-helmet';
import Alert from '../../components/Alert';
function Profile() {
  return (
    <div className="">
      <Helmet>
        <title>One App | Profile</title>
      </Helmet>
      <Alert message={'Profile Section'} />
    </div>
  )
}

export default Profile