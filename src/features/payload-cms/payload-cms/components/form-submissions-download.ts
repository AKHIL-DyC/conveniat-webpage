'use server';

import config from '@payload-config';
import { getPayload } from 'payload';

/**
 * Helper function to escape a value for CSV format.
 * It wraps the value in double quotes if it contains a comma, newline, or double quote.
 * Existing double quotes within the value are also escaped by doubling them.
 */
const escapeCsvValue = (value: unknown): string => {
  // Handle null/undefined by converting to an empty string
  const stringValue = String(value ?? '');

  if (/[",\n\r]/.test(stringValue)) {
    // If the string contains special characters, wrap it in quotes
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
};

/**
 * Downloads all submissions for a given form ID and converts them into a CSV formatted string.
 * This function does not use any external libraries for CSV generation.
 *
 * @param formId The ID of the form to download submissions for.
 * @returns A promise that resolves to a string containing the CSV data.
 */
export const downloadFormSubmissionsAsCSV = async (formId: string): Promise<string> => {
  const payload = await getPayload({ config });

  console.log('Downloading form submissions for form ID:', formId);
  const formSubmissions = await payload.find({
    collection: 'form-submissions',
    where: {
      form: {
        equals: formId,
      },
    },
    limit: 1000,
  });

  const { docs: submissions } = formSubmissions;

  if (submissions.length === 0) {
    console.log('No submissions found for this form.');
    return '';
  }

  // 1. Create headers dynamically from all unique field names across all submissions.
  // This ensures all columns are included even if forms evolve over time.
  const headerSet = new Set<string>();
  for (const sub of submissions) {
    for (const field of sub.submissionData ?? []) {
      headerSet.add(field.field);
    }
  }
  const headers = ['submissionId', 'createdAt', ...headerSet];

  // 2. Map each submission to a CSV row.
  const rows = submissions.map((sub) => {
    const dataMap = new Map(sub.submissionData?.map((field) => [field.field, field.value]) ?? []);
    const rowData = headers.map((header) => {
      if (header === 'submissionId') return sub.id;
      if (header === 'createdAt') return sub.createdAt;
      return dataMap.get(header) ?? '';
    });

    return rowData.map((element) => escapeCsvValue(element)).join(',');
  });

  // 3. Combine the header and all data rows into a single string.
  const csvHeader = headers.map((element) => escapeCsvValue(element)).join(',');
  return [csvHeader, ...rows].join('\n');
};
