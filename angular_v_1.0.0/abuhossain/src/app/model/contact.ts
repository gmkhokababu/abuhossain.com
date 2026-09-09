export interface SocialLink {
  platform: string;
  url: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socials: SocialLink[];
}