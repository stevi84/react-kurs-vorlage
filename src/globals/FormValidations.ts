import { FieldValidator } from 'final-form';
import { isEmail, isEmptyString, isInteger, isIsoDate, isNumber, isPhone } from './Validations';
import { i18n } from '../i18n';

export const formIsNotEmptyString: FieldValidator<string> = (value: string): string | null | undefined =>
  isEmptyString(value) ? i18n.t('error_empty') : undefined;

export const formIsIsoDate: FieldValidator<string> = (value: string): string | null | undefined =>
  isIsoDate(value) ? undefined : i18n.t('error_date');

export const formIsEmail: FieldValidator<string> = (value: string): string | null | undefined =>
  isEmail(value) ? undefined : i18n.t('error_mail');

export const formIsPhone: FieldValidator<string> = (value: string): string | null | undefined =>
  isPhone(value) ? undefined : i18n.t('error_telephone');

export const formIsInteger: FieldValidator<number> = (value: number): string | null | undefined =>
  isInteger(value) ? undefined : i18n.t('error_integer');

export const formIsNumber: FieldValidator<number> = (value: number): string | null | undefined =>
  isNumber(value) ? undefined : i18n.t('error_number');
