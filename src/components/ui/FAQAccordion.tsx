'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FaqItem } from '@/types';

type FAQAccordionProps = {
  items: FaqItem[];
  tone?: 'light' | 'dark';
};

export function FAQAccordion({ items, tone = 'dark' }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const isDarkBg = tone === 'light';

  return (
    <div
      className={cn(
        'divide-y',
        isDarkBg ? 'divide-white/12' : 'divide-ink-900/10',
      )}
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  'flex w-full items-center justify-between gap-4 py-5 text-left font-sans text-base font-medium transition-colors',
                  isDarkBg ? 'text-white hover:text-champagne' : 'text-ink-900 hover:text-champagne-dark',
                )}
              >
                <span>{item.question}</span>
                <Plus
                  className={cn(
                    'h-5 w-5 shrink-0 text-champagne transition-transform duration-300 ease-premium',
                    isOpen && 'rotate-45',
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                'pb-6 pr-8 text-sm leading-relaxed',
                isDarkBg ? 'text-mist' : 'text-ink-800/75',
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
