import { Client } from "@elastic/elasticsearch";
import { NextResponse } from "next/server";

const client = new Client({
  node: process.env.URL ?? '',
  auth: {
    apiKey: process.env.API_KEY ?? ''
  }
});


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q');
  const index = searchParams.get('index');
  if(index !== 'js' && index !== 'es-js'){
    return NextResponse.json({ message: 'Invalid params', q, index }, { status : 400 });;
  }
  try{
    const res = await client.search({
      index: index,
      body: {
        query: {
          multi_match: {
            query: q ?? '',
            fields: ['h1', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'],
            fuzziness: 'AUTO',
          },
        },
      },
    });
    return NextResponse.json({ data: res.hits.hits.map(data => data._source), success: true });
  } catch {
    return NextResponse.json({ message: 'Database Error', q, index }, { status : 500 });
  }
}