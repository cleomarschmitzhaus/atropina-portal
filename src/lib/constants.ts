export const BAND_NAME = 'Atropina';
export const BAND_GENRE = 'Death Metal';
export const BAND_DESCRIPTION = 'Death Metal com nuances de Black Metal';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://atropina.com.br';
export const MUSIC_SCRIPT_URL =
  process.env.NEXT_PUBLIC_MUSIC_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbzhwtdXRtZVIQh1xtgG9NYzzGe7xbZlpVwnLKeh9V_Sdohgk1uVS1gm8ZQ-Cl_n0UBsyQ/exec';

export const GALLERY_SCRIPT_URL =
  process.env.NEXT_PUBLIC_GALLERY_SCRIPT_URL ||
  'https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnSE3CKWZsr3WceVHCpWrOwW-Sv11mg05bs4NyAYw6sRqz6Xq58-8ZbRhppLjEoW6g603CUT07uPtCnDUHDvWHUQBslX4b6HIRQhP4-ecwKKlgYKrIpQFxD9OTUPAKt7a_zPZlF0hqMTzSqVI_3QD-E9ZT9X6HC4tpUNYohTgAC3H3F9yKz9erq_k3mjoAvtbExycRFOHMQQyaRYoop-MsD8fDRXzwwjzk2Bg_5vtw2KIIYOzQBn0N1BCJrQp6YK0qhxX-VVJjPQ6jTohc8eqVEgW-iKsw&lib=Mpl-8RFm9o06wAVCtsTr2tCtfeZesi9Pz';

export const FALLBACK_BACKGROUNDS = [
  '/backgrounds/DSC_4718.JPG',
  '/backgrounds/DSC_5018.JPG',
  '/backgrounds/DSC_5027.JPG',
  '/backgrounds/DSC_5028.JPG',
  '/backgrounds/DSC_5037.JPG',
  '/backgrounds/DSC_5047.JPG',
  '/backgrounds/DSC_5132.JPG',
  '/backgrounds/DSC_5155.JPG',
];

export const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@AtropinaDeathMetal',
  instagram: 'https://www.instagram.com/atropina_deathmetal/',
  facebook: 'https://www.facebook.com/atropinametal',
  spotify: 'https://open.spotify.com/intl-pt/artist/0qGHuO9Q7nvPNmtjuDZb8v',
  merch: 'https://www.instagram.com/ladobstore_tt/',
} as const;

export const NAV_LINKS = [
  { label: 'Início', href: '/' },
  { label: 'História', href: '/historia' },
  { label: 'Música', href: '/musica' },
  { label: 'Galeria', href: '/galeria' },
] as const;

export const PLATFORM_LINKS = [
  {
    name: 'Spotify',
    url: 'https://open.spotify.com/intl-pt/artist/0qGHuO9Q7nvPNmtjuDZb8v',
    icon: 'spotify',
  },
  {
    name: 'YouTube Music',
    url: 'https://www.youtube.com/@AtropinaDeathMetal',
    icon: 'youtube',
  },
] as const;

export const SAMPLE_TRACKS: { id: string; title: string; artist: string; src: string }[] = [];

export const BAND_MEMBERS = [
  { name: 'Murillo "Ogro" Rocha', role: 'Vocal' },
  { name: 'Alex Alves', role: 'Guitarra' },
  { name: 'Fernando Müller', role: 'Guitarra' },
  { name: 'Cleomar Schmitzhaus', role: 'Baixo' },
  { name: 'Jonas Jacobs', role: 'Bateria' },
];

export const DISCOGRAPHY = [
  {
    title: 'Prego em Carne Podre',
    type: 'Full-length',
    year: '2021',
  },
  {
    title: 'Delirios Assombrados',
    type: 'Single',
    year: '2021',
  },
  {
    title: 'Blasfêmia Eterna',
    type: 'Single',
    year: '2020',
  },
  {
    title: 'Porões das Luxúrias',
    type: 'Full-length',
    year: '2016',
  },
  {
    title: 'Mallevs Maleficarvm',
    type: 'Full-length',
    year: '2014',
  },
  {
    title: 'Santos de Porcelana',
    type: 'Full-length',
    year: '2001',
  },
  {
    title: 'Louvar a Tudo por Nada',
    type: 'Demo',
    year: '1998',
  },
  {
    title: '...in Perpetual Tempest Occult / Louvar a Tudo por Nada',
    type: 'Split',
    year: '1998',
  },
];
