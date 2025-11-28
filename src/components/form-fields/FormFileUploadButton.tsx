'use client';

import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import { FileUploadButton } from '../sections/admission-form/_components/file-upload-button'
import { cn } from '@/lib/utils';
import axios from 'axios';

type UploadButtonProps<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  placeholder?: string;
  noDataMessage?: string;
  notRequired?: boolean;
  defaultValue?: string;
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
  className,
  disabled,
  maxSize,
}: UploadButtonProps<T>) => {
  const { field, fieldState: { error } } = useController({ name, control });

  const handleUpload = async (file: File, url: string) => {

    if (!file) return;

    const formData = new FormData();
    formData.append('files', file);

    const res = await axios.post('https://dev-admin.lightandlifeacademy.in/api/upload', formData);

    const resData = await res.data;
    field.onChange(resData[0].id);
  }

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {!notRequired && <span className="text-chart-1">*</span> }
        </label>
      )}
      <div className="space-y-2">
            <FileUploadButton label={placeholder} maxSize={maxSize ?? '3MB'} handleUpload={handleUpload}/>
        </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}

export default FormFileUploadButton;
