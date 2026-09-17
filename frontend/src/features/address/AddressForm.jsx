import React, { useEffect, useState, useMemo, useRef } from "react";
import { useForm, Controller, FormProvider, set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import "react-phone-input-2/lib/style.css";

import CheckboxInput from "@/components/ui/CheckboxInput";
import TextInput from "@/components/ui/TextInput";
import { PhoneInputField } from "../components";
import { getUserCountry } from "@/utils/geolocation.js";
import country from "@/api/country.js";
import SelectInput from '@/components/ui/SelectInput';

export function AddressForm({ initialData = {}, mode = "add", handleSubmit: onFinalSubmit }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      country: null,
      state: null,
      city: null,
      phone_number: "",
      additional_phone_number: "",
      address: "",
      additional_information: "",
      is_default: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = methods;

  // Map initial data safely
  const mappedInitialValues = useMemo(() => {
    if (Object.keys(initialData).length === 0) return null;

    return {
      first_name: initialData.first_name,
      last_name: initialData.last_name,
      country: initialData.country,
      state: initialData.state,
      city: initialData.city,
      phone_number: initialData.phone_number,
      additional_phone_number: initialData.additional_phone_number,
      address: initialData.address,
      additional_information: initialData.additional_information,
      is_default: initialData.is_default,
    };
  }, [initialData]);

  // Only reset once when mappedInitialValues is ready
  useEffect(() => {
    if (mappedInitialValues) {
      reset(mappedInitialValues);
    }
  }, [mappedInitialValues, initialData.country, reset]);

  useEffect(() => {
    country.getAllCountries()
        .then(data => setCountries(data))
        .catch(() => {})
  }, []);

  useEffect(() => {
    if (mode === "add") {
      getUserCountry()
        .then((data) => {
          const country = countries.filter(c => c.name.toLowerCase() === data?.name.toLowerCase());
          if(country.length > 0) {
            setValue('country', country[0])
          }
        })
        .catch(() => {});
    }
  },[countries])


  const countryWatchedValue = watch('country');
  const stateWatchedVlue = watch('state')

  useEffect(() => {
    country.getAllStatesOfACountry(countryWatchedValue?.country_id)
      .then(data => {
        setStates(data)
      })
      .catch(() => {})
  },[countryWatchedValue])


  // fetch all the countries 
  useEffect(() => {
    country.getAllCitiesOfAState(stateWatchedVlue?.state_id)
      .then(data => setCities(data))
      .catch(() => {})
  }, [stateWatchedVlue]);

  const onSubmit = (data) => {
    onFinalSubmit(data);
  };

  const handleCancel = () => {
    navigate("/account/addresses");
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* First + Last Name */}
          <TextInput
            label="First Name"
            id="first_name"
            error={errors.first_name?.message}
            {...register("first_name", { required: "First name is required" })}
          />
          <TextInput
            label="Last Name"
            id="last_name"
            error={errors.last_name?.message}
            {...register("last_name", { required: "Last name is required" })}
          />

        {/* Country, State, City, Phone */}
          <div>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <SelectInput
                  id='country'
                  label='Select your country'
                  value={field.value?.name}
                  dropdown={countries}
                  handleChange={(val) => {
                    field.onChange(val);
                    setValue('state',null)
                    setValue('city',null)
                  }}
                />
              )}
            />
            {errors.country && <p className="text-red-500">{errors.country.message}</p>}
          </div>

          {
            states.length > 0 && (
              <div>
                <Controller
                  name="state"
                  control={control}
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <SelectInput
                      value={field.value?.name}
                      label='Select your state'
                      id='state'
                      handleChange={(val) => {
                        field.onChange(val)
                        setValue('city',null)
                      }
                      }
                      dropdown={states}
                    />
                  )}
                />
                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
              </div>
            )
          }

          {
            cities.length > 0 && (
              <div>
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => (
                    <SelectInput
                      value={field.value?.name}
                      label='Select your city'
                      id='city'
                      dropdown={cities}
                      handleChange={(val) => field.onChange(val)}
                    />
                  )}
                />
                {errors.city_id && <p className="text-red-500">{errors.city_id.message}</p>}
              </div>
            )
          }

          <div>
            <Controller
              name="phone_number"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInputField
                  label="Phone Number"
                  id="phone"
                  country={getValues('country')?.code}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.phone_number && <p className="text-red-500">{errors.phone_number.message}</p>}
          </div>

          <div>
            <Controller
              name="additional_phone_number"
              control={control}
              render={({ field }) => (
                <PhoneInputField
                  label="Additional Phone (optional)"
                  id="phone2"
                  country={getValues('country')?.code}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

        {/* Address + Additional Info */}
        <TextInput
          label="Address"
          id="address"
          error={errors.address?.message}
          {...register("address", { required: "Address is required" })}
        />
        <TextInput
          label="Additional Information"
          id="additional_information"
          error={errors.additional_information?.message}
          {...register("additional_information")}
        />
        </div>

        {/* Set as default */}
        <div className="mt-4">
          <Controller
            name="is_default"
            control={control}
            render={({ field }) => (
              <CheckboxInput
                label="Set as Default Address"
                checked={field.value}
                onChange={() => field.onChange(!field.value)}
              />
            )}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="text-white bg-[#DB4444] w-[150px] h-[56px] rounded"
          >
            {mode === "edit" ? "Update Address" : "Add Address"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddressForm;
