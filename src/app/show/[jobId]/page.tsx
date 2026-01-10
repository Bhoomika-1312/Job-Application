import {JobModel} from "../../../models/Job"
import mongoose from "mongoose";
import Image from "next/image";

type PageProps = {
  params: Promise<{
    jobId: string;
  }>;
};


export default async function SingleJobPage({params}:PageProps) {
  const {jobId} = await params;
  await mongoose.connect(process.env.MONGODB_URI as string);
  const jobDoc = await JobModel.findById(jobId);
  return (
    <div className= "mx-16 mt-8 my-6">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-4xl mb-2">{jobDoc.title}</h1>
          <div className="capitalize text-sm text-blue-800 mb-4">
            {jobDoc.remote}
            {' '}&middot;{' '}
            {jobDoc.city}, {jobDoc.country}
            {' '}&middot;{' '}
            {jobDoc.type}-time
          </div>
        </div>
      </div>
      <div className="whitespace-pre-line text-sm text-gray-600">
        {jobDoc.description}
      </div>
      <div className="mt-4 bg-gray-200 p-8 rounded-lg">
        <h3 className="font-bold mb-2">Apply by contacting us</h3>
        <div className="flex gap-4">
          
          <div className="flex content-center items-center">
            {jobDoc.contactName}<br />
            Email: {jobDoc.contactEmail}<br />
            Phone: {jobDoc.contactPhone}
          </div>
        </div>
      </div>
    </div>
  );
}