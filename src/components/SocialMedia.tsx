import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

type SocialMediaName =
  | "Instagram"
  | "Youtube"
  | "Tiktok"
  | "Whatsapp"
  | "Facebook";

type SocialMediaType = {
  name: SocialMediaName;
  icon: JSX.Element;
  url: string;
  label: string;
};

const socialMedia: SocialMediaType[] = [
  {
    name: "Instagram",
    icon: <FaInstagram className="text-2xl text-accent" />,
    url: "https://www.instagram.com/dj_pablito_dyr_/",
    label: "Instagram button link",
  },
  {
    name: "Youtube",
    icon: <FiYoutube className="text-2xl text-accent" />,
    url: "https://www.youtube.com/@DVJPD",
    label: "Youtube button link",
  },
  {
    name: "Tiktok",
    icon: <FaTiktok className="text-2xl text-accent" />,
    url: "https://www.tiktok.com/@djpablitodyr",
    label: "Tiktok button link",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="text-2xl text-accent" />,
    url: "https://www.facebook.com/profile.php?id=100083210888590",
    label: "Facebook button link",
  },
];

const iconComponents: Record<SocialMediaName, JSX.Element> = {
  Instagram: <FaInstagram />,
  Youtube: <FiYoutube />,
  Tiktok: <FaTiktok />,
  Whatsapp: <FaWhatsapp />,
  Facebook: <FaFacebook />,
};

const SocialMedia = ({ namesRequired }: { namesRequired: boolean }) => {
  {
    return (
      <ul className="flex flex-row items-center lg:gap-1 place-content-center">
        {socialMedia.map((media: SocialMediaType) => (
          <li key={media.name}>
            <a
              className="flex min-h-11 min-w-11 flex-col items-center justify-center rounded-card p-2 text-xl text-accent hover:bg-white/5 lg:gap-2 lg:text-2xl"
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={media.label}
            >
              {iconComponents[media.name]}
              {namesRequired ? (
                <span className=" text-sm text-muted">{media.name}</span>
              ) : (
                ""
              )}
            </a>
          </li>
        ))}
      </ul>
    );
  }
};

export default SocialMedia;
