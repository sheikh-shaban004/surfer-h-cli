import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

// Updated interfaces to match our FastAPI server
export interface StartTrajectoryRequest {
  task: string;
  url: string;
  max_n_steps?: number;
  max_time_seconds?: number;
  model_name_navigation?: string;
  base_url_navigation?: string | null;
  temperature_navigation?: number;
  n_navigation_screenshots?: number;
  base_url_localization?: string;
  model_name_localization?: string;
  temperature_localization?: number;
  use_validator?: boolean;
  model_name_validation?: string;
  base_url_validation?: string | null;
  temperature_validation?: number;
  headless_browser?: boolean;
  action_timeout?: number;
}

export interface StartTrajectoryResponse {
  status: string;
  trajectory_id: string;
  task: string;
  url: string;
  settings: Record<string, unknown>;
}

export interface Trajectory {
  trajectory_id: string;
  task: string;
  url: string;
  status: string;
  start_time: string;
  end_time?: string | null;
  step_count: number;
}

export interface TrajectoryEvent {
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

// Query Keys
export const QUERY_KEYS = {
  TRAJECTORY: 'trajectory',
  TRAJECTORIES: 'trajectories',
} as const;

// Hook Options Interfaces
interface UseGetTrajectoryOptions {
  onSuccess?: (data: Trajectory) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

interface UseCreateTrajectoryOptions {
  onSuccess?: (data: StartTrajectoryResponse) => void;
  onError?: (error: Error) => void;
}

interface UseListTrajectoriesOptions {
  onSuccess?: (data: Trajectory[]) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

// Get Trajectory Hook
export function useGetTrajectory(
  trajectoryId: string,
  options?: UseGetTrajectoryOptions
) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRAJECTORY, trajectoryId],
    queryFn: async () => {
      const response = await fetch(`/api/trajectories?taskId=${trajectoryId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch trajectory' }));
        throw new Error(errorData.detail || 'Failed to fetch trajectory');
      }
      return response.json();
    },
    enabled: options?.enabled !== false && !!trajectoryId,
  });
}

// Create Trajectory Hook
export function useCreateTrajectory(options?: UseCreateTrajectoryOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: StartTrajectoryRequest): Promise<StartTrajectoryResponse> => {
      request.headless_browser = true;
      const response = await fetch('/api/trajectories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to create trajectory' }));
        throw new Error(errorData.detail || 'Failed to create trajectory');
      }

      return response.json();
    },
    onSuccess: (data) => {
      // Invalidate trajectories list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TRAJECTORIES] });

      // Set the new trajectory in cache
      if (data?.trajectory_id) {
        queryClient.setQueryData([QUERY_KEYS.TRAJECTORY, data.trajectory_id], {
          trajectory_id: data.trajectory_id,
          task: data.task,
          url: data.url,
          status: data.status,
          start_time: new Date().toISOString(),
          step_count: 0,
        });
      }

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: Error) => {
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
}

// List Trajectories Hook
export function useListTrajectories(options?: UseListTrajectoriesOptions) {
  return useQuery({
    queryKey: [QUERY_KEYS.TRAJECTORIES],
    queryFn: async () => {
      const response = await fetch('/api/trajectories');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to list trajectories' }));
        throw new Error(errorData.detail || 'Failed to list trajectories');
      }
      const data = await response.json();
      // Extract the trajectories array from the response
      return data.trajectories || [];
    },
    enabled: options?.enabled !== false,
  });
}

// Hook to poll trajectory events
export function useTrajectoryPolling(
  trajectoryId: string,
  options?: {
    onUpdate?: (data: { events: TrajectoryEvent[]; status: string; step_count: number; id?: string }) => void;
    onError?: (error: Error) => void;
    enabled?: boolean;
    pollInterval?: number;
  }
) {
  const { pollInterval = 1000 } = options || {};

  const query = useQuery({
    queryKey: ['trajectory-polling', trajectoryId],
    queryFn: async () => {
      const response = await fetch(`/api/trajectory-events?trajectoryId=${trajectoryId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Failed to fetch trajectory data' }));
        throw new Error(errorData.detail || 'Failed to fetch trajectory data');
      }
      const data = await response.json();
      return {
        events: data.events || [],
        status: data.status || 'unknown',
        step_count: data.step_count || 0,
        id: data.id,
      };
    },
    enabled: options?.enabled !== false && !!trajectoryId,
    refetchInterval: pollInterval,
    refetchIntervalInBackground: true,
  });

  // Handle success/error callbacks with useEffect
  useEffect(() => {
    if (query.data && options?.onUpdate) {
      options.onUpdate(query.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (query.error && options?.onError) {
      options.onError(query.error);
    }
  }, [query.error]);

  return query;
}
