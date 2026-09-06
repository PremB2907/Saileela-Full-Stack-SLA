import { Helmet } from 'react-helmet-async';

export default function Seo({ title = 'Saileela Palkhi | Mumbai to Shirdi Sai Palkhi Padyatra', description = 'Saileela Palkhi is a devotional Mumbai to Shirdi Palkhi Padyatra associated with Lalbaug, Mumbai. Explore the Palkhi journey, devotee registration, seva, events and Yatra information.' }) {
  return <Helmet><title>{title}</title><meta name="description" content={description}/><meta property="og:title" content={title}/><meta property="og:description" content={description}/><meta property="og:image" content="/logo.png"/><meta name="twitter:card" content="summary_large_image"/></Helmet>;
}
