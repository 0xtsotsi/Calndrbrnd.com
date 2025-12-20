import { useQuery } from "@tanstack/react-query";

import type { EventTypeSetupProps } from "@calndrbrnd/features/eventtypes/lib/types";
import { V2_ENDPOINTS, SUCCESS_STATUS } from "@calndrbrnd/platform-constants";
import type { ApiResponse, ApiSuccessResponse } from "@calndrbrnd/platform-types";

import { useAtomsContext } from "../../hooks/useAtomsContext";
import http from "../../lib/http";

export const QUERY_KEY = "use-event-by-id";
export const useAtomsEventTypeById = (id: number | null) => {
  const pathname = `/atoms/${V2_ENDPOINTS.eventTypes}/${id}`;
  const { isInit, accessToken } = useAtomsContext();

  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => {
      return http?.get<ApiResponse<EventTypeSetupProps>>(pathname).then((res) => {
        if (res.data.status === SUCCESS_STATUS) {
          return (res.data as ApiSuccessResponse<EventTypeSetupProps>).data;
        }
        throw new Error(res.data.error.message);
      });
    },
    enabled: !!id && isInit && !!accessToken,
  });
};
