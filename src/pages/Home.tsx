import React, { useState } from 'react';
import ExperienceCard from '../components/ExperienceCard';



import { experiences } from '../assets/experiences';

const Home: React.FC = () => {
  const [search, setSearch] = useState("");

  // Filter experiences based on title, location, or tag (case-insensitive)
  const filtered = experiences.filter(exp =>
    exp.title.toLowerCase().includes(search.toLowerCase()) ||
    exp.location.toLowerCase().includes(search.toLowerCase()) ||
    exp.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
     
   
    {/* Your Home page content */}
      <div className="flex flex-wrap -mx-3">
        {filtered.length === 0 ? (
          <div className="text-gray-500 p-8 w-full text-center">No experiences found.</div>
        ) : (
          filtered.map((exp) => (
            <div key={exp.id} className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-6">
              <ExperienceCard exp={exp} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
