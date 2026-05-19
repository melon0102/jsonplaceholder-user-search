import type { ParsedUserName } from '../types/user';

const KNOWN_TITLES = new Set([
  'Mr.',
  'Mrs.',
  'Ms.',
  'Miss',
  'Dr.',
  'Prof.',
  'Sir',
  'Madam',
]);

const KNOWN_SUFFIXES = new Set([
  'Jr.',
  'Jr',
  'Sr.',
  'Sr',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
]);

const normalizeForSort = (value: string): string =>
  value.trim().toLowerCase().replace(/[.,]/g, '');

export const parseAndFormatUserName = (fullName: string): ParsedUserName => {
  const parts = fullName.trim().split(/\s+/);

  let title: string | undefined;
  let suffix: string | undefined;

  if (parts.length > 0 && KNOWN_TITLES.has(parts[0])) {
    title = parts.shift();
  }

  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];

    if (KNOWN_SUFFIXES.has(lastPart)) {
      suffix = parts.pop();
    }
  }

  const firstName = parts.shift() ?? '';

  const lastName = parts.length > 0 ? parts.join(' ') : firstName;

  const lastNameWithSuffix = suffix ? `${lastName} ${suffix}` : lastName;

  const formattedName = [
    `${lastNameWithSuffix}, ${firstName}`,
    title ? ` (${title})` : '',
  ].join('');

  return {
    title,
    firstName,
    lastName,
    suffix,
    formattedName,
    sortKey: normalizeForSort(lastName),
  };
};
