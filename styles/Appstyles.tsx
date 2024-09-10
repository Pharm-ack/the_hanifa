// socialMediaStyles.js
import { IconType } from 'react-icons';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

type PlatformStyle = {
  icon: IconType;
  color: string;
  bgColor: string;
};

type SocialMediaStyles = {
  [key: string]: PlatformStyle;
};



export const socialMediaStyles: SocialMediaStyles = {
  Facebook: {
    icon: FaFacebook,
    color: '#fff',
    bgColor: 'blue'
  },
  Twitter: {
    icon: FaTwitter,
    color: '#fff',
    bgColor: 'black'
  },
  Instagram: {
    icon: FaInstagram,
    color: '#fff',
    bgColor: '#fc054c'
  },
  LinkedIn: {
    icon: FaLinkedin,
    color: '#fff',
    bgColor: '#9fdcf5'
  },
  YouTube: {
    icon: FaYoutube,
    color: '#fff',
    bgColor: 'red'
  }
};

