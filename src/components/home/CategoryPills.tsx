export default function CategoryPills() {
  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {[
            "Paper",
            "Art and Craft",
            "Paints",
            "Books",
            "Scrapbook",
            "Color Pencils",
            "Sticky Notes",
            "File Organizing",
            "Eraser",
            "Ruler",
          ].map((cat, idx) => (
            <button
              key={idx}
              className="px-3 md:px-5 py-1.5 md:py-2 border border-gray-300 rounded-full text-xs md:text-sm text-gray-700 hover:border-green-700 hover:text-green-700 transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
