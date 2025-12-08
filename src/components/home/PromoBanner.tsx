export default function PromoBanner() {
  return (
    <section className="py-4 md:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="relative bg-gradient-to-br from-cyan-200 to-cyan-300 rounded-lg h-48 md:h-64 flex items-center px-6 md:px-12 overflow-hidden">
            <div className="z-10">
              <h3 className="text-black text-xl md:text-3xl font-bold mb-1 md:mb-2">
                Find Your Best
              </h3>
              <h3 className="text-black text-xl md:text-3xl font-bold">
                Reading Companion
              </h3>
            </div>
            <img
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400"
              alt="Book"
              className="absolute right-4 md:right-8 h-40 md:h-56 object-contain"
            />
          </div>
          <div className="relative bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg h-48 md:h-64 flex items-center px-6 md:px-12 overflow-hidden">
            <div className="z-10">
              <h3 className="text-black text-xl md:text-3xl font-bold mb-1 md:mb-2">
                Find Your Favorite
              </h3>
              <h3 className="text-black text-xl md:text-3xl font-bold">
                Thriller
              </h3>
            </div>
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400"
              alt="Book"
              className="absolute right-4 md:right-8 h-40 md:h-56 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
