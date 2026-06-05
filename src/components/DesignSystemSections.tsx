/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Info, Sparkles, Send, Trash2, CalendarCheck } from 'lucide-react';
import type { DesignCandidate as Candidate, BadgeVariant, FormValues } from '@/types';
import { Button } from '@/components/ui/Button';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { CandidateCard } from '@/features/candidates/components/CandidateCard';
import { CandidateTable } from '@/features/candidates/components/CandidateTable';

// --- TYPOGRAPHY SECTION ---
export const TypographySection: React.FC = () => {
  const [typedText, setTypedText] = useState('');

  return (
    <section id="typography" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Typography</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50 space-y-6">
        {/* Helper custom preview */}
        <div className="bg-[#f0f3ff]/50 p-4 rounded-xl border border-blue-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#0058bc] shrink-0" />
            <p className="text-xs text-[#414755] font-medium leading-relaxed">
              <strong>Specimen Font Stack:</strong> Headings pair <strong>Hanken Grotesk</strong> (modern editorial geometric) with <strong>Inter</strong> for clean, high-legibility body copy.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <input
              type="text"
              placeholder="Type here to test overall font rendering..."
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              className="px-4 py-2 text-xs bg-white border border-[#c1c6d7] rounded-lg w-full md:w-64 focus:border-[#0058bc] outline-none"
            />
          </div>
        </div>

        {/* Display Specimen */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline border-b border-gray-100 pb-5">
            <span className="font-mono text-xs text-[#717786] font-medium">Display</span>
            <div className="lg:col-span-3">
              <p className="font-sans font-bold text-4xl sm:text-5xl text-[#111c2d] tracking-tight leading-none">
                {typedText || 'The Intelligence of Flow'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Hanken Grotesk 700 / Letter Spacing: -0.02em</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline border-b border-gray-100 pb-5">
            <span className="font-mono text-xs text-[#717786] font-medium">Headline Large</span>
            <div className="lg:col-span-3">
              <p className="font-sans font-semibold text-2xl sm:text-3xl text-[#111c2d] tracking-tight">
                {typedText || 'Streamlining Talent Acquisition'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Hanken Grotesk 600 / Letter Spacing: -0.01em</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline border-b border-gray-100 pb-5">
            <span className="font-mono text-xs text-[#717786] font-medium">Headline Medium</span>
            <div className="lg:col-span-3">
              <p className="font-sans font-semibold text-xl sm:text-2xl text-[#111c2d]">
                {typedText || 'Candidate Pipeline Overview'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Hanken Grotesk 600</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline border-b border-gray-100 pb-5">
            <span className="font-mono text-xs text-[#717786] font-medium">Body Large</span>
            <div className="lg:col-span-3">
              <p className="font-sans text-base text-[#414755] leading-relaxed">
                {typedText || 'Our intelligent algorithm prioritizes top-tier candidates for your specific tech stack.'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Inter 400 / Line Height: 28px</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline border-b border-gray-100 pb-5">
            <span className="font-mono text-xs text-[#717786] font-medium">Body Medium</span>
            <div className="lg:col-span-3">
              <p className="font-sans text-sm text-[#414755] leading-relaxed">
                {typedText || 'View the detailed journey of each applicant through the custom recruitment funnel.'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Inter 400 / Line Height: 24px</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-baseline">
            <span className="font-mono text-xs text-[#717786] font-medium">Label Medium</span>
            <div className="lg:col-span-3">
              <p className="font-mono text-xs font-semibold text-[#111c2d] uppercase tracking-widest leading-none">
                {typedText || 'INTERVIEW SCHEDULED'}
              </p>
              <span className="block text-[10px] text-gray-400 mt-1">Font: Geist Mono 500 / Letter Spacing: 0.02em</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- COLORS SECTION ---
interface SwatchProps {
  name: string;
  hex: string;
  className: string;
}

export const ColorSwatch: React.FC<SwatchProps> = ({ name, hex, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <div className="flex flex-col gap-2 group relative">
      <div 
        className={`h-24 w-full rounded-xl shadow-sm border border-black/5 cursor-pointer relative overflow-hidden transition-transform duration-200 group-hover:scale-[1.02] ${className}`}
        onClick={handleCopy}
        title="Click to copy HEX value"
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 flex items-center justify-center transition-colors">
          <span className="text-white shrink-0 opacity-0 group-hover:opacity-100 font-semibold text-xs flex items-center gap-1 bg-[#111c2d]/85 px-2.5 py-1.5 rounded-lg shadow-sm">
            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-[#111c2d] truncate">{name}</p>
        <p className="text-[11px] text-[#717786] font-mono mt-0.5">{hex}</p>
      </div>
    </div>
  );
};

export const ColorsSection: React.FC = () => {
  return (
    <section id="colors" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Colors</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <ColorSwatch name="Primary" hex="#0058BC" className="bg-[#0058bc]" />
          <ColorSwatch name="Secondary" hex="#505F76" className="bg-[#505f76]" />
          <ColorSwatch name="Surface Container" hex="#E7EEFF" className="bg-[#e7eeff]" />
          <ColorSwatch name="Error" hex="#BA1A1A" className="bg-[#ba1a1a]" />
          <ColorSwatch name="Surface Bright" hex="#F9F9FF" className="bg-[#f9f9ff] border border-gray-100" />
        </div>
      </div>
    </section>
  );
};


// --- BUTTONS SECTION ---
export const ButtonsSection: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const triggerLog = (variantName: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] Clicked ${variantName} Button`, ...prev.slice(0, 4)]);
  };

  return (
    <section id="buttons" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Buttons</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Buttons Demos */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider">Primary</span>
              <Button variant="primary" className="py-3" onClick={() => triggerLog('Primary')}>
                Send Offer
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider">Secondary</span>
              <Button variant="secondary" className="py-3" onClick={() => triggerLog('Secondary')}>
                Save Draft
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider">Outline</span>
              <Button variant="outline" className="py-3" onClick={() => triggerLog('Outline')}>
                View Details
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-[#717786] font-semibold uppercase tracking-wider">Ghost</span>
              <Button variant="ghost" className="py-3" onClick={() => triggerLog('Ghost')}>
                Skip Step
              </Button>
            </div>
          </div>
        </div>

        {/* Console logs box */}
        <div className="bg-[#111c2d] rounded-2xl p-5 text-gray-300 flex flex-col justify-between shadow-sm min-h-[160px]">
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#d8e3fb] mb-3 flex items-center justify-between">
              <span>Interactive Status Logs</span>
              <span className="inline-flex w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h4>
            <div className="space-y-2 font-mono text-[11px] leading-relaxed max-h-[110px] overflow-y-auto">
              {logs.length === 0 ? (
                <p className="text-gray-500 italic">Click any button spec to view real-time log feed.</p>
              ) : (
                logs.map((log, idx) => (
                  <motion.p
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx}
                    className="text-gray-400"
                  >
                    {log}
                  </motion.p>
                ))
              )}
            </div>
          </div>
          {logs.length > 0 && (
            <button
              onClick={() => setLogs([])}
              className="text-[10px] text-[#adc6ff] font-mono hover:text-white transition-colors cursor-pointer text-left uppercase font-bold tracking-wider mt-2 block"
            >
              Clear Logs
            </button>
          )}
        </div>
      </div>
    </section>
  );
};


// --- FORM ELEMENTS & INTERACTIVE SUBMIT SECTION ---
interface FormElementsSectionProps {
  onAddCandidate: (cand: Omit<Candidate, 'id'>) => void;
}

export const FormSection: React.FC<FormElementsSectionProps> = ({ onAddCandidate }) => {
  const [formData, setFormData] = useState<FormValues>({
    fullName: '',
    jobLevel: 'Senior Software Engineer',
    privateNote: '',
    agreeToPolicy: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [successMsg, setSuccessMsg] = useState('');

  const handlePreset = (name: string, level: typeof formData.jobLevel, note: string) => {
    setFormData({
      fullName: name,
      jobLevel: level,
      privateNote: note,
      agreeToPolicy: true,
    });
    setErrors({});
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      jobLevel: 'Senior Software Engineer',
      privateNote: '',
      agreeToPolicy: false,
    });
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full Name must be at least 3 characters';
    }

    if (!formData.agreeToPolicy) {
      newErrors.agreeToPolicy = 'You must agree to the privacy policy to submit';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit candidate data up
    const applicantScore = parseFloat((7.0 + Math.random() * 2.8).toFixed(1)); // Generate high scores 7.0 - 9.8
    const statusChoices = ['New', 'Reviewing', 'Screening'];
    const selectedStatus = statusChoices[Math.floor(Math.random() * statusChoices.length)];

    onAddCandidate({
      name: formData.fullName,
      role: formData.jobLevel,
      experience: formData.jobLevel === 'Senior Software Engineer' ? '6 years exp' : formData.jobLevel === 'Lead Product Designer' ? '8 years exp' : '10 years exp',
      score: applicantScore,
      status: selectedStatus,
      stage: 'applied',
      source: 'Ref',
    });

    setSuccessMsg(`Successfully added ${formData.fullName} into lists!`);
    handleReset();

    setTimeout(() => {
      setSuccessMsg('');
    }, 4500);
  };

  return (
    <section id="forms" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Form Elements</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50">
        
        {/* Dynamic Preset Bar */}
        <div className="mb-6 pb-6 border-b border-gray-100 flex flex-wrap gap-2 items-center">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#717786] mr-2">Try Presets:</span>
          <button
            type="button"
            onClick={() => handlePreset('Sarah J. Mitchell', 'Senior Software Engineer', 'Impressive GitHub portfolio. Express expert.')}
            className="px-3 py-1.5 bg-[#f0f3ff] hover:bg-[#d0e1fb] text-xs font-semibold rounded-lg text-[#0058bc] transition-colors"
          >
            Sarah J. (Node Eng)
          </button>
          <button
            type="button"
            onClick={() => handlePreset('Liam Henderson', 'Lead Product Designer', 'Awesome design systems track record. Portfolio is very clean.')}
            className="px-3 py-1.5 bg-[#f0f3ff] hover:bg-[#d0e1fb] text-xs font-semibold rounded-lg text-[#0058bc] transition-colors"
          >
            Liam H. (Designer)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Left Column */}
          <div className="space-y-5">
            <Input
              id="candidate-fullname"
              label="Full Name"
              placeholder="e.g. Sarah J. Mitchell"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                setErrors({ ...errors, fullName: undefined });
              }}
              error={errors.fullName}
            />

            <Select
              id="candidate-joblevel"
              label="Job Level"
              options={[
                { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
                { value: 'Lead Product Designer', label: 'Lead Product Designer' },
                { value: 'Staff Data Scientist', label: 'Staff Data Scientist' },
              ]}
              value={formData.jobLevel}
              onChange={(e) => setFormData({ ...formData, jobLevel: e.target.value as FormValues['jobLevel'] })}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-5 flex flex-col justify-between">
            <Textarea
              id="candidate-note"
              label="Private Note"
              placeholder="Add a confidential note..."
              value={formData.privateNote}
              onChange={(e) => setFormData({ ...formData, privateNote: e.target.value })}
              rows={4}
            />

            <div className="pt-2">
              <Checkbox
                id="candidate-consent"
                label="I agree to the internal hiring privacy policy"
                checked={formData.agreeToPolicy}
                onChange={(e) => {
                  setFormData({ ...formData, agreeToPolicy: e.target.checked });
                  setErrors({ ...errors, agreeToPolicy: undefined });
                }}
                error={errors.agreeToPolicy}
              />
            </div>

            {/* Submit Block */}
            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="ghost" onClick={handleReset}>
                Reset
              </Button>
              <Button type="submit" variant="primary" className="px-6 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Add Applicant
              </Button>
            </div>
          </div>
        </form>

        {/* Action success alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 p-4 bg-green-50 text-green-800 border border-green-200 rounded-xl flex items-center gap-3 text-sm font-medium"
            >
              <Sparkles className="w-5 h-5 text-green-600 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


// --- BADGES SECTION ---
interface BadgesSectionProps {
  selectedFilter: BadgeVariant | 'all';
  onFilterChange: (variant: BadgeVariant | 'all') => void;
}

export const BadgesSection: React.FC<BadgesSectionProps> = ({ selectedFilter, onFilterChange }) => {
  const badgeTypes: { label: string; value: BadgeVariant | 'all' }[] = [
    { label: 'All Candidates', value: 'all' },
    { label: 'Applied', value: 'applied' },
    { label: 'Interview', value: 'interview' },
    { label: 'Hired', value: 'hired' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Draft', value: 'draft' },
  ];

  return (
    <section id="badges" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Badges & Status</h2>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100/50 flex flex-wrap gap-4 items-center">
        <p className="text-xs text-[#717786] font-semibold uppercase tracking-wider mr-2">Click to dynamic filter pipelines:</p>
        <div className="flex flex-wrap gap-3">
          {badgeTypes.map((type) => {
            const isSelected = selectedFilter === type.value;
            return (
              <button
                key={type.value}
                onClick={() => onFilterChange(type.value)}
                className={`py-1.5 px-4 rounded-full text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#0058bc] text-white border-[#0058bc] shadow-sm scale-105'
                    : 'bg-gray-50 hover:bg-[#f0f3ff] text-[#414755] border-[#c1c6d7]/30'
                }`}
              >
                {type.value !== 'all' && type.value !== 'draft' && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected
                        ? 'bg-white'
                        : type.value === 'applied'
                        ? 'bg-[#0058bc]'
                        : type.value === 'interview'
                        ? 'bg-[#d97706]'
                        : type.value === 'hired'
                        ? 'bg-[#16a34a]'
                        : 'bg-[#ba1a1a]'
                    }`}
                  />
                )}
                {type.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};


// --- DATA DISPLAY SECTION ---
interface DataDisplayProps {
  candidates: Candidate[];
  onDeleteCandidate: (id: string) => void;
  onFilterChange: (variant: BadgeVariant | 'all') => void;
}

export const DataDisplaySection: React.FC<DataDisplayProps> = ({
  candidates,
  onDeleteCandidate,
}) => {
  const [scheduleModal, setScheduleModal] = useState<Candidate | null>(null);
  const [successScheduledMsg, setSuccessScheduledMsg] = useState('');

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleModal) return;

    setSuccessScheduledMsg(`Interview successfully scheduled with ${scheduleModal.name}!`);
    setTimeout(() => {
      setSuccessScheduledMsg('');
      setScheduleModal(null);
    }, 2500);
  };

  return (
    <section id="data" className="mb-12 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="h-8 w-1 bg-[#0058bc] rounded-full" />
        <h2 className="font-sans font-bold text-2xl text-[#111c2d]">Data Display</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Elena Rodriguez / Primary Card Representation (Span 5) */}
        <div className="xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#717786]">Featured Candidate Detail</h4>
            <span className="text-[11px] font-mono text-gray-400">Card View Spec</span>
          </div>
          
          {candidates.length > 0 ? (
            <div className="relative group">
              <CandidateCard
                candidate={candidates[0]}
                onSchedule={(cand) => setScheduleModal(cand)}
                onMoreActions={(cand) => {
                  if (confirm(`Remove custom candidate ${cand.name}?`)) {
                    onDeleteCandidate(cand.id);
                  }
                }}
              />
              <span className="absolute -top-2.5 -right-2 bg-blue-100 border border-blue-200 text-[#0058bc] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                Featured
              </span>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-dashed border-gray-200 text-center flex flex-col items-center justify-center min-h-[250px]">
              <Trash2 className="w-8 h-8 text-gray-300 mb-2" />
              <p className="text-sm text-gray-400 font-medium">No candidates in this view. Use the form elements to create one.</p>
            </div>
          )}
        </div>

        {/* Table representation segment (Span 7) */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#717786]">Pipelines Table Grid</h4>
            <span className="text-[11px] font-mono text-gray-400">Total View: {candidates.length} item(s)</span>
          </div>

          <CandidateTable
            candidates={candidates}
            onAction={(cand, type) => {
              if (type === 'view_cv') {
                alert(`Opening CV Reader mock workspace for candidate: ${cand.name}`);
              } else {
                setScheduleModal(cand);
              }
            }}
          />
        </div>
      </div>

      {/* SCHEDULE INTERVIEW POPUP MODAL (Clean Architecture) */}
      <AnimatePresence>
        {scheduleModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md border border-gray-100"
            >
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                <div className="w-10 h-10 bg-[#e7eeff] rounded-full flex items-center justify-center text-[#0058bc]">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#111c2d]">Schedule Interview</h3>
                  <p className="text-xs text-[#717786]">With candidate {scheduleModal.name}</p>
                </div>
              </div>

              {successScheduledMsg ? (
                <div className="py-4 text-center">
                  <span className="inline-flex items-center justify-center w-12 h-12 bg-green-50 text-green-600 rounded-full mb-3">
                    <Check className="w-6 h-6 animate-bounce" />
                  </span>
                  <p className="text-sm font-semibold text-green-800">{successScheduledMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleScheduleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#111c2d]">Meeting Title</label>
                    <input
                      type="text"
                      required
                      defaultValue={`Intro Interview | ${scheduleModal.name} x Hireflow`}
                      className="w-full bg-[#f0f3ff] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#0058bc]/10 focus:border-[#0058bc] outline-none font-medium"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111c2d]">Meeting Date</label>
                      <input
                        type="date"
                        required
                        defaultValue="2026-06-05"
                        className="w-full bg-[#f0f3ff] border border-gray-200 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-[#0058bc]/10 focus:border-[#0058bc] outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#111c2d]">Time Zone</label>
                      <input
                        type="text"
                        disabled
                        value="UTC (Greenwich)"
                        className="w-full bg-[#f0f3ff]/50 text-gray-400 border border-gray-100 rounded-lg px-3 py-2 text-xs outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-4 border-t border-gray-100 mt-4">
                    <Button variant="ghost" className="py-2" onClick={() => setScheduleModal(null)}>
                      Cancel
                    </Button>
                    <Button variant="primary" type="submit" className="py-2 px-4">
                      Confirm Schedule
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
