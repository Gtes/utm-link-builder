import type { Control, FieldValues, Path } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type InputFiledProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  description?: string;
  control: Control<T>;
  type?: string;
  onCustomChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputFiled = <T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  control,
  type = 'text',
  onCustomChange,
}: InputFiledProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                onCustomChange?.(e);
              }}
            />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputFiled;
