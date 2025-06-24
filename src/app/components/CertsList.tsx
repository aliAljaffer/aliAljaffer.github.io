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
          className={`mb-1  ${cert.wip ? "text-terminal-text before:content-['-_Studying_for:_'] before:text-terminal-highlight" : "before:content-['-_']"}`}
        >
          {cert.wip ? cert.provider + " " : ""}
          {cert.certification}
        </li>
      ))}
    </ul>
  );
}
