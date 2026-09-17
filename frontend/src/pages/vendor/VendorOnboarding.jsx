import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import vendor from "@/services/vendor.js";
import PhoneInput from "react-phone-input-2";
import TextInput from "@/components/Input/TextInput";
import { CountryInput, BusinessTypeInput } from "@/components/components.jsx";
import { getUserCountry } from "@/utils/geolocation.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vendorOnboardingSchema } from "@/utils/schemas";

const VendorOnboarding = () => {
  const navigate = useNavigate();
  const [countryCode, setCountryCode] = useState("");
  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(vendorOnboardingSchema),
    defaultValues: {
      business_name: "",
      business_type_id: null,
      country_id: null,
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    getUserCountry()
      .then(data => setCountryCode(data.code))
      .catch(() => {});
  }, []);

  const onSubmit = async (data) => {
    try {
      await vendor.completeProfile(data);
      toast.success("Profile completed!");
      navigate("/vendor/dashboard");
    } catch (err) {
      toast.error(err?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-center">Complete Your Vendor Profile</h2>

        <TextInput id="business_name" label="Business Name" {...register("business_name")} error={errors.business_name?.message} />

        <BusinessTypeInput handleChange={(field, value) => setValue("business_type_id", value, { shouldValidate: true })} />

        <div className="flex flex-col gap-1 phone-input-container">
          <label htmlFor="phone" className="text-[rgba(0,0,0,0.5)]">Phone Number</label>
          <PhoneInput
            country={countryCode ? countryCode.toLowerCase() : "us"}
            value={watch("phone")}
            onChange={(value) => setValue("phone", value, { shouldValidate: true })}
            enableSearch
            inputProps={{ name: "phone", id: "phone" }}
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <CountryInput handleChange={(val) => setValue("country_id", val?.country_id, { shouldValidate: true })} />
          {errors.country_id && <p className="text-red-500 text-sm mt-1">{errors.country_id.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-gray-300">Business Address</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-0"
            {...register("address")}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#DB4444] text-white py-2 rounded hover:bg-red-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Complete Profile"}
        </button>
      </form>
    </div>
  );
};

export default VendorOnboarding;
