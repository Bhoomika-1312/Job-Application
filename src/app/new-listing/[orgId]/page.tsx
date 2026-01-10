import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import "@radix-ui/themes/styles.css";
import "react-country-state-city/dist/react-country-state-city.css";
import JobForm from "../../components/JobForm";


type PageProps = {
    params : {
        orgId : string;
    }
};

export default async function NewListingPage(props : PageProps) {
    const { user } = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if(!user) return 'Please log in to create a new job listing';
    const params = await props.params;
    const orgId = params.orgId;
    const oms = await workos.userManagement.listOrganizationMemberships({userId: user.id});
    const hasAccess = oms.data.length > 0;
    if(!hasAccess) return 'You do not have access to create a job listing for this organization';
    return (
       <JobForm orgId={orgId} />
    );
}     
