'use client';

import { Copy } from 'lucide-react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/InputField/InputField';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  formSchema,
  type FormBuilderState,
  type UTMKeys,
} from '@/features/UTMBuilderForm/schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ProfileForm = () => {
  const form = useForm<FormBuilderState>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      url: '',
      UTMs: {
        utm_source: '',
        utm_medium: '',
        utm_campaign: '',
        utm_term: '',
        utm_content: '',
      },
    },
  });

  const updateUrl = () => {
    const baseUrl = new URL(form.getValues('url') ?? '');
    const UTMs = form.getValues('UTMs');

    const newParams = new URLSearchParams(baseUrl.search);

    Object.entries(UTMs).forEach(([key, value]) => {
      if (value?.trim()) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    const newUrl = new URL(baseUrl.origin + baseUrl.pathname);

    newUrl.search = newParams.toString();

    form.setValue('url', newUrl.toString());
  };

  const onSubmit = (values: FormBuilderState) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-8 flex items-end gap-4">
          <div className="flex-1">
            <InputField
              control={form.control}
              label="Base URL"
              placeholder="Input base URL"
              name="url"
              onCustomChange={updateUrl}
            />
          </div>
          <Button size="icon" variant="secondary" type="button">
            <Copy />
          </Button>
        </div>
        <div className="grid gap-4">
          {(Object.keys(form.getValues('UTMs')) as UTMKeys[]).map((key) => (
            <InputField
              key={key}
              control={form.control}
              name={`UTMs.${key}`}
              label={key}
              placeholder={`Input '${key}'`}
              onCustomChange={updateUrl}
            />
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
