import Image from "next/image";

type Tile = {
  title: string;
  img: string;
  featured?: boolean;
  video?: boolean;
  duration?: string;
};

function Tile({ t, className = "" }: { t: Tile; className?: string }) {
  return (
    <figure className={`group relative overflow-hidden rounded-[1.75rem] bg-brand-soft shadow-card ${className}`}>
      <Image src={t.img} alt={t.title} fill sizes="(max-width: 768px) 90vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      {t.featured && (
        <span className="absolute left-5 top-5 rounded-full bg-white/25 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          Featured
        </span>
      )}

      {t.video && (
        <>
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand shadow-lg transition-transform group-hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </span>
          {t.duration && (
            <span className="absolute bottom-4 right-4 rounded-md bg-black/55 px-2 py-0.5 text-xs font-medium text-white">{t.duration}</span>
          )}
        </>
      )}

      {!t.video && (
        <span className="absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-ink opacity-0 transition-opacity group-hover:opacity-100">↗</span>
      )}

      <figcaption className="absolute bottom-5 left-5 text-lg font-bold text-white drop-shadow">{t.title}</figcaption>
    </figure>
  );
}

export function GalleryMemories() {
  return (
    <div className="space-y-5">
      {/* Row 1: three equal tiles */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Tile t={{ title: "Nap Time", img: "/images/gallery/g1.jpg" }} className="aspect-[4/3]" />
        <Tile t={{ title: "Birthday Celebration", img: "/images/gallery/g2.jpg" }} className="aspect-[4/3]" />
        <Tile t={{ title: "Creative Activities", img: "/images/gallery/g3.jpg" }} className="aspect-[4/3]" />
      </div>

      {/* Row 2: featured + stacked video/meal */}
      <div className="grid gap-5 md:h-[30rem] md:grid-cols-3">
        <Tile t={{ title: "Outdoor Play", img: "/images/playground.jpg", featured: true }} className="aspect-[16/10] md:col-span-2 md:aspect-auto md:h-full" />
        <div className="grid gap-5 md:grid-rows-2">
          <Tile t={{ title: "Learning Time", img: "/images/classroom.jpg", video: true, duration: "02:15" }} className="aspect-[16/10] md:aspect-auto" />
          <Tile t={{ title: "Meal Time", img: "/images/gallery/g6.jpg" }} className="aspect-[16/10] md:aspect-auto" />
        </div>
      </div>

      {/* Row 3: three more equal tiles */}
      <div className="grid gap-5 sm:grid-cols-3">
        <Tile t={{ title: "Story Circle", img: "/images/gallery/g4.jpg" }} className="aspect-[4/3]" />
        <Tile t={{ title: "Music & Dance", img: "/images/gallery/g5.jpg" }} className="aspect-[4/3]" />
        <Tile t={{ title: "Little Explorers", img: "/images/gallery/g7.jpg" }} className="aspect-[4/3]" />
      </div>
    </div>
  );
}
