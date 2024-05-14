export interface StringField extends GeneralField {
  value: string;
}

export interface LocalDateField extends GeneralField {
  value: string;
}

export interface DoubleField extends GeneralField {
  value: number | undefined;
}

export interface IntegerField extends GeneralField {
  value: number | undefined;
}

export interface BooleanField extends GeneralField {
  value: boolean;
}

export interface SelectorField extends GeneralField {
  selectorListType: string;
  uid: string;
  displayName: string;
}

export interface GeneralField {
  error: Array<ErrorDescr>;
  lookup: boolean;
  label: string;
  readonly: boolean;
  hidden: boolean;
}

export interface ErrorDescr {
  severity: ErrorDescrSeverity;
  descr: string;
  errorType: string;
}

export enum ErrorDescrSeverity {
  error,
  warning,
}
