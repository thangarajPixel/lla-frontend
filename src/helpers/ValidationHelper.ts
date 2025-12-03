import { z } from "zod";

export const languageSchema = z.object({
  language: z.string().min(1, "Language is required"),
  read: z.boolean().default(false).optional(),
  write: z.boolean().default(false).optional(),
  speak: z.boolean().default(false).optional(),
});

const addressSchema = z.object({
  type: z.literal("paragraph"), // or z.string() if Strapi may return other types
  children: z.array(
    z.object({
      text: z.string(),
      type: z.string().optional(), // Strapi usually returns "text"
    }),
  ),
});

export const parentDetails = z.object({
  title: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number")
    .min(1, "Mobile number is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  profession: z.string().min(1, "Profession is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.array(addressSchema).min(1, "Address is required").optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional(),
});

export const uploadMarkSheet = z.object({
  documentId: z.string().min(1, "Marksheet document is required"),
  url: z.string().optional(),
  previewUrl: z.string().optional(),
});

export const workExperience = z.object({
  designation: z.string().optional(),
  employer: z.string().optional(),
  duration_start: z.string().optional(),
  duration_end: z.string().optional(),
  reference_letter: z.number().optional(),
});

export const education = z.object({
  degree: z.string().min(1, "Degree is required"),
  markSheet: z.string().min(1, "Marksheet is required"),
  status: z.enum(["finished", "in-progress"]).optional(),
});

export const postGraduate = z.object({
  degree: z.string().min(1, "Graduation degree is required"),
  pg_status: z.string().optional(),
  marksheet: z.number().optional(),
});

export const applicationFormSchema_Step1 = z.object({
  course_id: z.number().optional(),
  name_title: z.string().optional(),

  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number")
    .min(1, "Mobile number is required"),
  email: z.email("Enter a valid email address").min(1, "Email is required"),
  nationality: z.string().min(1, "Nationality is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  Language_Proficiency: z
    .array(languageSchema)
    .min(1, "Add at least one language")
    .optional(),
  address: z.array(addressSchema).min(1, "Address is required").optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
    .optional(),
  hobbies: z.string().optional(),
  photography_club: z.string().optional(),
  blood_group: z.string().min(1, "Blood group is required"),
  Parent_Guardian_Spouse_Details: parentDetails,

  profession: z.string().optional(),

  passport_size_image: z
    .number()
    .min(1, "Passport image is required")
    .optional(),

  step_1: z.boolean().optional(),
});

export const applicationFormSchema_Step2 = z.object({
  Education_Details: z.object({
    Education_Details_12th_std: z.number().min(1, "MarkSheet is required"),
    Education_Details_10th_std: z.number().min(1, "MarkSheet is required"),
  }),
  Under_Graduate: z
    .object({
      degree: z.string().min(1, "Graduation degree is required"),
      ug_status: z.string().optional(),
      marksheet: z.number().optional(),
    })
    .optional(),
  Post_Graduate: z.array(postGraduate).optional(),

  additionalDegree: z.array(education).optional(),

  Work_Experience: z.array(workExperience).optional(),

  step_2: z.boolean().optional(),
});

export const applicationFormSchema_Step3 = z.object({
  Upload_Your_Portfolio: z.object({
    images: z
      .array(
        z.object({
          id: z.number().min(1, "Image ID is required"),
        }),
      )
      .min(1, "At least one image is required"),
  }),
  step_3: z.boolean().optional(),
});

export type ApplicationFormSchema_Step1 = z.infer<
  typeof applicationFormSchema_Step1
>;
export type ApplicationFormSchema_Step2 = z.infer<
  typeof applicationFormSchema_Step2
>;
export type ApplicationFormSchema_Step3 = z.infer<
  typeof applicationFormSchema_Step3
>;
