"use client";
import CategoryDebug from '@/components/debug/CategoryDebug';
import SubcategoryTest from '@/components/debug/SubcategoryTest';

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Page</h1>
      <SubcategoryTest />
      <div className="mt-8"></div>
      <CategoryDebug />
    </div>
  );
}
