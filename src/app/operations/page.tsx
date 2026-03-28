import { Card, MetricCard, SectionHeader } from '@/components/Card';
import fs from 'fs';
import path from 'path';

function loadLatestOps() {
  const dir = path.join(process.cwd(), 'data', 'operations');
  try {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort().reverse();
    if (files.length === 0) return null;
    const data = JSON.parse(fs.readFileSync(path.join(dir, files[0]), 'utf8'));
    return data;
  } catch { return null; }
}

export default function OperationsPage() {
  const ops = loadLatestOps();

  if (!ops) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Operations</h1>
          <p className="text-sm text-gray-500 mt-1">Awaiting first Ledger agent run</p>
        </div>
        <Card><p className="text-gray-400 text-center py-8">No operations data yet. Ledger runs daily at 11am CST.</p></Card>
      </div>
    );
  }

  const rev = ops.revenue;
  const je = ops.journal_entry;
  const exceptions = ops.exceptions || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Operations</h1>
        <p className="text-sm text-gray-500 mt-1">{ops.restaurant === 'merriment-social' ? 'Merriment Social' : ops.restaurant} &middot; {ops.date}</p>
      </div>

      {/* Revenue Breakdown */}
      <SectionHeader title="Revenue Breakdown" subtitle="Daily POS summary from Toast" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <MetricCard label="Food" value={`$${rev.food.toLocaleString()}`} />
        <MetricCard label="Liquor" value={`$${rev.liquor.toLocaleString()}`} />
        <MetricCard label="Soft Drinks" value={`$${rev.soft_drinks.toLocaleString()}`} />
        <MetricCard label="Beer" value={`$${rev.beer.toLocaleString()}`} />
        <MetricCard label="Wine" value={`$${rev.wine.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <MetricCard label="Gross Sales" value={`$${rev.gross_sales.toLocaleString()}`} subtext="Before discounts" />
        <MetricCard label="Net Sales" value={`$${rev.net_sales.toLocaleString()}`} subtext="After tax + discounts" />
        <MetricCard label="Sales Tax" value={`$${rev.sales_tax.toLocaleString()}`} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <MetricCard label="Credit Tips" value={`$${ops.labor.credit_tips.toLocaleString()}`} />
        <MetricCard label="Discounts" value={`$${ops.labor.discounts.toLocaleString()}`} />
      </div>

      {/* Journal Entry Status */}
      <SectionHeader title="Journal Entry Status" />
      <Card className={`mb-8 border-l-4 ${je.balanced ? 'border-l-green-500' : 'border-l-red-500'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${je.balanced ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {je.balanced ? '✓ BALANCED' : '✗ NOT BALANCED'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div><span className="text-gray-500">Debits:</span> <span className="font-semibold">${je.debits.toLocaleString()}</span></div>
          <div><span className="text-gray-500">Credits:</span> <span className="font-semibold">${je.credits.toLocaleString()}</span></div>
          <div><span className="text-gray-500">Difference:</span> <span className={`font-semibold ${je.balanced ? 'text-green-600' : 'text-red-600'}`}>${je.difference.toLocaleString()}</span></div>
        </div>
        {!je.balanced && je.likely_cause && (
          <p className="text-sm text-red-600 mt-3 bg-red-50 p-3 rounded-lg">⚠️ Likely cause: {je.likely_cause}</p>
        )}
      </Card>

      {/* Exceptions */}
      {exceptions.length > 0 && (
        <>
          <SectionHeader title="Exceptions" subtitle={`${exceptions.length} flagged items`} />
          <div className="space-y-3 mb-8">
            {exceptions.map((ex: any, i: number) => (
              <Card key={i} className={`border-l-4 ${ex.severity === 'warning' ? 'border-l-yellow-500' : 'border-l-blue-400'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase ${ex.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                        {ex.severity}
                      </span>
                      <span className="text-xs text-gray-500 uppercase font-medium">{ex.type.replace('_', ' ')}</span>
                    </div>
                    <p className="text-sm text-gray-700">{ex.detail}</p>
                  </div>
                  {ex.action_needed !== 'none' && (
                    <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 whitespace-nowrap">{ex.action_needed.replace('_', ' ')}</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Comparisons */}
      <SectionHeader title="Comparisons" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">vs Yesterday</p>
          <p className="text-lg font-bold text-gray-400 mt-1">{ops.comparisons?.vs_yesterday ? ops.comparisons.vs_yesterday.gross_sales_change : 'Awaiting data'}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">vs Same Day Last Week</p>
          <p className="text-lg font-bold text-gray-400 mt-1">{ops.comparisons?.vs_same_day_last_week ? ops.comparisons.vs_same_day_last_week.gross_sales_change : 'Awaiting data'}</p>
        </Card>
        <Card>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Month to Date</p>
          <p className="text-lg font-bold text-gray-400 mt-1">{ops.comparisons?.mtd ? `$${ops.comparisons.mtd.gross_sales.toLocaleString()}` : 'Awaiting data'}</p>
        </Card>
      </div>
    </div>
  );
}
