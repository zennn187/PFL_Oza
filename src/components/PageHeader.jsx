import React from 'react';

const PageHeader = ({ title, breadcrumb, children }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          {breadcrumb && (
            <p className="text-sm text-gray-500 mt-1">
              {Array.isArray(breadcrumb) ? breadcrumb.join(' / ') : breadcrumb}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
      <hr className="border-gray-200" />
    </div>
  );
};

export default PageHeader;