import { z } from "zod";
import { isNotFutureDate } from "./ConstantHelper";

export const languageSchema = z
  .object({
    language: z.string().optional(),
    read: z.boolean().default(false).optional(),
    write: z.boolean().default(false).optional(),
    speak: z.boolean().default(false).optional(),
  })
  .superRefine((data, ctx) => {
    const hasLanguage = !!data.language?.trim();
    const hasAnyProficiency = data.read || data.write || data.speak;

    if (!hasLanguage) {
      ctx.addIssue({
        path: ["language"],
        message: "Language is required",
        code: z.ZodIssueCode.custom,
      });
      return;
    }

    if (!hasAnyProficiency) {
      ctx.addIssue({
        path: ["language"],
        message: "Select at least one proficiency level",
        code: z.ZodIssueCode.custom,
      });
    }
  });

const addressSchema = z.object({
  type: z.literal("paragraph"),
  children: z.array(
    z.object({
      text: z.string().min(1, "Address is required"),
      type: z.string(),
    }),
  ),
});

export const parentDetails = z.object({
  title: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  profession: z.string().min(1, "Profession is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.array(addressSchema).min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .refine(
      (val) => val === "" || /^\d{6}$/.test(val),
      "Enter a valid 6-digit pincode",
    ),
});

export const workExperience = z
  .object({
    designation: z.string().optional(),
    employer: z.string().optional(),
    duration_start: z.string().optional(),
    duration_end: z.string().optional(),
    reference_letter: z.number().optional(),
  })
  .optional()
  .superRefine((value, ctx) => {
    if (!value) return;

    const fields = [
      value.designation,
      value.employer,
      value.duration_start,
      value.duration_end,
      value.reference_letter,
    ];

    const hasAnyValue = fields.some((v) =>
      typeof v === "string" ? v.trim() !== "" : !!v,
    );

    if (!hasAnyValue) return;

    if (!value.designation?.trim()) {
      ctx.addIssue({
        path: ["designation"],
        message: "Designation is required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!value.employer?.trim()) {
      ctx.addIssue({
        path: ["employer"],
        message: "Employer is required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (!value.duration_start?.trim()) {
      ctx.addIssue({
        path: ["duration_start"],
        message: "Duration is required",
        code: z.ZodIssueCode.custom,
      });
    }

    if (value.duration_start && !isNotFutureDate(value.duration_start)) {
      ctx.addIssue({
        path: ["duration_start"],
        message: "Cannot select future date",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const education = z.object({
  degree: z.string().min(1, "Degree is required"),
  markSheet: z.string().min(1, "Marksheet is required"),
  status: z.enum(["finished", "in-progress"]).optional(),
});

export const postGraduate = z.object({
  degree: z.string().optional(),
  pg_status: z.string().optional(),
  marksheet: z.number().optional(),
});

export const personalDetailsSchema = z.object({
  Course: z.string().optional(),
  name_title: z.string().optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mobile_no: z
    .string()
    .min(1, "Mobile number is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .min(1, "Email Address is required")
    .email({ message: "Enter a valid email" }),
  nationality: z.string().min(1, "Nationality is required"),
  date_of_birth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((value) => {
      const inputDate = new Date(value);
      const today = new Date();

      inputDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      return inputDate <= today;
    }, "Cannot select future date"),

  Language_Proficiency: z.array(languageSchema),
  address: z.array(addressSchema).min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  state: z.string().min(1, "State is required"),
  pincode: z
    .string()
    .min(1, "Pincode is required")
    .refine(
      (val) => val === "" || /^\d{6}$/.test(val),
      "Enter a valid 6-digit pincode",
    )
    .optional(),
  hobbies: z.string().optional(),
  photography_club: z.string().optional(),
  blood_group: z.string().optional(),

  Parent_Guardian_Spouse_Details: parentDetails,

  profession: z.string().optional(),

  passport_size_image: z
    .number()
    .min(1, "Passport size image is required")
    .optional(),

  step_1: z.boolean().optional(),
});

export const educationDetailsSchema = z.object({
  Education_Details: z.object({
    Education_Details_12th_std: z.number().min(1, "12th MarkSheet is required"),
    Education_Details_10th_std: z.number().min(1, "10th MarkSheet is required"),
  }),
  Under_Graduate: z
    .object({
      degree: z.string().min(1, "Graduation degree is required"),
      ug_status: z.string().min(1, "Graduation status is required"),
      marksheet: z.number().min(1, "UG Marksheet is required"),
    })
    .optional(),
  Post_Graduate: z.array(postGraduate).optional(),

  additionalDegree: z.array(education).optional(),

  Work_Experience: z.array(workExperience).optional(),

  step_2: z.boolean().optional(),
});

export const portfolioSchema = z.object({
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

export const admissionRequestSchema = z.object({
  FirstName: z.string().min(1, "Name is required"),
  LastName: z.string(),
  Email: z.string().min(1, "Email is required"),
  Mobile: z
    .string()
    .min(1, "Mobile No is required")
    .regex(/^[6-9]\d{9}$/, "Enter a valid mobile number"),
  Message: z.string(),
});
