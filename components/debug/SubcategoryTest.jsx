"use client";
import { useEffect, useState } from 'react';
import { testNetworkingSubcategories } from '@/app/actions/testSubcategories';

export default function SubcategoryTest() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubcategories() {
      try {
        setLoading(true);
        console.log('Testing direct subcategory fetch for Networking');
        const data = await testNetworkingSubcategories();
        console.log('Test result:', data);
        setSubcategories(data);
      } catch (err) {
        console.error('Error in test:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSubcategories();
  }, []);

  if (loading) return <div>Testing subcategories...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Networking Subcategories Test</h2>
      {subcategories.length === 0 ? (
        <div className="text-red-500">No subcategories found for Networking!</div>
      ) : (
        <div>
          <p className="mb-2">Found {subcategories.length} subcategories:</p>
          <ul className="list-disc pl-5">
            {subcategories.map(sub => (
              <li key={sub.id}>
                {sub.name} (ID: {sub.id}, Slug: {sub.slug})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
