import { useState } from "react";

export default function ExpandableText({ text, maxLength = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-gray-800">
      <p className="text-[13px]">
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
        {text.length > maxLength && (
          <span
            onClick={toggleExpanded}
            className="text-[#274753] font-semibold cursor-pointer ml-2"
          >
            {isExpanded ? "Read less" : "Read more"}
          </span>
        )}
      </p>
    </div>
  );
}
