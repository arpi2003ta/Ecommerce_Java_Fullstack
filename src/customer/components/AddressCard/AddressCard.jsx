import React from 'react'

const AddressCard = ({ address }) => {
  if (address) {
    return (
      <div>
        <div className="space-y-3">
          <p className="font-semibold">{address.firstname} {address.lastname}</p>
          <p>{address.streetAddress}, {address.city}, {address.state} - {address.zipCode}</p>
          <div className="space-y-1">
            <p className="font-semibold">Phone Number</p>
            <p>+91 {address.mobile}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
        <div className="space-y-3">
            <p className="font-semibold">Ram Kapor</p>
            <p>Mumbai, Gaokul Dham, Market 40001</p>
            <div className="space-y-1">
                <p className="font-semibold">Phone Number</p>
                <p>+91 6539253792</p>
            </div>
        </div>
    </div>
  )
}

export default AddressCard
