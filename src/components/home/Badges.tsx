export default function BottomBadges() {
  return (
    <section className="py-6 md:py-8 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-xl md:text-2xl">📦</span>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
              Free Shipping
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              On orders over AED 100
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-xl md:text-2xl">🎁</span>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
              Great Rewards
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              Earn points on every purchase
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-6 md:p-8 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
              <span className="text-xl md:text-2xl">⚡</span>
            </div>
            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
              24/7 Support
            </h4>
            <p className="text-xs md:text-sm text-gray-600">
              Contact us anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
