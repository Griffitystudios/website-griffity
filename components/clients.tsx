"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Client = () => {
  const pairedClients = [
    { name: "ncell", text: "NCELL" },
    { name: "prvu", text: "PRABHU BANK" },
    { name: "veda", text: "VEDA STUDIOS" },
    { name: "aitc", text: "AITC" },
    { name: "eureka", text: "EUREKA" },
    { name: "hult", text: "HULT PRIZE" },
    { name: "cafe", text: "CAFE BOH" },
    { name: "maha", text: "MAHAK MAHA" },
    { name: "gurukul", text: "GURUKUL ACADEMY" },
    { name: "opera", text: "OPERA ENGINEERING CONSULTANCY" },
    { name: "bambusa", text: "BAMBUSA" },
    { name: "majestic", text: "MAJESTIC GROUP" },
    { name: "sukoon", text: "SUKOON" },
    { name: "nepakids", text: "NEPAKIDS" },
  ];

  const singleClients = [
    { name: "nepal", text: "OFFICE OF PRIME MINISTER & COUNCIL OF MINISTERS" },
    { name: "ntc", text: "NEPAL TELECOM" },
    { name: "acem", text: "ADVANCED COLLEGE OF ENGINEERING & MANAGEMENT" },
    { name: "rjn", text: "REMOTE JOB NEPAL" },
    { name: "techbehemoths", text: "TECH BEHEMOTHS" },
    { name: "bstax", text: "BS TAX ACCOUNTANTS" },
  ];

  interface PairedClient {
    name: string;
    text: string;
  }

  interface SingleClient {
    name: string;
  }

  const pairedGroups: PairedClient[][] = [];
  for (let i = 0; i < pairedClients.length; i += 2) {
    pairedGroups.push(pairedClients.slice(i, i + 2));
  }

  const maxLength = Math.max(pairedGroups.length, singleClients.length);

  return (
    <section
      id="clients"
      aria-label="Trusted Clients Logos"
      className="relative w-full mt-52 z-10 "
    >
      <div className="max-w-screen-3xl mt-52 w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 py-6 sm:py-8 md:py-10 flex flex-col gap-40">
        {Array.from({ length: maxLength }).map((_, idx) => (
          <div key={idx}>
            {pairedGroups[idx] && (
              <div className="flex flex-col sm:flex-row justify-between gap-10">
                {pairedGroups[idx].map((client, i) => (
                  <div
                    key={i}
                    className={`flex flex-col 
                    ${i === 0 ? "sm:items-start" : ""}
                    ${i % 2 !== 0 ? "items-end" : ""}
                  `}
                  >
                    <div className="w-[150px] xs:w-[200px] md:w-[250px]  lg:w-[336px]  aspect-[336/382] border border-primary flex items-center justify-center p-[10%] sm:p-14 ">
                      <Image
                        width={336}
                        height={382}
                        src={`/images/clientLogo/${client.name}.svg`}
                        alt={`${client.text} Logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <p className="p-base font-semibold text-primary mt-3">
                      {client.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {singleClients[idx] && (
              <div className="flex flex-col items-center mb-32 translate-y-32">
                <div className="flex flex-col  w-[150px] xs:w-[200px] md:w-[250px]  lg:w-[336px] ">
                  <div className="flex items-center justify-center  p-[10%] w-[150px] xs:w-[200px] md:w-[250px]  lg:w-[336px]  aspect-[336/382]  border border-primary ">
                    <Image
                      width={336}
                      height={382}
                      src={`/images/clientLogo/${singleClients[idx].name}.svg`}
                      alt={`${singleClients[idx].text} Logo`}
                      className="max-h-full max-w-full object-contain z-10"
                    />
                  </div>
                  <p className="p-base font-semibold text-primary mt-3 text-left">
                    {singleClients[idx].text}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Client;
