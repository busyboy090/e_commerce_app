import { useState, useEffect, useRef } from 'react';
import country  from "@/services/country.js";
import { FixedSizeList as List } from 'react-window';
import vendor from "@/services/vendor.js";
import { getUserCountry } from "../utils/geolocation.js";
import SelectInput from '@/components/Input/SelectInput';
import PhoneInput from 'react-phone-input-2';;

export function CountryInput ({handleChange,value}) {
    const [countries, setCountries] = useState([]);
    const countryName = useRef('');

    // fetch all the countries 
    useEffect(() => {
        country.getAllCountries()
            .then(data => setCountries(data))
            .catch(() => {})
    }, []);

    // if(!value) {
    //     getUserCountry()
    //     .then((data) => { 
    //         const country = countries.filter(c => c.name.toLowerCase() === data?.name.toLowerCase())
    //         if(country.length > 0) {
    //             countryName.current = country[0].name
    //             handleChange(country[0]);
    //         }
    //     })
    //     .catch((err) => console.error(err));
    // } else {
    //     const country = countries.filter(c => c.country_id === value)

    //     if(country.length > 0) {
    //         countryName.current = country[0].name
    //     }
    // }

    return (
        <SelectInput dropdown={countries} handleChange={handleChange} value={countryName.current} label='Country' id='country' />
    )
}

export function StateInput ({handleChange,value,country_id}) {
    const [states, setStates] = useState([]);
    const stateName = useRef('');


    // fetch all the countries 
    useEffect(() => {
        country.getAllStatesOfACountry(country_id)
          .then(data => setStates(data))
          .catch(() => {})

        if(value) {
            const state = states.filter(s => s.state_id === value);
            stateName.current = state[0]?.name || '';
        }
    }, [country_id]);

    const handleStateChange = (state) => {
        handleChange(state)
        stateName.current = state.name;
    }

    return (
        <SelectInput dropdown={states} handleChange={handleStateChange} value={stateName.current} label='Select your State' id='state' />
    )
}

export function CityInput ({ handleChange, value, state_id}) {
    const [cities, setCities] = useState([]);
    const cityName = useRef('');

    // fetch all the countries 
    useEffect(() => {
        country.getAllCitiesOfAState(state_id)
          .then(data => setCities(data))
          .catch(() => {})
        
        if(value) {
            const city = cities.filter(c => c.city_id === value);
            cityName.current = city[0]?.name || '';
        }
      }, [state_id]);


      const handleCityChange = (city) => {
        handleChange(city);
        cityName.current = city.name
      }

    return (
        <SelectInput dropdown={cities} handleChange={handleCityChange} value={cityName.current} label='Select your City' id='city' />
    )
}

export function BusinessTypeInput ({handleChange}) {
    const [businessTypes, setBusinessTypes] = useState([]);
    const [showBusinessTypeList, setShowBusinessTypeList] = useState(false);
    const [selectedBusinessTypeName, setSelectedBusinessTypeName] = useState('');

    const handleBusinessTypeSelect = (businessType) => {
        handleChange('business_type', businessType.business_type_id);
        setSelectedBusinessTypeName(businessType.name);
        setShowBusinessTypeList(false);
    };

    // fetch all the countries 
    useEffect(() => {
        vendor.getAllBusinessTypes()
          .then(data =>  setBusinessTypes(data))
          .catch(() => {})
      }, []);

    return (
        <div className="relative">
            <label htmlFor='country' className='text-gray-300 block mb-3'>Business Type</label>
            <button
                type="button"
                onClick={() => setShowBusinessTypeList(!showBusinessTypeList)}
                className="w-full border border-gray-300 p-3 rounded bg-white text-left"
            >
                {selectedBusinessTypeName || 'Select your business type'}
            </button>

            {showBusinessTypeList && (
                <div className="absolute z-10 bg-white border border-gray-300 rounded mt-2 w-full max-h-60 overflow-y-auto shadow hide-scrollbar">
                <List
                    height={240}
                    itemCount={businessTypes.length}
                    itemSize={40}
                    width={'100%'}
                >
                    {({ index, style }) => {
                    const businessTypeItem = businessTypes[index];
                    return (
                        <div
                        key={businessTypeItem.country_id}
                        style={style}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleBusinessTypeSelect(businessTypeItem)}
                        >
                            {businessTypeItem.name}
                        </div>
                    );
                    }}
                </List>
                </div>
            )}
        </div>
    )
}

export function PhoneInputField({ label, id, country, value, onChange }) {
  const [countryCode, setCountryCode] = useState(country);

  useEffect(() => {
    if(!country) {
      getUserCountry()
      .then(data => setCountryCode(data?.code.toLowerCase() || "ng"))
      .catch(() => {});
    }
  },[])

  return (
    <div className="flex flex-col gap-[5px]">
      <label htmlFor={id}>{label}</label>
      <PhoneInput
        id={id}
        country={countryCode}
        value={value}
        onChange={onChange}
        placeholder="Enter phone number"
        enableSearch
      />
    </div>
  );
}

