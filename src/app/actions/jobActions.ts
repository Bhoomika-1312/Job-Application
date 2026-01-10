'use server'
import { JobModel } from "@/src/models/Job";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function saveJobAction(data : FormData) {
    mongoose.connect(process.env.MONGODB_URI as string);
    const {id,...jobData} = Object.fromEntries(data);
    const jobDoc = id 
    ? await JobModel.findByIdAndUpdate(id, jobData) 
    : await JobModel.create(jobData);
    if('orgId' in data) {
        revalidatePath('/jobs/' + jobData?.orgId);
    }
    return JSON.parse(JSON.stringify(jobDoc));
}
