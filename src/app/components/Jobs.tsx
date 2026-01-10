import JobRow from './JobRow';
import type { Job } from "../../models/Job";

export default async function Jobs({header,jobs}: {header: string,jobs:Job[]}) {
  return (
    <div className='bg-slate-200 py-6 rounded-2xl'>
      <div className='container'>
        <h2 className='font-bold mb-4 mx-3'> {header || "Recent Jobs"} </h2>
        <div className='flex flex-col gap-4'>
          {!jobs?.length && (
            <div className='px-6'>No jobs found.</div>
          )}

          {jobs && jobs.map(job => (
            <JobRow jobDoc={job}/>
          ))}
        </div>
      </div>
    </div>
  )
}
