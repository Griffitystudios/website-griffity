import { JobCard } from "./job-card";
import { jobs } from "@/app/data/jobs-data";

export function JobOpeningsSection() {
  return (
    <section className=" text-white py-16 md:py-24 px-6 md:px-10 mt-20 max-w-screen-3xl mx-auto">
      <div>
        <p className="text-primary text-sm sm:text-base font-semibold tracking-wider uppercase mb-2 sm:mb-5">
          [OPEN JOBS]
        </p>
        <h2 className="text-white mb-32 text-6xl xl:text-7xl font-bold leading-tight ">
          current <span className="text-[#F59E0B]">openings,</span>
        </h2>

        {jobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-2xl md:text-3xl font-semibold mb-4">
              No new openings at the moment.
            </p>
            <p className="text-lg md:text-xl text-gray-400">
              But keep in touch! We're always looking for passionate
              individuals.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
