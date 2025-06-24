import Link from "next/link";

interface ContactItem {
  label: string;
  value: string;
  showAs: string;
}

interface ContactListProps {
  contacts: ContactItem[];
  className?: string;
}

export default function ContactList({
  contacts,
  className = "",
}: ContactListProps) {
  return (
    <ul className={`ml-6 mt-4 mb-4 md:ml-6 ${className}`}>
      {contacts.map((contact, index) => (
        <li key={index} className="before:content-['-_'] mb-2">
          {/* {contact.label}:{" "} */}
          <Link
            className="text-terminal-link underline  hover:no-underline hover:text-shadow-terminal-link"
            href={contact.value}
            target="_blank"
          >
            {contact.showAs}
          </Link>
        </li>
      ))}
    </ul>
  );
}
