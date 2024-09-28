export interface ValuesFormAddTask {
  title: string;
  keep_order: boolean;
  body: string;
  question: string;
  answer_options: string;
  answer_explanation: string;
  this_is_if: string;
  this_is_ct: string;
  if_keywords: string;
  ct_keywords: string;
  wording_phrases: string;
  comments: string | undefined;
  graphics: string | undefined;
  answer_type: string;
  categories: number[];
  authors_peran: [{ authors: number; peran: string }];
  age_diff: [{ age: number; diff: string }];
  imagePaths: imagePath[];
}

export interface imagePath {
  fileName: string;
  path: string;
}

export interface TableRows {
  key: string;
  uploader: string;
  who_last_updated: string;
  task_title: string;
  answer_type: string;
  status_nasional: string;
  gotointernational: boolean;
  status_internasional: string;
  last_updated: string;
  tahun: number;
  biro_uploader: string;
  biro_last_updated: string;
}

export interface BankSoalTableRows {
  id_bank_soal: number;
  kode_soal: string;
  tahun: number;
  answer_type: string;
  rating_nasional: number | null;
  rating_internasional: number;
  best_task: boolean;
  negara: string;
  terpilih: boolean;
}

export interface BankSoalGeneralInfo {
  kode_soal: string;
  tahun: number;
  answer_type: string;
  rating_nasional: number | null;
  rating_internasional: number;
  best_task: boolean;
  negara: string;
  terpilih: boolean;
  authors: string;
  keep_order: boolean;
  comments: string | null;
  graphics: string | null;
}

export interface Categories {
  nama: string;
}

export interface KontenSoal {
  task_title: string;
  body: string;
  question: string;
  answer_options: string;
  answer_explanation: string;
  this_is_if: string;
  this_is_ct: string;
  if_keywords: string;
  ct_keywords: string;
  wording_phrases: string | null;
}

export interface Age {
  range_age: string;
  difficulty: string;
}

export interface ActionResult {
  error: string | null;
}

export interface Option2 {
  value: string;
  label: string;
  children?: Option2[];
}

export interface BebrasTask {
  tahun: number;
  task_title: string;
  answer_type: string;
  keep_order: string;
  body: string;
  question: string;
  answer_options: string;
  answer_explanation: string;
  this_is_if: string;
  this_is_ct: string;
  if_keywords: string;
  ct_keywords: string;
  wording_phrases: string | null;
  comments: string | null;
  graphics: string | null;
}

export interface Authors {
  id_user: number;
  peran: string;
}
