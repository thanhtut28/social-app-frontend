import { formatDistance } from "date-fns";

export const formatDate = (dateString: string) => {
   return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
};
