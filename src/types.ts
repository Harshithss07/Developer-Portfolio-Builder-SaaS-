/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  avatarUrl?: string;
  bio?: string;
}

export type ThemeType = 'cyberpunk' | 'minimal' | 'glassmorphism' | 'retro' | 'nothing';

export interface ThemeConfig {
  type: ThemeType;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  textColorMuted: string;
  accentColor: string;
  accentGlowColor: string;
  borderColor: string;
  fontFamily: string;
  borderRadius: string;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  badgeText: string;
  callToActionText: string;
  avatarUrl: string;
}

export interface AboutSection {
  bio: string;
  expandedBio: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  portfolioUrl?: string;
}

export interface Skill {
  name: string;
  level: number; // 0 - 100
  category: string; // Frontend, Backend, AI / Data, Other
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  url?: string;
  githubUrl?: string;
  image?: string;
  stars?: number;
  language?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
}

export interface PortfolioData {
  id: string;
  userId: string;
  username: string;
  isPublished: boolean;
  themeConfig: ThemeConfig;
  hero: HeroSection;
  about: AboutSection;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  contact: ContactInfo;
}

export interface CountryAnalytic {
  country: string;
  count: number;
}

export interface DeviceAnalytic {
  device: 'desktop' | 'tablet' | 'mobile';
  count: number;
}

export interface AnalyticsStats {
  totalViews: number;
  resumeDownloads: number;
  devices: DeviceAnalytic[];
  countries: CountryAnalytic[];
  monthlyViews: { month: string; views: number }[];
}
