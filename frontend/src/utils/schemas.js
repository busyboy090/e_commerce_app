import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  phone: z.string().min(1, 'Phone number is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(1, 'Please confirm your password'),
  country_id: z.number({ required_error: 'Country is required' }).nullable(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirm_password: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export const vendorOnboardingSchema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  business_type_id: z.number({ required_error: 'Business type is required' }).nullable(),
  country_id: z.number({ required_error: 'Country is required' }).nullable(),
  address: z.string().min(1, 'Business address is required'),
  phone: z.string().min(1, 'Phone number is required'),
});

export const addressSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  country: z.any().refine((val) => val !== null, 'Country is required'),
  state: z.any().refine((val) => val !== null, 'State is required'),
  city: z.any().refine((val) => val !== null, 'City is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  additional_phone_number: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  additional_information: z.string().optional(),
  is_default: z.boolean().optional(),
});

export const checkoutSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  company_name: z.string().optional(),
  street_address: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  town_city: z.string().min(1, 'Town/City is required'),
  phone_number: z.string().min(1, 'Phone number is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export const profileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  address: z.string().optional(),
  old_password: z.string().optional(),
  new_password: z.string().optional(),
  confirm_new_password: z.string().optional(),
}).refine((data) => {
  if (data.new_password || data.confirm_new_password) {
    return data.old_password && data.old_password.length > 0;
  }
  return true;
}, { message: 'Current password is required', path: ['old_password'] })
.refine((data) => {
  if (data.new_password) {
    return data.new_password.length >= 6;
  }
  return true;
}, { message: 'New password must be at least 6 characters', path: ['new_password'] })
.refine((data) => {
  if (data.new_password) {
    return data.new_password === data.confirm_new_password;
  }
  return true;
}, { message: 'Passwords do not match', path: ['confirm_new_password'] });
