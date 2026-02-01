import React, { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronDown, ChevronUp, Reply } from "lucide-react";

const ReviewThread = ({ item, depth = 0, onReply }) => {
  const [expanded, setExpanded] = useState(false);

  const hasReplies = item.replies && item.replies.length > 0;

  return (
    <div className={`pl-${depth * 4}`}>
      {/* Review Card */}
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold text-gray-900">
              {item.author.name}
              {item.verified && (
                <span className="ml-2 text-xs text-green-600">(Verified)</span>
              )}
            </p>

            {/* Rating (only for top-level reviews) */}
            {item.rating && (
              <div className="flex space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < item.rating
                        ? "fill-blue-600 text-blue-600"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onReply(item)}
            className="text-blue-600 text-sm flex items-center gap-1"
          >
            <Reply size={14} />
            Reply
          </button>
        </div>

        <p className="mt-2 text-gray-700">{item.reviewText}</p>

        <p className="text-xs text-gray-500 mt-1">
          {new Date(item.createdAt).toLocaleString()}
        </p>

        {/* Expand / Collapse Button */}
        {hasReplies && (
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="mt-3 text-sm text-blue-600 flex items-center gap-1"
          >
            {expanded ? (
              <>
                <ChevronUp size={16} />
                Hide replies
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                View replies ({item.replies.length})
              </>
            )}
          </button>
        )}
      </div>

      {/* Replies */}
      <AnimatePresence>
        {expanded && hasReplies && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-3 space-y-3 pl-6 border-l"
          >
            {item.replies.map(reply => (
              <ReviewThread
                key={reply.id}
                item={reply}
                depth={depth + 1}
                onReply={onReply}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(ReviewThread);
