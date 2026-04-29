import { FormData } from '@/lib/formSchema';

interface Props { formData: FormData; onChange: (f: string, v: any) => void; errors: Record<string,string>; }

const Fg = ({ id, label, required, error, hint, children }: { id:string;label:string;required?:boolean;error?:string;hint?:string;children:React.ReactNode }) => (
  <div className="fg">
    <label htmlFor={id}>{label}{required && <span className="req">*</span>}</label>
    {children}
    {hint && <span className="field-hint">{hint}</span>}
    {error && <span className="ferr">{error}</span>}
  </div>
);

export default function Step4LabsInvestigations({ formData: d, onChange, errors: e }: Props) {
  return (
    <div className="form-grid">
      <Fg id="dateMostRecentLabs" label="Date of Most Recent Labs" required error={e.dateMostRecentLabs}>
        <input id="dateMostRecentLabs" type="date" className={`fi${e.dateMostRecentLabs?' err':''}`}
          value={d.dateMostRecentLabs} onChange={x => onChange('dateMostRecentLabs', x.target.value)} />
      </Fg>

      <Fg id="dateMostRecentColono" label="Date of Most Recent Colonoscopy" error={e.dateMostRecentColono}>
        <input id="dateMostRecentColono" type="date" className="fi"
          value={d.dateMostRecentColono} onChange={x => onChange('dateMostRecentColono', x.target.value)} />
      </Fg>

      <div className="span-2">
        <Fg id="recentLabValues" label="Recent Lab Values" required error={e.recentLabValues}
          hint="Include: Hb, TLC, Platelets, CRP, Albumin, ESR, SGOT, SGPT, Bilirubin, Creatinine">
          <textarea id="recentLabValues" className={`fi${e.recentLabValues?' err':''}`}
            value={d.recentLabValues} onChange={x => onChange('recentLabValues', x.target.value)}
            placeholder="e.g. Hb 10.2, TLC 8400, Platelets 320k, CRP 18, Albumin 3.2, ESR 45…"
            style={{ minHeight: 96 }} />
        </Fg>
      </div>

      <div className="span-2">
        <Fg id="colonoscopyFindings" label="Colonoscopy Findings" error={e.colonoscopyFindings}>
          <textarea id="colonoscopyFindings" className="fi"
            value={d.colonoscopyFindings} onChange={x => onChange('colonoscopyFindings', x.target.value)}
            placeholder="Describe findings, extent of disease, Mayo/SES-CD score…" />
        </Fg>
      </div>

      <div className="span-2">
        <Fg id="recentImaging" label="Recent Imaging" error={e.recentImaging}>
          <textarea id="recentImaging" className="fi"
            value={d.recentImaging} onChange={x => onChange('recentImaging', x.target.value)}
            placeholder="e.g. MRE — transmural healing. CT Abdomen — no stricture." />
        </Fg>
      </div>

      <div className="span-2">
        <Fg id="mostRecentDexa" label="Most Recent DEXA Scan" error={e.mostRecentDexa}>
          <input id="mostRecentDexa" type="text" className="fi"
            value={d.mostRecentDexa} onChange={x => onChange('mostRecentDexa', x.target.value)}
            placeholder="e.g. T-score spine -1.8 (2023) or 'Not done'" />
        </Fg>
      </div>
    </div>
  );
}
