'use client';

import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';

import { Required } from '@/features/payload-cms/components/form/required';
import { fieldIsRequiredText } from '@/features/payload-cms/components/form/static-form-texts';
import type { Locale } from '@/types/types';
import { i18nConfig } from '@/types/types';
import { useCurrentLocale } from 'next-i18n-router/client';
import type { DateField } from 'node_modules/@payloadcms/plugin-form-builder/dist/types';
import type React from 'react';

export const Date: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: never;
      }>
    >;
    registerAction: UseFormRegister<string & FieldValues>;
    placeholder?: string;
  } & DateField
> = ({ name, label, registerAction, required: requiredFromProperties, errors, placeholder }) => {
  // set default values
  requiredFromProperties ??= false;
  const hasError = errors[name];

  const locale = useCurrentLocale(i18nConfig);

  return (
    <div className="mb-4">
      <label className="mb-1 block font-['Inter'] text-sm font-medium text-gray-500" htmlFor={name}>
        {label}
        {requiredFromProperties && <Required />}
      </label>
      <input
        className={`h-10 w-full rounded-md border-0 bg-green-100 px-4 py-2 font-['Inter'] text-base text-gray-600 shadow-sm ring-1 ring-inset ${hasError ? 'bg-red-50 ring-red-500' : 'ring-transparent'} focus:ring-conveniat-green transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:outline-none focus:ring-inset`}
        id={name}
        type="date"
        placeholder={placeholder}
        {...registerAction(name, {
          required: requiredFromProperties ? fieldIsRequiredText[locale as Locale] : false,
        })}
      />
      {hasError && <p className="mt-1 text-xs text-red-600">{hasError.message as string}</p>}
    </div>
  );
};
