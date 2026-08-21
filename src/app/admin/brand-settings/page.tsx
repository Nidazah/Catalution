"use client";

import { useEffect, useState } from "react";

type Theme = {
  primaryColor:string; secondaryColor:string; accentColor:string; accentSoftColor:string;
  backgroundColor:string; sectionColor:string; headingColor:string; bodyColor:string; lineColor:string;
  headingFont:string; bodyFont:string; headingWeight:string; bodyWeight:string; baseFontSize:number; headingScale:number; bodyLineHeight:number; radius:number; containerWidth:number; sectionGap:number; buttonRadius:number; buttonPaddingX:number; buttonPaddingY:number; buttonPrimaryBg:string; buttonPrimaryText:string; buttonSecondaryBg:string; buttonSecondaryText:string;
};

const defaults:Theme={primaryColor:"#481d96",secondaryColor:"#6d28d9",accentColor:"#ff6800",accentSoftColor:"#ffb164",backgroundColor:"#ffffff",sectionColor:"#f8f5ff",headingColor:"#1e1233",bodyColor:"#6b7280",lineColor:"#e7def7",headingFont:"Poppins",bodyFont:"Inter",headingWeight:"700",bodyWeight:"400",baseFontSize:16,headingScale:1,bodyLineHeight:1.6,radius:12,containerWidth:1280,sectionGap:0,buttonRadius:12,buttonPaddingX:24,buttonPaddingY:12,buttonPrimaryBg:"#481d96",buttonPrimaryText:"#ffffff",buttonSecondaryBg:"#ff6800",buttonSecondaryText:"#ffffff"};

export default function BrandSettingsPage(){
 const [theme,setTheme]=useState(defaults); const [saving,setSaving]=useState(false); const [message,setMessage]=useState("");
 useEffect(()=>{fetch("/api/site-settings?key=THEME",{cache:"no-store"}).then(r=>r.json()).then(p=>p?.data&&setTheme({...defaults,...p.data})).catch(()=>setMessage("Could not load theme settings."))},[]);
 async function save(){setSaving(true);setMessage("");const r=await fetch("/api/site-settings",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({key:"THEME",data:theme})});const d=await r.json();setSaving(false);setMessage(r.ok?"Theme saved. Refresh the public site to see changes.":d.error||"Could not save theme.");}
 const colorFields=[["primaryColor","Primary color"],["secondaryColor","Secondary color"],["accentColor","Accent color"],["accentSoftColor","Accent soft color"],["backgroundColor","Background color"],["sectionColor","Section background"],["headingColor","Heading color"],["bodyColor","Body color"],["lineColor","Border/line color"]] as const;
 return <div className="space-y-5 text-[12.5px]">
  <div><p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">Design Tokens</p><h1 className="mt-1 text-[16px] font-bold text-[#24133f]">Theme Settings</h1><p className="mt-1.5 text-[11.5px] text-[#7b8190]">Change global colors, font family, font weight and base sizing without changing the existing Catalution layout.</p></div>
  <div className="rounded-xl border border-[#ece6f7] bg-white p-5"><h2 className="font-bold text-[#24133f]">Colors</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{colorFields.map(([key,label])=><label key={key} className="block"><span className="mb-1 block text-[10px] font-semibold text-[#24133f]">{label}</span><div className="flex gap-2"><input type="color" value={theme[key]} onChange={e=>setTheme({...theme,[key]:e.target.value})} className="h-9 w-12 rounded border"/><input value={theme[key]} onChange={e=>setTheme({...theme,[key]:e.target.value})} className="min-w-0 flex-1 rounded-lg border border-[#ddd5ed] px-3 text-[12px]"/></div></label>)}</div></div>
  <div className="rounded-xl border border-[#ece6f7] bg-white p-5"><h2 className="font-bold text-[#24133f]">Typography</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   <Select label="Heading font" value={theme.headingFont} options={["Poppins","Inter","Roboto","Open Sans","Lato","Montserrat","Nunito","Raleway","Merriweather","Arial","Helvetica","Georgia","system-ui"]} onChange={v=>setTheme({...theme,headingFont:v})}/>
   <Select label="Body font" value={theme.bodyFont} options={["Inter","Poppins","Roboto","Open Sans","Lato","Montserrat","Nunito","Raleway","Merriweather","Arial","Helvetica","Georgia","system-ui"]} onChange={v=>setTheme({...theme,bodyFont:v})}/>
   <Select label="Heading weight" value={theme.headingWeight} options={["400","500","600","700","800"]} onChange={v=>setTheme({...theme,headingWeight:v})}/>
   <Select label="Body weight" value={theme.bodyWeight} options={["300","400","500","600","700"]} onChange={v=>setTheme({...theme,bodyWeight:v})}/>
   <NumberField label="Base font size (px)" value={theme.baseFontSize} onChange={v=>setTheme({...theme,baseFontSize:v})}/>
   <NumberField label="Heading scale" value={theme.headingScale} step={0.05} onChange={v=>setTheme({...theme,headingScale:v})}/>
   <NumberField label="Body line height" value={theme.bodyLineHeight} step={0.1} onChange={v=>setTheme({...theme,bodyLineHeight:v})}/>
  </div></div>
  <div className="rounded-xl border border-[#ece6f7] bg-white p-5"><h2 className="font-bold text-[#24133f]">Global Layout & Buttons</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
   <NumberField label="Container width (px)" value={theme.containerWidth} onChange={v=>setTheme({...theme,containerWidth:v})}/>
   <NumberField label="Default section gap (px)" value={theme.sectionGap} onChange={v=>setTheme({...theme,sectionGap:v})}/>
   <NumberField label="Global radius (px)" value={theme.radius} onChange={v=>setTheme({...theme,radius:v})}/>
   <NumberField label="Button radius (px)" value={theme.buttonRadius} onChange={v=>setTheme({...theme,buttonRadius:v})}/>
   <NumberField label="Button horizontal padding" value={theme.buttonPaddingX} onChange={v=>setTheme({...theme,buttonPaddingX:v})}/>
   <NumberField label="Button vertical padding" value={theme.buttonPaddingY} onChange={v=>setTheme({...theme,buttonPaddingY:v})}/>
   <Color label="Primary button background" value={theme.buttonPrimaryBg} onChange={v=>setTheme({...theme,buttonPrimaryBg:v})}/>
   <Color label="Primary button text" value={theme.buttonPrimaryText} onChange={v=>setTheme({...theme,buttonPrimaryText:v})}/>
   <Color label="Secondary button background" value={theme.buttonSecondaryBg} onChange={v=>setTheme({...theme,buttonSecondaryBg:v})}/>
   <Color label="Secondary button text" value={theme.buttonSecondaryText} onChange={v=>setTheme({...theme,buttonSecondaryText:v})}/>
  </div></div>
  <div className="flex items-center justify-between"><span className="text-[11px] text-[#2f8f46]">{message}</span><button onClick={save} disabled={saving} className="rounded-lg bg-[#481d96] px-4 py-2 text-[11.5px] font-semibold text-white">{saving?"Saving...":"Save Theme"}</button></div>
 </div>
}
function Select({label,value,options,onChange}:{label:string;value:string;options:string[];onChange:(v:string)=>void}){return <label><span className="mb-1 block text-[10px] font-semibold text-[#24133f]">{label}</span><select value={value} onChange={e=>onChange(e.target.value)} className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[12px]">{options.map(x=><option key={x}>{x}</option>)}</select></label>}
function Color({label,value,onChange}:{label:string;value:string;onChange:(v:string)=>void}){const safe=value||"#ffffff";return <label><span className="mb-1 block text-[10px] font-semibold text-[#24133f]">{label}</span><div className="flex gap-2"><input type="color" value={safe} onChange={e=>onChange(e.target.value)} className="h-9 w-12 rounded border"/><input value={safe} onChange={e=>onChange(e.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#ddd5ed] px-3 py-2 text-[12px]"/></div></label>}
function NumberField({label,value,onChange,step=1}:{label:string;value:number;onChange:(v:number)=>void;step?:number}){return <label><span className="mb-1 block text-[10px] font-semibold text-[#24133f]">{label}</span><input type="number" step={step} value={value} onChange={e=>onChange(Number(e.target.value))} className="w-full rounded-lg border border-[#ddd5ed] px-3 py-2 text-[12px]"/></label>}
