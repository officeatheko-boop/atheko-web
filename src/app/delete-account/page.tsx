import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { 
  Trash2, 
  Smartphone, 
  Mail, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  FileText, 
  HelpCircle 
} from "lucide-react";

export const metadata: Metadata = {
  title: "Account Deletion Request | Atheko Premium Laundry",
  description:
    "Learn how to delete your Atheko account and request permanent removal of your personal data.",
};

export default function DeleteAccountPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#5116E3] via-[#7B2CBF] to-[#BA00FF] py-16 md:py-20 text-white">
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/20 border border-red-300/30 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6">
            <Trash2 className="w-4 h-4 text-red-200" />
            User Data & Account Rights
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Account Deletion Request
          </h1>
          <p className="mt-4 text-sm sm:text-base text-purple-100 max-w-xl mx-auto">
            You have full control over your Atheko account. Follow the instructions below to permanently delete your account and associated personal data.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="space-y-8 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
          
          {/* Method 1: In App */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-[#5116E3]">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Method 1: Instant In-App Deletion (Recommended)
                </h2>
                <p className="text-xs text-slate-500">Fastest and immediate way to delete your account</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3">
              <ol className="text-sm text-slate-700 space-y-2.5 list-decimal list-inside leading-relaxed">
                <li>Open the <strong>Atheko App</strong> on your Android or iOS device.</li>
                <li>Tap the <strong>Profile</strong> tab on the bottom navigation bar.</li>
                <li>Scroll down to the bottom of your profile options.</li>
                <li>Tap <strong className="text-red-600">Delete Account</strong>.</li>
                <li>Read the confirmation notice and tap <strong>Confirm Delete</strong>.</li>
              </ol>
              <div className="pt-2 text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Your account profile, saved addresses, and active login sessions will be terminated immediately.</span>
              </div>
            </div>
          </section>

          {/* Method 2: Web / Email */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Method 2: Email Request
                </h2>
                <p className="text-xs text-slate-500">For users without access to the mobile application</p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                If you have uninstalled the app or cannot log in, please send an email from your registered email address or mention your registered phone number to:
              </p>
              <div className="p-3.5 bg-white rounded-xl border border-slate-200 font-mono text-sm text-[#5116E3]">
                info.atheko@gmail.com
              </div>
              <p className="text-xs text-slate-600">
                <strong>Subject:</strong> Account Deletion Request - [Your Registered Phone Number]
              </p>
              <p className="text-xs text-slate-600">
                <strong>Content:</strong> Please mention your registered mobile number and full name. For your security, our team will verify your identity before processing the deletion.
              </p>
            </div>
          </section>

          {/* What gets deleted vs retained */}
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              What Data is Deleted vs. Retained
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Permanently Deleted
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>Your user account profile (Name, phone, email)</li>
                  <li>All saved pickup & delivery addresses</li>
                  <li>Device authentication tokens & FCM tokens</li>
                  <li>Customer support chat/review drafts</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-slate-500" />
                  Legally Mandated Retention
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Past completed financial orders, payment receipts, and GST invoices are retained as required by Indian taxation, audit, and commercial accounting regulations.
                </p>
              </div>
            </div>
          </section>

          {/* Turnaround Time */}
          <section className="rounded-2xl bg-purple-50/70 border border-purple-200 p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#5116E3] flex-shrink-0" />
            <div className="text-xs text-slate-700">
              <strong>Processing Timeline: </strong>
              In-app deletion is instantaneous. Manual email requests are processed and confirmed within <strong>7 business days</strong>.
            </div>
          </section>

          {/* Link back */}
          <div className="pt-2 text-center text-xs text-slate-500">
            Need further assistance? Read our full{" "}
            <Link href="/privacy-policy" className="text-[#5116E3] hover:underline font-semibold">
              Privacy Policy
            </Link>{" "}
            or contact{" "}
            <a href="mailto:info.atheko@gmail.com" className="text-[#5116E3] hover:underline font-semibold">
              info.atheko@gmail.com
            </a>.
          </div>

        </div>
      </main>
    </div>
  );
}
