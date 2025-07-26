import { useEffect, useState } from "react";
import axios from "axios";

function NotificationBadge({ label = "Leave Requests" }) {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get("http://localhost:3002/leaveRequests");
        const pending = res.data.filter(req => req.status === "Pending");
        setPendingCount(pending.length);
      } catch (err) {
        console.error("Failed to fetch leave requests:", err);
      }
    };

    fetchPending();
  }, []);

  return (
    <div className="relative flex items-center gap-2">
      <span>{label}</span>
      {pendingCount > 0 && (
        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
          {pendingCount}
        </span>
      )}
    </div>
  );
}

export default NotificationBadge;
