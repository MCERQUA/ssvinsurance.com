"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FadeIn } from "@/components/animations/FadeIn";
import { SITE } from "@/lib/site";

// Coverage options — update these for this niche after scaffolding
const COVERAGE_OPTIONS = [
  "General Liability",
  "Property Insurance",
  "Commercial Auto",
  "Workers Compensation",
  "Commercial Umbrella",
  "Business Owners Policy (BOP)",
  "Inland Marine / Equipment",
  "Full Package",
];

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "",
    dateOfBirth: "",
    licenseNumber: "", licenseIssueDate: "", licenseExpirationDate: "",
    operationType: "", annualRevenue: "", crewSize: "",
    coverageNeeded: "", state: "", message: "",
    city: "", zip: "",
    streetAddress: "", vehicleYear: "", vehicleMake: "", vehicleModel: "", vehicleVin: "", vehicleValue: "", accessoriesValue: "", currentCarrierName: "", currentPolicyNumber: "", currentPolicyStartDate: "", currentPolicyExpirationDate: "", currentCoverageLimits: "", priorAutoInsurance: "", driverNames: "", accessoriesDescription: "", coverageType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // capture the form node before any await — e.currentTarget is only valid
    // while the handler is on the stack.
    const form = e.currentTarget;
    setLoading(true);
    try {
      // multipart, not urlencoded: this form carries two file inputs and an
      // application/x-www-form-urlencoded body cannot hold a file.
      await fetch("/", { method: "POST", body: new FormData(form) });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const field = (name: keyof typeof formData, label: string, type = "text", required = true) => (
    <div key={name}>
      <label className="block font-body text-sm font-bold text-bark mb-1.5">
        {label}{required && <span className="text-ember-orange ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
      />
    </div>
  );

  const select = (name: keyof typeof formData, label: string, options: string[], required = true) => (
    <div key={name}>
      <label className="block font-body text-sm font-bold text-bark mb-1.5">
        {label}{required && <span className="text-ember-orange ml-1">*</span>}
      </label>
      <select
        name={name}
        required={required}
        value={formData[name]}
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-forest-green pt-24 pb-16">
          <div className="container-xl">
            <FadeIn>
              <h1 className="font-heading text-4xl sm:text-5xl text-white font-bold mb-4">
                Get a {SITE.name} Quote
              </h1>
              <p className="font-body text-white/80 text-lg max-w-xl">
                Tell us about your operation and we&apos;ll prepare a competitive quote — same-day turnaround.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="section-pad bg-warm-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <FadeIn>
                  {submitted ? (
                    <div className="bg-white rounded-2xl border border-border p-10 text-center">
                      <CheckCircle className="w-14 h-14 text-forest-green mx-auto mb-4" />
                      <h2 className="font-heading text-2xl text-bark font-bold mb-3">Quote Request Received!</h2>
                      <p className="font-body text-muted mb-2">We&apos;ll prepare your quote and be in touch today.</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-border p-8">
                      <h2 className="font-heading text-2xl text-bark font-bold mb-6">
                        {SITE.name} Quote Request
                      </h2>
                      <form
                        name="quote"
                        method="POST"
                        data-netlify="true"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <input type="hidden" name="form-name" value="quote" />
                        <input name="bot-field" type="hidden" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {field("name", "Full Name")}
                          {field("company", "Company / Business Name")}
                          {field("email", "Email Address", "email")}
                          {field("phone", "Phone Number", "tel")}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {field("dateOfBirth", "Date of Birth", "date")}
                          {field("licenseNumber", "Driver's License Number")}
                          {field("licenseIssueDate", "License Issue Date", "date")}
                          {field("licenseExpirationDate", "License Expiration Date", "date")}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {select("operationType", "Type of Operation", [
                            "Individual / Sole Proprietor",
                            "Small Business (2–10 employees)",
                            "Mid-size Business (11–50)",
                            "Large Business (50+)",
                          ])}
                          {select("annualRevenue", "Annual Revenue", [
                            "Under $100K", "$100K–$250K", "$250K–$500K",
                            "$500K–$1M", "$1M–$2.5M", "Over $2.5M",
                          ])}
                          {select("crewSize", "Number of Employees", [
                            "1 (Owner only)", "2–5", "6–10", "11–20", "21–50", "50+",
                          ])}
                          {select("coverageNeeded", "Coverage Needed", COVERAGE_OPTIONS)}
                          <div key="state">
                            <label className="block font-body text-sm font-bold text-bark mb-1.5">
                              Primary State of Operations<span className="text-ember-orange ml-1">*</span>
                            </label>
                            <select
                              name="state"
                              required
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                              className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green bg-white"
                            >
                              <option value="">Select...</option>
                              <option key="AL" value="AL">Alabama</option>
                              <option key="AK" value="AK">Alaska</option>
                              <option key="AZ" value="AZ">Arizona</option>
                              <option key="AR" value="AR">Arkansas</option>
                              <option key="CA" value="CA">California</option>
                              <option key="CO" value="CO">Colorado</option>
                              <option key="CT" value="CT">Connecticut</option>
                              <option key="DE" value="DE">Delaware</option>
                              <option key="DC" value="DC">District of Columbia</option>
                              <option key="FL" value="FL">Florida</option>
                              <option key="GA" value="GA">Georgia</option>
                              <option key="HI" value="HI">Hawaii</option>
                              <option key="ID" value="ID">Idaho</option>
                              <option key="IL" value="IL">Illinois</option>
                              <option key="IN" value="IN">Indiana</option>
                              <option key="IA" value="IA">Iowa</option>
                              <option key="KS" value="KS">Kansas</option>
                              <option key="KY" value="KY">Kentucky</option>
                              <option key="LA" value="LA">Louisiana</option>
                              <option key="ME" value="ME">Maine</option>
                              <option key="MD" value="MD">Maryland</option>
                              <option key="MA" value="MA">Massachusetts</option>
                              <option key="MI" value="MI">Michigan</option>
                              <option key="MN" value="MN">Minnesota</option>
                              <option key="MS" value="MS">Mississippi</option>
                              <option key="MO" value="MO">Missouri</option>
                              <option key="MT" value="MT">Montana</option>
                              <option key="NE" value="NE">Nebraska</option>
                              <option key="NV" value="NV">Nevada</option>
                              <option key="NH" value="NH">New Hampshire</option>
                              <option key="NJ" value="NJ">New Jersey</option>
                              <option key="NM" value="NM">New Mexico</option>
                              <option key="NY" value="NY">New York</option>
                              <option key="NC" value="NC">North Carolina</option>
                              <option key="ND" value="ND">North Dakota</option>
                              <option key="OH" value="OH">Ohio</option>
                              <option key="OK" value="OK">Oklahoma</option>
                              <option key="OR" value="OR">Oregon</option>
                              <option key="PA" value="PA">Pennsylvania</option>
                              <option key="RI" value="RI">Rhode Island</option>
                              <option key="SC" value="SC">South Carolina</option>
                              <option key="SD" value="SD">South Dakota</option>
                              <option key="TN" value="TN">Tennessee</option>
                              <option key="TX" value="TX">Texas</option>
                              <option key="UT" value="UT">Utah</option>
                              <option key="VT" value="VT">Vermont</option>
                              <option key="VA" value="VA">Virginia</option>
                              <option key="WA" value="WA">Washington</option>
                              <option key="WV" value="WV">West Virginia</option>
                              <option key="WI" value="WI">Wisconsin</option>
                              <option key="WY" value="WY">Wyoming</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {field("streetAddress", "Street Address")}
                          {field("city", "City")}
                          {field("zip", "ZIP Code")}
                          {field("vehicleYear", "Vehicle Year", "number")}
                          {field("vehicleMake", "Vehicle Make")}
                          {field("vehicleModel", "Vehicle Model")}
                          {field("vehicleVin", "VIN (one per vehicle)")}
                          {field("vehicleValue", "Vehicle Value ($)")}
                          {field("accessoriesValue", "Accessories Value ($)")}
                          {field("currentCarrierName", "Current or Prior Carrier")}
                          {field("currentPolicyNumber", "Current Policy Number")}
                          {field("currentPolicyStartDate", "Current Policy Start Date", "date")}
                          {field("currentPolicyExpirationDate", "Current Policy Expiration Date", "date")}
                          {field("currentCoverageLimits", "Current Coverage Limits")}
                          {field("priorAutoInsurance", "Prior Auto Insurance (carrier and dates, or \"none\")")}
                          {select("coverageType", "Coverage Type", ["Liability only", "Liability + Physical Damage", "Full coverage", "Not sure"])}
                        </div>

                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">All Drivers (name, date of birth and license number for each)<span className="text-ember-orange ml-1">*</span></label>
                          <textarea name="driverNames" rows={3} required value={formData.driverNames} onChange={(e) => setFormData({ ...formData, driverNames: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white" />
                        </div>

                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">Accessories & Add-Ons (describe)<span className="text-ember-orange ml-1">*</span></label>
                          <textarea name="accessoriesDescription" rows={3} required value={formData.accessoriesDescription} onChange={(e) => setFormData({ ...formData, accessoriesDescription: e.target.value })} className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">Upload Driver's License</label>
                          <input type="file" name="driversLicenseUpload" className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark bg-white" />
                        </div>
                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">Upload Insurance Card</label>
                          <input type="file" name="insuranceCardUpload" className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark bg-white" />
                        </div>
                        </div>

                        <div>
                          <label className="block font-body text-sm font-bold text-bark mb-1.5">
                            Additional Notes
                          </label>
                          <textarea
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Any specific coverage requirements, questions, or details..."
                            className="w-full px-4 py-2.5 border border-border rounded-lg font-body text-sm text-bark focus:outline-none focus:border-forest-green resize-none bg-white"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-ember-orange text-white py-3.5 rounded-lg font-body font-bold hover:bg-ember-orange-dark transition-colors disabled:opacity-60"
                        >
                          {loading ? "Submitting..." : `Get My ${SITE.name} Quote →`}
                        </button>
                      </form>
                    </div>
                  )}
                </FadeIn>
              </div>

              <aside className="space-y-5">
                <FadeIn direction="left">
                  <div className="bg-forest-green rounded-2xl p-7">
                    <h3 className="font-heading text-lg text-white font-bold mb-3">What Happens Next</h3>
                    <p className="font-body text-white/70 text-sm mb-4">
                      Submit the form and one of our specialists reviews your details and prepares
                      your quote — same-day turnaround in most cases.
                    </p>
                    <p className="font-body text-white/50 text-xs">{SITE.hours}</p>
                  </div>
                </FadeIn>
                <FadeIn direction="left" delay={0.05}>
                  <div className="bg-white rounded-2xl border border-border p-6">
                    <h3 className="font-body text-xs font-bold uppercase tracking-widest text-muted mb-4">
                      Why Choose Us
                    </h3>
                    {[
                      "Licensed in All 50 States",
                      "Same-Day Quote Turnaround",
                      "Niche Insurance Specialists",
                      "A.M. Best A+ Rated Carriers",
                      "Same-Day Certificates",
                      "Competitive Pricing",
                    ].map((i) => (
                      <div key={i} className="flex items-center gap-2 mb-2.5">
                        <CheckCircle className="w-4 h-4 text-forest-green flex-shrink-0" />
                        <span className="font-body text-sm text-bark">{i}</span>
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
