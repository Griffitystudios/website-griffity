"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button"; // Updated import to custom button
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    type: string;
    location: string;
    level: string;
    experience: string;
    education: string;
    responsibilities: string[];
  };
}

export function JobCard({ job }: JobCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 }); // Trigger once when 50% of the element is in view

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-md"
    >
      <Card className=" border border-primary text-white rounded-[40px] p-8 overflow-hidden ">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-4xl font-extralight ">
            {job.title}
          </CardTitle>
          <div className="flex items-center justify-center text-lg font-thin text-gray-400">
            <span>{job.location}</span>
            <span className="mx-2">•</span>
            <span>{job.type}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-300">
          <div className="font-light">
            <h3 className="font-normal text-lg ">About the job</h3>
            <p>Job Level: {job.level}</p>
            <p>Location: {job.location}</p>
            <p>Experience: {job.experience}</p>
            <p>Education: {job.education}</p>
          </div>
          <div>
            <h3 className="font-normal text-lg mb-1">
              Major Responsibilities:
            </h3>
            <ul className="list-disc font-light list-inside space-y-1">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}
            </ul>
          </div>
          {/* Using the custom Button component */}
          <Link href={"#career-form"}>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-body font-bold py-2 px-4 mt-6 rounded">
              apply here
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
