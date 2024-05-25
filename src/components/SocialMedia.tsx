import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";

const iconComponents = {
    Instagram: <FaInstagram/>,
    Youtube: <FiYoutube/>,
    Tiktok: <FaTiktok/>,
    Whatsapp: <FaWhatsapp/>,
    Facebook: <FaFacebook/>,
  };


const SocialMedia = ({socialName}:{socialName:string}) => {
    return iconComponents[socialName]
}

export default SocialMedia