import React from 'react';

const BookCategories = () => {
  const categories = [
    {
      name: 'History',
      bgColor: 'bg-red-100',
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=300&h=300&fit=crop'
    },
    {
      name: 'Science Fiction',
      bgColor: 'bg-green-100',
      image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=300&fit=crop'
    },
    {
      name: 'Literature',
      bgColor: 'bg-yellow-100',
      image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop'
    },
    {
      name: 'Novel',
      bgColor: 'bg-gray-200',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop'
    },
    {
      name: 'Travelogue',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=300&h=300&fit=crop'
    },
    {
      name: 'Comics',
      bgColor: 'bg-cyan-100',
      image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=300&h=300&fit=crop'
    },
    {
      name: 'Coloring',
      bgColor: 'bg-pink-100',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop'
    },
    {
      name: 'History',
      bgColor: 'bg-orange-100',
      image: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=300&h=300&fit=crop'
    }
  ];

  return (
    <section className="py-6 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto pb-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 md:gap-4 flex-shrink-0 cursor-pointer group"
              >
                <div
                  className={`w-24 h-24 md:w-36 md:h-36 rounded-full ${cat.bgColor} flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-14 h-20 md:w-20 md:h-28 object-cover shadow-lg"
                  />
                </div>
                <p className="text-gray-900 font-medium text-xs md:text-base text-center">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
};

export default BookCategories;