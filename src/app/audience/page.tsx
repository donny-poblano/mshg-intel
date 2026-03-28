'use client';

import { MetricCard, SectionHeader, Card } from '@/components/Card';
import { BarChartFull, DonutChart, AreaChartFull } from '@/components/Charts';
import { facebook, instagram, youtube, tiktok, igFollowersByGender, igFollowersByAge, igReachOverTime, igAudienceByDemographic, ytVideos } from '@/lib/data';

export default function AudiencePage() {
  const genderData = igFollowersByGender.map(d => ({ name: d.gender, value: d.count }));
  const ageData = igFollowersByAge.map(d => ({ name: d.age, value: d.count }));
  const demoData = igAudienceByDemographic.slice(0, 8).map(d => ({ name: d.group, value: d.count }));

  const totalSubs = ytVideos.reduce((s, v) => s + v.subsGained, 0);
  const totalLost = ytVideos.reduce((s, v) => s + v.subsLost, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Audience Insights</h1>
        <p className="text-sm text-gray-500 mt-1">Follower counts, growth & demographics &middot; March 1 &ndash; 27, 2026</p>
      </div>

      {/* Follower counts */}
      <SectionHeader title="Followers by Platform" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Facebook" value={facebook.followers.toString()} subtext={`+${facebook.newFollowers} new / -${facebook.unfollows} lost`} />
        <MetricCard label="Instagram" value={instagram.followers.toString()} subtext={`+${instagram.newFollowers} new / -${instagram.unfollows} lost`} />
        <MetricCard label="YouTube" value="—" subtext={`+${totalSubs} subs / -${totalLost} lost`} />
        <MetricCard label="TikTok" value={tiktok.followers.toString()} subtext={`${tiktok.videoViews.toLocaleString()} video views`} />
      </div>

      {/* Instagram reach over time */}
      <Card className="mb-6">
        <SectionHeader title="Instagram Reach Over Time" subtitle="Daily reach trend" />
        <AreaChartFull data={igReachOverTime} dataKey="reach" color="#a78bfa" height={280} />
      </Card>

      {/* Instagram demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <SectionHeader title="IG Followers by Gender" />
          <DonutChart data={genderData} height={180} />
          <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
            {genderData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#f4a81d', '#60a5fa', '#34d399'][i] }} />
                {d.name}: {d.value}
              </span>
            ))}
          </div>
        </Card>
        <Card>
          <SectionHeader title="IG Followers by Age" />
          <BarChartFull data={ageData.map(d => ({ name: d.name, value: d.value }))} nameKey="name" color="#a78bfa" height={180} />
        </Card>
        <Card>
          <SectionHeader title="IG Audience Detail" subtitle="Gender + Age breakdown" />
          <BarChartFull data={demoData} nameKey="name" color="#f4a81d" height={180} horizontal />
        </Card>
      </div>

      {/* YouTube subscriber detail */}
      <Card className="mb-6">
        <SectionHeader title="YouTube Subscriber Activity" subtitle="Per-video subscriber gains" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 uppercase">Video</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Subs Gained</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Subs Lost</th>
                <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 uppercase">Avg View %</th>
              </tr>
            </thead>
            <tbody>
              {ytVideos.map((v, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-2 font-medium max-w-xs truncate">{v.title}</td>
                  <td className="py-3 px-2 text-right">{v.views.toLocaleString()}</td>
                  <td className="py-3 px-2 text-right text-green-600">+{v.subsGained}</td>
                  <td className="py-3 px-2 text-right text-red-500">-{v.subsLost}</td>
                  <td className="py-3 px-2 text-right">{v.avgViewPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Platform growth summary */}
      <SectionHeader title="Growth Summary" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-500 mb-1">Facebook Net Growth</p>
          <p className="text-2xl font-bold text-green-600">+{facebook.newFollowers - facebook.unfollows}</p>
          <p className="text-xs text-gray-400">+{facebook.newFollowers} gained, -{facebook.unfollows} lost</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 mb-1">Instagram Net Growth</p>
          <p className="text-2xl font-bold text-green-600">+{instagram.newFollowers - instagram.unfollows}</p>
          <p className="text-xs text-gray-400">+{instagram.newFollowers} gained, -{instagram.unfollows} lost</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 mb-1">YouTube Net Subs</p>
          <p className="text-2xl font-bold text-green-600">+{youtube.subscribersGained}</p>
          <p className="text-xs text-gray-400">{youtube.views.toLocaleString()} total views</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500 mb-1">TikTok Engagement</p>
          <p className="text-2xl font-bold">{tiktok.engagements}</p>
          <p className="text-xs text-gray-400">{tiktok.followers} followers</p>
        </Card>
      </div>
    </div>
  );
}
