export interface Identrix {
  "Payor ID": string;
  "Payor Name": string;
  "eClaims™": boolean;
  "Special Enrollment": boolean;
  Attachments: boolean;
  Eligibility: boolean;
  "Real Time": boolean;
  eEOB: boolean;
  "eEOB Enrollment": boolean;
}

export interface IdentalXChange {
  "Payer ID": string;
  Name: string;
  CLM: boolean;
  ELI: boolean;
  BEN: boolean;
  STA: boolean;
  ERA: boolean;
  RTC: boolean;
  ATT: boolean;
}
