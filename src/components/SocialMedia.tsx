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
  label: string
};

const socialMedia: SocialMediaType[] = [
  {
    name: "Instagram",
    icon: <FaInstagram className="text-2xl text-yellow-500" />,
    url: "https://www.instagram.com/dj_pablito_dyr_/",
    label: "Instagram button link"
  },
  {
    name: "Youtube",
    icon: <FiYoutube className="text-2xl text-yellow-500" />,
    url: "https://www.youtube.com/@DVJPD",
    label: "Youtube button link"
  },
  {
    name: "Tiktok",
    icon: <FaTiktok className="text-2xl text-yellow-500" />,
    url: "https://www.tiktok.com/@djpablitodyr",
    label: "Tiktok button link"
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="text-2xl text-yellow-500" />,
    url: "https://www.facebook.com/profile.php?id=100083210888590",
    label: "Facebook button link"
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
    return <ul className="flex flex-row items-center lg:gap-1 place-content-center">
      {socialMedia.map((media: SocialMediaType) => (
        <li>
          <a
            className="flex flex-col items-center lg:gap-2 p-2 rounded-lg hover:bg-white/5 text-xl lg:text-2xl text-yellow-500"
            href={media.url}
            target="_blank"
            key={media.name}
            aria-label={media.label}
          >
            {iconComponents[media.name]}
            {namesRequired ? (
              <span className=" text-sm text-gray-400">{media.name}</span>
            ) : (
              ""
            )}
          </a>
        </li>
      ))}
    </ul>;
  }
};

export default SocialMedia;
