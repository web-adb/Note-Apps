import React from 'react';
import { useLocation } from 'react-router-dom';

const Preview = () => {
  const { state } = useLocation();
  const { content } = state || {};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Preview</h2>
      <div className="border p-4" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Preview;
