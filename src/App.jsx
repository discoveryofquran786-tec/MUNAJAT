import React, { useMemo, useState } from "react"; import { Search, BookOpen, Sparkles } from "lucide-react"; import { Card, CardContent } from "@/components/ui/card"; import { Input } from "@/components/ui/input";

const munajats = [ { title: "Main Tere Saamne", category: "Tazarru", text: [ "Main tere saamne jhuk rahaan hun khuda", "Mera koi nahin allah tere siwaah.", "Mai gunaah gaar hun, mai siyaah kaar hun.", "Mai Qata kaar hoon, mai sazaa vaar hun.", "Mere sajdon mein teri hi hamd-o-sanaa,", "Mera koi nahin allah tere sivaa.", "Meri tauba hai tauba Ae mere ilaah,", "Mujh gunaah gaar ko too na dena sazaa.", ], }, { title: "Kis Se Maange", category: "Dua", text: [ "Kis se maange Kahaan jaaen kise kahein,", "Aur dunya mein haajat rawaa Kaun hai?", "Sab Ka daata hai too, sab Ko deta hai too,", "tere bandon Ka tere Siwaa Kaun hai?", "Kaun maqbool hai, Kaun mardood hai,", "jab tulenge amal sab ke meezaan par,", "tab khulega ke Khota Khara kaun hai.", "Kaun sunta hai faryaad mazloom kee,", ], }, { title: "Tu Ho Kisi Bhi Haal Mein", category: "Ishq", text: [ "Tu ho kisi bhi haal mein maula se lau lagaye ja,", "qudrat zul jalal mein kya nahin gid gidaye ja.", "Yoonhi bahai jaa dil ki lagee bujhaaye jaa,", "Aahein bhi kheench kheench kar Aatish-e-gham badhai jaa.", "husn tamaasha dost ko ishq karishma saaz too,", "Sab ho hijab bartaraf dekhan tujhi ko har taraf,", "Parde yuhin hatai jaa jalve yunhi dikhae jaa.", "jaam pe jaam laai jaa, shaan-e-karam dikhai jaa.", ], }, { title: "Yaad Rahe Bas Ya Rab", category: "Zikr", text: [ "Ab to rahe bas taa dam-e-aakhir wirde-zubaan ae mere ilaah.", "Yaad rahe bas ya rab tumara,", "Fqat Tujhse ho mohabbat, khalaq se mai be-zaar rahun.", "Dono jahaan mein jo kuch bhi hai, sab hai tere zer-e-nageen.", "Koi nahin hai, Koi nahin hai, Koi nahin hai, Koi nahin.", "Yaad mein teri sab ko bhula doon koi na mujhko yaad rahe,", "Sab khushiyoon Ko aag laga doon, gham se tere dil shaad rahe.", "Tujhse fariyaad rahe.", ], }, { title: "Teri Rahmaton Se Hun Bekhabar", category: "Tauba", text: [ "Teri Rahmaton se hun bekhabar ye meri nazar ka qusur hai.", "Teri Raah mein qaadam qaadam kahin arsh hai kahin toor hai.", "Ye baja hai malik-e-dojahan meri bandagi mein kusur hain.", "Ye qata hai meri qata magar tera naam bhi to Ghafoor hai.", "Ye bataa mai tujh se milun kahan mujhe tujh se milna zaroor hai.", "Kahin dil ki sharth na daalna ye dil gunahon se choor hai.", "too baksh de mere gunaah too raheem hai tu ghafoor hai.", ], }, { title: "Dil Badal De", category: "Munajat", text: [ "Hawa-o-hirs waala dil badal de", "Mera Ghaflat mein dooba dil badal de", "Badal de dil ki dunya dil badal de", "Khudaaya fazl farma dil badal de", "Gunahgaari mein Kab tak umr Kaatun", "badal de mera rasta dil badal de", "Sunoon mai naam tera dhadkanon mein", "mazaa aajaye maula dil badal de", "meri faryaad sunle mere maula", "banale apna banda dil badal de", ], }, ];

export default function MunajatSingleFileWebsite() { const [query, setQuery] = useState("");

const filtered = useMemo(() => { const q = query.trim().toLowerCase(); if (!q) return munajats; return munajats.filter((item) => { const inTitle = item.title.toLowerCase().includes(q); const inCategory = item.category.toLowerCase().includes(q); const inText = item.text.some((line) => line.toLowerCase().includes(q)); return inTitle || inCategory || inText; }); }, [query]);

return ( <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_30%),linear-gradient(180deg,#020617_0%,#07111f_100%)] text-slate-100"> <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 md:px-6 lg:px-8"> <header className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur"> <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"> <div className="flex items-start gap-4"> <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/20"> <Sparkles className="h-7 w-7 text-emerald-300" /> </div> <div> <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80"> Munajat Collection </p> <h1 className="mt-2 text-3xl font-semibold md:text-4xl"> Simple Text Website </h1> <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 md:text-base"> Single-file frontend design for GitHub upload. No backend, no audio, only searchable text with a clean devotional layout. </p> </div> </div>

<div className="w-full md:max-w-sm">
          <label className="mb-2 block text-sm text-slate-300">Search</label>
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, category, or line"
              className="border-0 bg-transparent p-0 text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>
    </header>

    <main className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <BookOpen className="h-4 w-4 text-emerald-300" />
            <span className="font-medium">Sections</span>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
            {filtered.length}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {filtered.map((item, index) => (
            <a
              key={item.title}
              href={`#item-${index}`}
              className="block rounded-2xl border border-white/10 bg-black/10 p-4 transition hover:border-emerald-300/30 hover:bg-white/8"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold text-white">{item.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{item.category}</p>
                </div>
                <span className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-slate-300">
                  {item.text.length} lines
                </span>
              </div>
            </a>
          ))}
        </div>
      </aside>

      <section className="space-y-5">
        {filtered.length === 0 ? (
          <Card className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur">
            <CardContent className="p-10 text-center text-slate-300">
              No results found.
            </CardContent>
          </Card>
        ) : (
          filtered.map((item, index) => (
            <Card
              key={item.title}
              id={`item-${index}`}
              className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur"
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-emerald-300/70">
                      {item.category}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                      {item.title}
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                    Text only
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {item.text.map((line, i) => (
                    <p
                      key={i}
                      className="rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-base leading-8 text-slate-200"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </main>
  </div>
</div>

); }
