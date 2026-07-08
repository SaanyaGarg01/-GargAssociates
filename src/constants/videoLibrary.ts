export interface VideoScene {
  id: number;
  title: string;
  description: string;
  localUrl: string;
  fallbackUrl: string;
  category: 'exterior' | 'interior' | 'people' | 'symbols';
}

export const CINEMATIC_LIBRARY: VideoScene[] = [
  {
    id: 1,
    title: 'Prestige Courthouse Approach',
    description: 'Cinematic drone shot approaching a magnificent modern courthouse with glass facades and warm golden sunrise lighting.',
    localUrl: '/videos/courthouse.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    category: 'exterior'
  },
  {
    id: 2,
    title: 'Executive Partner Office',
    description: 'Luxurious law office with premium walnut furniture, shelves of legal volumes, and panoramic windows overlooking the city skyline.',
    localUrl: '/videos/office.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    category: 'interior'
  },
  {
    id: 3,
    title: 'Bespoke Client Consultation',
    description: 'Sophisticated case discussion inside a premium conference room, highlighting reassuring gestures and confident body language.',
    localUrl: '/videos/consultation.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    category: 'people'
  },
  {
    id: 4,
    title: 'The Handshake of Trust',
    description: 'Slow-motion close up of a professional handshake between a senior counsel and a client inside a luxury conference room.',
    localUrl: '/videos/handshake.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    category: 'people'
  },
  {
    id: 5,
    title: 'Great Law Library',
    description: 'Floating camera movement through aisles of gold-embossed leather law volumes on high-quality walnut shelving.',
    localUrl: '/videos/library.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    category: 'interior'
  },
  {
    id: 6,
    title: 'Themis Statue Detail',
    description: 'Museum-quality statue of Lady Justice (Justitia) standing tall with her sword and scales inside a premium marble hall.',
    localUrl: '/videos/justice.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    category: 'symbols'
  },
  {
    id: 7,
    title: 'Supreme Court Chamber',
    description: 'Slow sweep of an empty, high-prestige courtroom featuring warm dramatic lighting and premium wood panelling.',
    localUrl: '/videos/courtroom.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    category: 'interior'
  },
  {
    id: 8,
    title: 'Headquarters Blue Hour',
    description: 'Stunning architectural perspective of the modern glass headquarters of Garg Associates during twilight.',
    localUrl: '/videos/headquarters.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    category: 'exterior'
  },
  {
    id: 9,
    title: 'Boardroom Advisory Session',
    description: 'Experienced legal partners collaborating around a walnut conference table under warm designer lighting.',
    localUrl: '/videos/strategy.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    category: 'people'
  },
  {
    id: 10,
    title: 'Corporate Legal Meeting',
    description: 'Legal team consulting on documentation and strategies in a bright, modern glass office.',
    localUrl: '/videos/meeting.mp4',
    fallbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    category: 'people'
  }
];
