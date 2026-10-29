import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Trash2, 
  CreditCard, 
  Bell, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  AlertCircle 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Atheko Premium Laundry",
  description:
    "Learn how Atheko collects, uses, protects, and manages your personal data across our laundry services and mobile applications.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 29, 2026";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#5116E3] via-[#7B2CBF] to-[#BA00FF] py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            Legal & Data Privacy
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm sm:text-base text-purple-100 max-w-2xl mx-auto">
            At Atheko, your trust and privacy are paramount. This policy outlines how we handle, protect, and respect your personal information across our website and mobile applications.
          </p>
          <div className="mt-6 text-xs text-purple-200">
            Last Updated: <span className="font-semibold text-white">{lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-10 bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-slate-200/80">
          
          {/* Quick Notice Card */}
          <div className="rounded-2xl bg-purple-50/80 border border-purple-200/60 p-5 sm:p-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#5116E3] flex-shrink-0 mt-0.5" />
            <div className="text-sm leading-relaxed text-slate-700">
              <strong className="text-slate-900 font-semibold">Summary Commitment: </strong> 
              Atheko does <strong className="text-[#5116E3]">not</strong> sell, rent, or trade your personal information. Data collected is strictly used to fulfill doorstep laundry pickups, cleaning, deliveries, transactional notifications, and account management.
            </div>
          </div>

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">1</span>
              About Atheko & Scope
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              <strong>Atheko Premium Laundry</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is a flagship brand under <strong>Collective Core Venture LLP</strong>, engineered and operated in collaboration with <strong>Arneor Software Solutions</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              This Privacy Policy applies to personal data collected through our official website (<Link href="/" className="text-[#5116E3] hover:underline font-medium">www.atheko.com</Link>), the <strong>Atheko</strong> Android/iOS mobile applications, and all associated laundry, dry cleaning, and fabric care services.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">2</span>
              Information We Collect
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Personal Information
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Name, phone number (used for OTP login & delivery calls), email address (for digital invoices), and optional WhatsApp contact for real-time tracking updates.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  Location Data (Foreground Only)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Precise/approximate location is used strictly when actively setting your pickup/delivery address or finding the nearest servicing branch. <strong>We do not track your location in the background.</strong>
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <CreditCard className="w-4 h-4 text-blue-600" />
                  Payment & Transaction Data
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Payments are securely processed via <strong>Razorpay</strong> (PCI-DSS Level 1 certified). Atheko never sees, stores, or captures your credit card numbers, CVVs, or net banking passwords.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-2">
                <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                  <Bell className="w-4 h-4 text-amber-500" />
                  Device Tokens & Diagnostics
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Firebase Cloud Messaging (FCM) tokens for delivery alerts, and anonymized Firebase Crashlytics telemetry to monitor app stability and fix crashes.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">3</span>
              How We Use Your Information
            </h2>
            <ul className="space-y-2.5 text-sm sm:text-base text-slate-600">
              <li className="flex items-start gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5116E3] mt-2.5 flex-shrink-0" />
                <span>To schedule and process your doorstep laundry pickup, washing, ironing, dry cleaning, and return delivery.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5116E3] mt-2.5 flex-shrink-0" />
                <span>To send automated transactional SMS, WhatsApp messages, and push notifications about order status and delivery valet arrivals.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5116E3] mt-2.5 flex-shrink-0" />
                <span>To generate GST-compliant digital tax invoices and maintain purchase history.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5116E3] mt-2.5 flex-shrink-0" />
                <span>To respond promptly to customer care queries and resolve service issues.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="h-1.5 w-1.5 rounded-full bg-[#5116E3] mt-2.5 flex-shrink-0" />
                <span>To maintain network security and prevent fraudulent transactions or unauthorized account access.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">4</span>
              Data Sharing & Third Parties
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We share minimum necessary information only with trusted service partners directly required to execute our service:
            </p>
            <div className="space-y-3 pt-1">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="font-semibold text-slate-800 text-sm">Delivery Valets & Logistics Staff</div>
                <div className="text-xs text-slate-600 mt-1">
                  Assigned Atheko delivery partners receive your name, contact phone number, and pickup/delivery address solely to fulfill the active laundry order.
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="font-semibold text-slate-800 text-sm">Payment Infrastructure (Razorpay)</div>
                <div className="text-xs text-slate-600 mt-1">
                  Processes secure payments using 256-bit SSL encryption adhering to international PCI-DSS standards.
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="font-semibold text-slate-800 text-sm">Cloud Infrastructure & Notifications (Google Firebase)</div>
                <div className="text-xs text-slate-600 mt-1">
                  Used for encrypted transactional push messaging and real-time app stability telemetry.
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">5</span>
              Data Security
            </h2>
            <div className="flex items-start gap-4 rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <Lock className="w-5 h-5 text-[#5116E3] mt-1 flex-shrink-0" />
              <p className="text-sm text-slate-600 leading-relaxed">
                All communications between the Atheko mobile application and our servers are encrypted using <strong>TLS 1.2/1.3 (HTTPS)</strong>. Sensitive session tokens are kept within device-level encrypted storage (Android Keystore / iOS Keychain). We conduct regular security evaluations to protect against unauthorized data access.
              </p>
            </div>
          </section>

          {/* Section 6 - Account Deletion */}
          <section id="account-deletion" className="space-y-4 scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-100 text-sm font-bold text-red-600">6</span>
              Account Deletion & Data Retention
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              In full compliance with <strong>Google Play&apos;s Account Deletion Policy</strong>, you have the right to request the permanent deletion of your account and personal data at any time.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Trash2 className="w-4 h-4 text-red-500" />
                  Option A: Inside Mobile App
                </div>
                <ol className="text-xs text-slate-600 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li>Open the <strong>Atheko App</strong>.</li>
                  <li>Tap the <strong>Profile</strong> tab in the navigation bar.</li>
                  <li>Scroll to the bottom and select <strong>Delete Account</strong>.</li>
                  <li>Confirm the prompt. Your account will be removed immediately.</li>
                </ol>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Mail className="w-4 h-4 text-[#5116E3]" />
                  Option B: Web / Email Request
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Submit an account deletion request through our web page or email us at{" "}
                  <a href="mailto:info.atheko@gmail.com" className="text-[#5116E3] font-medium hover:underline">
                    info.atheko@gmail.com
                  </a>{" "}
                  with your registered mobile number.
                </p>
                <div className="pt-2">
                  <Link 
                    href="/delete-account" 
                    className="inline-flex items-center text-xs font-semibold text-[#5116E3] hover:underline gap-1"
                  >
                    Visit Account Deletion Page &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50/80 border border-amber-200/60 p-4 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <strong>Data Retention Note: </strong> 
                Personal profile data and saved delivery addresses are erased upon deletion. Completed financial transaction records and tax invoices are retained for the legally mandated period required under Indian taxation and accounting laws.
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">7</span>
              Children&apos;s Privacy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Atheko services and mobile applications are designed for general audiences and do not knowingly collect personal identifiable information from children under the age of 13 (or under 18 without parental consent).
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">8</span>
              Updates to This Policy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              We may revise this Privacy Policy periodically to reflect changes in our services, regulatory requirements, or security best practices. Any updates will be published on this page with a revised &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-sm font-bold text-[#5116E3]">9</span>
              Contact Our Privacy Team
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              If you have any questions, suggestions, or concerns regarding your privacy or data protection, please reach out to us:
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Building2 className="w-4 h-4 text-[#5116E3]" />
                  Atheko Premium Laundry
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  Collective Core Venture LLP<br />
                  1st Floor, Jalsu Centre, Kannur Rd, West Hill,<br />
                  Calicut, Kerala, India - 673005
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
                  <Phone className="w-4 h-4 text-[#5116E3]" />
                  Contact Channels
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>Email: <a href="mailto:info.atheko@gmail.com" className="text-[#5116E3] hover:underline font-medium">info.atheko@gmail.com</a></div>
                  <div>Phone: <span className="font-medium text-slate-800">90378 78915 / 90378 78916</span></div>
                  <div>Website: <Link href="/" className="text-[#5116E3] hover:underline font-medium">www.atheko.com</Link></div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
