// ─── Vaccination Types ────────────────────────────────────────────────────────
export type VaccineDose = { date: string; dosage: string };
export type VaccineEntry = {
  status: 'given' | 'never' | 'unknown' | '';
  doses: VaccineDose[];
};

const emptyVaccine = (): VaccineEntry => ({ status: '', doses: [] });

// ─── Full Form Data Type ──────────────────────────────────────────────────────
export type FormData = {
  email: string; name: string; mrn: string; dateOfBirth: string;
  currentAge: string; ageAtDiagnosis: string; sex: string;
  smokingStatus: string; smokingDetails: string; contactPhone: string;
  placeOfLiving: string; referredBy: string;
  primaryDiagnosis: string; montrealClass: string; diseaseDuration: string;
  previousSurgeries: string[]; perianalDiseaseAssessment: string;
  currentDiseaseActivity: string; activityScore: string; stoolFrequency: string;
  bloodInStool: string; abdominalPain: string; impactOnQoL: string; weightLoss: string;
  dateMostRecentLabs: string; recentLabValues: string; dateMostRecentColono: string;
  colonoscopyFindings: string; recentImaging: string; mostRecentDexa: string;
  currentIbdMedications: string; responseToTreatment: string; tdmResults: string;
  steroidUse: string; currentSupplements: string;
  previousTreatmentsTried: string[]; failedTreatments: string;
  tbScreening: string; hepBSurfaceAg: string; hepBSurfaceAb: string;
  hepBCoreAb: string; antiHcv: string; antiHiv: string;
  influenza: VaccineEntry;
  covid19: VaccineEntry;
  pneumococcal: VaccineEntry;
  hepatitisB: VaccineEntry;
  hepatitisA: VaccineEntry;
  hepatitisE: VaccineEntry;
  zoster: VaccineEntry;
  mmrVaricella: VaccineEntry;
  tetanusTdap: VaccineEntry;
  comorbidities: string[]; extraintestinalManif: string[];
  pregnancyPlanning: string; occupation: string;
  specialConsiderations: string; preferredLanguage: string;
};

export const initialFormData: FormData = {
  email: '', name: '', mrn: '', dateOfBirth: '', currentAge: '',
  ageAtDiagnosis: '', sex: '', smokingStatus: '', smokingDetails: '',
  contactPhone: '', placeOfLiving: '', referredBy: '',
  primaryDiagnosis: '', montrealClass: '', diseaseDuration: '',
  previousSurgeries: [], perianalDiseaseAssessment: '',
  currentDiseaseActivity: '', activityScore: '', stoolFrequency: '',
  bloodInStool: '', abdominalPain: '', impactOnQoL: '', weightLoss: '',
  dateMostRecentLabs: '', recentLabValues: '', dateMostRecentColono: '',
  colonoscopyFindings: '', recentImaging: '', mostRecentDexa: '',
  currentIbdMedications: '', responseToTreatment: '', tdmResults: '',
  steroidUse: '', currentSupplements: '',
  previousTreatmentsTried: [], failedTreatments: '',
  tbScreening: '', hepBSurfaceAg: '', hepBSurfaceAb: '',
  hepBCoreAb: '', antiHcv: '', antiHiv: '',
  influenza:    emptyVaccine(),
  covid19:      emptyVaccine(),
  pneumococcal: emptyVaccine(),
  hepatitisB:   emptyVaccine(),
  hepatitisA:   emptyVaccine(),
  hepatitisE:   emptyVaccine(),
  zoster:       emptyVaccine(),
  mmrVaricella: emptyVaccine(),
  tetanusTdap:  emptyVaccine(),
  comorbidities: [], extraintestinalManif: [], pregnancyPlanning: '',
  occupation: '', specialConsiderations: '', preferredLanguage: '',
};

export const STEP_META = [
  { title: 'Patient Characteristics',     sub: 'Personal and demographic information' },
  { title: 'Disease Characteristics',     sub: 'Primary diagnosis and disease history' },
  { title: 'Current Disease Activity',    sub: 'Symptoms and activity assessment' },
  { title: 'Laboratory & Investigations', sub: 'Recent test results and imaging' },
  { title: 'Current Treatment',           sub: 'Medications and treatment response' },
  { title: 'Treatment History',           sub: 'Previous IBD treatments tried' },
  { title: 'Infection Screening',         sub: 'TB, hepatitis, and HIV screening results' },
  { title: 'Vaccination History',         sub: 'Immunisation records with dates and dosage' },
  { title: 'Comorbidities & Other',       sub: 'Other conditions and special considerations' },
];

const VAX_FIELDS: (keyof FormData)[] = [
  'influenza','covid19','pneumococcal','hepatitisB',
  'hepatitisA','hepatitisE','zoster','mmrVaricella','tetanusTdap',
];

const VAX_LABELS: Record<string, string> = {
  influenza:    'Influenza vaccine',
  covid19:      'COVID-19 vaccine',
  pneumococcal: 'Pneumococcal vaccine',
  hepatitisB:   'Hepatitis B vaccine',
  hepatitisA:   'Hepatitis A vaccine',
  hepatitisE:   'Hepatitis E vaccine',
  zoster:       'Zoster vaccine',
  mmrVaricella: 'MMR / Varicella',
  tetanusTdap:  'Tetanus / Tdap',
};

export function validateStep(step: number, d: FormData): Record<string, string> {
  const err: Record<string, string> = {};

  const req = (f: keyof FormData, label: string) => {
    const v = d[f];
    if (!v || (typeof v === 'string' && !v.trim()) || (Array.isArray(v) && v.length === 0))
      err[f as string] = `${label} is required`;
  };

  if (step === 1) {
    req('email','Email'); req('name','Patient full name'); req('mrn','Patient ID / MRN');
    req('dateOfBirth','Date of birth'); req('currentAge','Current age');
    req('ageAtDiagnosis','Age at IBD diagnosis'); req('sex','Sex');
    req('smokingStatus','Smoking status'); req('contactPhone','Contact phone');
    req('placeOfLiving','Place of living'); req('referredBy','Referred by');
    if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
      err['email'] = 'Enter a valid email address';
  }
  if (step === 2) { req('primaryDiagnosis','Primary diagnosis'); req('diseaseDuration','Disease duration'); }
  if (step === 3) {
    req('currentDiseaseActivity','Disease activity level'); req('stoolFrequency','Stool frequency');
    req('bloodInStool','Blood in stool'); req('abdominalPain','Abdominal pain');
    req('impactOnQoL','Impact on quality of life'); req('weightLoss','Weight loss');
  }
  if (step === 4) { req('dateMostRecentLabs','Date of most recent labs'); req('recentLabValues','Recent lab values'); }
  if (step === 5) { req('responseToTreatment','Response to treatment'); req('steroidUse','Steroid use'); }
  if (step === 6) { req('previousTreatmentsTried','Previous treatments tried'); }
  if (step === 7) { req('tbScreening','TB screening status'); req('hepBSurfaceAg','HBsAg result'); }

  if (step === 8) {
    for (const f of VAX_FIELDS) {
      const entry = d[f] as VaccineEntry;
      if (!entry || !entry.status) {
        err[f as string] = `${VAX_LABELS[f as string]} — please select a status`;
      }
    }
  }

  if (step === 9) {
    req('comorbidities','Comorbidities'); req('extraintestinalManif','Extraintestinal manifestations');
    req('pregnancyPlanning','Pregnancy / family planning status');
  }

  return err;
}
