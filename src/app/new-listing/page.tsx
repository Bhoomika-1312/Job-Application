'use server';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { WorkOS } from "@workos-inc/node";
import { createCompany } from "../actions/workosActions";
import Link from "next/link";

export default async function NewListingPage() {
  
  const { user } = await withAuth();
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  if (!user) {
    return (
        <div className="px-18">
            <h2 className="text-lg ">You must be logged in to create a new listing</h2>
        </div>
    )
  }
  const organizationMember = await workos.userManagement.listOrganizationMemberships({
    userId: user.id,
  })
  const activeMEmberShips = organizationMember.data.filter((membership) => membership.status === 'active');
  const organisationNames:{[key:string]: string} = {};
  for (const membership of activeMEmberShips) {
    const organization = await workos.organizations.getOrganization(membership.organizationId);
    organisationNames[membership.organizationId] = organization.name;
  }

  return (
    <div className="px-18">
      <div>
        <h2 className="text-lg ">Your companies</h2>
        <p className="text-gray-500 text-sm mb-2">Select a company </p>
        <div>
            <div className="border rounded-md inline-block">
            {Object.keys(organisationNames).map((organizationId) => (
                <Link key={organizationId} href={`/new-listing/${organizationId}`} className={"px-4 py-2 flex gap-2 items-center" 
                + (organizationId !== Object.keys(organisationNames)[0] ? " border-t" : "")}>
                    {organisationNames[organizationId]}
                    <FontAwesomeIcon className="h-4" icon={faArrowRight} />
                </Link>
            ))}
            </div>
        </div>
        {organizationMember.data.length === 0 && (
        <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
          No companies found assigned to your user.
        </div>
        )}
        <Link href={"/new-company"} className="bg-gray-200 px-4 py-2 rounded-md mt-6 flex gap-2 items-center">
          Create a new Company 
            <FontAwesomeIcon className="h-4" icon={faArrowRight} />
        </Link>
      </div>
    </div>
  );
}
