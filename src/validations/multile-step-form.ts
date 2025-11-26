import { z } from 'zod';

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  read: z.boolean().default(false).optional(),
  write: z.boolean().default(false).optional(),
  speak: z.boolean().default(false).optional(),
}).refine(
  (data) => data.read || data.write || data.speak,
  {
    message: "Select at least one proficiency (Read/Write/Speak)",
    path: ["read"], // any field is fine
  }
);

export const applicationFormSchema_Step1 = z.object({
  title: z.enum(["Mr", "Ms", "Mrs"]).optional(),

  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  passportImage: z
    .any()
    .refine((file) => file instanceof File, "Image file is required")
    .refine(
      (file) => file?.size <= 1_000_000,
      "File size must be less than 1MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png"].includes(file?.type),
      "Only JPG or PNG allowed"
    ),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required"),

  nationality: z.string().min(1, "Nationality is required"),

  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),

  email: z.string().email("Enter a valid email address"),

  languages: z
    .array(languageSchema)
    .min(1, "Add at least one language"),

  // Address
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),

  // Optional fields
  hobbies: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]).optional(),
});

export const admissionForm_Step1 = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  roleIds: z.array(z.string()).min(1, 'At least one Role is required'),
  status: z.string().min(1, 'Status is required'),
  password: z.string().min(5, 'Password must be at least 5 characters').optional(),
  emailLoginEnabled: z.boolean().optional(),
  googleLoginEnabled: z.boolean().optional(),
  confirmPassword: z.string().min(5, 'Password must be at least 5 characters').optional(),
});

export const admissionForm_Step2 = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  roleIds: z.array(z.string()).min(1, 'At least one Role is required'),
  status: z.string().min(1, 'Status is required'),
  password: z.string().min(5, 'Password must be at least 5 characters').optional(),
  emailLoginEnabled: z.boolean().optional(),
  googleLoginEnabled: z.boolean().optional(),
  confirmPassword: z.string().min(5, 'Password must be at least 5 characters').optional(),
});

export const admissionForm_Step3 = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  roleIds: z.array(z.string()).min(1, 'At least one Role is required'),
  status: z.string().min(1, 'Status is required'),
  password: z.string().min(5, 'Password must be at least 5 characters').optional(),
  emailLoginEnabled: z.boolean().optional(),
  googleLoginEnabled: z.boolean().optional(),
  confirmPassword: z.string().min(5, 'Password must be at least 5 characters').optional(),
});

export type AdmissionForm_Step1 = z.infer<typeof admissionForm_Step1>;
export type AdmissionForm_Step2 = z.infer<typeof admissionForm_Step2>;
export type AdmissionForm_Step3 = z.infer<typeof admissionForm_Step3>;

export type ApplicationFormSchema_Step1 = z.infer<typeof applicationFormSchema_Step1>;


