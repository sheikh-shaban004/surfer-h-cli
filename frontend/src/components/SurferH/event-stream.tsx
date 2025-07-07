"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTrajectoryPolling } from "@/hooks/useTrajectories";
import { useQueryClient } from '@tanstack/react-query';
import LoaderIcon from "@/components/common/icons/Loader";

interface TrajectoryEvent {
  type: string;
  message: string;
  timestamp: string;
  screenshot?: string;
  agent_state?: {
    timestep: number;
    url: string;
    task: string;
  };
}

interface EventStreamProps {
  trajectoryId: string;
}

interface EventEntry extends TrajectoryEvent {
  id: string;
}

const EventStream: React.FC<EventStreamProps> = ({ trajectoryId }) => {
  const [events, setEvents] = useState<EventEntry[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const eventsEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Reset state when trajectoryId changes
  useEffect(() => {
    setEvents([]);
    setIsRunning(true);
    // Invalidate any cached polling data for other trajectories
    queryClient.invalidateQueries({
      queryKey: ['trajectory-polling'],
      exact: false
    });
  }, [trajectoryId, queryClient]);

  // Auto-scroll to bottom when new events arrive
  const scrollToBottom = () => {
    eventsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [events]);

  // Poll for trajectory data
  useTrajectoryPolling(trajectoryId, {
    onUpdate: (data) => {
      // Validate that the data belongs to the current trajectory to prevent stale data leakage
      if (data.id && data.id !== trajectoryId) {
        console.warn('Received data for different trajectory, ignoring:', data.id, 'expected:', trajectoryId);
        return;
      }

      const eventEntries: EventEntry[] = data.events.map((event, index) => ({
        ...event,
        id: `event-${index}-${event.timestamp}`,
      }));
      setEvents(eventEntries);

      // Check if agent is still running
      const agentStillRunning = data.status === 'running';
      if (agentStillRunning !== isRunning) {
        setIsRunning(agentStillRunning);
      }
    },
    onError: (error) => {
      console.error('Error polling trajectory events:', error);
    },
    pollInterval: 1000, // Poll every second
    enabled: isRunning, // Stop polling when agent is no longer running
  });





  const formatTime = (timestamp: string) => {
    try {
      return new Date(timestamp).toLocaleTimeString();
    } catch {
      return timestamp;
    }
  };



  const stripEventTypeFromMessage = (message: string, eventType: string) => {
    // Common prefixes to remove based on event type
    const prefixPatterns = [
      /^🧠\s*Thought\s*:\s*/i,
      /^📝\s*Notes\s*:\s*/i,
      /^🔧\s*Action\s*:\s*/i,
      /^🎉\s*Announcement\s*:\s*/i,
      /^📷\s*Screenshot\s*:\s*/i,
      /^💬\s*Answer\s*:\s*/i,
      /^❌\s*Error\s*:\s*/i,
      /^✅\s*Completed\s*:\s*/i,
      // Fallback: remove event type with colon
      new RegExp(`^.*${eventType.toLowerCase()}\\s*:\\s*`, 'i'),
      // Remove emoji + event type + colon pattern
      /^[^\w]*\w+\s*:\s*/
    ];

    let cleanedMessage = message;
    for (const pattern of prefixPatterns) {
      const cleaned = cleanedMessage.replace(pattern, '');
      if (cleaned !== cleanedMessage) {
        cleanedMessage = cleaned;
        break;
      }
    }

    return cleanedMessage.trim();
  };

    return (
    <div className="h-full flex flex-col overflow-hidden scrollbar-hide p-2">
      <div className="flex-1 overflow-y-auto pt-10 pb-3 scrollbar-hide">
        <div className="max-w-2xl mx-auto space-y-3">
          {events.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-5">
              <div className="text-center">
                <p className="text-14-regular-body">Agent events will stream here...</p>
              </div>
            </div>
          ) : (
            <>
              {events.map((event) => (
                <div key={event.id} className="mb-10">
                  {/* Special handling for announcement events */}
                  {event.type.toLowerCase() === 'announcement' ? (
                    <>
                      {/* Event header with type and timestamp */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-12-medium-heading uppercase tracking-wide text-gray-7 font-semibold">
                          {event.type}
                        </span>
                        <span className="text-12-regular-heading text-gray-6 font-mono">
                          {formatTime(event.timestamp)}
                        </span>
                      </div>

                      <div className="text-center py-4">
                        <div className="text-16-medium-heading text-gray-8">
                          {stripEventTypeFromMessage(event.message, event.type)}
                        </div>
                        <div className="w-full h-px bg-gray-3 mt-4"></div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Event header with type and timestamp */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-12-medium-heading uppercase tracking-wide font-semibold ${
                      event.type.toLowerCase() === 'completed' ? 'text-green-7' : 'text-gray-7'
                    }`}>
                          {event.type.toLowerCase() === 'completed' ? '✅ ' : ''}{event.type}
                        </span>
                        <span className="text-12-regular-heading text-gray-6 font-mono">
                          {formatTime(event.timestamp)}
                        </span>
                      </div>

                      {/* Event content - hide message for screenshots only, but show for completed events */}
                      {event.type.toLowerCase() !== 'screenshot' && !event.message.startsWith('Image(') && (
                        <div className={`text-14-regular-body leading-relaxed ${
                      event.type.toLowerCase() === 'completed' ? 'text-green-8 font-medium' : 'text-gray-8'
                    }`}>
                          {stripEventTypeFromMessage(event.message, event.type)}
                        </div>
                      )}

                      {/* Screenshot if available */}
                      {event.screenshot && (
                        <div className="mt-3">
                          <img
                            src={`data:image/png;base64,${event.screenshot}`}
                            alt={event.type.toLowerCase() === 'completed' ? 'Final Screenshot' : 'Screenshot'}
                            className="rounded-md border border-gray-3 w-full h-auto"
                            style={{ maxHeight: '400px' }}
                          />
                          {event.type.toLowerCase() === 'completed' && (
                        <p className="text-12-regular-heading text-gray-6 mt-2 text-center">
                          Final state when the agent completed the task
                        </p>
                      )}
                    </div>
                      )}
                    </>
                  )}
                </div>
            ))}
            <div ref={eventsEndRef} />
          </>
        )}
        </div>
      </div>

      {/* Loader at bottom when agent is running */}
      {isRunning && (
        <div className="bg-background-card p-6">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
            <LoaderIcon width={16} height={16} className="text-h-green" />
            <span className="text-12-regular-heading text-gray-6">
              Agent is running...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventStream;
