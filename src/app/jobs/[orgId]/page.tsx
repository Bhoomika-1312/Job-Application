import { WorkOS } from '@workos-inc/node';
import Jobs from '../../components/Jobs';
import {addOrgAndUserData, JobModel} from "../../../models/Job";
import { withAuth } from '@workos-inc/authkit-nextjs';
type PageProps = {
    params: {
        orgId: string
    }
}

export default async function CompanyJobsPage(props : PageProps) {
    const { orgId } = await props.params;
    const workos = new WorkOS(process.env.WORKOS_API_KEY!);
    const org = await workos.organizations.getOrganization(orgId);
    const { user } = await withAuth();
    let jobDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: orgId})));
    jobDocs = await addOrgAndUserData(jobDocs, user);
    return (
        <div className='px-16'>
            <div className="mx-auto text-xl my-6">
                <h1>{org.name} Jobs</h1>
            </div>
            <Jobs jobs = {jobDocs} header={"Jobs posted by "+org.name}/>
        </div>
    )
}