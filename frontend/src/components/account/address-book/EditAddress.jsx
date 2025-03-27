import React from 'react';
import { data, useSearchParams } from 'react-router-dom';
import { AddressForm } from './AddressForm';

function EditAddress() {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');
    const data = {
      firstName: 'Busayo',
      lastName: 'Ale',
      address: 'No 21 Jesutedo Street Odolu',
      country: 'Nigeria',
      countryCode: 'ng',
      state: 'Kogi',
      city: 'Kabba',
      phone: '8065068854',
      additionalInfo: 'Blue gate',
      setAsDefault: false,
    }

    const onSubmit = () => {

    }

    const cancel = () => {

    }

    return (
        <div>
            <AddressForm initialValues={data} cancel={cancel} onSubmit={onSubmit} />
        </div>
    )
}

export default EditAddress