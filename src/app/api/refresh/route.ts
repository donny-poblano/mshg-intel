import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function POST() {
  try {
    // Re-parse the whatagraph xlsx if it exists
    execSync('node scripts/fetch-whatagraph.js', {
      cwd: process.cwd(),
      timeout: 30000,
    });

    return NextResponse.json({
      ok: true,
      timestamp: Date.now(),
      message: 'Data refreshed from whatagraph xlsx',
    });
  } catch (error: any) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}
