import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

type SocialMediaName = 'Instagram' | 'Youtube' | 'Tiktok' | 'Whatsapp' | 'Facebook';

const iconComponents: Record<SocialMediaName, JSX.Element> = {
    Instagram: <FaInstagram/>,
    Youtube: <FiYoutube/>,
    Tiktok: <FaTiktok/>,
    Whatsapp: <FaWhatsapp/>,
    Facebook: <FaFacebook/>,
  };


const SocialMedia = ({socialName}:{socialName:SocialMediaName}) => {
    return iconComponents[socialName]
}

export default SocialMedia