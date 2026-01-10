import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { createCompany } from "../actions/workosActions";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function NewListingPage() { 
    const { user } = await withAuth();
    async function handleNewCompanyFormSubmit(data : FormData) {
    'use server';
        if(user) {
            await createCompany(data.get('newCompanyName') as string, user.id);
        }
    }

    if(!user) {
        'Login to create a new company';
    }
    return (
        <div className="px-18">
            <h2 className="text-lg mt-7">Create a new Company</h2>
            <p className="text-gray-500 text-sm mb-2">
            To create a job listing you first need to create a company.
            </p>
            <form action={handleNewCompanyFormSubmit}
            className="flex gap-2 ">
            <input
                name="newCompanyName"
                placeholder="company name"
                type="text"
                className="p-2 border border-gray-400 rounded-md"
            />
            <button type="submit" className="flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md">
                Create Company 
            <FontAwesomeIcon className="h-6" icon={faArrowRight} />
            </button>
            </form>
        </div>
    )
} 