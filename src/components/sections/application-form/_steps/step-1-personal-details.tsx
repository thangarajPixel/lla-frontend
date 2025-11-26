// "use client"

// import { useFormContext } from "react-hook-form"
// import type { FormData } from "@/components/sections/application-form/application-form"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// // import { Checkbox } from "@/components/ui/checkbox"

// export function Step1PersonalDetails() {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext<FormData>()

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>

//       {/* Full Name */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="fullName">
//             Full Name (As in Certificate) <span className="text-red-600">*</span>
//           </Label>
//           <Input
//             id="fullName"
//             placeholder="First Name"
//             {...register("fullName", { required: "Full name is required" })}
//             className="mt-1"
//           />
//           {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="dateOfBirth">Date of Birth *</Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             {...register("dateOfBirth", { required: "Date of birth is required" })}
//             className="mt-1"
//           />
//           {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>}
//         </div>
//       </div>

//       {/* Mobile & Email */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="mobileNumber">Mobile Number *</Label>
//           <Input
//             id="mobileNumber"
//             type="tel"
//             placeholder="Enter your mobile number"
//             {...register("mobileNumber", {
//               required: "Mobile number is required",
//               pattern: {
//                 value: /^[0-9]{10}$/,
//                 message: "Please enter a valid 10-digit mobile number",
//               },
//             })}
//             className="mt-1"
//           />
//           {errors.mobileNumber && <p className="text-red-600 text-sm mt-1">{errors.mobileNumber.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="emailAddress">Email Address *</Label>
//           <Input
//             id="emailAddress"
//             type="email"
//             placeholder="Enter your email address"
//             {...register("emailAddress", {
//               required: "Email address is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Please enter a valid email address",
//               },
//             })}
//             className="mt-1"
//           />
//           {errors.emailAddress && <p className="text-red-600 text-sm mt-1">{errors.emailAddress.message}</p>}
//         </div>
//       </div>

//       {/* Language & Proficiency */}
//       <div>
//         <Label className="mb-3 block font-semibold">
//           Language & Proficiency <span className="text-red-600">*</span>
//         </Label>
//         <div className="flex gap-6">
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageRead" {...register("languageRead")} /> */}
//             <input type='checkbox' id="languageRead" {...register("languageRead")} />
//             <Label htmlFor="languageRead" className="cursor-pointer">
//               Read
//             </Label>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageWrite" {...register("languageWrite")} /> */}
//             <input type='checkbox' id="languageWrite" {...register("languageWrite")} />
//             <Label htmlFor="languageWrite" className="cursor-pointer">
//               Write
//             </Label>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageSpeak" {...register("languageSpeak")} /> */}
//             <input type='checkbox' id="languageSpeak" {...register("languageSpeak")} />
//             <Label htmlFor="languageSpeak" className="cursor-pointer">
//               Speak
//             </Label>
//           </div>
//         </div>
//       </div>

//       {/* Address */}
//       <div>
//         <Label htmlFor="address">Address *</Label>
//         <Input
//           id="address"
//           placeholder="House/Apt No., Street Name"
//           {...register("address", { required: "Address is required" })}
//           className="mt-1"
//         />
//         {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
//       </div>

//       {/* District, State, Pincode */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <Label htmlFor="district">District *</Label>
//           <Input
//             id="district"
//             placeholder="District"
//             {...register("district", { required: "District is required" })}
//             className="mt-1"
//           />
//           {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="state">State *</Label>
//           <Input
//             id="state"
//             placeholder="State"
//             {...register("state", { required: "State is required" })}
//             className="mt-1"
//           />
//           {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="pincode">Pincode *</Label>
//           <Input
//             id="pincode"
//             placeholder="Pincode"
//             {...register("pincode", { required: "Pincode is required" })}
//             className="mt-1"
//           />
//           {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode.message}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }


// "use client"

// import { useForm } from "react-hook-form"
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import InputField from "@/components/ui/form-fields/input-field"
// import { ApplicationFormSchema_Step1, applicationFormSchema_Step1 } from "@/validations/multile-step-form"
// import DatePickerField from "@/components/ui/form-fields/date-picker";
// // import { Checkbox } from "@/components/ui/checkbox"

// export function Step1PersonalDetails() {
// //   const {
// //     register,
// //     formState: { errors },
// //   } = useFormContext<FormData>()

// const form = useForm<ApplicationFormSchema_Step1>({
//     resolver: zodResolver(applicationFormSchema_Step1),
//     defaultValues: {}
//   });

//   const {
//     control,
//     register,
//     formState: { errors },
//   } = form

//   return (
//     <div className="space-y-6">
//       <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>

//       {/* Full Name */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="fullName">
//             Full Name (As in Certificate) <span className="text-red-600">*</span>
//           </Label>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
//           <InputField name="firstName" placeholder="firstName" control={control} notRequired={false} />
//           <InputField name="lastName" placeholder="lastName" control={control} notRequired={false} />
//           </div>
//         </div>
//         <div>
//           <Label htmlFor="dateOfBirth">Date of Birth *</Label>
//           <Input
//             id="dateOfBirth"
//             type="date"
//             {...register("dateOfBirth", { required: "Date of birth is required" })}
//             className="mt-1 hidden"
//           />
//           {/* {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>} */}
//           <DatePickerField name="dateOfBirth" control={control} notRequired="false" />
//         </div>
//       </div>

//       {/* Mobile & Email */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="mobileNumber">Mobile Number *</Label>
//           <Input
//             id="mobileNumber"
//             type="tel"
//             placeholder="Enter your mobile number"
//             {...register("mobileNumber", {
//               required: "Mobile number is required",
//               pattern: {
//                 value: /^[0-9]{10}$/,
//                 message: "Please enter a valid 10-digit mobile number",
//               },
//             })}
//             className="mt-1"
//           />
//           {errors.mobileNumber && <p className="text-red-600 text-sm mt-1">{errors.mobileNumber.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="emailAddress">Email Address *</Label>
//           <Input
//             id="emailAddress"
//             type="email"
//             placeholder="Enter your email address"
//             {...register("email", {
//               required: "Email address is required",
//               pattern: {
//                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                 message: "Please enter a valid email address",
//               },
//             })}
//             className="mt-1"
//           />
//           {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
//         </div>
//       </div>

//       {/* Language & Proficiency */}
//       <div>
//         <Label className="mb-3 block font-semibold">
//           Language & Proficiency <span className="text-red-600">*</span>
//         </Label>
//         <div className="flex gap-6">
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageRead" {...register("languageRead")} /> */}
//             <input type='checkbox' id="languageRead" {...register(`languages.${0}.read`)} />
//             <Label htmlFor="languageRead" className="cursor-pointer">
//               Read
//             </Label>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageWrite" {...register("languageWrite")} /> */}
//             <input type='checkbox' id="languageWrite" {...register(`languages.${0}.write`)} />
//             <Label htmlFor="languageWrite" className="cursor-pointer">
//               Write
//             </Label>
//           </div>
//           <div className="flex items-center gap-2">
//             {/* <Checkbox id="languageSpeak" {...register("languageSpeak")} /> */}
//             <input type='checkbox' id="languageSpeak" {...register(`languages.${0}.speak`)} />
//             <Label htmlFor="languageSpeak" className="cursor-pointer">
//               Speak
//             </Label>
//           </div>
//         </div>
//       </div>

//       {/* Address */}
//       <div>
//         <Label htmlFor="address">Address *</Label>
//         <Input
//           id="address"
//           placeholder="House/Apt No., Street Name"
//           {...register("address", { required: "Address is required" })}
//           className="mt-1"
//         />
//         {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
//       </div>

//       {/* District, State, Pincode */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div>
//           <Label htmlFor="district">District *</Label>
//           <Input
//             id="district"
//             placeholder="District"
//             {...register("district", { required: "District is required" })}
//             className="mt-1"
//           />
//           {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="state">State *</Label>
//           <Input
//             id="state"
//             placeholder="State"
//             {...register("state", { required: "State is required" })}
//             className="mt-1"
//           />
//           {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
//         </div>
//         <div>
//           <Label htmlFor="pincode">Pincode *</Label>
//           <Input
//             id="pincode"
//             placeholder="Pincode"
//             {...register("pincode", { required: "Pincode is required" })}
//             className="mt-1"
//           />
//           {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode.message}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }


"use client"

import { useRef, useState } from "react"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@/components/ui/input"
import CheckboxField from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Upload, Plus } from "lucide-react"
import InputField from "@/components/ui/form-fields/input-field"
import { useForm } from "react-hook-form"
import { applicationFormSchema_Step1, ApplicationFormSchema_Step1 } from "@/validations/multile-step-form"
import SelectBox from "@/components/ui/form-fields/select-box";
import DatePickerField from "@/components/ui/form-fields/date-picker";
import Image from "next/image";

interface Language {
  id: number
  language: string
  read: boolean
  write: boolean
  speak: boolean
}

export function Step1PersonalDetails() {
  const [languages, setLanguages] = useState<Language[]>([
    { id: 1, language: "", read: true, write: false, speak: false },
  ])
  const [mobileError, setMobileError] = useState(true)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<ApplicationFormSchema_Step1>({
    resolver: zodResolver(applicationFormSchema_Step1),
    defaultValues: {}
  });

  const {
    control,
    register,
    formState: { errors },
  } = form

  const addLanguage = () => {
    setLanguages([...languages, { id: languages.length + 1, language: "", read: false, write: false, speak: false }])
  }

  const updateLanguage = (id: number, field: keyof Language, value: boolean | string) => {
    setLanguages(languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)))
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (!file) return

  //   // Validate file type
  //   if (!file.type.startsWith("image/")) {
  //     alert("Please upload a valid image.")
  //     return
  //   }

  //   // Create preview URL
  //   const url = URL.createObjectURL(file)
  //   setPreviewUrl(url)
  // }

  // const validateDimensions = (file: File): Promise<boolean> => {
  //   return new Promise((resolve) => {
  //     const img = new Image()
  //     img.src = URL.createObjectURL(file)

  //     img.onload = () => {
  //       const width = img.width
  //       const height = img.height

  //       const maxWidth = 3600  // 12 inches @300dpi
  //       const maxHeight = 2400 // 8 inches @300dpi

  //       if (width > maxWidth || height > maxHeight) {
  //         alert(`Image must be max 12"x8" (3600x2400 pixels). Your image is ${width}x${height}px.`)
  //         resolve(false)
  //       } else {
  //         resolve(true)
  //       }
  //     }

  //     img.onerror = () => {
  //       alert("Invalid image file.")
  //       resolve(false)
  //     }
  //   })
  // }


  const validateDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img') as HTMLImageElement
      const objectUrl = URL.createObjectURL(file)
      img.src = objectUrl

      img.onload = () => {
        const width = img.width
        const height = img.height

        // revoke object URL once loaded to free memory
        URL.revokeObjectURL(objectUrl)

        const maxWidth = 3600  // 12 inches @300dpi
        const maxHeight = 2400 // 8 inches @300dpi

        if (width > maxWidth || height > maxHeight) {
          alert(`Image must be max 12"x8" (3600x2400 pixels). Your image is ${width}x${height}px.`)
          resolve(false)
        } else {
          resolve(true)
        }
      }

      img.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        resolve(false)
      }
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image.")
      return
    }


    // 1️⃣ Validate file size (< 1MB)
    if (file.size > 1024 * 1024) {
      alert("File size must be less than 1MB.")
      return
    }

    // 2️⃣ Validate dimensions (<= 12x8 inches → <= 3600x2400 px)
    const valid = await validateDimensions(file)
    if (!valid) return

    // 3️⃣ Preview
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-light text-primary mb-8">Personal Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Full Name (As in Certificate)<span className="text-chart-1">*</span>
            </label>
            <div className="grid grid-cols-[80px_1fr_1fr] gap-3">

              <SelectBox
                control={control}
                name="title"
                defaultValue="mr"
                options={[{ value: "mr", label: "Mr" }, { value: "mrs", label: "Mrs" }, { value: "ms", label: "Ms" }, { value: "dr", label: "Dr" }]}
                placeholder="select title"
                className="w-20 "
              />

              <InputField name="firstName" placeholder="First Name" control={control} />
              <InputField name="lastName" placeholder="Last Name" control={control} />
            </div>
          </div>

          {/* Date of Birth & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <DatePickerField name="dateOfBirth" placeholder="DD/MM/YYYY" label="Date of Birth" control={control} notRequired="false" />
            </div>
            <div>
              <InputField name="nationality" label="Nationality" placeholder="Enter your nationality" control={control} />
            </div>
          </div>

          {/* Mobile Number & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <InputField name="mobileNumber" label="Mobile Number" placeholder="Enter your mobile number" control={control} />
            </div>
            <div>
              <InputField name="email" label="Email Address" placeholder="Enter your email address" control={control} />
            </div>
          </div>

          {/* Language & Proficiency */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Language & Proficiency<span className="text-primary">*</span>
            </label>
            {languages.map((lang) => (
              <div key={lang.id} className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                <div className="w-full md:w-64">
                  <Input
                    placeholder="Language Known"
                    value={lang.language}
                    onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                    className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <CheckboxField
                      id={`read-${lang.id}`}
                      checked={lang.read}
                      onCheckedChange={(checked: boolean) => updateLanguage(lang.id, "read", !!checked)}
                      className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />
                    <label htmlFor={`read-${lang.id}`} className="text-sm text-foreground">
                      Read
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckboxField
                      id={`write-${lang.id}`}
                      checked={lang.write}
                      onCheckedChange={(checked: boolean) => updateLanguage(lang.id, "write", !!checked)}
                      className="border-border"
                    />
                    <label htmlFor={`write-${lang.id}`} className="text-sm text-foreground">
                      Write
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckboxField
                      id={`speak-${lang.id}`}
                      checked={lang.speak}
                      onCheckedChange={(checked: boolean) => updateLanguage(lang.id, "speak", !!checked)}
                      className="border-border"
                    />
                    <label htmlFor={`speak-${lang.id}`} className="text-sm text-foreground">
                      Speak
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addLanguage}
              className="flex ml-auto items-center gap-2 text-primary text-sm mt-2 hover:opacity-80 transition-opacity"
            >
              <Plus className="h-4 w-4 border border-chart-1 rounded-full text-chart-1" />
              <span className="text-chart-1">Add Language</span>
            </button>
          </div>

          {/* Address */}
          <div className="hidden">
            <label className="block text-sm font-medium text-foreground mb-2">
              Address<span className="text-primary">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Flat/House/Apartment No, Street Name*"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
              <Input
                placeholder="Name of the town/village/city"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Input
                placeholder="District*"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
              <Select>
                <SelectTrigger className="rounded-full border-border bg-background h-10">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="state1">State 1</SelectItem>
                  <SelectItem value="state2">State 2</SelectItem>
                  <SelectItem value="state3">State 3</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Pin-code"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>

          {/* Hobbies, Photography Club, Blood Group */}
          <div className="hidden grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Hobbies / Talent(s)</label>
              <Input
                placeholder="Enter your mobile number"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Photography Club</label>
              <Input
                placeholder="Enter your email address"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Blood Group<span className="text-primary">*</span>
              </label>
              <Input
                placeholder="Enter your email address"
                className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
              />
            </div>
          </div>
        </div>

        {/* Passport Size Image Upload */}
        <div className="lg:pt-7">
          <label className="block text-sm font-medium text-foreground mb-2">
            Passport size Image<span className="text-primary">*</span>
          </label>

          {/* Upload Box */}
          <div
            className="border border-dashed border-border rounded-lg max-w-[180px] flex flex-col items-center justify-center min-h-[180px] bg-secondary cursor-pointer hover:bg-accent transition relative overflow-hidden"
            onClick={handleClick}
          >
            {!previewUrl ? (
              <>
                <Upload className="h-10 w-10 text-primary mb-3" />
                <p className="text-sm text-muted-foreground text-center">
                  Upload your passport
                  <br />
                  size picture here*
                  <br />
                  (No selfies please)
                </p>
              </>
            ) : (
              <Image
                src={previewUrl}
                width={100}
                height={100}
                alt="Preview"
                className="h-[180px] w-full object-cover rounded-md"
              />
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <p className="text-xs text-muted-foreground mt-2">
            The size of the images should not
            <br />
            be more than 12&quot;x8&quot; size.
            <br />
            Max. file size not more than 1MB.
          </p>
        </div>
      </div>

      {/* Address New */}
      <div className="block">
        <label className="block text-sm font-medium text-foreground mb-2">
          Address<span className="text-primary">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Flat/House/Apartment No, Street Name*"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
          <Input
            placeholder="Name of the town/village/city"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Input
            placeholder="District*"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
          <Select>
            <SelectTrigger className="rounded-full border-border bg-background h-10">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="state1">State 1</SelectItem>
              <SelectItem value="state2">State 2</SelectItem>
              <SelectItem value="state3">State 3</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Pin-code"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Hobbies / Talent(s)</label>
          <Input
            placeholder="Enter your mobile number"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Photography Club</label>
          <Input
            placeholder="Enter your email address"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Blood Group<span className="text-primary">*</span>
          </label>
          <Input
            placeholder="Enter your email address"
            className="rounded-full border-border h-10 placeholder:text-muted-foreground/60"
          />
        </div>
      </div>
    </div>
  )
}

