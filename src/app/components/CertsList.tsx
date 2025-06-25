interface CertsListProps {
  certs: Certification[];
  className?: string;
}

export interface Certification {
  certification: string;
  provider: string;
  wip?: boolean;
}

export default function CertsList({ certs, className = "" }: CertsListProps) {
  return (
    <ul className={`ml-6 mt-4 mb-4 md:ml-6 ${className}`}>
      {certs.map((cert, index) => (
        <li
          key={index}
          className={`mb-1  ${cert.wip ? "text-terminal-text before:content-['-_Studying_for:_'] before:text-terminal-strong before:font-bold" : "before:content-['-_']"}`}
        >
          {cert.certification}
          <span className="text-xs font-bold text-terminal-highlight select-none">
            {" "}
            [ {cert.provider} ]
          </span>
        </li>
      ))}
    </ul>
  );
}
