import { Card, SectionHeader } from '@/components/Card';
import fs from 'fs';
import path from 'path';

const competitors = [
  { name: 'Dr. Oetker', desc: 'Suprema sourdough range — EU expansion', color: '#ef473d' },
  { name: "Screamin' Sicilian", desc: 'Positioned as premium frozen', color: '#c14f9d' },
  { name: "Newman's Own", desc: 'Thin crust natural positioning', color: '#b4bd35' },
  { name: 'Caulipower', desc: 'Health-focused alternative crust', color: '#40c3d6' },
];

function loadIntelFiles() {
  const dir = path.join(process.cwd(), 'data', 'intel');
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().reverse();
    return files.map(f => {
      try { return JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8')); }
      catch { return null; }
    }).filter(Boolean);
  } catch { return []; }
}

export default function IntelPage() {
  const intelData = loadIntelFiles();
  const hasData = intelData.length > 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Market Intel</h1>
        <p className="text-sm text-gray-500 mt-1">Competitive intelligence &middot; Real Dough Pizza Co.</p>
      </div>

      {/* Latest Intel */}
      <SectionHeader title="Latest Intel" subtitle={hasData ? `${intelData.length} reports available` : 'Scout agent starts tomorrow'} />
      {hasData ? (
        <div className="space-y-4 mb-8">
          {intelData.slice(0, 5).map((report: any, i: number) => (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">{report.date}</span>
                <span className="text-xs text-gray-500 uppercase">{report.type || 'daily'}</span>
              </div>
              {report.competitors?.map((c: any, j: number) => (
                <div key={j} className="mb-2 pl-3 border-l-2 border-gold-light">
                  <p className="text-sm font-medium text-gray-800">{c.name}: {c.action}</p>
                  <p className="text-xs text-gray-500">{c.category} · Relevance: {c.relevance_score}/10</p>
                </div>
              ))}
              {report.trends?.map((t: any, j: number) => (
                <div key={`t-${j}`} className="mb-2 pl-3 border-l-2 border-green-300">
                  <p className="text-sm font-medium text-gray-800">{t.topic}: {t.direction} {t.magnitude}</p>
                  <p className="text-xs text-gray-500">{t.context}</p>
                </div>
              ))}
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mb-8">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-3" style={{ backgroundColor: 'rgba(244, 168, 29, 0.15)' }}>
              <svg className="w-6 h-6" style={{ color: '#f4a81d' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">Scout agent starts tomorrow</p>
            <p className="text-gray-400 text-sm mt-1">First report arrives Saturday 7am CST &middot; Deep scan every Monday</p>
          </div>
        </Card>
      )}

      {/* Competitor Tracker */}
      <SectionHeader title="Competitor Tracker" subtitle="Named competitors in the frozen pizza space" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {competitors.map((comp) => (
          <Card key={comp.name}>
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: comp.color }} />
              <div>
                <p className="font-semibold text-gray-800">{comp.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{comp.desc}</p>
                <p className="text-xs text-gray-400 mt-2 italic">No tracked moves yet</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Trend Tracker */}
      <SectionHeader title="Trend Tracker" subtitle="Longitudinal market trends" />
      <Card>
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">Longitudinal trend data will appear after Scout runs for 2+ weeks.</p>
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {['Sourdough demand', 'Clean label', 'Premium frozen', 'DTC pizza', 'Wisconsin retail'].map(tag => (
              <span key={tag} className="pill-tag" style={{ backgroundColor: '#26225d', color: '#ebe5d3' }}>{tag}</span>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
