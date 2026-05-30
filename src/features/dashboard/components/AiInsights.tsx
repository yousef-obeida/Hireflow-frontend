import type { AiInsight } from '../types';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AiInsightsProps {
  insights: AiInsight[];
}

export const AiInsights = ({ insights }: AiInsightsProps) => {
  return (
    <div className="bg-[#f0f3ff]/50 p-6 rounded-xl shadow-sm border border-[#c1c6d7]/30">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-black">
          <Lightbulb className="w-5 h-5 mr-2 text-[#0058bc]" />
          <h3 className="text-lg font-semibold">AI Insights</h3>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-white p-4 rounded-lg border border-[#e2e8f0] shadow-sm">
            <p className="text-slate-700 text-sm leading-relaxed">
              {/* Simple keyword highlighting (just as an example based on the mock text) */}
              {insight.message.split(/((?:UX Designer|DevOps Engineer))/).map((part, i) => 
                ['UX Designer', 'DevOps Engineer'].includes(part) ? (
                  <strong key={i} className="font-semibold text-slate-900">{part}</strong>
                ) : (
                  part
                )
              )}
            </p>
            {insight.action_link && (
              <Link to={insight.action_link} className="inline-flex items-center text-[#0058bc] hover:text-[#0070eb] font-medium text-sm mt-3 group">
                Review Now 
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
