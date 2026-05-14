import React, { useEffect, useMemo, useRef, useState } from "react"; import { Play, Pause, SkipBack, SkipForward, Search, Music2, ListMusic, Heart, Volume2, Download, Repeat } from "lucide-react"; import { Card, CardContent } from "@/components/ui/card"; import { Button } from "@/components/ui/button"; import { Slider } from "@/components/ui/slider"; import { Input } from "@/components/ui/input";

const munajats = [ { id: 1, title: "Main Tere Saamne", artist: "Munajat Collection", duration: 208, mood: "Heartfelt", lines: [ "Main tere saamne jhuk rahaan hun khuda", "Mera koi nahin allah tere siwaah", "Mai gunaah gaar hun, mai siyaah kaar hun", "Mai Qata kaar hoon, mai sazaa vaar hun", "Mere sajdon mein teri hi hamd-o-sanaa", "Mera koi nahin allah tere sivaa", "Meri tauba hai tauba Ae mere ilaah", "Mujh gunaah gaar ko too na dena sazaa", ], }, { id: 2, title: "Kis Se Maange", artist: "Munajat Collection", duration: 184, mood: "Reflective", lines: [ "Kis se maange Kahaan jaaen kise kahein", "Aur dunya mein haajat rawaa Kaun hai?", "Sab Ka daata hai too, sab Ko deta hai too", "tere bandon Ka tere Siwaa Kaun hai?", "Kaun maqbool hai, Kaun mardood hai", "jab tulenge amal sab ke meezaan par", "tab khulega ke Khota Khara kaun hai", "Kaun sunta hai faryaad mazloom kee", ], }, { id: 3, title: "Tu Ho Kisi Bhi Haal Mein", artist: "Munajat Collection", duration: 252, mood: "Devotional", lines: [ "Tu ho kisi bhi haal mein maula se lau lagaye ja", "qudrat zul jalal mein kya nahin gid gidaye ja", "Yoonhi bahai jaa dil ki lagee bujhaaye jaa", "Aahein bhi kheench kheench kar Aatish-e-gham badhai jaa", "husn tamaasha dost ko ishq karishma saaz too", "Sab ho hijab bartaraf dekhan tujhi ko har taraf", "Parde yuhin hatai jaa jalve yunhi dikhae jaa", "jaam pe jaam laai jaa, shaan-e-karam dikhai jaa", ], }, { id: 4, title: "Yaad Rahe Bas Ya Rab", artist: "Munajat Collection", duration: 286, mood: "Meditative", lines: [ "Ab to rahe bas taa dam-e-aakhir wirde-zubaan ae mere ilaah", "Yaad rahe bas ya rab tumara", "Fqat Tujhse ho mohabbat, khalaq se mai be-zaar rahun", "Dono jahaan mein jo kuch bhi hai, sab hai tere zer-e-nageen", "Koi nahin hai, Koi nahin hai, Koi nahin hai, Koi nahin", "Yaad mein teri sab ko bhula doon koi na mujhko yaad rahe", "Sab khushiyoon Ko aag laga doon, gham se tere dil shaad rahe", "Tujhse fariyaad rahe", ], }, { id: 5, title: "Teri Rahmaton Se Hun Bekhabar", artist: "Munajat Collection", duration: 176, mood: "Supplication", lines: [ "Teri Rahmaton se hun bekhabar ye meri nazar ka qusur hai", "Teri Raah mein qaadam qaadam kahin arsh hai kahin toor hai", "Ye baja hai malik-e-dojahan meri bandagi mein kusur hain", "Ye bataa mai tujh se milun kahan mujhe tujh se milna zaroor hai", "Kahin dil ki sharth na daalna ye dil gunahon se choor hai", "too baksh de mere gunaah too raheem hai tu ghafoor hai", ], }, { id: 6, title: "Dil Badal De", artist: "Munajat Collection", duration: 214, mood: "Uplifting", lines: [ "Hawa-o-hirs waala dil badal de", "Mera Ghaflat mein dooba dil badal de", "Badal de dil ki dunya dil badal de", "Gunahgaari mein Kab tak umr Kaatun", "Sunoon mai naam tera dhadkanon mein", "Karun qurbaan apni saari khushiyan", "Hataaloon aankh apni maa sivaa se", "meri faryaad sunle mere maula", ], }, ];

function formatTime(seconds) { const m = Math.floor(seconds / 60); const s = Math.floor(seconds % 60) .toString() .padStart(2, "0"); return ${m}:${s}; }

export default function MunajatFrontendApp() { const [query, setQuery] = useState(""); const [selectedId, setSelectedId] = useState(1); const [isPlaying, setIsPlaying] = useState(false); const [progress, setProgress] = useState(12); const [volume, setVolume] = useState([75]); const [repeat, setRepeat] = useState(false); const timerRef = useRef(null);

const selected = munajats.find((m) => m.id === selectedId) ?? munajats[0];

const filtered = useMemo(() => { const q = query.trim().toLowerCase(); if (!q) return munajats; return munajats.filter( (m) => m.title.toLowerCase().includes(q) || m.mood.toLowerCase().includes(q) ); }, [query]);

const currentLineIndex = useMemo(() => { const duration = selected.duration; const steps = selected.lines.length; const ratio = progress / 100; const idx = Math.min(steps - 1, Math.max(0, Math.floor(ratio * steps))); return idx; }, [progress, selected]);

useEffect(() => { if (!isPlaying) return; timerRef.current = window.setInterval(() => { setProgress((p) => { if (p >= 100) { if (repeat) return 0; setIsPlaying(false); return 100; } return Math.min(100, p + 0.65); }); }, 1000); return () => window.clearInterval(timerRef.current); }, [isPlaying, repeat]);

useEffect(() => { setProgress(8); setIsPlaying(false); }, [selectedId]);

const currentSeconds = (progress / 100) * selected.duration;

const prevTrack = () => { const index = munajats.findIndex((m) => m.id === selectedId); const next = (index - 1 + munajats.length) % munajats.length; setSelectedId(munajats[next].id); };

const nextTrack = () => { const index = munajats.findIndex((m) => m.id === selectedId); const next = (index + 1) % munajats.length; setSelectedId(munajats[next].id); };

return ( <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-100"> <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 p-4 md:p-6 lg:p-8"> <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur md:flex-row md:items-center md:justify-between"> <div className="flex items-center gap-4"> <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/20"> <Music2 className="h-7 w-7 text-emerald-300" /> </div> <div> <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80"> Munajat App </p> <h1 className="text-2xl font-semibold md:text-3xl">Lyrics + Audio Frontend</h1> <p className="mt-1 text-sm text-slate-300"> Elegant playback UI with highlighted lines, playlist, and devotional theme. </p> </div> </div>

<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-3">
        <Search className="h-4 w-4 text-slate-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search munajat"
          className="w-56 border-0 bg-transparent text-slate-100 placeholder:text-slate-500 focus-visible:ring-0"
        />
      </div>
    </header>

    <main className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <aside className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-200">
            <ListMusic className="h-4 w-4 text-emerald-300" />
            <span className="font-medium">Collection</span>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-300">
            {filtered.length} items
          </span>
        </div>

        <div className="space-y-3">
          {filtered.map((item) => {
            const active = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                  active
                    ? "border-emerald-300/40 bg-emerald-400/10 shadow-lg shadow-emerald-950/30"
                    : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/8"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.artist}</p>
                  </div>
                  <div className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">
                    {item.mood}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                  <Music2 className="h-3.5 w-3.5" />
                  <span>{formatTime(item.duration)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="overflow-hidden rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-emerald-500/15 via-transparent to-sky-500/10 p-6 md:p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/80">
                    Now Playing
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{selected.title}</h2>
                  <p className="mt-2 text-slate-300">{selected.artist} • {selected.mood}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorite
                  </Button>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
                <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
                  <span>{formatTime(currentSeconds)}</span>
                  <span>{formatTime(selected.duration)}</span>
                </div>
                <Slider
                  value={[progress]}
                  onValueChange={(v) => setProgress(v[0] ?? 0)}
                  max={100}
                  step={1}
                />

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/5 hover:bg-white/10"
                      onClick={prevTrack}
                    >
                      <SkipBack className="h-5 w-5" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-14 w-14 rounded-full bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                      onClick={() => setIsPlaying((p) => !p)}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full bg-white/5 hover:bg-white/10"
                      onClick={nextTrack}
                    >
                      <SkipForward className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                    <Volume2 className="h-4 w-4 text-slate-300" />
                    <div className="w-28 md:w-36">
                      <Slider value={volume} onValueChange={setVolume} max={100} step={1} />
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => setRepeat((r) => !r)}
                    className={`rounded-full border ${repeat ? "border-emerald-300/40 bg-emerald-400/10 text-emerald-200" : "border-white/10 bg-white/5 text-slate-200"}`}
                  >
                    <Repeat className="mr-2 h-4 w-4" />
                    Repeat
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-white/10 bg-white/5 shadow-2xl backdrop-blur">
          <CardContent className="p-6 md:p-7">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-emerald-300/80">
                  Lyrics
                </p>
                <h3 className="mt-2 text-2xl font-semibold">Timed Highlight View</h3>
              </div>
              <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                line {currentLineIndex + 1} / {selected.lines.length}
              </div>
            </div>

            <div className="space-y-3">
              {selected.lines.map((line, idx) => {
                const active = idx === currentLineIndex;
                const passed = idx < currentLineIndex;
                return (
                  <div
                    key={`${selected.id}-${idx}`}
                    className={`rounded-2xl border p-4 transition-all duration-300 ${
                      active
                        ? "border-emerald-300/50 bg-emerald-400/15 shadow-lg shadow-emerald-950/20"
                        : passed
                        ? "border-white/10 bg-black/10 text-slate-300"
                        : "border-white/10 bg-transparent text-slate-400"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 h-2.5 w-2.5 rounded-full ${active ? "bg-emerald-300" : "bg-slate-600"}`} />
                      <p className={`leading-8 ${active ? "text-lg font-medium text-white" : "text-base"}`}>
                        {line}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  </div>
</div>

); }
