"use client";
import { useEffect, useState } from 'react';
import { getAllCategories } from '@/app/actions/categoryActions';

export default function CategoryDebug() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getAllCategories();
        console.log('All categories:', data);
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Category Debug</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Slug</th>
              <th className="py-2 px-4 border-b">Parent ID</th>
              <th className="py-2 px-4 border-b">Created At</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(cat => (
              <tr key={cat.id} className={cat.parent_id ? 'bg-blue-50' : ''}>
                <td className="py-2 px-4 border-b">{cat.id}</td>
                <td className="py-2 px-4 border-b">{cat.name}</td>
                <td className="py-2 px-4 border-b">{cat.slug}</td>
                <td className="py-2 px-4 border-b">{cat.parent_id || 'NULL'}</td>
                <td className="py-2 px-4 border-b">{new Date(cat.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
