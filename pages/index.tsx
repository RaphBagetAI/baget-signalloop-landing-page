import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', useCase: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const updateField = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('submitted');
        setForm({ name: '', email: '', company: '', role: '', useCase: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
      <Head>
        <title>SignalLoop - Stop Turning Meetings Into Admin</title>
        <meta name="description" content="Turn meetings into CRM updates, follow-ups, and coaching signals with SignalLoop." />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <nav className="flex justify-between items-center p-4 bg-navy text-white">
          <h1 className="text-xl font-bold">SignalLoop</h1>
        </nav>

        {/* Hero Section with lead capture form above the fold */}
        <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-navy">
              Stop Turning Meetings Into Admin
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              SignalLoop turns meetings into CRM updates, follow-ups, and coaching signals so your revenue team spends less time on admin and more time closing deals.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-md bg-white p-6 rounded-lg shadow-lg"
              aria-label="Book a demo form"
            >
              <input
                type="text"
                placeholder="Your full name"
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="email"
                placeholder="Work email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="text"
                placeholder="Company"
                required
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="text"
                placeholder="Your role"
                required
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <select
                required
                value={form.useCase}
                onChange={(e) => updateField('useCase', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              >
                <option value="" disabled>
                  Select your use case
                </option>
                <option>Sales Follow-up Automation</option>
                <option>CRM Update Automation</option>
                <option>Meeting Coaching Insights</option>
                <option>Customer Success Follow-up</option>
                <option>Other</option>
              </select>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-electric-blue text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
              >
                {status === 'submitting' ? 'Booking...' : 'Book a Demo'}
              </button>

              {status === 'submitted' && (
                <p className="text-green-600 font-semibold mt-2">
                  Thank you! Your demo request was received.
                </p>
              )}

              {status === 'error' && (
                <p className="text-red-600 font-semibold mt-2">
                  Sorry, there was an error. Please try again later.
                </p>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-navy">
                How SignalLoop Helps Revenue Teams
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Clear meeting summaries and action items</li>
                <li>CRM-ready notes and field updates</li>
                <li>Follow-up email draft automation</li>
                <li>Coaching signals and deal risk flags</li>
              </ul>
            </div>
            <img
              src="/images/workflow-sidebar.png"
              alt="SignalLoop workflow highlights"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Features & Trust Section (existing simplified placeholder) */}
        <section className="max-w-7xl mx-auto px-6 py-12 text-center">
          <h3 className="text-xl font-semibold mb-6 text-navy">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Cross-platform capture</h4>
              <p className="text-gray-600">
                Works across Zoom, Google Meet, and Microsoft Teams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Workflow automation</h4>
              <p className="text-gray-600">
                Auto-generated CRM updates, follow-ups, and coaching insights.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Security & compliance</h4>
              <p className="text-gray-600">
                Enterprise-grade security, retention controls, and privacy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-bold mb-2">Easy onboarding</h4>
              <p className="text-gray-600">
                Fast setup and intuitive pilot programs for quick wins.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom lead capture form section */}
        <section className="bg-navy text-white py-12">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Ready to stop turning meetings into admin?
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-black"
              aria-label="Book a demo form bottom"
            >
              <input
                type="text"
                placeholder="Your full name"
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="email"
                placeholder="Work email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="text"
                placeholder="Company"
                required
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <input
                type="text"
                placeholder="Your role"
                required
                value={form.role}
                onChange={(e) => updateField('role', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              />

              <select
                required
                value={form.useCase}
                onChange={(e) => updateField('useCase', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                disabled={status === 'submitting'}
              >
                <option value="" disabled>
                  Select your use case
                </option>
                <option>Sales Follow-up Automation</option>
                <option>CRM Update Automation</option>
                <option>Meeting Coaching Insights</option>
                <option>Customer Success Follow-up</option>
                <option>Other</option>
              </select>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-electric-blue text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
              >
                {status === 'submitting' ? 'Booking...' : 'Book a Demo'}
              </button>

              {status === 'submitted' && (
                <p className="text-green-600 font-semibold mt-2">
                  Thank you! Your demo request was received.
                </p>
              )}

              {status === 'error' && (
                <p className="text-red-600 font-semibold mt-2">
                  Sorry, there was an error. Please try again later.
                </p>
              )}
            </form>
          </div>
        </section>

        <footer className="bg-gray-100 text-center text-sm p-4 text-gray-600">
          &copy; {new Date().getFullYear()} SignalLoop. All rights reserved.
        </footer>
      </main>

      <style jsx>{`
        .bg-navy {
          background-color: #0a1a39;
        }

        .text-navy {
          color: #0a1a39;
        }

        .bg-electric-blue {
          background-color: #007fff;
        }
      `}</style>
    </>
  );
}
