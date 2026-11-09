import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Filter } from 'lucide-react';
import { REVIEWS } from '../data/productData';

export const CustomerReviews: React.FC = () => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews =
    filterRating === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => r.rating === filterRating);

  return (
    <section id="customer-reviews" className="bg-[#F7F5EE] py-12 sm:py-16 border-b border-[#E7E4DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E7E4DC]">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-[0.25em] text-[#735D43]">
              Real Customer Feedback
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#141414]">
              Customer Reviews from Across Nigeria
            </h2>
          </div>

          {/* Rating Summary Card */}
          <div className="flex items-center gap-4 bg-white p-4 border border-[#E7E4DC] shrink-0">
            <div className="text-center pr-4 border-r border-[#E7E4DC]">
              <div className="font-editorial text-3xl font-bold text-[#141414] tabular-nums">4.9</div>
              <div className="flex text-[#D97706] text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-xs space-y-0.5">
              <div className="font-bold text-[#141414]">348 Verified Purchases</div>
              <div className="text-[#52B788] font-medium flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> 98.4% Would Recommend
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#736E65] font-medium flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          <button
            type="button"
            onClick={() => setFilterRating('all')}
            className={`px-3 py-1.5 font-medium uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
              filterRating === 'all'
                ? 'bg-[#141414] text-white'
                : 'bg-white text-[#4A4742] border border-[#DDD5C5] hover:border-[#141414]'
            }`}
          >
            All Reviews ({REVIEWS.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterRating(5)}
            className={`px-3 py-1.5 font-medium uppercase tracking-wider transition-colors shrink-0 cursor-pointer ${
              filterRating === 5
                ? 'bg-[#141414] text-white'
                : 'bg-white text-[#4A4742] border border-[#DDD5C5] hover:border-[#141414]'
            }`}
          >
            5 Stars Only
          </button>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white border border-[#E7E4DC] space-y-4 hover:border-[#8C877E] transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex text-[#D97706] mb-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <h3 className="font-editorial text-base font-bold text-[#141414] leading-snug">
                    "{rev.title}"
                  </h3>
                </div>
                <span className="text-[11px] text-[#8C877E] whitespace-nowrap font-mono">
                  {rev.date}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#545048] leading-relaxed">
                {rev.comment}
              </p>

              <div className="pt-3 border-t border-[#F3EFE7] flex flex-wrap items-center justify-between gap-2 text-xs text-[#736E65]">
                <div className="flex items-center gap-1.5 font-semibold text-[#141414]">
                  <span>{rev.author}</span>
                  <span className="text-[#C2BEB4]">·</span>
                  <span className="text-[#735D43] font-normal">{rev.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-[#E7F6ED] text-[#144729] font-bold px-1.5 py-0.5 uppercase tracking-wide flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#52B788]" /> Verified POD Buyer
                  </span>
                  <span className="text-[11px] text-[#8C877E]">Size {rev.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
