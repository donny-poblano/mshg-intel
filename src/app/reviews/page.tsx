import { Card, SectionHeader } from '@/components/Card';
import fs from 'fs';
import path from 'path';

function loadReviews() {
  const filePath = path.join(process.cwd(), 'data', 'reviews.json');
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch { return null; }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingBadge({ rating }: { rating: number }) {
  const color = rating >= 4.5 ? 'bg-green-100 text-green-800' :
                rating >= 4.0 ? 'bg-blue-100 text-blue-800' :
                rating >= 3.0 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800';
  return <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${color}`}>{rating}</span>;
}

function SentimentBadge({ rating }: { rating: number }) {
  if (rating >= 4) return <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 font-semibold">Positive</span>;
  if (rating >= 3) return <span className="text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 font-semibold">Mixed</span>;
  return <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-semibold">Negative</span>;
}

export default function ReviewsPage() {
  const data = loadReviews();

  if (!data) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-sm text-gray-500 mt-1">Awaiting first Sentinel agent run</p>
        </div>
        <Card><p className="text-gray-400 text-center py-8">No review data yet. Sentinel runs every 6 hours.</p></Card>
      </div>
    );
  }

  const restaurants = Object.entries(data).filter(([, v]: [string, any]) => !v.error);
  const allReviews = restaurants.flatMap(([slug, r]: [string, any]) =>
    (r.reviews || []).map((rev: any) => ({ ...rev, restaurant: r.name, slug, overallRating: r.rating }))
  );
  const negativeReviews = allReviews.filter((r: any) => r.rating <= 2);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reviews &amp; Reputation</h1>
        <p className="text-sm text-gray-500 mt-1">Google Places reviews across all locations</p>
      </div>

      {/* Negative Alerts */}
      {negativeReviews.length > 0 && (
        <>
          <SectionHeader title="⚠️ Needs Response" subtitle={`${negativeReviews.length} negative review${negativeReviews.length > 1 ? 's' : ''}`} />
          <div className="space-y-3 mb-8">
            {negativeReviews.map((rev: any, i: number) => (
              <Card key={i} className="border-l-4 border-l-red-500">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <StarRating rating={rev.rating} />
                    <span className="text-xs text-gray-500">{rev.restaurant}</span>
                  </div>
                  <SentimentBadge rating={rev.rating} />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{rev.text}</p>
                <p className="text-xs text-gray-400 mt-2">— {rev.author} · {rev.relativeTime}</p>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Restaurant Overview */}
      <SectionHeader title="Restaurant Ratings" subtitle="Current Google ratings" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {restaurants.map(([slug, r]: [string, any]) => (
          <Card key={slug}>
            <div className="flex items-start justify-between mb-3">
              <p className="font-semibold text-gray-800 text-sm leading-tight">{r.name}</p>
              <RatingBadge rating={r.rating} />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <StarRating rating={Math.round(r.rating)} />
            </div>
            <p className="text-xs text-gray-500">{r.totalRatings} total reviews</p>
          </Card>
        ))}
      </div>

      {/* All Recent Reviews */}
      <SectionHeader title="Recent Reviews" subtitle={`${allReviews.length} review excerpts from Google`} />
      <div className="space-y-3">
        {allReviews
          .sort((a: any, b: any) => (b.time || 0) - (a.time || 0))
          .map((rev: any, i: number) => (
          <Card key={i} className={rev.rating <= 2 ? 'border-l-4 border-l-red-400' : rev.rating <= 3 ? 'border-l-4 border-l-yellow-400' : ''}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={rev.rating} />
                  <SentimentBadge rating={rev.rating} />
                </div>
                <p className="text-xs text-gray-500">{rev.restaurant}</p>
              </div>
              <p className="text-xs text-gray-400 whitespace-nowrap">{rev.relativeTime}</p>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{rev.text}</p>
            <p className="text-xs text-gray-400 mt-2">— {rev.author}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
