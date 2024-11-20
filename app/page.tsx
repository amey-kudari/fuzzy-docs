"use client"

import { useState } from "react";
import { SearchDocs } from "./components/SearchDocs";
import type { Keys } from "./components/SearchDocs";

export default function Home() {
  const [selected, setSelected] = useState<Keys>("");

  return (
    <div className="flex flex-col sm:flex-row min-h-[100vh] mt-12 sm:mt-0 gap-4 transition-all duration-100">
      <div className={`flex items-center flex-col m-4 mt-32 ${!selected ? 'flex-1' : ''} transition-all duration-100`}>
        <h1 className="text-4xl mb-4">Pick docs to view!</h1>
        <div className="Options flex flex-col gap-4">
          <button className="flex flex-col gap-2 items-center py-2 px-6 border border-slate-500 rounded-lg hover:border-slate-200 hover:bg-slate-900" onClick={() => setSelected("js")}>
            <span className="text-xl">Javascript ES6 docs</span>
            <span>ECMA 262</span>
          </button>
          <button className="flex flex-col gap-2 items-center py-2 px-6 border border-slate-500 rounded-lg hover:border-slate-200 hover:bg-slate-900" onClick={() => setSelected("es-js")}>
            <span className="text-xl">Elastic Search JS API</span>
            <span>javascript-api/8.16</span>
          </button>
          <button className="flex flex-col gap-2 items-center py-2 px-6 border border-slate-500 rounded-lg hover:border-slate-200 hover:bg-slate-900" onClick={() => setSelected("")} disabled aria-disabled>
            <span className="text-xl">React JS API</span>
            <span>React 19</span>
            <span>Coming soon</span>
          </button>
          <button className="flex flex-col gap-2 items-center py-2 px-6 border border-slate-500 rounded-lg hover:border-slate-200 hover:bg-slate-900" onClick={() => setSelected("")} disabled aria-disabled>
            <span className="text-xl">Next JS API</span>
            <span>Next 15</span>
            <span>Coming soon</span>
          </button>
        </div>
      </div>
      <div className={`relative ${selected ? "flex-1" : ""} transition-all duration-100 sm:overflow-auto sm:max-h-[100vh]`}>
        <div className="flex justify-end p-2">
          <button className={`px-2 text-xl border border-slate-500 hover:border-slate-200 hover:bg-slate-900 ${!selected ? 'opacity-0' : ''}`} onClick={() => setSelected("")}>X</button>
        </div>
        <SearchDocs index={selected}/>
      </div>
    </div>
  );
}
