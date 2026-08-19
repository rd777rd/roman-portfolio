import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  ArrowRight,
  Clock,
  Code,
  CheckCircle,
} from 'lucide-react';
import {
  PROJECT_TYPES,
  COMPONENT_ADD_ONS,
  MAX_COMBINED_DISCOUNT_RATE,
} from './calculator/calculatorData';

interface HireMeCalculatorProps {
  onApplyEstimate?: (text: string) => void;
}

export default function HireMeCalculator({ onApplyEstimate }: HireMeCalculatorProps) {
  const [selectedType, setSelectedType] = useState<string>('fullstack');
  const [urgency, setUrgency] = useState<'standard' | 'express' | 'extended'>('standard');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['ai', 'db']);

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const currentType = PROJECT_TYPES.find(p => p.id === selectedType) || PROJECT_TYPES[1];

  const getUrgencyMultiplier = () => {
    if (urgency === 'express') return 1.35;
    if (urgency === 'extended') return 0.90;
    return 1.0;
  };

  const getUrgencyWeeks = () => {
    const baseWeeks = Math.ceil(currentType.baseHours / 30);
    if (urgency === 'express') return Math.max(1, Math.floor(baseWeeks * 0.6));
    if (urgency === 'extended') return Math.ceil(baseWeeks * 1.5);
    return baseWeeks;
  };

  const calculateHours = () => {
    let multiplier = 1;
    if (urgency === 'express') multiplier = 0.8;
    if (urgency === 'extended') multiplier = 1.2;
    return Math.ceil(currentType.baseHours * multiplier);
  };

  const estimatedHours = calculateHours();
  const deliveryWeeks = getUrgencyWeeks();
  const baseRate = currentType.baseRate;
  const urgencyMultiplier = getUrgencyMultiplier();

  const rawBaseCost = estimatedHours * baseRate * urgencyMultiplier;
  const rawAddOnCost = selectedAddOns.reduce((sum, addOnId) => {
    const addOn = COMPONENT_ADD_ONS.find(a => a.id === addOnId);
    return sum + (addOn ? addOn.price : 0);
  }, 0);

  let bundleDiscountPercentage = 0;
  if (selectedAddOns.length === 2) bundleDiscountPercentage = 0.05;
  else if (selectedAddOns.length === 3) bundleDiscountPercentage = 0.10;
  else if (selectedAddOns.length >= 4) bundleDiscountPercentage = 0.15;
  const bundleDiscountAmount = Math.ceil(rawAddOnCost * bundleDiscountPercentage);

  let volumeDiscountPercentage = 0;
  if (estimatedHours >= 100) volumeDiscountPercentage = 0.10;
  else if (estimatedHours >= 50) volumeDiscountPercentage = 0.05;
  const volumeDiscountAmount = Math.ceil(rawBaseCost * volumeDiscountPercentage);

  // Combined discounts are capped as a share of the pre-discount subtotal —
  // see MAX_COMBINED_DISCOUNT_RATE for why.
  const subtotal = rawBaseCost + rawAddOnCost;
  const uncappedSavings = bundleDiscountAmount + volumeDiscountAmount;
  const discountCapAmount = Math.floor(subtotal * MAX_COMBINED_DISCOUNT_RATE);
  const totalSavings = Math.min(uncappedSavings, discountCapAmount);
  const grandTotal = Math.max(0, Math.ceil(subtotal - totalSavings));

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleApplyEstimate = () => {
    const calculatedText = `Hi Roman! I calculated a custom project estimate using your tool:

- Core System: ${currentType.name} ($${currentType.baseRate}/hr base rate)
- Projected Effort: ~${estimatedHours} hours (~${deliveryWeeks} weeks target)
- Priority Multiplier: ${urgency.toUpperCase()} (${urgency === 'express' ? '+35% express timeline' : urgency === 'extended' ? '-10% flexible schedule' : 'Standard Speed'})

Financial Breakdown:
  • Core Base Rate Cost: $${Math.ceil(rawBaseCost).toLocaleString()}
  • Feature Modules Cost: $${rawAddOnCost.toLocaleString()}
  • Total Discount Applied: -$${totalSavings.toLocaleString()}
  =====================================
  • Handcrafted Total Budget: $${grandTotal.toLocaleString()} (Total Savings: $${totalSavings.toLocaleString()}!)

Let's discuss setting up a kickoff meeting for this contract!`;

    if (onApplyEstimate) {
      onApplyEstimate(calculatedText);
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const messageField = document.getElementById('contact-message') as HTMLTextAreaElement | null;
          messageField?.focus();
        }, 350);

        setCopiedNotification('Project estimate parameters loaded into contact form! Review and send.');
        setTimeout(() => setCopiedNotification(null), 6000);
        return;
      }
    }

    navigator.clipboard.writeText(calculatedText);
    setCopiedNotification('Text copied to clipboard! Paste it into the message form below.');
    setTimeout(() => setCopiedNotification(null), 6000);
  };

  return (
    <section id="sandbox" className="py-24 relative bg-zinc-950/20 border-t border-zinc-900">
      <div className="absolute inset-0 bg-radial-at-t from-blue-950/10 via-zinc-950 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono text-blue-400">
            <Calculator size={13} />
            Interactive Portfolio Engine
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-100 tracking-tight">
            System Scope Estimator<span className="text-blue-500">_</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Configure a project below to get a live, itemized cost and timeline estimate for custom development work.
          </p>
          <p className="text-zinc-500 text-xs font-mono">
            For freelance &amp; contract engagement inquiries — see{' '}
            <a href="#projects" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              Case Studies
            </a>{' '}
            above for full-time work samples.
          </p>
        </div>

        {/* Core Multi-col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Controls Config (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="space-y-6">

              {/* Step 1: Project Type Selection */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                  [01] Select Core System Architecture
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        selectedType === type.id
                          ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)] text-zinc-100'
                          : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-heading font-bold text-sm text-zinc-200 block">
                          {type.name}
                        </span>
                        <span className="font-mono text-xs text-blue-400 font-semibold">
                          ${type.baseRate}/hr
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {type.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Delivery Timeline Urgency */}
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                  [02] Delivery Velocity Matrix
                </span>
                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  {[
                    { id: 'extended', label: 'Extended Flex', desc: '90% Cost / Standard Iteration', icon: <Clock size={12} /> },
                    { id: 'standard', label: 'Standard Sprint', desc: '100% Cost / Default Speed', icon: <CheckCircle size={12} /> },
                    { id: 'express', label: 'Express Priority', desc: '135% Cost / Intensive Push', icon: <Sparkles size={12} /> },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setUrgency(item.id as 'standard' | 'express' | 'extended')}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        urgency === item.id
                          ? 'bg-zinc-800 text-zinc-100 border-zinc-700 font-black'
                          : 'bg-zinc-950 text-zinc-400 border-zinc-950 hover:text-zinc-300 hover:border-zinc-800'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-1.5 font-heading text-[11px] font-bold">
                        {item.icon} {item.label}
                      </span>
                      <span className="text-[9px] block text-zinc-400 mt-1">
                        {item.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Scope Custom Add-ons */}
              <div className="space-y-3 pt-4 border-t border-zinc-900">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                  [03] Modular Add-On Feature Specs
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COMPONENT_ADD_ONS.map((addOn) => {
                    const isChecked = selectedAddOns.includes(addOn.id);
                    return (
                      <button
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-zinc-900 border-blue-500/50 text-zinc-200'
                            : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-400'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="font-sans font-semibold text-xs text-zinc-300">
                            {addOn.name}
                          </span>
                          <span className="block text-[10px] text-zinc-400 leading-tight">
                            {addOn.desc}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-blue-400 pb-0.5 ml-3">
                          +${addOn.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Sidebar display Output Ledger (Right 5 Columns) */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-6 bg-gradient-to-r from-blue-900/10 to-indigo-900/10 border-b border-zinc-800 relative text-zinc-100 flex items-center justify-between">
              <div>
                <span className="font-display font-light text-xl tracking-wide uppercase">ESTIMATE LEDGER</span>
                <p className="text-[10px] font-mono text-zinc-400 mt-1">
                  LIVE ESTIMATE — CONTRACT &amp; FREELANCE WORK
                </p>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded">
                DRAFT // ACTIVE
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Architecture selected metadata */}
              <div className="space-y-1.5 font-mono text-xs border-b border-zinc-800 pb-4">
                <span className="text-zinc-400 uppercase tracking-widest text-[10px] block">Project Designation</span>
                <span className="text-zinc-200 font-bold text-sm block">{currentType.name}</span>
                <span className="text-zinc-400">Hourly Rate Base: ${currentType.baseRate}/hr</span>
              </div>

              {/* Delivery stats */}
              <div className="grid grid-cols-2 gap-4 border-b border-zinc-800 pb-4">
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-zinc-400 uppercase tracking-widest text-[9px] block">Estimated Effort</span>
                  <div className="flex items-center gap-1.5 text-zinc-200 font-bold">
                    <Code size={14} className="text-blue-500" />
                    <span>~{estimatedHours} Hours</span>
                  </div>
                </div>
                <div className="space-y-1 font-mono text-xs text-right">
                  <span className="text-zinc-400 uppercase tracking-widest text-[9px] block">Target Delivery</span>
                  <div className="flex items-center gap-1.5 justify-end text-zinc-200 font-bold">
                    <Clock size={14} className="text-purple-500" />
                    <span>~{deliveryWeeks} Weeks</span>
                  </div>
                </div>
              </div>

              {/* Scope Cost Breakdown */}
              <div className="space-y-2 text-xs font-mono border-b border-zinc-800 pb-4">
                <span className="text-zinc-400 uppercase tracking-widest text-[9px] block">Itemized Cost Summary</span>

                <div className="space-y-1 divide-y divide-zinc-900">
                  <div className="flex justify-between py-1.5 text-zinc-400">
                    <span>Base Stack Core Cost:</span>
                    <span className="text-zinc-200">
                      ${Math.ceil(rawBaseCost).toLocaleString()}
                    </span>
                  </div>

                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between py-1.5 text-zinc-400">
                      <span>Feature Modules Cost:</span>
                      <span className="text-zinc-200">${rawAddOnCost.toLocaleString()}</span>
                    </div>
                  )}

                  {totalSavings > 0 && (
                    <div className="flex justify-between py-1.5 text-blue-400 font-medium bg-blue-500/5 px-2 rounded mt-1 border border-blue-500/10">
                      <span>Total Dynamic Savings:</span>
                      <span className="font-bold">-${totalSavings.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between pt-3 font-bold text-sm text-zinc-200 border-t border-zinc-800">
                    <span className="text-zinc-100 font-black">Grand Estimate:</span>
                    <span className="text-blue-400 font-black text-lg">
                      ${grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Notice Indicator */}
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-mono text-zinc-400 leading-normal space-y-2">
                <p>✓ Clicking the action button below maps these core parameters and scrolls down to the dispatch form.</p>
              </div>

              {/* Copy / Map parameters action */}
              <div className="space-y-3 pt-2">
                {copiedNotification && (
                  <span className="text-[10px] font-mono text-green-400 text-center block animate-pulse">
                    ✓ {copiedNotification}
                  </span>
                )}

                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  className="w-full px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-zinc-100 transition-all font-semibold rounded-xl text-xs font-mono flex items-center justify-center gap-2 transform hover:-translate-y-0.5 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] cursor-pointer"
                >
                  Lock in Scope Estimate <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
