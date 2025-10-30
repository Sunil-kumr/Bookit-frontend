import React from 'react';
import { Link } from 'react-router-dom';
import type { Experience } from '../types/experience';

export default function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200 min-w-[300px] max-w-[344px] flex flex-col">
      <img src={exp.image} alt={exp.title} className="rounded w-full h-40 object-cover" />
      <div className="font-semibold mt-2 text-lg">{exp.title}</div>
      <div className="flex items-center mt-1 gap-2">
        <span className="text-xs bg-gray-100 rounded px-2 py-1">{exp.tag}</span>
        {exp.location && <span className="text-xs">{exp.location}</span>}
      </div>
      <div className="text-xs text-gray-600 mt-2">{exp.description}</div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold text-gray-800">From ₹{exp.price}</div>
        <Link
          to={`/details/${exp.id}`}
          className="bg-yellow-400 text-sm font-semibold px-4 py-2 rounded hover:bg-yellow-500 focus:outline-none"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
