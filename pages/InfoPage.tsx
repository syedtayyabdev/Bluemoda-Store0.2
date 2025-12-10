import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const CONTENT: Record<string, { title: string, body: React.ReactNode }> = {
  about: {
    title: "About Us",
    body: (
      <>
        <p className="mb-4">BlueModa is a premium provider of professional swimwear and athletic gear. Founded in 2024, we aim to bring medical-grade precision to sports apparel.</p>
        <p>Our mission is to empower athletes with gear that feels invisible yet performs invincibly.</p>
      </>
    )
  },
  contact: {
    title: "Contact Us",
    body: (
      <>
        <div className="bg-white p-6 rounded-3xl shadow-sm mb-6">
          <h3 className="font-bold mb-2">Customer Support</h3>
          <p className="text-sm text-text-muted mb-4">Need help with an order? Our team is available 24/7.</p>
          <a href="mailto:support@bluemoda.com" className="text-primary font-medium block mb-2">support@bluemoda.com</a>
          <a href="tel:+18005550199" className="text-primary font-medium block">+1 (800) 555-0199</a>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <h3 className="font-bold mb-2">Headquarters</h3>
          <p className="text-sm text-text-muted">123 Ocean Drive, Suite 404<br/>Miami, FL 33139<br/>United States</p>
        </div>
      </>
    )
  },
  'privacy-policy': {
    title: "Privacy Policy",
    body: (
      <>
        <h3 className="font-bold mb-2">1. Data Collection</h3>
        <p className="mb-4 text-sm text-text-muted">We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services.</p>
        <h3 className="font-bold mb-2">2. Data Usage</h3>
        <p className="mb-4 text-sm text-text-muted">We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests.</p>
      </>
    )
  },
  'terms-of-service': {
    title: "Terms of Service",
    body: (
      <>
        <p className="mb-4 text-sm text-text-muted">By accessing this website we assume you accept these terms and conditions. Do not continue to use BlueModa if you do not agree to take all of the terms and conditions stated on this page.</p>
      </>
    )
  },
  'shipping-policy': {
    title: "Shipping Policy",
    body: (
      <>
        <p className="mb-4 text-sm text-text-muted">Orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or holidays.</p>
        <p className="text-sm text-text-muted">If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery.</p>
      </>
    )
  },
  'return-policy': {
    title: "Return Policy",
    body: (
      <>
        <p className="mb-4 text-sm text-text-muted">Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.</p>
        <p className="text-sm text-text-muted">To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
      </>
    )
  }
};

export const InfoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const content = slug && CONTENT[slug] ? CONTENT[slug] : { title: "Page Not Found", body: "Content not available." };

  return (
    <div className="min-h-screen bg-background pb-32">
      <div className="p-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold capitalize">{content.title}</h1>
      </div>

      <div className="px-6 text-text-main leading-relaxed">
        {content.body}
      </div>
    </div>
  );
};
