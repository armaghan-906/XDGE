import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

const programmeOptions = [
  'School Application Edge',
  'University Application Edge',
  'Early Career Edge',
  'Early Leader Foundations',
  'Junior MBA',
  'Business English & Workplace Fluency',
  'Incubator Pathways',
  'Not Sure Yet',
];

const contactMethods = ['Email', 'Phone', 'Video Call'];

const fieldLabel = {
  fontFamily: theme.body,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: theme.subtitle,
  marginBottom: 10,
  display: 'block',
};

const fieldHint = {
  fontFamily: theme.body,
  fontSize: 12,
  fontWeight: 500,
  color: theme.subtitle,
  marginTop: 6,
};

const inputBase = {
  width: '100%',
  padding: '12px 0 14px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.18)',
  color: theme.base,
  fontFamily: theme.body,
  fontSize: 16,
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color 0.3s var(--xg-ease)',
};

const checkboxLabel = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 0',
  cursor: 'pointer',
  fontFamily: theme.body,
  fontSize: 'clamp(14px, 1.4vw, 16px)',
  color: theme.base,
};

const checkboxBox = {
  width: 18,
  height: 18,
  border: '1px solid rgba(0,0,0,0.45)',
  borderRadius: 2,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: 'transparent',
  transition: 'border-color 0.25s var(--xg-ease), background 0.25s var(--xg-ease)',
};

function CheckedBox({ checked }) {
  return (
    <span
      style={{
        ...checkboxBox,
        borderColor: checked ? theme.ink : 'rgba(0,0,0,0.45)',
        background: checked ? theme.ink : 'transparent',
      }}
      aria-hidden="true"
    >
      {checked && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    guardian: '',
    email: '',
    phone: '',
    location: '',
    age: '',
    message: '',
    programmes: [],
    methods: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key, value) => () => setForm((f) => {
    const arr = f[key];
    return {
      ...f,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // Replace with your backend / Formspree / EmailJS endpoint when ready.
    // For now: log the payload and show a thank-you state.
    // eslint-disable-next-line no-console
    console.log('Contact form submission', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        data-screen-label="Contact Form"
        data-section-theme="dark"
        style={{
          background: theme.dark, color: theme.base,
          padding: 'clamp(96px, 14vw, 160px) clamp(20px, 4vw, 40px)',
        }}
      >
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              fontFamily: theme.displayTight, fontWeight: 600,
              fontSize: 'clamp(42px, 6vw, 78px)',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Thank you &mdash; your message is on its way.
          </h2>
          <p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              fontFamily: theme.body, fontSize: 17, lineHeight: 1.55,
              color: theme.subtitle, marginTop: 24,
            }}
          >
            We&rsquo;ll be in touch shortly. If you&rsquo;d like to skip the queue,
            you can also book a discovery meeting below.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      data-screen-label="Contact Form"
      data-section-theme="dark"
      style={{
        background: theme.dark, color: theme.base,
        padding: 'clamp(72px, 11vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: 880, margin: '0 auto' }}>
        <Group style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.6vw, 44px)' }}>
          {/* Row 1: Your Name */}
          <label variants={fadeUp} style={{ display: 'block' }}>
            <span style={fieldLabel}>Your Name</span>
            <input
              required
              type="text"
              name="name"
              value={form.name}
              onChange={set('name')}
              style={inputBase}
              autoComplete="name"
            />
          </label>

          {/* Row 2: Guardian */}
          <label variants={fadeUp} style={{ display: 'block' }}>
            <span style={fieldLabel}>Parent / Guardian Name</span>
            <input
              type="text"
              name="guardian"
              value={form.guardian}
              onChange={set('guardian')}
              style={inputBase}
            />
            <div style={fieldHint}>(If participant is under 18 years of age)</div>
          </label>

          {/* Row 3: Email + Phone */}
          <div variants={fadeUp} className="xg-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
            <label style={{ display: 'block' }}>
              <span style={fieldLabel}>Email Address</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={set('email')}
                style={inputBase}
                autoComplete="email"
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={fieldLabel}>Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={set('phone')}
                style={inputBase}
                autoComplete="tel"
              />
            </label>
          </div>

          {/* Row 4: Location + Age */}
          <div variants={fadeUp} className="xg-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
            <label style={{ display: 'block' }}>
              <span style={fieldLabel}>Location &mdash; City / Country</span>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={set('location')}
                style={inputBase}
              />
            </label>
            <label style={{ display: 'block' }}>
              <span style={fieldLabel}>Participant Age</span>
              <input
                type="text"
                name="age"
                inputMode="numeric"
                value={form.age}
                onChange={set('age')}
                style={inputBase}
              />
            </label>
          </div>

          {/* Row 5: Programmes (checkboxes) */}
          <div variants={fadeUp}>
            <div style={{ ...fieldLabel, marginBottom: 14 }}>Which Programme Are You Interested In?</div>
            <div className="xg-2" style={{ gap: '0 clamp(24px, 3vw, 40px)' }}>
              {programmeOptions.map((opt) => {
                const checked = form.programmes.includes(opt);
                return (
                  <label key={opt} style={checkboxLabel}>
                    <input
                      type="checkbox"
                      name="programmes"
                      value={opt}
                      checked={checked}
                      onChange={toggle('programmes', opt)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <CheckedBox checked={checked} />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Row 6: Message */}
          <label variants={fadeUp} style={{ display: 'block' }}>
            <span style={fieldLabel}>How Can We Help?</span>
            <textarea
              name="message"
              value={form.message}
              onChange={set('message')}
              rows={5}
              style={{
                ...inputBase,
                resize: 'vertical',
                minHeight: 120,
                padding: '14px 0 16px',
                lineHeight: 1.55,
              }}
            />
          </label>

          {/* Row 7: Preferred contact method */}
          <div variants={fadeUp}>
            <div style={{ ...fieldLabel, marginBottom: 14 }}>Preferred Contact Method</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 3vw, 36px)' }}>
              {contactMethods.map((m) => {
                const checked = form.methods.includes(m);
                return (
                  <label key={m} style={checkboxLabel}>
                    <input
                      type="checkbox"
                      name="methods"
                      value={m}
                      checked={checked}
                      onChange={toggle('methods', m)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <CheckedBox checked={checked} />
                    <span>{m}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <div variants={fadeUp} style={{ paddingTop: 8 }}>
            <button
              type="submit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '16px 28px',
                background: theme.ink, color: theme.base,
                border: 'none', borderRadius: 999,
                fontFamily: theme.body, fontSize: 14, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background 0.3s var(--xg-ease), transform 0.3s var(--xg-ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Send Message
              <span style={{ fontSize: 18, lineHeight: 1 }}>&rarr;</span>
            </button>
          </div>
        </Group>
      </form>
    </section>
  );
}
