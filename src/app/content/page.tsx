'use client';

import { useState } from 'react';
import { SectionHeader, Card } from '@/components/Card';
import { fbTopPosts, fbTopReels, igPostsByEngagement, ytVideos, ttVideos } from '@/lib/data';

function fmt(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toLocaleString();
}

type Platform = 'all' | 'facebook' | 'instagram' | 'youtube' | 'tiktok';
type SortKey = 'engagementRate' | 'reach' | 'views';

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-100 text-blue-700',
  instagram: 'bg-purple-100 text-purple-700',
  youtube: 'bg-red-100 text-red-700',
  tiktok: 'bg-gray-900 text-white',
};

interface PostItem {
  platform: string;
  caption: string;
  reach?: number;
  engagement?: number;
  engagementRate?: number;
  views?: number;
  likes?: number;
  imageUrl?: string;
  link?: string;
  thumbnail?: string;
}

function getAllPosts(): PostItem[] {
  const posts: PostItem[] = [];
  fbTopPosts.forEach(p => posts.push({ ...p, views: p.reach }));
  igPostsByEngagement.forEach(p => posts.push({ ...p, views: p.reach }));
  ytVideos.forEach(v => posts.push({
    platform: 'youtube', caption: v.title, reach: v.views, engagement: v.likes,
    engagementRate: v.views > 0 ? (v.likes / v.views * 100) : 0, views: v.views,
    thumbnail: v.thumbnail, link: v.link,
  }));
  ttVideos.forEach(v => posts.push({
    platform: 'tiktok', caption: v.caption, reach: v.views, engagement: v.likes,
    engagementRate: v.views > 0 ? (v.likes / v.views * 100) : 0, views: v.views,
  }));
  return posts;
}

export default function ContentPage() {
  const [platform, setPlatform] = useState<Platform>('all');
  const [sortBy, setSortBy] = useState<SortKey>('engagementRate');

  const allPosts = getAllPosts();
  const filtered = platform === 'all' ? allPosts : allPosts.filter(p => p.platform === platform);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'engagementRate') return (b.engagementRate || 0) - (a.engagementRate || 0);
    if (sortBy === 'reach') return (b.reach || 0) - (a.reach || 0);
    return (b.views || 0) - (a.views || 0);
  });

  const topPerformers = [...allPosts].sort((a, b) => (b.engagementRate || 0) - (a.engagementRate || 0)).slice(0, 3);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Content Performance</h1>
        <p className="text-sm text-gray-500 mt-1">Cross-platform content analysis &middot; March 1 &ndash; 27, 2026</p>
      </div>

      {/* Top Performers highlight */}
      <SectionHeader title="Top Performers" subtitle="Highest engagement rate across all platforms" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {topPerformers.map((p, i) => (
          <Card key={i} className="border-l-4 border-l-gold">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-bold text-gold">#{i + 1}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${platformColors[p.platform]}`}>
                {p.platform}
              </span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2 mb-3">{p.caption}</p>
            <div className="flex gap-4 text-xs">
              <div><p className="text-gray-400">Eng. Rate</p><p className="font-bold text-gold">{p.engagementRate?.toFixed(1)}%</p></div>
              <div><p className="text-gray-400">Reach</p><p className="font-semibold">{fmt(p.reach || 0)}</p></div>
              <div><p className="text-gray-400">Engagement</p><p className="font-semibold">{fmt(p.engagement || 0)}</p></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex gap-1 bg-white rounded-lg p-1 border border-gray-200">
          {(['all', 'facebook', 'instagram', 'youtube', 'tiktok'] as Platform[]).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                platform === p ? 'bg-navy text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {p === 'all' ? 'All' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortKey)}
          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 bg-white"
        >
          <option value="engagementRate">Sort by Engagement Rate</option>
          <option value="reach">Sort by Reach</option>
          <option value="views">Sort by Views</option>
        </select>
        <span className="text-xs text-gray-400">{sorted.length} posts</span>
      </div>

      {/* Post grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sorted.map((post, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${platformColors[post.platform]}`}>
                {post.platform}
              </span>
            </div>
            {post.imageUrl && (
              <div className="w-full h-32 rounded-lg bg-gray-100 mb-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <p className="text-sm text-gray-700 line-clamp-3 mb-3 leading-relaxed">{post.caption}</p>
            <div className="flex gap-3 text-xs border-t border-gray-100 pt-3">
              <div><p className="text-gray-400">Reach</p><p className="font-semibold">{fmt(post.reach || 0)}</p></div>
              <div><p className="text-gray-400">Engagement</p><p className="font-semibold">{fmt(post.engagement || 0)}</p></div>
              <div><p className="text-gray-400">Eng. Rate</p><p className="font-semibold text-gold">{post.engagementRate?.toFixed(1)}%</p></div>
              {post.views !== post.reach && (
                <div><p className="text-gray-400">Views</p><p className="font-semibold">{fmt(post.views || 0)}</p></div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Reels breakdown */}
      <SectionHeader title="Facebook Reels" subtitle="Top performing reels by reach" />
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm bg-white rounded-xl shadow-sm border border-gray-100">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase">Reel</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Reach</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase">Avg View Time</th>
            </tr>
          </thead>
          <tbody>
            {fbTopReels.map((r, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 max-w-xs truncate">{r.caption}</td>
                <td className="py-3 px-4 text-right font-medium">{r.reach}</td>
                <td className="py-3 px-4 text-right">{(r.avgViewTime / 1000).toFixed(1)}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Instagram Stories summary */}
      <SectionHeader title="Instagram Stories" subtitle="Stories performance summary" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <p className="text-xs text-gray-500">Total Reach</p>
          <p className="text-xl font-bold">1,033</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Avg Impressions</p>
          <p className="text-xl font-bold">146</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Profile Visits</p>
          <p className="text-xl font-bold">20</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-500">Forward Taps</p>
          <p className="text-xl font-bold">450</p>
        </Card>
      </div>
    </div>
  );
}
