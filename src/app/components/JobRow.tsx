'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Job } from "../../models/Job";
import Timeago from "./TimeAgo";
import Link from "next/link";
import axios from "axios";

export default async function JobRow({jobDoc}: {jobDoc: Job}) {
  return (
    <div className="relative bg-white p-4 mx-4 rounded-lg shadow-sm flex items-center">
      <div className="absolute top-4 right-4"><FontAwesomeIcon className="size-4  text-gray-400" icon={faHeart} /> </div>
      <div className="flex items-center gap-4">
        <img
          className="w-12 h-12"
          src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg"
          alt="Spotify"
        />
        
        <div className="leading-snug">
          <div>
            <Link href={`/jobs/${jobDoc.orgId}`} className="hover:underline text-gray-700">{jobDoc.orgName || '?'}</Link>
          </div>
          <div>
            <Link className="hover:underline font-bold text-l" href={'/show/'+jobDoc._id}>{jobDoc.title}</Link>
          </div>
          <div className="text-gray-400 text-sm capitalize">
             {jobDoc.remote === "yes" ? "Remote" : "On-site"}{' '}&middot;{' '}{jobDoc.country} , {jobDoc.city}{' '}&middot;{' '}{jobDoc.type}-time
             {jobDoc.isAdmin && (
              <>
                {' '}&middot;{' '}
                <Link href={'/jobs/edit/' + jobDoc._id}>Edit</Link>
                {' '}&middot;{' '}
                <button
                type="button"
                onClick={async () => {
                await axios.delete('/api/jobs?id='+jobDoc._id);
                window.location.reload();
                }}>
                Delete</button>
              </>
             )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (IMPORTANT: sibling, not inside left) */}
      {jobDoc.createdAt && (
      <div className="absolute bottom-4 right-4 text-sm text-gray-400 whitespace-nowrap">
        <Timeago createdAt={jobDoc.createdAt} />
      </div>
      )}

    </div>
  );
}
