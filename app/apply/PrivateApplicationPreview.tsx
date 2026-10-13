'use client';
import {useState} from 'react';
import Link from 'next/link';

type Pathway = 'women' | 'gentlemen';
export default function PrivateApplicationPreview({pathway}:{pathway:Pathway}){
 const isWoman=pathway==='women';
 const [stage,setStage]=useState(0);
 const [values,setValues]=useState<Record<string,string>>({});
 const update=(name:string,value:string)=>setValues(v=>({...v,[name]:value}));
 const sections=[
  {name:'Personal Introduction',subtitle:'Tell us who you are beyond a title.',fields:[['full_name','Full name','text'],['email','Email address','email'],['city','City and country of residence','text'],['age_confirmation','I confirm that I am at least 18 years old','select']]},
  {name:'Character & Values',subtitle:'The foundations of a meaningful connection.',fields:[['core_values','Which values guide your life?','textarea'],['life_outlook','What gives your life purpose beyond your professional accomplishments?','textarea'],['relationship_intention','What kind of long-term partnership are you seeking?','textarea']]},
  {name:'Background & Perspective',subtitle:'A thoughtful introduction to your world.',fields:[['profession','Professional field or vocation','text'],['background','Share a brief professional or personal introduction.','textarea'],['location_flexibility','Are you open to meeting someone outside your city or country?','select']]},
  {name:'Membership Consideration',subtitle:'A final reflection before the private review.',fields:[['why_join','Why does The Sovereign Circle appeal to you?','textarea'],['approach','What would make a considered introduction meaningful to you?','textarea'],['membership_acknowledgment','I understand that membership is selective and paid, and fees and terms are disclosed before any payment.','select']]}
 ];
 const section=sections[stage];
 return <><header className="nav invitation-nav"><Link className="brand" href="/">♛ THE SOVEREIGN CIRCLE ™</Link><Link href="/">RETURN HOME →</Link></header>
 <main className="application-page"><div className="application-shell">
 <div className="eyebrow">THE SOVEREIGN CIRCLE · FOUNDING MEMBERSHIP</div>
 <h1>{isWoman?'The Distinguished Woman':'The Distinguished Gentleman'}</h1>
 <p className="application-subtitle">A private introduction begins with intention.</p>
 <div className="application-notice" role="status"><strong>Application experience preview — admissions are not open.</strong><p>This is a design preview only. Information entered here is not submitted or saved to our servers. Please do not enter real personal information, identity documents, or confidential details.</p></div>
 <div className="application-progress" aria-label={`Step ${stage+1} of 4`}>{sections.map((s,i)=><span key={s.name} className={i<=stage?'active':''}/>)}</div>
 <div className="application-step-label">STEP {String(stage+1).padStart(2,'0')} OF 04</div>
 <h2>{section.name}</h2><p className="application-description">{section.subtitle}</p>
 <form onSubmit={e=>e.preventDefault()} className="application-fields">
 {section.fields.map(([name,label,type])=><label key={name}>{label}
 {type==='textarea'?<textarea rows={4} maxLength={800} value={values[name]||''} onChange={e=>update(name,e.target.value)} placeholder="Preview only — please do not enter real information"/>:type==='select'?<select value={values[name]||''} onChange={e=>update(name,e.target.value)}><option value="">Select an option</option>{(name==='location_flexibility'?['Yes','No','Open to discussion']:['Yes','No']).map(v=><option key={v} value={v}>{v}</option>)}</select>:<input type={type} maxLength={150} value={values[name]||''} onChange={e=>update(name,e.target.value)} placeholder="Preview only"/>}
 </label>)}
 </form>
 <div className="application-actions">{stage>0?<button type="button" className="application-back" onClick={()=>setStage(s=>s-1)}>← PREVIOUS</button>:<span/>}{stage<3?<button type="button" onClick={()=>setStage(s=>s+1)}>CONTINUE →</button>:<button type="button" disabled title="Admissions are not open">SUBMISSION COMING SOON</button>}</div>
 <p className="application-footnote">All applicants will be reviewed individually. Application does not guarantee admission, introductions, or a relationship outcome. No fees are collected at this stage.</p>
 </div></main><footer>© {new Date().getFullYear()} The Sovereign Circle™ · A Course Correction of Life™ · Pre-launch development</footer></>;
}
