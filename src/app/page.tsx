'use client';

import { MetricCard, SectionHeader, Card } from '@/components/Card';
import { Sparkline } from '@/components/Charts';
import { totalAdSpend, totalReach, totalFollowerGrowth, spendOverTime, reachOverTime, metaAds, googleAds, facebook, instagram, youtube, tiktok } from '@/lib/data';
import Link from 'next/link';

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString();
}

const quickLinks = [
  { href: '/ads', label: 'Ad Performance', desc: 'Meta & Google Ads metrics', color: 'bg-blue-50 text-blue-600' },
  { href: '/content', label: 'Content Performance', desc: 'Posts, Reels & Videos', color: 'bg-purple-50 text-purple-600' },
  { href: '/audience', label: 'Audience Insights', desc: 'Followers & demographics', color: 'bg-green-50 text-green-600' },
  { href: '/intel', label: 'Market Intel', desc: 'Competitive intelligence', color: 'bg-orange-50 text-orange-600' },
];

export default function OverviewPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Real Dough Pizza Co. &middot; March 1 &ndash; 27, 2026</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Ad Spend" value={`$${totalAdSpend.toLocaleString(undefined, { minimumFractionDigits: 2 })}`} subtext="Meta + Google Ads">
          <Sparkline data={spendOverTime} color="#f4a81d" />
        </MetricCard>
        <MetricCard label="Total Reach" value={fmt(totalReach)} subtext="Across all platforms">
          <Sparkline data={reachOverTime} color="#60a5fa" />
        </MetricCard>
        <MetricCard label="Follower Growth" value={`+${totalFollowerGrowth}`} subtext="FB +114 / IG +153 / YT +9">
          <Sparkline data={[
            { date: '1', value: 20 }, { date: '2', value: 35 }, { date: '3', value: 28 },
            { date: '4', value: 42 }, { date: '5', value: 38 }, { date: '6', value: 55 },
            { date: '7', value: 48 }, { date: '8', value: 62 }, { date: '9', value: 58 },
          ]} color="#34d399" />
        </MetricCard>
        <MetricCard label="Top Post" value="37.1%" subtext="Engagement rate (FB)">
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
            &quot;You&apos;re either the one paying for all the pizzas... or the one stocking up.&quot;
          </p>
        </MetricCard>
      </div>

      <SectionHeader title="Platform Summary" subtitle="Key metrics per channel" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700">Meta Ads</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Spend</p><p className="font-semibold">${metaAds.totalSpent.toLocaleString()}</p></div>
            <div><p className="text-gray-500 text-xs">Reach</p><p className="font-semibold">{fmt(metaAds.reach)}</p></div>
            <div><p className="text-gray-500 text-xs">Clicks</p><p className="font-semibold">{fmt(metaAds.clicks)}</p></div>
            <div><p className="text-gray-500 text-xs">CTR</p><p className="font-semibold">{metaAds.ctr}%</p></div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-green-100 text-green-700">Google Ads</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Spend</p><p className="font-semibold">${googleAds.totalSpent.toLocaleString()}</p></div>
            <div><p className="text-gray-500 text-xs">Impressions</p><p className="font-semibold">{fmt(googleAds.impressions)}</p></div>
            <div><p className="text-gray-500 text-xs">Clicks</p><p className="font-semibold">{fmt(googleAds.clicks)}</p></div>
            <div><p className="text-gray-500 text-xs">CTR</p><p className="font-semibold">{googleAds.ctr}%</p></div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-700">Facebook</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Followers</p><p className="font-semibold">{facebook.followers}</p></div>
            <div><p className="text-gray-500 text-xs">Reach</p><p className="font-semibold">{fmt(facebook.reach)}</p></div>
            <div><p className="text-gray-500 text-xs">Engagements</p><p className="font-semibold">{fmt(facebook.postEngagements)}</p></div>
            <div><p className="text-gray-500 text-xs">New Followers</p><p className="font-semibold">+{facebook.newFollowers}</p></div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">Instagram</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Followers</p><p className="font-semibold">{instagram.followers}</p></div>
            <div><p className="text-gray-500 text-xs">Reach</p><p className="font-semibold">{fmt(instagram.reach)}</p></div>
            <div><p className="text-gray-500 text-xs">Eng. Rate</p><p className="font-semibold">{instagram.engagementRate}%</p></div>
            <div><p className="text-gray-500 text-xs">New Followers</p><p className="font-semibold">+{instagram.newFollowers}</p></div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">YouTube</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Views</p><p className="font-semibold">{fmt(youtube.views)}</p></div>
            <div><p className="text-gray-500 text-xs">Avg Duration</p><p className="font-semibold">{youtube.avgViewDuration}s</p></div>
            <div><p className="text-gray-500 text-xs">Subs Gained</p><p className="font-semibold">+{youtube.subscribersGained}</p></div>
            <div><p className="text-gray-500 text-xs">Videos</p><p className="font-semibold">7+</p></div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-gray-900 text-white">TikTok</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div><p className="text-gray-500 text-xs">Followers</p><p className="font-semibold">{tiktok.followers}</p></div>
            <div><p className="text-gray-500 text-xs">Video Views</p><p className="font-semibold">{fmt(tiktok.videoViews)}</p></div>
            <div><p className="text-gray-500 text-xs">Engagements</p><p className="font-semibold">{tiktok.engagements}</p></div>
            <div><p className="text-gray-500 text-xs">Top Video</p><p className="font-semibold">{fmt(19505)} views</p></div>
          </div>
        </Card>
      </div>

      <SectionHeader title="Explore" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${link.color}`}>{link.label}</span>
              <p className="text-sm text-gray-500 mt-2">{link.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
