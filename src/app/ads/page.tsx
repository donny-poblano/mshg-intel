'use client';

import { MetricCard, SectionHeader, Card } from '@/components/Card';
import { AreaChartFull, BarChartFull, DonutChart } from '@/components/Charts';
import { metaAds, googleAds, metaDemographicsGender, metaDemographicsAge, metaTopCreatives, googleCampaigns, spendOverTime } from '@/lib/data';

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString();
}

export default function AdsPage() {
  const totalSpend = metaAds.totalSpent + googleAds.totalSpent;
  const totalClicks = metaAds.clicks + googleAds.clicks;
  const totalImpressions = metaAds.impressions + googleAds.impressions;

  const genderData = metaDemographicsGender.map(d => ({ name: d.gender, value: d.impressions }));
  const ageData = metaDemographicsAge.map(d => ({ name: d.age, value: d.clicks }));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ad Performance</h1>
        <p className="text-sm text-gray-500 mt-1">Meta Ads + Google Ads &middot; March 1 &ndash; 27, 2026</p>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <MetricCard label="Total Spend" value={`$${totalSpend.toFixed(2)}`} />
        <MetricCard label="Total Clicks" value={fmt(totalClicks)} />
        <MetricCard label="Meta CPC" value={`$${metaAds.cpc}`} />
        <MetricCard label="Meta CTR" value={`${metaAds.ctr}%`} />
        <MetricCard label="Total Impressions" value={fmt(totalImpressions)} />
        <MetricCard label="Meta Reach" value={fmt(metaAds.reach)} />
      </div>

      {/* Spend trend */}
      <Card className="mb-6">
        <SectionHeader title="Daily Ad Spend Trend" subtitle="Combined Meta + Google" />
        <AreaChartFull data={spendOverTime} color="#f4a81d" height={280} />
      </Card>

      {/* Two columns: Meta vs Google */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <SectionHeader title="Meta Ads Breakdown" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><p className="text-gray-500 text-xs">Spend</p><p className="font-semibold text-lg">${metaAds.totalSpent.toLocaleString()}</p></div>
            <div><p className="text-gray-500 text-xs">Reach</p><p className="font-semibold text-lg">{fmt(metaAds.reach)}</p></div>
            <div><p className="text-gray-500 text-xs">Impressions</p><p className="font-semibold">{fmt(metaAds.impressions)}</p></div>
            <div><p className="text-gray-500 text-xs">Frequency</p><p className="font-semibold">{metaAds.frequency}</p></div>
            <div><p className="text-gray-500 text-xs">Link Clicks</p><p className="font-semibold">{fmt(metaAds.linkClicks)}</p></div>
            <div><p className="text-gray-500 text-xs">Link CTR</p><p className="font-semibold">{metaAds.linkCtr}%</p></div>
            <div><p className="text-gray-500 text-xs">CPM</p><p className="font-semibold">${metaAds.cpm}</p></div>
            <div><p className="text-gray-500 text-xs">Cost/Link Click</p><p className="font-semibold">${metaAds.costPerLinkClick}</p></div>
          </div>
        </Card>
        <Card>
          <SectionHeader title="Google Ads Breakdown" />
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div><p className="text-gray-500 text-xs">Spend</p><p className="font-semibold text-lg">${googleAds.totalSpent.toLocaleString()}</p></div>
            <div><p className="text-gray-500 text-xs">Impressions</p><p className="font-semibold text-lg">{fmt(googleAds.impressions)}</p></div>
            <div><p className="text-gray-500 text-xs">Clicks</p><p className="font-semibold">{fmt(googleAds.clicks)}</p></div>
            <div><p className="text-gray-500 text-xs">CTR</p><p className="font-semibold">{googleAds.ctr}%</p></div>
            <div><p className="text-gray-500 text-xs">CPC</p><p className="font-semibold">${googleAds.cpc}</p></div>
            <div><p className="text-gray-500 text-xs">CPM</p><p className="font-semibold">${googleAds.cpm}</p></div>
          </div>
        </Card>
      </div>

      {/* Campaign breakdown table */}
      <Card className="mb-6">
        <SectionHeader title="Google Ads Campaign Performance" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Campaign</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Clicks</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">CPC</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">CTR</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Impressions</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody>
              {googleCampaigns.map((c) => (
                <tr key={c.name} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium">{c.name}</td>
                  <td className="py-3 px-2 text-right">{c.clicks.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">${c.cpc.toFixed(2)}</td>
                  <td className="py-3 px-2 text-right">{c.ctr}%</td>
                  <td className="py-3 px-2 text-right">{c.impressions.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right">${c.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <SectionHeader title="Meta Demographics — Gender" subtitle="Impressions by gender" />
          <DonutChart data={genderData} />
          <div className="flex justify-center gap-6 mt-2 text-xs text-gray-500">
            {genderData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#f4a81d', '#60a5fa', '#34d399'][i] }} />
                {d.name}: {fmt(d.value)}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="Meta Demographics — Age" subtitle="Clicks by age group" />
          <BarChartFull data={ageData.map(d => ({ name: d.name, value: d.value }))} nameKey="name" color="#60a5fa" height={200} />
        </Card>
      </div>

      {/* Top Creatives */}
      <Card>
        <SectionHeader title="Top Meta Ad Creatives" subtitle="By link clicks" />
        <div className="space-y-3">
          {metaTopCreatives.map((c, i) => (
            <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-gray-50">
              <span className="text-lg font-bold text-gray-300 mt-0.5">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{c.headline}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{c.body}</p>
              </div>
              <div className="flex gap-4 text-xs text-right flex-shrink-0">
                <div><p className="text-gray-400">Link Clicks</p><p className="font-semibold">{fmt(c.linkClicks)}</p></div>
                <div><p className="text-gray-400">CTR</p><p className="font-semibold">{c.ctr}%</p></div>
                <div className="hidden sm:block"><p className="text-gray-400">CPC</p><p className="font-semibold">${c.cpc}</p></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
