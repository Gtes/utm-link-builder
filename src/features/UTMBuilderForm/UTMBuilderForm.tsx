'use client';

import { getRouteApi } from '@tanstack/react-router';
import { Check, Copy } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import InputField from '@/components/InputField/InputField';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import {
  formSchema,
  type FormBuilderState,
  type UTMKeys,
} from '@/features/UTMBuilderForm/schema';
import { useCopyToClipboard } from '@/hooks/useCopiedUrl';
import { useUTMLinks } from '@/hooks/useUTMLinks';
import { zodResolver } from '@hookform/resolvers/zod';

const routeApi = getRouteApi('/builder');

const UTMBuilderForm = () => {
  const { url } = routeApi.useSearch();

  const { copiedValue, copy } = useCopyToClipboard();

  const rawUrl = url ?? '';

  const { initialUrl, initialUTMs } = useMemo(() => {
    const fallbackUTMs = {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
    };

    try {
      const parsed = new URL(rawUrl);
      const searchParams = parsed.searchParams;

      return {
        initialUrl: parsed.href,
        initialUTMs: {
          utm_source: searchParams.get('utm_source') ?? '',
          utm_medium: searchParams.get('utm_medium') ?? '',
          utm_campaign: searchParams.get('utm_campaign') ?? '',
          utm_term: searchParams.get('utm_term') ?? '',
          utm_content: searchParams.get('utm_content') ?? '',
        },
      };
    } catch {
      return {
        initialUrl: '',
        initialUTMs: fallbackUTMs,
      };
    }
  }, [rawUrl]);

  const { addLink, links } = useUTMLinks();
  const form = useForm<FormBuilderState>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      url: initialUrl,
      UTMs: initialUTMs,
    },
  });

  const disableSubmit = useMemo(
    () =>
      !form.formState.isDirty ||
      links.some((link) => link.id === form.watch('url')),
    [form.watch('url'), links],
  );

  const updateUrl = () => {
    const baseUrl = new URL(form.getValues('url') ?? '');
    const UTMs = form.getValues('UTMs');

    console.log('baseUrl', baseUrl);

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
    newUrl.protocol = 'https:';

    console.log('newUrl', newUrl);

    form.setValue('url', newUrl.toString());
  };

  const onSubmit = (values: FormBuilderState) => {
    addLink({ id: values.url });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mb-8 flex items-end gap-4">
          <Card className="w-[100%] p-[0]">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className={`flex-1`}>
                  <InputField
                    control={form.control}
                    placeholder="Input base URL"
                    name="url"
                    onCustomChange={updateUrl}
                  />
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => {
                    copy(form.getValues('url'));
                  }}
                >
                  {copiedValue === form.getValues('url') ? (
                    <Check className="text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
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
        <Button type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UTMBuilderForm;
