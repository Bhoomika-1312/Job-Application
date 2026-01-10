import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import mongoose from "mongoose";
import {addOrgAndUserData, JobModel} from "../models/Job";
// import { Job } from "../../models/Job";
import Link from 'next/link';
import { getSignInUrl, getSignUpUrl, withAuth } from '@workos-inc/authkit-nextjs';

export default async function Home() {
  const { user } = await withAuth();
  await mongoose.connect(process.env.MONGODB_URI as string);
  const latestJobs = await addOrgAndUserData(
    await JobModel.find({},{},{limit: 5,sort:'-createdAt'}),
    user,
  );

    return (
    <div> 
      <Hero/>
      <div className="px-9">
      <Jobs header={''} jobs={latestJobs} />
      </div>
    </div>
  );
}
