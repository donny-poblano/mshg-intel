import { Card } from '@/components/Card';

export default function IntelPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Market Intel</h1>
        <p className="text-sm text-gray-500 mt-1">Competitive intelligence &middot; Coming soon</p>
      </div>

      <Card className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 mb-4">
          <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Competitive intelligence powered by the Scout agent. This section will surface competitor activity,
          local market trends, and strategic insights for Real Dough Pizza Co.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
            Competitor social monitoring
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
            Market trend analysis
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
            Strategic alerts
          </div>
        </div>
      </Card>
    </div>
  );
}
