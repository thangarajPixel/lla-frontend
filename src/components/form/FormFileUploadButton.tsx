"use client";

import axios from "axios";
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from "react-hook-form";
import { cn } from "@/lib/utils";
import { FileUploadButton } from "../sections/admission-form/_components/file-upload-button";

type UploadButtonProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  noDataMessage?: string;
  notRequired?: boolean;
  defaultValue?: DocumentFile | null;
  className?: string;
  disabled?: boolean;
  maxSize?: string;
};

const FormFileUploadButton = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  notRequired,
  defaultValue,
  className,
  maxSize,
}: UploadButtonProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  const handleUpload = async (file: File) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);

    const res = await axios.post(`${process.env.BASE_URL}/upload`, formData);

    const resData = await res.data;
    field.onChange(resData[0].id);
  };

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label
          htmlFor={label}
          className="block text-sm font-medium text-foreground"
        >
          {label}
          {!notRequired && <span className="text-chart-1">*</span>}
        </label>
      )}
      <div className="space-y-2">
        <FileUploadButton
          placeholder={placeholder}
          maxSize={maxSize ?? "2MB"}
          onUpload={handleUpload}
          onRemove={() => field.onChange(0)}
          defaultValue={defaultValue}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormFileUploadButton;
