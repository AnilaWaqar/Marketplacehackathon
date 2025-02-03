import React, { useState } from "react";

// interface FiltersProps {
//   onFilter: (filters: { category?: string; priceRange?: [number, number] }) => void;
//   categories: string[];
// }

const Filters = ({
    categories,
    selectedCategory,
    selectedBadge,
    onCategoryChange,
    onPriceFilter,
    onBadgeChange,
  }: {
    categories: string[];
    selectedCategory: string;
    selectedBadge: string;
    onCategoryChange: (category: string) => void;
    onPriceFilter: (category: string, priceRange: [number, number]) => void;
    onBadgeChange: (badge: string) => void;
  }) => {
    const priceRanges = [
      { label: "Under $25", range: [0, 25] },
      { label: "$25 - $50", range: [25, 49] },
      { label: "$50 - $80", range: [50, 80] },
      { label: "$80+", range: [80, Infinity] },
    ];
  
    return (
      <div className="filters flex flex-wrap gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2  text-sm sm:text-base border outline-none text-[#272343] border-gray-300 rounded-md"
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
  
        {/* Price Range Dropdown */}
        <select
          onChange={(e) => {
            const selectedPrice = e.target.value.split(',');
            const priceRange: [number, number] = [parseInt(selectedPrice[0]), parseInt(selectedPrice[1])];
            onPriceFilter(selectedCategory, priceRange);
          }}
          className="p-2 text-sm sm:text-base border outline-none text-[#272343] border-gray-300 rounded-md"
        >
          <option value="0,0">Select Price Range</option>
          {priceRanges.map((range) => (
            <option key={range.label} value={`${range.range[0]},${range.range[1]}`}>
              {range.label}
            </option>
          ))}
        </select>
  
        {/* Badge Filter */}
        <select
          value={selectedBadge}
          onChange={(e) => onBadgeChange(e.target.value)}
          className="p-2 text-sm sm:text-base border outline-none text-[#272343] border-gray-300 rounded-md"
        >
          <option value="">No Badge</option>
          <option value="Sales">Sales</option>
          <option value="New">New</option>
        </select>

       
      </div>
    );
  };
  
export default Filters;