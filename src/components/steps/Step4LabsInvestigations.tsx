import { FormData } from '@/lib/formSchema';
import { useRef, useState } from 'react';

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    try {
      const formData = new window.FormData();
      formData.append('file', file);
      formData.append('patientName', String(d.name || ''));
      formData.append('mrn', String(d.mrn || ''));
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const res = await fetch(`${apiUrl}/api/drive/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const responseData = await res.json();
      
      if (!res.ok) {
        throw new Error(responseData.error || 'Failed to upload to Google Drive');
      }

      const newDoc = {
        name: file.name,
        url: responseData.webViewLink,
        fileId: responseData.fileId,
      };
      
      const currentDocs = Array.isArray(d.documents) ? d.documents : [];
      onChange('documents', [...currentDocs, newDoc]);
    } catch (err: any) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-grid">
      <Fg id="dateMostRecentLabs" label="Date of Most Recent Labs" required error={e.dateMostRecentLabs}>
        <input id="dateMostRecentLabs" type="date" className={`fi${e.dateMostRecentLabs?' err':''}`}
          max={new Date().toISOString().split('T')[0]}
          value={d.dateMostRecentLabs} onChange={x => onChange('dateMostRecentLabs', x.target.value)} />
      </Fg>

      <Fg id="dateMostRecentColono" label="Date of Most Recent Colonoscopy" error={e.dateMostRecentColono}>
        <input id="dateMostRecentColono" type="date" className="fi"
          max={new Date().toISOString().split('T')[0]}
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

      <div className="span-2 mt-6">
        <h3 className="text-xl font-semibold mb-4 text-slate-800 border-t border-slate-200 pt-6">Documents (Upload / Camera)</h3>
        <div className="bg-slate-50 p-6 rounded-xl border border-dashed border-teal-500/50 text-center">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
            className="hidden" 
            accept="image/*,application/pdf"
            capture="environment"
          />
          <button 
            type="button" 
            onClick={() => fileInputRef.current?.click()}
            className="btn-primary"
            style={{ margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center' }}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Image or PDF'}
          </button>
          
          {d.documents && d.documents.length > 0 && (
            <div className="mt-6 text-left">
              <p className="text-sm font-semibold text-gray-400 mb-2">Attached Documents:</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {d.documents.map((doc: any, i: number) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#1e293b', borderRadius: '8px', fontSize: '14px', color: '#cbd5e1' }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{doc.name}</span>
                    <button 
                      type="button"
                      style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => {
                        const newDocs = [...d.documents];
                        newDocs.splice(i, 1);
                        onChange('documents', newDocs);
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
