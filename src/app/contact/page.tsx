import PageHero from "@/components/PageHero";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Contact" />

      {/* --- Main Content Section --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-navy mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-10">
              Fill out the form and our team will get back to you shortly. 
              Or, use the contact details below to reach us directly.
            </p>

            <div className="space-y-8">
              {/* Info Card 1 */}
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-accent">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Email Us</h3>
                  <p className="text-gray-600 mt-1">support@catalution.com</p>
                  <p className="text-gray-600">accounts@catalution.com</p>
                </div>
              </div>

              {/* Info Card 2 */}
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-accent">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Call Us</h3>
                  <p className="text-gray-600 mt-1">0301 5221051</p>
                </div>
              </div>

              {/* Info Card 3 */}
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-accent">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Visit Us</h3>
                  <p className="text-gray-600 mt-1">Near Plot 37, Tipu Block</p>
                  <p className="text-gray-600">Garden Town, Lahore</p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="relative h-12 w-12 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                    <Image src="/images/contact/thumb-1.png" alt="Client 1" fill className="object-cover" />
                  </div>
                  <div className="relative h-12 w-12 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                    <Image src="/images/contact/thumb-2.png" alt="Client 2" fill className="object-cover" />
                  </div>
                  <div className="relative h-12 w-12 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                    <Image src="/images/contact/thumb-2.png" alt="Client 3" fill className="object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-navy">4.9/5.0 Client Satisfaction</p>
                  <p className="text-[13px] text-gray-500">Based on 200+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-navy mb-2">Send us a message</h2>
            <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you promptly.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-navy mb-1.5">First Name</label>
                  <input type="text" id="firstName" placeholder="John" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-navy mb-1.5">Last Name</label>
                  <input type="text" id="lastName" placeholder="Doe" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-navy mb-1.5">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-navy mb-1.5">Phone Number (optional)</label>
                <input type="tel" id="phone" placeholder="+92 (555) 000-0000" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all" />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-navy mb-1.5">Service Interested In</label>
                <select id="service" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all appearance-none">
                  <option value="">Select a service...</option>
                  <option value="business">Business Process Optimization</option>
                  <option value="strategy">Strategic Planning & Execution</option>
                  <option value="coaching">Leadership Executive Coaching</option>
                  <option value="legacy">Legacy Leadership Institute</option>
                  <option value="growth">Executive Growth Solutions</option>
                  <option value="empowered">Empowered Leadership Journey</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-navy mb-1.5">Your Message</label>
                <textarea id="message" rows={4} placeholder="Tell us about your project, goals, or any questions you have..." className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none" />
              </div>

              <button type="button" className="w-full group bg-navy hover:bg-navy-ink text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                Send Message
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- Google Map Section --- */}
      <section className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-navy">Our Location</h2>
            <p className="text-gray-600 mt-2">Visit our headquarters in Garden Town, Lahore.</p>
          </div>
          
          <div className="rounded-2xl overflow-hidden shadow-md h-[400px] w-full relative bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13609.767!2d74.3184!3d31.4989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190157d97dd50f%3A0x0!2sTipu%20Block%2C%20Garden%20Town%2C%20Lahore!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>

    </main>
  );
}