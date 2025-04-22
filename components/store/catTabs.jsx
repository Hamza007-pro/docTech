"use client";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BarsArrowDownIcon } from "@heroicons/react/20/solid";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { getSubcategories, getCountProductBySubcat } from "@/app/actions/categoryActions";
import {getProductsBySubcategorySlug} from "@/app/actions/products";
import useNavigationStore from "@/app/store/navigationStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CatTabs() {
  const [subcategories, setSubcategories] = useState([]);
  const { navigateTo, currentTab, setCurrentTab } = useNavigationStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubcategoriesAndCounts = async () => {
      try {
        setLoading(true);
        
        // Make sure navigateTo is a valid number
        const categoryId = parseInt(navigateTo);
        console.log("Current navigateTo value:", navigateTo, "parsed as:", categoryId);
        
        if (!categoryId || isNaN(categoryId)) {
          console.log("Invalid navigateTo value:", navigateTo);
          setSubcategories([]);
          setLoading(false);
          return;
        }

        console.log("Fetching subcategories for category ID:", categoryId);
        
        // Direct database query to get subcategories
        const subs = await getSubcategories(categoryId);
        console.log("Subcategories result:", JSON.stringify(subs));
        
        // Calculate total product count for "All" category
        const totalCount = subs.reduce((total, sub) => total + (sub.productCount || 0), 0);
        
        // Create "All" subcategory with total count
        const allSubcategory = {
          id: 0,
          name: "All",
          slug: "all",
          count: totalCount
        };
        
        // Always start with the "All" subcategory
        let finalSubs = [allSubcategory];
        
        if (subs && Array.isArray(subs) && subs.length > 0) {
          console.log("Found", subs.length, "subcategories for category ID:", categoryId);
          
          // Format the subcategories
          const formattedSubs = subs.map(sub => {
            return {
              id: sub.id,
              name: sub.name,
              slug: sub.slug,
              count: sub.productCount || 0
            };
          });
          
          // Combine with the "All" subcategory
          finalSubs = [allSubcategory, ...formattedSubs];
        } else {
          console.log("No subcategories found for category ID:", categoryId);
        }
        
        console.log("Setting subcategories to:", JSON.stringify(finalSubs));
        setSubcategories(finalSubs);
        setCurrentTab("all");
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        setSubcategories([{
          id: 0,
          name: "All",
          slug: "all",
          count: 0
        }]);
        setCurrentTab("all");
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoriesAndCounts();
  }, [navigateTo, setCurrentTab]);

  const handleTabClick = (tab) => {
    setCurrentTab(tab.slug);
    // Add any additional filtering logic here
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-pulse flex space-x-4">
          <div className="h-8 w-24 bg-slate-200 rounded"></div>
          <div className="h-8 w-24 bg-slate-200 rounded"></div>
          <div className="h-8 w-24 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (subcategories.length === 0) {
    return null; // Don't show tabs if there are no subcategories
  }

  return (
    <div className="justify-between lg:flex">
      <div className="lg:flex">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            value={currentTab}
            onChange={(e) => handleTabClick(e.target.value)}
          >
            {subcategories.map((tab) => (
              <option key={tab.id} value={tab.slug}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1 mr-3">
          <nav className="flex" aria-label="Tabs">
            {subcategories.map((tab) => (
              <button
                onClick={() => handleTabClick(tab)}
                key={tab.slug}
                className={classNames(
                  currentTab === tab.slug
                    ? "bg-white text-blue-700"
                    : "text-gray-600 hover:text-gray-800",
                  "rounded-3xl px-3 py-1 text-sm font-normal"
                )}
                aria-current={currentTab === tab.slug ? "all" : undefined}
              >
                {tab.name}
                <span className="text-gray-600">({tab.count})</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1">
          <nav className="flex space-x-2" aria-label="Tabs">
            <Link
              href="#"
              className={classNames(
                "text-gray-600 hover:text-gray-800",
                "rounded-3xl px-3 py-1 text-sm font-normal"
              )}
              aria-current={"page"}
            >
              Related Add-Ons
            </Link>
          </nav>
        </div>
      </div>
      <div className="lg:flex">
        <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1 mr-3">
          <nav className="flex space-x-2" aria-label="Tabs">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className={classNames(
                    "text-gray-600 hover:text-gray-800",
                    "rounded-3xl px-3 py-1 text-sm font-normal flex justify-around"
                  )}
                >
                  <BarsArrowDownIcon className=" h-5 w-5 text-gray-900 mr-1" />
                  Recommended
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Recommanded
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Highest Price
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Lowest Price
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </nav>
        </div>
        <div className="hidden sm:block bg-slate-100 w-fit rounded-3xl p-1">
          <nav className="flex space-x-2" aria-label="Tabs">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button
                  className={classNames(
                    "text-gray-600 hover:text-gray-800",
                    "rounded-3xl px-3 py-1 text-sm font-normal flex justify-around"
                  )}
                >
                  <AdjustmentsHorizontalIcon className=" h-5 w-5 text-gray-900 mr-1" />
                  Filter
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <div className="relative flex items-start px-4 py-2 text-sm">
                        <div className="flex h-6 items-center">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className=" text-sm text-gray-900"
                          >
                            PoE
                          </label>
                        </div>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div className="relative flex items-start px-4 py-2 text-sm">
                        <div className="flex h-6 items-center">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className=" text-sm text-gray-900"
                          >
                            WiFi Integrated
                          </label>
                        </div>
                      </div>
                    </Menu.Item>
                    <Menu.Item>
                      <div className="relative flex items-start px-4 py-2 text-sm mt-5">
                        <div className="flex h-6 items-center">
                          <input
                            id="comments"
                            aria-describedby="comments-description"
                            name="comments"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="comments"
                            className=" text-sm text-gray-900"
                          >
                            In Stock
                          </label>
                        </div>
                      </div>
                    </Menu.Item>
                    <form method="POST" action="#">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type="submit"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-blue-400"
                                : "text-blue-400",
                              "block w-full px-4 py-2 text-left font-medium"
                            )}
                          >
                            Reset Filter
                          </button>
                        )}
                      </Menu.Item>
                    </form>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </nav>
        </div>
      </div>
      {subcategories.length === 1 && (
        <div className="text-gray-600 text-sm mt-2">
          This category has no subcategories.
        </div>
      )}
    </div>
  );
}

export default CatTabs;
