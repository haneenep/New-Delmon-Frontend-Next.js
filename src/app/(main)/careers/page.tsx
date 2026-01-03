
const CareersPage = () => {
    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">

                    {/* Hero Section */}
                    <div className="bg-[#114f30] text-white py-16 px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
                        <p className="text-xl max-w-2xl mx-auto text-green-100">
                            We're building the future of stationery and office supplies in the region. Come grow with us.
                        </p>
                    </div>

                    <div className="p-8 md:p-12 space-y-16">

                        {/* Values Section */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Values</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                                        💡
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We constantly seek better ways to serve our customers and improve our platform.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                                        🤝
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We believe in honest, transparent, and ethical business practices in everything we do.
                                    </p>
                                </div>
                                <div className="text-center p-6">
                                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                                        🚀
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">Growth</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        We support the professional and personal growth of every team member.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Open Positions */}
                        <section>
                            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Open Positions</h2>
                            <div className="space-y-4 max-w-4xl mx-auto">
                                {/* Job Item */}
                                <div className="border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all group cursor-pointer bg-white">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">Sales Executive</h3>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                                <span>Remote / Hybrid</span>
                                                <span>•</span>
                                                <span>Full-time</span>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg group-hover:bg-green-700 group-hover:text-white transition-all whitespace-nowrap">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>

                                {/* Job Item */}
                                <div className="border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all group cursor-pointer bg-white">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">Digital Marketing Specialist</h3>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                                <span>Dubai, UAE</span>
                                                <span>•</span>
                                                <span>Full-time</span>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg group-hover:bg-green-700 group-hover:text-white transition-all whitespace-nowrap">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>

                                {/* Job Item */}
                                <div className="border border-gray-200 rounded-xl p-6 hover:border-green-500 hover:shadow-md transition-all group cursor-pointer bg-white">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">Warehouse Manager</h3>
                                            <div className="flex gap-4 mt-2 text-sm text-gray-500">
                                                <span>Dubai, UAE</span>
                                                <span>•</span>
                                                <span>Full-time</span>
                                            </div>
                                        </div>
                                        <button className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg group-hover:bg-green-700 group-hover:text-white transition-all whitespace-nowrap">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>

                            </div>

                            <div className="text-center mt-12 bg-gray-50 rounded-xl p-8">
                                <p className="text-gray-600 mb-4">Don't see a role that fits? We're always looking for talent.</p>
                                <a href="mailto:careers@newdelmonstationery.com" className="text-green-700 font-bold hover:underline">
                                    Send us your CV
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CareersPage;
