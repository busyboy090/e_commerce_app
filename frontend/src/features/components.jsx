import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, use } from 'react';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import country  from "../api/country.js";
import { FixedSizeList as List } from 'react-window';
import vendor from "../api/vendor.js";
import { getUserCountry } from "../utils/geolocation.js";
import SelectInput from '@/components/ui/SelectInput';
import PhoneInput from 'react-phone-input-2';;

export function InputField(props) {
  const {id,inputType, label, onChange, value} = props;
  const [passwordType, setPasswordType] = useState('password');
  return (
    <div className="mt-5">
      <div className="relative">
          {
            inputType.toLowerCase() == 'password' ? (
                <div className='w-[100%] border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none relative'>
                    <input
                        id={id}
                        name={id}
                        value={value}
                        type={passwordType}
                        className="border-none py-1 focus:outline-none peer w-full pe-[50px]"
                        onChange={onChange}
                    />

                    {
                        passwordType == 'password' ? (
                            <FontAwesomeIcon className='absolute right-[10px] top-[12px]' icon={faEyeSlash} onClick={
                                () => {
                                    setPasswordType('text')
                                }
                            } /> 
                        ) : (
                            <FontAwesomeIcon className='absolute right-[10px] top-[12px]' icon={faEye} onClick={
                                () => {
                                    setPasswordType('password')
                                }
                            } /> 
                        )
                    }                 
                </div>
            ) : (
                <>
                    <input
                        id={id}
                        name={id}
                        value={value}
                        type={inputType}
                        className="border-b border-gray-300 py-1 focus:border-b-2 focus:outline-none peer w-full"
                        onChange={onChange}
                    />
                </>
            )
          }
          <label
          htmlFor={id}
          className={`${value ? '-top-4' : 'top-1'} absolute left-0 peer-focus:-top-4 text-gray-300 peer-focus:text-xs transition-all`}
          >
          {label}
          </label>
      </div>
    </div>
  )
}

export function CountryInput ({handleChange,value, setCountryCode}) {
    const [countries, setCountries] = useState([]);
    const [countryName, setCountryName] = useState('');

    // fetch all the countries 
    useEffect(() => {
        country.getAllCountries()
            .then(data => setCountries(data))
            .catch(err => console.error(err))

        if(!value) {
            getUserCountry()
            .then(data => {
                setCountryName(data?.name || '')
                setCountryCode(data?.code || '')
            })
            .catch(err => console.log(err));
        } else {
            const country = countries.filter(c => c.country_id === value)
            setCountryName(country.name)
        }
      }, []);


      const handleCountryChange = (country) => {
        handleChange('country_id',country.country_id);
        setCountryName(country.name)
      }

    return (
        <SelectInput dropdown={countries} handleChange={handleCountryChange} value={countryName} label='Country' id='country' />
    )
}

export function StateInput ({handleChange,value,country_id}) {
    const [states, setStates] = useState([]);
    const [stateName, setStateName] = useState('');

    // fetch all the countries 
    useEffect(() => {
        country.getAllStatesOfACountry(country_id)
          .then(data => setStates(data))
          .catch(err => console.error(err))

        if(value) {
            const state = states.filter(s => s.state_id === value);
            setStateName(state.name || '')
        }
    }, [country_id]);


    const handleStateChange = (state) => {
        handleChange('state_id',state.state_id);
        setStateName(state.name)
    }

    return (
        <SelectInput dropdown={states} handleChange={handleStateChange} value={stateName} label='Select your State' id='state' />
    )
}

export function CityInput ({ handleChange, value, state_id}) {
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');

    // fetch all the countries 
    useEffect(() => {
        country.getAllCitiesOfAState(state_id)
          .then(data => setCities(data))
          .catch(err => console.error(err))

        if(value) {
            const city = cities.filter(s => s.city_id === value);
            setCityName(city.name || '')
        }
      }, [state_id]);


      const handleCityChange = (city) => {
        handleChange('city_id',city.city_id);
        setCityName(city.name)
      }

    return (
        <SelectInput dropdown={cities} handleChange={handleCityChange} value={cityName} label='Select your City' id='city' />
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
          .catch(err => console.error(err))
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
      .catch(err => console.log(err));
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

