"use client";

import type { Control } from "react-hook-form";
import { FormInput, FormSelectBox } from "@/components/form";
import type { PersonalDetailsSchema } from "@/components/sections/admission-form/_steps/personal-details-form";
import { useGetStateLists } from "@/store/hooks/global-hooks";

type AddressFieldsProps = {
  control: Control<PersonalDetailsSchema>;
  name?: string;
};

const AddressFields = ({ control, name }: AddressFieldsProps) => {
  const { data: statesData } = useGetStateLists();

  const stateOptions =
    (statesData?.data as StateItem[])?.map((state) => ({
      value: state.documentId,
      label: state.name,
    })) || [];

  return (
    <div>
      <label
        htmlFor="address"
        className="block text-sm font-medium text-foreground mb-2"
      >
        Address<span className="text-chart-1">*</span>
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name={
            name
              ? "Parent_Guardian_Spouse_Details.address.0.children.0.text"
              : "address.0.children.0.text"
          }
          placeholder="Flat/House/Apartment No, Street Name"
          control={control}
        />

        <FormInput
          name={name ? "Parent_Guardian_Spouse_Details.city" : "city"}
          placeholder="Name of the town/village/city"
          control={control}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <FormInput
          name={name ? "Parent_Guardian_Spouse_Details.district" : "district"}
          placeholder="District"
          control={control}
        />

        <FormSelectBox
          control={control}
          name={name ? "Parent_Guardian_Spouse_Details.state" : "state"}
          options={stateOptions}
          placeholder="Select State"
        />
        <FormInput
          name={name ? "Parent_Guardian_Spouse_Details.pincode" : "pincode"}
          placeholder="Pincode"
          control={control}
        />
      </div>
    </div>
  );
};

export default AddressFields;
