import { useState } from 'react';
import { motion } from 'framer-motion';
import { theme, fadeUp } from '../../theme';
import { Group } from '../primitives/Reveal';

const programmeOptions = [
  'School Application Edge',
  'University Application Edge',
  'Early Career Edge',
  'Early Leader Foundations (1:1)',
  'Junior MBA',
  'Business English & Workplace Fluency',
  'Incubator Pathways',
  'Not Sure Yet',
];

const achievementOptions = [
  'Build Confidence',
  'Develop Leadership Skills',
  'Improve Communication Skills',
  'Competitive School Entry',
  'Successful University Application',
  'Secure a Place at Your Chosen University',
  'Apprenticeships & Vocational Pathways',
  'Secure a Competitive Internship or Work Experience Opportunity',
  'Secure a Competitive Graduate or Early Career Role',
  'Career Development & Progression',
  'Be Identified for Leadership Potential',
  'Develop Greater Presence & Impact in My Role',
  'Develop Executive Presence & Professional Confidence',
  'Entrepreneurship & Business Creation',
  'Family Business Leadership',
  'Public Speaking & Presentations',
  'Academic Development',
  'Professional Skills & Workplace Readiness',
  'Research & Innovation',
  'Social Impact & Community Leadership',
  'Build a Strong Personal Portfolio',
  'Develop a Leadership Project',
  'Clarify Future Goals & Direction',
];

const formatOptions = ['Group Programme', '1-to-1 Mentoring', 'Either'];

const sourceOptions = [
  'School',
  'Parent Recommendation',
  'Friend or Family',
  'Social Media',
  'Website / Google Search',
  'Event or Workshop',
  'Other',
];

const sectionTitle = {
  fontFamily: theme.displayTight,
  fontSize: 'clamp(22px, 2.4vw, 30px)',
  fontWeight: 700,
  letterSpacing: '-0.005em',
  color: theme.ink,
  margin: 0,
  paddingBottom: 'clamp(12px, 1.4vw, 18px)',
  borderBottom: '1px solid rgba(0,0,0,0.14)',
};

const sectionHint = {
  fontFamily: theme.body,
  fontSize: 13,
  color: '#5b5c5a',
  marginTop: 8,
  fontStyle: 'italic',
};

const fieldLabel = {
  fontFamily: theme.body,
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#5b5c5a',
  marginBottom: 10,
  display: 'block',
};

const inputBase = {
  width: '100%',
  padding: '12px 0 14px',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(0,0,0,0.18)',
  color: theme.ink,
  fontFamily: theme.body,
  fontSize: 16,
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color 0.3s var(--xg-ease)',
};

const checkboxLabel = {
  display: 'inline-flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '12px 0',
  cursor: 'pointer',
  fontFamily: theme.body,
  fontSize: 'clamp(14px, 1.4vw, 16px)',
  lineHeight: 1.45,
  color: theme.ink,
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
  marginTop: 3,
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

function CheckGrid({ name, options, values, onToggle, columns = 2 }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        columnGap: 'clamp(24px, 3vw, 40px)',
        rowGap: 0,
      }}
      className="xg-check-grid"
    >
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <label key={opt} style={checkboxLabel}>
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={checked}
              onChange={() => onToggle(opt)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
            />
            <CheckedBox checked={checked} />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

export function ApplyForm() {
  const [form, setForm] = useState({
    guardianName: '',
    guardianEmail: '',
    guardianPhone: '',
    participantName: '',
    age: '',
    institution: '',
    programmes: [],
    achievements: [],
    achievementOther: '',
    goals12mo: '',
    goals5yr: '',
    format: [],
    source: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const toggle = (key) => (value) => setForm((f) => {
    const arr = f[key];
    return {
      ...f,
      [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to backend (Formspree, EmailJS, or your own endpoint).
    // eslint-disable-next-line no-console
    console.log('Apply form submission', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        data-screen-label="Apply Form"
        data-section-theme="light"
        style={{
          background: theme.base, color: theme.ink,
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
              fontSize: 'clamp(28px, 4vw, 52px)',
              lineHeight: 1.1, letterSpacing: '-0.01em',
              margin: 0,
            }}
          >
            Thank you &mdash; your enquiry is in.
          </h2>
          <p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
            style={{
              fontFamily: theme.body, fontSize: 17, lineHeight: 1.55,
              color: '#5b5c5a', marginTop: 24,
            }}
          >
            Nicola and the team will personally review what you&rsquo;ve shared
            and be in touch shortly to discuss the right pathway for your
            goals.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      data-screen-label="Apply Form"
      data-section-theme="light"
      style={{
        background: theme.base, color: theme.ink,
        padding: 'clamp(72px, 11vw, 140px) clamp(20px, 4vw, 40px)',
      }}
    >
      <form onSubmit={onSubmit} style={{ maxWidth: 920, margin: '0 auto' }}>
        <Group style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 6vw, 80px)' }}>

          {/* ── Section: Parent / Guardian Information ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>Parent / Guardian Information</legend>
            <div style={sectionHint}>(Required if the participant is under 18 years of age)</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.4vw, 40px)', marginTop: 'clamp(28px, 3.4vw, 40px)' }}>
              <label style={{ display: 'block' }}>
                <span style={fieldLabel}>Parent / Guardian Name</span>
                <input type="text" value={form.guardianName} onChange={set('guardianName')} style={inputBase} autoComplete="name" />
              </label>
              <div className="xg-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
                <label style={{ display: 'block' }}>
                  <span style={fieldLabel}>Email Address</span>
                  <input type="email" value={form.guardianEmail} onChange={set('guardianEmail')} style={inputBase} autoComplete="email" />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={fieldLabel}>Phone Number</span>
                  <input type="tel" value={form.guardianPhone} onChange={set('guardianPhone')} style={inputBase} autoComplete="tel" />
                </label>
              </div>
            </div>
          </fieldset>

          {/* ── Section: Participant Information ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>Participant Information</legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.4vw, 40px)', marginTop: 'clamp(28px, 3.4vw, 40px)' }}>
              <label style={{ display: 'block' }}>
                <span style={fieldLabel}>Participant Name</span>
                <input required type="text" value={form.participantName} onChange={set('participantName')} style={inputBase} />
              </label>
              <div className="xg-2" style={{ gap: 'clamp(24px, 3vw, 40px)' }}>
                <label style={{ display: 'block' }}>
                  <span style={fieldLabel}>Age</span>
                  <input type="text" inputMode="numeric" value={form.age} onChange={set('age')} style={inputBase} />
                </label>
                <label style={{ display: 'block' }}>
                  <span style={fieldLabel}>Current School, College, University or Workplace</span>
                  <input type="text" value={form.institution} onChange={set('institution')} style={inputBase} />
                </label>
              </div>
            </div>
          </fieldset>

          {/* ── Section: Programme Interest ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>Which Programme Interests You?</legend>
            <div style={sectionHint}>(Select all that apply)</div>

            <div style={{ marginTop: 'clamp(20px, 2.4vw, 28px)' }}>
              <CheckGrid
                name="programmes"
                options={programmeOptions}
                values={form.programmes}
                onToggle={toggle('programmes')}
              />
            </div>
          </fieldset>

          {/* ── Section: Achievements ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>What Are You Hoping To Achieve?</legend>
            <div style={sectionHint}>(Select all that apply)</div>

            <div style={{ marginTop: 'clamp(20px, 2.4vw, 28px)' }}>
              <CheckGrid
                name="achievements"
                options={achievementOptions}
                values={form.achievements}
                onToggle={toggle('achievements')}
              />
            </div>

            <label style={{ display: 'block', marginTop: 'clamp(28px, 3.4vw, 40px)' }}>
              <span style={fieldLabel}>If Other, Please Explain (50 words maximum)</span>
              <textarea
                rows={3}
                value={form.achievementOther}
                onChange={set('achievementOther')}
                maxLength={400}
                style={{ ...inputBase, resize: 'vertical', minHeight: 80, padding: '12px 0 14px', lineHeight: 1.5 }}
              />
            </label>
          </fieldset>

          {/* ── Section: Your Goals ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>Your Goals</legend>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px, 3.4vw, 40px)', marginTop: 'clamp(28px, 3.4vw, 40px)' }}>
              <label style={{ display: 'block' }}>
                <span style={fieldLabel}>What would you like to achieve in the next 12 months?</span>
                <textarea
                  rows={4}
                  value={form.goals12mo}
                  onChange={set('goals12mo')}
                  style={{ ...inputBase, resize: 'vertical', minHeight: 100, padding: '12px 0 14px', lineHeight: 1.55 }}
                />
              </label>
              <label style={{ display: 'block' }}>
                <span style={fieldLabel}>What would you like to achieve in the next 5 years?</span>
                <textarea
                  rows={4}
                  value={form.goals5yr}
                  onChange={set('goals5yr')}
                  style={{ ...inputBase, resize: 'vertical', minHeight: 100, padding: '12px 0 14px', lineHeight: 1.55 }}
                />
              </label>
            </div>
          </fieldset>

          {/* ── Section: Preferred Learning Format ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>Preferred Learning Format</legend>

            <div style={{ marginTop: 'clamp(20px, 2.4vw, 28px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 3vw, 36px)' }}>
              {formatOptions.map((opt) => {
                const checked = form.format.includes(opt);
                return (
                  <label key={opt} style={checkboxLabel}>
                    <input
                      type="checkbox"
                      name="format"
                      value={opt}
                      checked={checked}
                      onChange={() => toggle('format')(opt)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <CheckedBox checked={checked} />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* ── Section: How Did You Hear ── */}
          <fieldset variants={fadeUp} style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ ...sectionTitle, width: '100%' }}>How Did You Hear About XDGE?</legend>

            <div style={{ marginTop: 'clamp(20px, 2.4vw, 28px)' }}>
              <CheckGrid
                name="source"
                options={sourceOptions}
                values={form.source}
                onToggle={toggle('source')}
              />
            </div>
          </fieldset>

          {/* Submit */}
          <div variants={fadeUp} style={{ paddingTop: 8 }}>
            <button
              type="submit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '18px 32px',
                background: theme.ink, color: theme.base,
                border: 'none', borderRadius: 999,
                fontFamily: theme.body, fontSize: 14, fontWeight: 600,
                letterSpacing: '0.04em', textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'transform 0.3s var(--xg-ease)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Submit Your Enquiry
              <span style={{ fontSize: 18, lineHeight: 1 }}>&rarr;</span>
            </button>
          </div>
        </Group>
      </form>
    </section>
  );
}
