import { useEffect, useState } from "react";

const INDEX_MAP = {
  js: "Javascript ECMA",
  "es-js": "Javascript Elastic Search Docs",
};

export type Keys = keyof typeof INDEX_MAP | "";

type Content = {
  hh1?: string, 
  hp1?: string;
  hp2?: string;
  hp3?: string;
  hp4?: string;
  hp5?: string;
  hp6?: string;
  hp7?: string;
  hp8?: string;
  hp9?: string;
};

const ResultDisplay = ({ content }: { content: object }) => {
  const { hh1 = "", 
    hp1="",
    hp2="",
    hp3="",
    hp4="",
    hp5="",
    hp6="",
    hp7="",
    hp8="",
    hp9="",
  } = content as unknown as Content;
  return (
    <div className="p-2 border border-slate-500 rounded-lg mb-4">
      <h5 dangerouslySetInnerHTML={{ __html: hh1 }} className="text-2xl" />
      {hp1 ? <p dangerouslySetInnerHTML={{ __html: hp1 }}></p> : null}
      {hp2 ? <p dangerouslySetInnerHTML={{ __html: hp2 }}></p> : null}
      {hp3 ? <p dangerouslySetInnerHTML={{ __html: hp3 }}></p> : null}
      {hp4 ? <p dangerouslySetInnerHTML={{ __html: hp4 }}></p> : null}
      {hp5 ? <p dangerouslySetInnerHTML={{ __html: hp5 }}></p> : null}
      {hp6 ? <p dangerouslySetInnerHTML={{ __html: hp6 }}></p> : null}
      {hp7 ? <p dangerouslySetInnerHTML={{ __html: hp7 }}></p> : null}
      {hp8 ? <p dangerouslySetInnerHTML={{ __html: hp8 }}></p> : null}
      {hp9 ? <p dangerouslySetInnerHTML={{ __html: hp9 }}></p> : null}
    </div>
  );
};


const useDebVal = (val : string) => {
  const [debVal, setDebVal] = useState<string>(val);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebVal(val), 200);
    return () => clearTimeout(timeoutId);
  }, [val]);
  return debVal;
}

export const SearchDocs = ({ index }: { index: Keys }) => {
  const [results, setResults] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const q = useDebVal(search);
  useEffect(() => {
    if (q) {
      setLoading(true);
      fetch(`/api/search?index=${index}&q=${q}`)
        .then((res) => res.json())
        .then((res) => {
          setResults(res.data ?? []);
        })
        .catch((err) => {
          alert(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setResults([]);
    }
  }, [q, index]);

  if (index === "") {
    return null;
  }

  return (
    <div className="p-4 sm:p-2 flex flex-col">
      <h2 className="text-3xl">{INDEX_MAP[index] ?? ""}</h2>
      <input
        className="text-xl bg-slate-950 border border-slate-600 mt-2 py-2 px-6 outline-none"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="p-2">
          {results?.length === 0 ? (
            <h3>
              {q.length === 0
                ? "Search the docs to view results here"
                : `No results for query ${q}`}
            </h3>
          ) : (
            <div>
              <h3 className="mb-4">{results.length} results found</h3>
              {results.map((result, id) => (
                <ResultDisplay key={id} content={result} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
