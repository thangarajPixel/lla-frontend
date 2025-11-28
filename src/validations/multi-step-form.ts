import { z } from "zod";

export const languageSchema = z.object({
  // id: z.number(),
  language: z.string().min(1, "Language is required"),
  read: z.boolean().default(false).optional(),
  write: z.boolean().default(false).optional(),
  speak: z.boolean().default(false).optional(),
});

// export const address = z.object({
//   flat: z.string().optional(),
//   doorNumber: z.string().optional(),
//   city: z.string().optional(),
//   district: z.string().optional(),
//   state: z.string().optional(),
//   pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
// });

export const parentDetails = z.object({
  title: z.enum(["Mr.", "Ms."]).optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  email: z.email("Enter a valid email address"),
  name: z.string().optional(),
  profession: z.string().optional(),
  nationality: z.string().optional(),
  contact_no: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export const uploadMarkSheet = z.object({
  documentId: z.string().min(1, "Marksheet document is required"),
  url: z.string().optional(),
  previewUrl: z.string().optional(),
});

export const workExperience = z.object({
  designation: z.string().min(1, "Designation is required"),
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
  pg_status: z.enum(["finished", "in-progress"]).optional(),
  marksheet: z.number().optional(),
});

export const applicationFormSchema_Step1 = z.object({
  name_title: z.enum(["Mr.", "Ms."]).optional(),

  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  email: z.email("Enter a valid email address"),
  nationality: z.string().min(1, "Nationality is required"),
  date_of_birth: z.date().nullable().optional(),
  Language_Proficiency: z
    .array(languageSchema)
    .min(1, "Add at least one language")
    .optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  hobbies: z.string().optional(),
  photography_club: z.string().optional(),
  blood_group: z.string().optional(),
  Parent_Guardian_Spouse_Details: parentDetails,

  profession: z.string().optional(),

  // passport_size_image: z
  //   .file()
  //   .refine((file) => file instanceof File, "Image file is required")
  //   .refine(
  //     (file) => file?.size <= 3 * 1_000_000,
  //     "File size must be less than 1MB"
  //   )
  //   // .refine(
  //   //   (file) => ["image/jpeg", "image/png"].includes(file?.type),
  //   //   "Only JPG or PNG allowed"
  //   // )
  //   .optional(),
  passport_size_image: z.number().optional(),

  step_1: z.boolean().optional(),
});

export const applicationFormSchema_Step2 = z.object({
  Education_Details: z.object({
    Education_Details_12th_std: z
      .number().optional(),
    Education_Details_10th_std: z
      .number().optional(),
  }),
  Under_Graduate: z
    .object({
      degree: z.string().min(1, "Graduation degree is required"),
      ug_status: z.enum(["finished", "in-progress"]).optional(),
      marksheet: z.number().optional(),
    })
    .optional(),
  Post_Graduate: z.array(postGraduate).optional(),

  additionalDegree: z.array(education).optional(),

  Work_Experience: z.array(workExperience).optional(),

  step_2: z.boolean().optional(),
});

export const applicationFormSchema_Step3 = z.object({
  portfolio: z
    . file()
    .refine((file) => file instanceof File, "Image file is required")
    .refine(
      (file) => file?.size <= 1_000_000,
      "File size must be less than 1MB"
    )
    // .refine(
    //   (file) => ["image/jpeg", "image/png"].includes(file?.type),
    //   "Only JPG or PNG allowed"
    // )
    .optional(),
});

// export type ApplicationFormSchema = z.infer<typeof applicationFormSchema_Step1>;

export type ApplicationFormSchema_Step1 = z.infer<
  typeof applicationFormSchema_Step1
>;
export type ApplicationFormSchema_Step2 = z.infer<
  typeof applicationFormSchema_Step2
>;
export type ApplicationFormSchema_Step3 = z.infer<
  typeof applicationFormSchema_Step3
>;
