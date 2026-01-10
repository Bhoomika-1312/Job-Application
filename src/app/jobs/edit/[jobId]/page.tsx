import { JobModel } from "@/src/models/Job";
import mongoose from "mongoose";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/src/app/components/JobForm";

type PageProps = {
    params : {
        jobId : string;
    }
}
export default async function EditPageJob({ params }: PageProps) {
    const { jobId } = await params;
    await mongoose.connect(process.env.MONGODB_URI as string);
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
    if(!jobDoc) {
        return 'Job not found';
    }
    const { user } = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY!);
    if(!user) {
        return 'You must be logged in to edit a job';
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc?.orgId,
    });
    if(oms.data.length === 0) {
        return 'Access denied. You are not a member of this organization';
    }
    return (
        <div>
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc}/>
        </div>
    );
}