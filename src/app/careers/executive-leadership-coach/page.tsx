import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const job = {
  title: "Executive Leadership Coach",
  department: "Consulting",
  location: "New York, NY",
  type: "Contract",
  description: "We are looking for an experienced Executive Leadership Coach to work with our C-suite clients. You will provide one-on-one coaching, facilitate leadership workshops, and help executives develop the skills they need to lead effectively in a rapidly changing business landscape.",
  responsibilities: [
    "Deliver tailored one-on-one coaching sessions to executives.",
    "Design and facilitate leadership development workshops.",
    "Assess leadership capabilities and create development plans.",
    "Provide actionable feedback to drive performance improvement."
  ],
  requirements: [
    "10+ years of executive leadership experience.",
    "ICF Certification or equivalent coaching credentials.",
    "Proven experience working with C-suite executives."
  ]
};

export default function ExecCoachPage() {
  return <JobDetail job={job} />;
}

function JobDetail({ job }: { job: typeof job }) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center pt-20 pb-6 md:pb-4">
      <div className="w-full max-w-6xl px-6 py-6 md:py-8">
        <Link href="/careers" className="inline-flex items-center text-sm font-medium text-[#0B1426] hover:text-blue-600 transition-colors mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          <div className="lg:col-span-4 bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]">{job.title}</h1>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <div><p className="text-xs font-semibold text-gray-400">Department</p><p className="text-sm font-medium text-[#0B1426]">{job.department}</p></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div><p className="text-xs font-semibold text-gray-400">Location</p><p className="text-sm font-medium text-[#0B1426]">{job.location}</p></div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div><p className="text-xs font-semibold text-gray-400">Job Type</p><p className="text-sm font-medium text-[#0B1426]">{job.type}</p></div>
                </div>
              </div>
            </div>
            <Link href="/contact" className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#0B1426] hover:bg-[#1a253f] pl-2 pr-7 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.02] shadow-md">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600"><ArrowRight className="h-4 w-4" /></span> Apply Now
            </Link>
          </div>
          <div className="lg:col-span-8 space-y-8">
            <div><h2 className="text-2xl font-bold text-[#0B1426] mb-3">Job Description</h2><p className="text-gray-600 leading-relaxed text-[15px]">{job.description}</p></div>
            <div><h2 className="text-2xl font-bold text-[#0B1426] mb-3">Key Responsibilities</h2>
              <ul className="space-y-2">{job.responsibilities.map((item, idx) => <li key={idx} className="flex items-start gap-3 text-gray-600 text-[15px]"><span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />{item}</li>)}</ul>
            </div>
            <div><h2 className="text-2xl font-bold text-[#0B1426] mb-3">Requirements & Qualifications</h2>
              <ul className="space-y-2">{job.requirements.map((item, idx) => <li key={idx} className="flex items-start gap-3 text-gray-600 text-[15px]"><span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />{item}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}