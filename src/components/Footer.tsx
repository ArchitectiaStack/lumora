import { useState, FormEvent } from "react";
import { Mail, ArrowRight, Instagram, Facebook, Pin, Smile, Award, Heart, HelpCircle, Leaf } from "lucide-react";

interface FooterProps {
  onShowToast: (message: string, type: "success" | "info") => void;
}

export default function Footer({ onShowToast }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      onShowToast("Please enter a valid email address.", "info");
      return;
    }

    setIsSubscribed(true);
    onShowToast("Welcome to the Lumora Circle! Your 10% discount code is WELCOME10.", "success");
    setEmail("");
  };

  return (
    <footer id="footer-section" className="bg-alabaster text-charcoal font-sans pt-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* NEWSLETTER STRIP (Dusty Rose / Blush pink Background, Pill shape) */}
        <div className="bg-dusty-rose rounded-[2.5rem] p-8 sm:p-10 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 border border-charcoal/5 diffused-shadow mb-16 relative overflow-hidden">
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/20 -translate-y-12 translate-x-12 blur-2xl" />

          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="bg-forest text-alabaster p-3.5 rounded-2xl hidden sm:flex shadow-sm">
              <Mail className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-semibold text-charcoal">
                Join the Lumora Circle
              </h3>
              <p className="text-xs text-charcoal/70 font-light mt-1 max-w-sm leading-relaxed">
                Be the first to know about new arrivals, private sales, and minimalist style guides. No spam, ever.
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto">
            {isSubscribed ? (
              <div className="bg-white/80 border border-forest/10 rounded-full py-3.5 px-6 text-xs text-forest font-semibold text-center flex items-center justify-center gap-2 animate-fade-in shadow-sm">
                <Smile className="w-4 h-4" />
                Subscribed! Enjoy 10% off with code: <strong className="font-mono bg-forest text-alabaster px-2 py-0.5 rounded text-[11px]">WELCOME10</strong>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex bg-white rounded-full p-1 border border-charcoal/10 hover:border-charcoal/20 transition-all max-w-md mx-auto w-full md:w-[380px]">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2.5 text-xs outline-none text-charcoal border-none focus:ring-0 placeholder:text-charcoal/35"
                />
                <button
                  type="submit"
                  className="bg-forest text-alabaster text-xs font-semibold uppercase tracking-wider py-2.5 px-5 sm:px-6 rounded-full hover:bg-forest/90 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* TRUST BADGES ROW (Four columns) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-charcoal/10">
          {/* Badge 1 */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center mb-3">
              <Award className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              Quality You Can Trust
            </h4>
            <p className="text-[10px] text-charcoal/60 leading-relaxed font-light mt-1 max-w-[160px]">
              Premium fabrics and leather sourced ethically and handcrafted.
            </p>
          </div>

          {/* Badge 2 */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center mb-3">
              <HelpCircle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              Customer Support
            </h4>
            <p className="text-[10px] text-charcoal/60 leading-relaxed font-light mt-1 max-w-[160px]">
              Our concierge team is here to help you 24/7.
            </p>
          </div>

          {/* Badge 3 */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center mb-3">
              <Heart className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              Loved by Thousands
            </h4>
            <p className="text-[10px] text-charcoal/60 leading-relaxed font-light mt-1 max-w-[160px]">
              Join our community of over 50k happy minimalist customers.
            </p>
          </div>

          {/* Badge 4 */}
          <div className="flex flex-col items-center text-center p-3">
            <div className="w-10 h-10 rounded-full bg-forest/5 text-forest flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider">
              Sustainable Choice
            </h4>
            <p className="text-[10px] text-charcoal/60 leading-relaxed font-light mt-1 max-w-[160px]">
              Organic flax, recycled silver, plastic-free circular packaging.
            </p>
          </div>
        </div>

        {/* SITE LINKS & CORE FOOTER INFO */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          {/* Column 1: Brand description */}
          <div className="col-span-2 flex flex-col items-start text-left">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="text-forest">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12,2A3,3 0 0,0 9,5A3,3 0 0,0 9.18,6.13C8.42,5.74 7.42,5.74 6.66,6.13A3,3 0 0,0 5,9A3,3 0 0,0 6.13,11.18C5.74,11.94 5.74,12.94 6.13,13.7C5.35,14.46 5.35,15.71 6.13,16.47A3,3 0 0,0 9,19A3,3 0 0,0 11.18,17.87C11.94,18.26 12.94,18.26 13.7,17.87A3,3 0 0,0 15,21A3,3 0 0,0 17.87,19.18C18.26,18.42 18.26,17.42 17.87,16.66A3,3 0 0,0 19,15A3,3 0 0,0 17.87,12.82C18.26,12.06 18.26,11.06 17.87,10.3C18.65,9.54 18.65,8.29 17.87,7.53A3,3 0 0,0 15,5A3,3 0 0,0 12.82,6.13C12.06,5.74 11.06,5.74 10.3,6.13A3,3 0 0,0 12,2Z" />
                </svg>
              </div>
              <span className="font-serif text-lg font-bold tracking-[0.15em] text-charcoal">
                LUMORA
              </span>
            </a>
            <p className="text-xs text-charcoal/60 font-light leading-relaxed mb-6 max-w-sm">
              We create beautiful, minimalist pieces designed to last a lifetime. Soft materials, organic weaves, and classic tailoring.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-charcoal/50 hover:text-forest transition-colors p-1 bg-charcoal/5 rounded-full">
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-charcoal/50 hover:text-forest transition-colors p-1 bg-charcoal/5 rounded-full">
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="text-charcoal/50 hover:text-forest transition-colors p-1 bg-charcoal/5 rounded-full">
                <Pin className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Collections */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-4">
              Collections
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-charcoal/70">
              <p className="hover:text-forest cursor-pointer transition-colors">Women's Summer</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Men's Linen Essentials</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Apothecary & Beauty</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Home Decors</p>
            </div>
          </div>

          {/* Column 3: Customer Service */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-4">
              Assistance
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-charcoal/70">
              <p className="hover:text-forest cursor-pointer transition-colors">Shipping & Delivery</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Returns & Refunds</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Size Guide Guides</p>
              <p className="hover:text-forest cursor-pointer transition-colors">F.A.Q. Support</p>
            </div>
          </div>

          {/* Column 4: Club Info */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-4">
              The Club
            </h4>
            <div className="space-y-2.5 text-xs font-medium text-charcoal/70">
              <p className="hover:text-forest cursor-pointer transition-colors">Our Atelier Story</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Sustainable Ethics</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Press Inquiries</p>
              <p className="hover:text-forest cursor-pointer transition-colors">Career Openings</p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT SUBFOOTER */}
        <div className="py-6 border-t border-charcoal/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-charcoal/40 font-light gap-3">
          <p>© {new Date().getFullYear()} Lumora Atelier Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <p className="hover:text-forest cursor-pointer">Privacy Policy</p>
            <p className="hover:text-forest cursor-pointer">Terms of Service</p>
            <p className="hover:text-forest cursor-pointer">Accessibility</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
