import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logoIngaz.svg';
import logoIconLightImg from '@public/logoIngaz.svg'
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Ingaz-Admin',
  description: `Ingaz-Admin`,
  logo: logoImg,
  icon: logoIconImg,
  iconLight: logoIconLightImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title}` : siteConfig.title,
    description,
    icons: {
      icon: '/logoIngaz.svg',
      
    },
    openGraph: openGraph ?? {
      title: title ? `${title}` : title,
      description,
      url: 'https://isomorphic-furyroad.vercel.app',
      siteName: 'SaldWich', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'https://s3.amazonaws.com/redqteam.com/isomorphic-furyroad/itemdep/isobanner.png',
        width: 1200,
        height: 630,
      },
      // locale: 'en_US',
      type: 'website',
    },
  };
};
