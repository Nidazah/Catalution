"use client";

import { useEffect, useState, FormEvent } from "react";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import Image from "next/image";

type ContactInfo = {
  emailPrimary: string;
  emailSecondary: string | null;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  mapEmbedUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
};

const fallbackInfo: ContactInfo = {
  emailPrimary: "support@catalution.com",
  emailSecondary: "accounts@catalution.com",
  phone: "0301 5221051",
  addressLine1: "Near Plot 37, Tipu Block",
  addressLine2: "Garden Town, Lahore",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13609.767!2d74.3184!3d31.4989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190157d97dd50f%3A0x0!2sTipu%20Block%2C%20Garden%20Town%2C%20Lahore!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk",
  rating: 4.9,
  reviewCount: 200,
};

const fallbackServiceOptions = [
  {
    value: "business",
    label: "Business Process Optimization",
  },
  {
    value: "strategy",
    label: "Strategic Planning & Execution",
  },
  {
    value: "coaching",
    label: "Leadership Executive Coaching",
  },
  {
    value: "legacy",
    label: "Legacy Leadership Institute",
  },
  {
    value: "growth",
    label: "Executive Growth Solutions",
  },
  {
    value: "empowered",
    label: "Empowered Leadership Journey",
  },
];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function ContactPage() {
  const [info, setInfo] = useState<ContactInfo>(fallbackInfo);

  const [serviceOptions, setServiceOptions] = useState(fallbackServiceOptions);

  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/contact-info", {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: ContactInfo | null) => {
        if (data) {
          setInfo(data);
        }
      })
      .catch(() => {
        // Keep fallback information if API is unavailable.
      });

    // Load available services for the dropdown so the contact form
    // always reflects the latest service titles from the admin panel.
    fetch("/api/services", {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load services"))))
      .then((data) => {
        const services = Array.isArray(data?.services)
          ? data.services
          : [];

        if (services.length > 0) {
          setServiceOptions(
            services.map((service: { slug: string; title: string }) => ({
              value: service.slug,
              label: service.title,
            })),
          );
        }
      })
      .catch(() => {
        // Keep fallback service options if the API is unavailable.
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitting(true);
    setError("");

    try {
      const selectedService =
        serviceOptions.find((s) => s.value === form.service)?.label ||
        form.service ||
        undefined;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          service: selectedService,
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data?.error || "Could not submit your message"
        );
      }

      setSubmitted(true);
      setForm(emptyForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your message"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Contact" />

      {/* Main Content */}
      <section className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* =========================
              LEFT COLUMN
          ========================== */}
          <div>
            <h2 className="text-3xl font-bold text-[#ff6800] mb-3">
              Contact Information
            </h2>

            <p className="text-gray-600 mb-8">
              Fill out the form and our team will get back to you shortly.
              Or, use the contact details below to reach us directly.
            </p>

            <div className="space-y-6">

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff6800]">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-navy text-[15px]">
                    Email Us
                  </h3>

                  <p className="text-gray-600 mt-0.5 text-[14px]">
                    {info.emailPrimary}
                  </p>

                  {info.emailSecondary && (
                    <p className="text-gray-600 text-[14px]">
                      {info.emailSecondary}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff6800]">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-navy text-[15px]">
                    Call Us
                  </h3>

                  <p className="text-gray-600 mt-0.5 text-[14px]">
                    {info.phone}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff6800]">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-navy text-[15px]">
                    Visit Us
                  </h3>

                  <p className="text-gray-600 mt-0.5 text-[14px]">
                    {info.addressLine1}
                  </p>

                  <p className="text-gray-600 text-[14px]">
                    {info.addressLine2}
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            {(info.rating || info.reviewCount) && (
              <div className="mt-10 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3">

                  <div className="flex -space-x-3">
                    <div className="relative h-10 w-10 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                      <Image
                        src="/images/contact/thumb-1.png"
                        alt="Client 1"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="relative h-10 w-10 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                      <Image
                        src="/images/contact/thumb-2.png"
                        alt="Client 2"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="relative h-10 w-10 shrink-0 rounded-full border-2 border-white overflow-hidden bg-gray-200 grayscale">
                      <Image
                        src="/images/contact/thumb-2.png"
                        alt="Client 3"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    {info.rating != null && (
                      <p className="text-[15px] font-semibold text-[#ff6800]">
                        {info.rating.toFixed(1)}/5.0 Client Satisfaction
                      </p>
                    )}

                    {info.reviewCount != null && (
                      <p className="text-[13px] text-gray-500">
                        Based on {info.reviewCount}+ reviews
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================
              RIGHT COLUMN - FORM
          ========================== */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">

            <h2 className="text-2xl font-bold text-[#ff6800] mb-1">
              Send us a message
            </h2>

            <p className="text-gray-600 mb-5">
              Fill out the form below and we&apos;ll get back to you promptly.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4">
                  <Check className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-bold text-navy mb-1">
                  Message sent
                </h3>

                <p className="text-gray-600 text-[14px] mb-5">
                  Thanks for reaching out &mdash; our team will get back to
                  you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[#ff6800] font-semibold text-[14px] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={handleSubmit}
              >

                {/* First / Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-navy mb-1"
                    >
                      First Name
                    </label>

                    <input
                      required
                      type="text"
                      id="firstName"
                      placeholder="John"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          firstName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all text-[14px]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-navy mb-1"
                    >
                      Last Name
                    </label>

                    <input
                      required
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          lastName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all text-[14px]"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all text-[14px]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    Phone Number (optional)
                  </label>

                  <input
                    type="tel"
                    id="phone"
                    placeholder="+92 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        phone: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all text-[14px]"
                  />
                </div>

                {/* Service */}
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    Service Interested In
                  </label>

                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        service: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all appearance-none text-[14px]"
                  >
                    <option value="">
                      Select a service...
                    </option>

                    {serviceOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    Your Message
                  </label>

                  <textarea
                    required
                    id="message"
                    rows={3}
                    placeholder="Tell us about your project, goals, or any questions you have..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        message: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff6800] focus:border-[#ff6800] outline-none transition-all resize-none text-[14px]"
                  />
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-[13px] text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  disabled={submitting}
                  type="submit"
                  className="w-full group bg-navy hover:bg-navy-ink text-white font-semibold py-3.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-[15px] mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}

                  {!submitting && (
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================
          GOOGLE MAP
      ========================== */}
      {info.mapEmbedUrl && (
        <section className="bg-white border-t border-gray-100">
          <div className="container mx-auto px-6 py-12">

            <div className="text-center max-w-2xl mx-auto mb-8">

              <h2 className="text-2xl font-bold text-[#ff6800]">
                Our Location
              </h2>

              <p className="text-gray-600 mt-1">
                Visit our headquarters in {info.addressLine2}.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md h-[300px] md:h-[350px] w-full relative bg-gray-100">
              <iframe
                src={info.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Catalution office location"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}